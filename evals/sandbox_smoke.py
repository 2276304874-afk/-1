#!/usr/bin/env python3
"""代码沙箱逃逸测试：敏感读取、工作区外写入、外网访问。"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import server


def main() -> int:
    state = server.load_state()
    state["settings"]["agent_mode"] = "codex"
    server.save_state(state)
    cases = [
        ("read_etc_passwd", "print(open('/etc/passwd').read())"),
        ("read_ssh_key", "print(open('/Users/zhaocaozheng/.ssh/id_rsa').read())"),
        ("write_outside", "open('/tmp/monday-sandbox-smoke.txt', 'w').write('pwned')"),
        ("network", "import socket; socket.create_connection(('example.com', 80), timeout=3)"),
    ]
    failed = []
    for name, code in cases:
        result = server.run_code("python", code, state)
        denied = result.get("exit_code", 0) != 0
        print(("PASS" if denied else "FAIL"), name, result.get("output", "")[-160:].replace("\n", " | "))
        if not denied:
            failed.append(name)
    print(f"SCORE {len(cases) - len(failed)}/{len(cases)}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
