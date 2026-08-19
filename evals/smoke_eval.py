#!/usr/bin/env python3
import json
import os
import sys
import urllib.request


BASE = os.environ.get("MONDAY_BASE_URL", "http://127.0.0.1:8766")
EVAL_TOKEN = os.environ.get("MONDAY_EVAL_TOKEN", "local-eval")
CASES = [
    {"name": "time", "message": "现在几点", "expect": ["时间"]},
    {"name": "battery", "message": "电池电量", "expect": ["电量", "%"]},
    {"name": "system", "message": "电脑状态怎么样", "expect": ["Mac", "CPU", "内存"]},
    {"name": "memory", "message": "搜索颜色", "expect": ["颜色"]},
]


def request(path, body=None):
    data = json.dumps(body, ensure_ascii=False).encode() if body is not None else None
    req = urllib.request.Request(
        BASE + path,
        data=data,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {EVAL_TOKEN}"},
        method="POST" if body is not None else "GET",
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read() or b"{}")


def main():
    failed = 0
    for case in CASES:
        try:
            result = request("/api/chat", {"message": case["message"]})
            reply = result.get("reply", "")
            ok = all(keyword in reply for keyword in case["expect"])
            print(("PASS" if ok else "FAIL"), case["name"], reply[:80])
            if not ok:
                failed += 1
        except Exception as exc:
            print("ERROR", case["name"], exc)
            failed += 1
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
