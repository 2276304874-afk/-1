#!/usr/bin/env python3
import json
import os
import sys
import urllib.request


BASE = os.environ.get("MONDAY_BASE_URL", "http://127.0.0.1:8766")
EVAL_TOKEN = os.environ.get("MONDAY_EVAL_TOKEN", "local-eval")
CASES = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "cases.json"), encoding="utf-8"))


def request(path, body):
    data = json.dumps(body, ensure_ascii=False).encode()
    req = urllib.request.Request(
        BASE + path,
        data=data,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {EVAL_TOKEN}"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as response:
        return json.loads(response.read() or b"{}")


def main():
    passed = 0
    for case in CASES:
        try:
            result = request("/api/chat", {"message": case["message"]})
            reply = result.get("reply", "")
            tools = result.get("tool_calls", [])
            ok = True
            if "expect_tool" in case:
                ok = case["expect_tool"] in tools
            if "expect_any" in case:
                ok = ok and any(word in reply for word in case["expect_any"])
            print(("PASS" if ok else "FAIL"), case["name"], reply[:90].replace("\n", " "))
            passed += int(ok)
        except Exception as exc:
            print("ERROR", case["name"], exc)
    print(f"SCORE {passed}/{len(CASES)}")
    sys.exit(0 if passed == len(CASES) else 1)


if __name__ == "__main__":
    main()
