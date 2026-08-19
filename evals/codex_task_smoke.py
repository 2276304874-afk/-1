#!/usr/bin/env python3
"""多步 Agent 冒烟测试：验证模型能连续调用只读工具完成任务。"""

import os
import sys
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from auth import create_session, destroy_session, load_auth


BASE = os.environ.get("MONDAY_BASE_URL", "http://127.0.0.1:8766")
CASES = [
    {"name": "list_workspaces", "message": "列出所有隔离工作区", "expect_tool": "list_workspaces", "expect_any": []},
    {"name": "read_readme", "message": "读取 /Users/zhaocaozheng/Documents/星期一/README.md 并用一句话总结", "expect_tool": "read_text_file", "expect_any": ["README", "星期一"]},
    {"name": "get_time", "message": "现在几点，请简短回答", "expect_tool": "get_time", "expect_any": ["时间", "星期"]},
]


def main() -> int:
    auth = load_auth()
    token = create_session(auth)
    failed = 0
    try:
        for case in CASES:
            payload = {"message": case["message"]}
            req = urllib.request.Request(
                BASE + "/api/chat",
                data=__import__("json").dumps(payload).encode(),
                headers={"Content-Type": "application/json", "Authorization": f"Bearer {token}"},
                method="POST",
            )
            try:
                with urllib.request.urlopen(req, timeout=120) as response:
                    result = __import__("json").loads(response.read() or b"{}")
                tools = result.get("tool_calls", [])
                reply = result.get("reply", "")
                ok = case["expect_tool"] in tools
                if case["expect_any"]:
                    ok = ok and any(word in reply for word in case["expect_any"])
                print(("PASS" if ok else "FAIL"), case["name"], tools, reply[:80].replace("\n", " "))
                failed += int(not ok)
            except Exception as exc:
                print("ERROR", case["name"], exc)
                failed += 1
    finally:
        destroy_session(load_auth(), token)
    print(f"SCORE {len(CASES) - failed}/{len(CASES)}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
