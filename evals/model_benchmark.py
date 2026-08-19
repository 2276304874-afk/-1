#!/usr/bin/env python3
"""本地模型简单基准：用“现在几点”测各模型响应延迟和成功率。"""

import os
import sys
import time
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import server


def main() -> int:
    base = os.environ.get("OLLAMA_URL", server.OLLAMA_URL)
    models = server.ollama_models()
    candidates = [name for name in models if "embed" not in name]
    results = []
    for model in candidates:
        payload = {
            "model": model,
            "messages": [{"role": "user", "content": "现在几点，请简短回答。"}],
            "stream": False,
            "options": {"temperature": 0.1, "num_ctx": 4096},
        }
        started = time.time()
        try:
            response = httpx.post(f"{base}/api/chat", json=payload, timeout=90)
            response.raise_for_status()
            text = server.message_text(response.json().get("message") or {})
            ok = bool(text)
            results.append({"model": model, "ok": ok, "seconds": round(time.time() - started, 2), "reply": text[:80]})
        except Exception as exc:
            results.append({"model": model, "ok": False, "seconds": round(time.time() - started, 2), "reply": str(exc)[:80]})
        print(("PASS" if results[-1]["ok"] else "FAIL"), results[-1]["model"], results[-1]["seconds"], "s")

    ok_models = [item for item in results if item["ok"]]
    if ok_models:
        best = min(ok_models, key=lambda item: item["seconds"])
        print(f"推荐：{best['model']}（{best['seconds']}s）")
        return 0
    print("没有可用的本地推理模型")
    return 1


if __name__ == "__main__":
    sys.exit(main())
