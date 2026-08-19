#!/usr/bin/env python3
import os
import subprocess
import sys
import time
from pathlib import Path


WATCH_FILES = [
    Path("server.py"),
    Path("auth.py"),
    Path("security.py"),
    Path("transfer.py"),
]
WATCH_MTIMES = {str(path): path.stat().st_mtime for path in WATCH_FILES if path.exists()}
PORT = os.environ.get("MONDAY_PORT", "8766")


def start() -> subprocess.Popen:
    return subprocess.Popen([sys.executable, "server.py"], env={**os.environ, "MONDAY_PORT": PORT})


def main() -> None:
    process = start()
    try:
        while True:
            time.sleep(1)
            changed = False
            for path in WATCH_FILES:
                if not path.exists():
                    continue
                mtime = path.stat().st_mtime
                if WATCH_MTIMES.get(str(path)) != mtime:
                    WATCH_MTIMES[str(path)] = mtime
                    changed = True
            if changed:
                print("检测到文件变化，正在重启星期一...")
                process.terminate()
                process.wait(timeout=5)
                process = start()
    except KeyboardInterrupt:
        process.terminate()
        process.wait(timeout=5)


if __name__ == "__main__":
    main()
