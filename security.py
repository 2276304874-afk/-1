from __future__ import annotations

import ipaddress
import re
import socket
import threading
import time
from datetime import datetime
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import urlparse

import httpx
from lxml import html


class SecurityError(RuntimeError):
    pass


class SecurityFirewall:
    """Local web and content firewall for Monday."""

    def __init__(self) -> None:
        self._lock = threading.RLock()
        self._requests: List[Dict[str, Any]] = []
        self._blocked_events: List[Dict[str, Any]] = []
        self._domain_hits: Dict[str, List[float]] = {}
        self._blocked_count = 0
        self._allowed_count = 0
        self._last_error = ""
        self._blocked_domains = {
            "example.invalid",
            "malware.test",
            "attacker.local",
            "localhost",
        }
        self._blocked_suffixes = (
            ".local",
            ".internal",
            ".lan",
            ".home",
            ".test",
            ".invalid",
        )

    def status(self) -> Dict[str, Any]:
        with self._lock:
            recent = self._blocked_events[-12:]
            return {
                "enabled": True,
                "blocked_count": self._blocked_count,
                "allowed_count": self._allowed_count,
                "recent_blocks": recent,
                "last_error": self._last_error,
                "rate_limit_requests_per_minute": 24,
                "rate_limit_requests_per_domain": 6,
                "content_max_bytes": 1_500_000,
                "text_max_chars": 18000,
            }

    def record_block(self, url: str, reason: str) -> None:
        with self._lock:
            self._blocked_count += 1
            self._last_error = reason
            self._blocked_events.append(
                {
                    "url": url,
                    "reason": reason,
                    "time": datetime.now().astimezone().isoformat(),
                }
            )
            self._blocked_events = self._blocked_events[-30:]

    def _resolve_ip(self, hostname: str) -> Optional[str]:
        try:
            infos = socket.getaddrinfo(hostname, None, family=socket.AF_INET)
        except OSError:
            return None
        if not infos:
            return None
        return infos[0][4][0]

    def _is_private_or_special_ip(self, ip_text: str) -> bool:
        try:
            ip = ipaddress.ip_address(ip_text)
        except ValueError:
            return True
        return (
            ip.is_private
            or ip.is_loopback
            or ip.is_link_local
            or ip.is_multicast
            or ip.is_reserved
            or ip.is_unspecified
        )

    def validate_url(self, raw_url: str) -> str:
        """校验 URL 协议、域名、端口和重定向，防止 SSRF/内网穿透。"""
        url = (raw_url or "").strip()
        if not url:
            raise SecurityError("网址为空")
        if len(url) > 4096:
            raise SecurityError("网址过长")

        parsed = urlparse(url)
        scheme = parsed.scheme.lower()
        if scheme not in {"http", "https"}:
            raise SecurityError("防火墙仅允许 http/https 协议")

        hostname = parsed.hostname or ""
        hostname = hostname.lower().rstrip(".")
        if not hostname:
            raise SecurityError("网址缺少有效主机名")

        if hostname in self._blocked_domains or hostname.endswith(self._blocked_suffixes):
            raise SecurityError("该域名被本地防火墙拦截")

        port = parsed.port
        if port is not None and port not in {80, 443, 8080, 8443}:
            raise SecurityError("防火墙已拦截非常规端口")

        ip_text = self._resolve_ip(hostname)
        if ip_text is None:
            raise SecurityError("域名无法解析")
        if self._is_private_or_special_ip(ip_text):
            raise SecurityError("防火墙已拦截内网、本机或保留地址")

        if parsed.username or parsed.password:
            raise SecurityError("防火墙已拦截包含凭据的网址")

        return url

    def _check_rate(self, url: str) -> None:
        parsed = urlparse(url)
        hostname = parsed.hostname or ""
        now = time.time()

        with self._lock:
            self._requests = [item for item in self._requests if now - item["time"] < 60]
            if len(self._requests) >= 24:
                raise SecurityError("一分钟内联网请求过多，防火墙已限速")

            hits = [item for item in self._domain_hits.get(hostname, []) if now - item < 60]
            if len(hits) >= 6:
                raise SecurityError("单个域名请求过于频繁，防火墙已限速")

            self._requests.append({"url": url, "time": now})
            self._domain_hits[hostname] = hits + [now]

    def request(
        self,
        method: str,
        url: str,
        *,
        data: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, str]] = None,
        max_bytes: int = 1_500_000,
    ) -> httpx.Response:
        """经过防火墙校验后发起外部请求，并限制响应大小。"""
        request_headers = {
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/126.0 Safari/537.36 Monday/1.0"
            ),
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        }
        if headers:
            request_headers.update(headers)

        current_url = url
        for _ in range(6):
            current_url = self.validate_url(current_url)
            self._check_rate(current_url)

            try:
                response = httpx.request(
                    method,
                    current_url,
                    data=data,
                    headers=request_headers,
                    timeout=18.0,
                    follow_redirects=False,
                )
            except httpx.TimeoutException as exc:
                raise SecurityError("网页请求超时") from exc
            except Exception as exc:
                raise SecurityError(f"网页请求失败：{exc}") from exc

            if response.is_redirect:
                location = response.headers.get("location")
                if not location:
                    raise SecurityError("网页重定向缺少目标地址")
                current_url = str(httpx.URL(current_url).join(location))
                continue
            break
        else:
            raise SecurityError("网页重定向次数过多")

        if response.status_code >= 400:
            raise SecurityError(f"网页返回错误状态：{response.status_code}")

        if "content-length" in response.headers:
            try:
                if int(response.headers["content-length"]) > max_bytes:
                    raise SecurityError("网页内容超过防火墙大小限制")
            except ValueError:
                pass

        body = response.content
        if len(body) > max_bytes:
            raise SecurityError("网页内容超过防火墙大小限制")

        with self._lock:
            self._allowed_count += 1
        return response

    def extract_text(self, content: str, max_chars: int = 18000) -> str:
        if not content:
            return ""
        try:
            document = html.fromstring(content)
        except Exception:
            return self.redact_secrets(_normalize_whitespace(content))[:max_chars]

        for node in document.xpath(
            "//script|//style|//noscript|//nav|//footer|//header|//aside|//form|//iframe"
        ):
            node.getparent().remove(node)

        candidates = document.xpath("//main | //article | //body")
        root = candidates[0] if candidates else document
        text = root.text_content()
        text = _normalize_whitespace(text)
        text = self.redact_secrets(text)
        return text[:max_chars]

    def extract_title(self, content: str) -> str:
        try:
            document = html.fromstring(content)
            titles = document.xpath("//title/text()")
            if titles:
                return _normalize_whitespace(titles[0])[:300]
        except Exception:
            pass
        match = re.search(r"<title[^>]*>(.*?)</title>", content, flags=re.I | re.S)
        if match:
            return _normalize_whitespace(match.group(1))[:300]
        return ""

    def redact_secrets(self, text: str) -> str:
        text = re.sub(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b", "[邮箱已隐藏]", text)
        text = re.sub(r"\b(1[3-9]\d{9})\b", "[手机号已隐藏]", text)
        text = re.sub(r"\b\d{16,19}\b", "[银行卡号已隐藏]", text)
        text = re.sub(r"(?i)\b(sk-[A-Za-z0-9_-]{16,})\b", "[API密钥已隐藏]", text)
        text = re.sub(r"(?i)\b(bearer\s+[A-Za-z0-9._-]{12,})\b", "[访问令牌已隐藏]", text)
        return text


def _normalize_whitespace(text: str) -> str:
    text = text.replace("\xa0", " ")
    text = re.sub(r"[ \t\r\f\v]+", " ", text)
    text = re.sub(r"\n\s*\n+", "\n", text)
    return text.strip()


firewall = SecurityFirewall()
