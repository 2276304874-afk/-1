from __future__ import annotations

import hashlib
import hmac
import json
import secrets
import threading
import time
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple


DATA_DIR = Path(__file__).resolve().parent / "data"
AUTH_PATH = DATA_DIR / "auth.json"
AUTH_LOCK = threading.RLock()


def default_auth_data() -> Dict[str, Any]:
    """身份数据初始结构：密码、人脸、会话 token。"""
    return {"passwords": [], "faces": [], "sessions": {}}


def load_auth() -> Dict[str, Any]:
    with AUTH_LOCK:
        if not AUTH_PATH.exists():
            DATA_DIR.mkdir(parents=True, exist_ok=True)
            auth = default_auth_data()
            save_auth(auth)
            return auth
        try:
            data = json.loads(AUTH_PATH.read_text(encoding="utf-8"))
            base = default_auth_data()
            base.update(data)
            return base
        except Exception:
            return default_auth_data()


def save_auth(auth: Dict[str, Any]) -> None:
    with AUTH_LOCK:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        tmp = AUTH_PATH.with_suffix(".tmp")
        tmp.write_text(json.dumps(auth, ensure_ascii=False, indent=2), encoding="utf-8")
        tmp.replace(AUTH_PATH)


def hash_password(password: str, salt: Optional[bytes] = None) -> Dict[str, str]:
    """PBKDF2 加盐哈希密码，不保存明文。"""
    salt = salt or secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 220_000)
    return {
        "salt": salt.hex(),
        "hash": digest.hex(),
        "iterations": 220_000,
    }


def verify_password(password: str, record: Dict[str, Any]) -> bool:
    try:
        salt = bytes.fromhex(record.get("salt", ""))
        expected = bytes.fromhex(record.get("hash", ""))
        actual = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 220_000)
        return hmac.compare_digest(actual, expected)
    except Exception:
        return False


def face_distance(left: List[float], right: List[float]) -> float:
    if not left or len(left) != len(right):
        return 1e9
    return sum((a - b) * (a - b) for a, b in zip(left, right)) ** 0.5


def create_session(auth: Dict[str, Any]) -> str:
    """创建一个带过期时间的本地登录会话。"""
    token = secrets.token_urlsafe(32)
    now = time.time()
    auth["sessions"][token] = {
        "created_at": now,
        "expires_at": now + 12 * 3600,
    }
    auth["sessions"] = {
        key: value
        for key, value in auth["sessions"].items()
        if value.get("expires_at", 0) > now
    }
    save_auth(auth)
    return token


def is_valid_session(auth: Dict[str, Any], token: str) -> bool:
    if not token:
        return False
    session = auth.get("sessions", {}).get(token)
    if not session:
        return False
    if session.get("expires_at", 0) < time.time():
        auth["sessions"].pop(token, None)
        save_auth(auth)
        return False
    return True


def destroy_session(auth: Dict[str, Any], token: str) -> None:
    auth.get("sessions", {}).pop(token, None)
    save_auth(auth)


def has_credentials(auth: Dict[str, Any]) -> bool:
    return bool(auth.get("passwords") or auth.get("faces"))


def add_password(auth: Dict[str, Any], name: str, password: str) -> Dict[str, Any]:
    record = {
        "id": secrets.token_hex(8),
        "name": name.strip()[:40] or "密码访问",
        **hash_password(password),
        "created_at": time.time(),
    }
    auth.setdefault("passwords", []).append(record)
    save_auth(auth)
    return {
        "id": record["id"],
        "name": record["name"],
        "created_at": record["created_at"],
    }


def remove_password(auth: Dict[str, Any], password_id: str) -> bool:
    before = len(auth.get("passwords", []))
    auth["passwords"] = [item for item in auth.get("passwords", []) if item.get("id") != password_id]
    changed = len(auth["passwords"]) != before
    if changed:
        save_auth(auth)
    return changed


def add_face(auth: Dict[str, Any], name: str, descriptor: List[float]) -> Dict[str, Any]:
    record = {
        "id": secrets.token_hex(8),
        "name": name.strip()[:40] or "人脸访问",
        "descriptor": [float(value) for value in descriptor],
        "created_at": time.time(),
    }
    auth.setdefault("faces", []).append(record)
    save_auth(auth)
    return {
        "id": record["id"],
        "name": record["name"],
        "created_at": record["created_at"],
    }


def remove_face(auth: Dict[str, Any], face_id: str) -> bool:
    before = len(auth.get("faces", []))
    auth["faces"] = [item for item in auth.get("faces", []) if item.get("id") != face_id]
    changed = len(auth["faces"]) != before
    if changed:
        save_auth(auth)
    return changed


def verify_face(
    auth: Dict[str, Any],
    descriptor: List[float],
    threshold: float = 0.60,
) -> Optional[Dict[str, Any]]:
    best: Optional[Tuple[float, Dict[str, Any]]] = None
    for item in auth.get("faces", []):
        distance = face_distance(item.get("descriptor", []), descriptor)
        if distance <= threshold and (best is None or distance < best[0]):
            best = (distance, item)
    if not best:
        return None
    return {
        "id": best[1].get("id"),
        "name": best[1].get("name"),
        "distance": best[0],
    }


def public_auth_status(auth: Dict[str, Any], token: str) -> Dict[str, Any]:
    authenticated = is_valid_session(auth, token)
    return {
        "setup_required": not has_credentials(auth),
        "authenticated": authenticated,
        "face_count": len(auth.get("faces", [])),
        "password_count": len(auth.get("passwords", [])),
    }
