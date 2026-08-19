#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "==> API 冒烟"
python3 evals/api_smoke.py

echo "==> 安全冒烟"
python3 evals/security_smoke.py

echo "==> 沙箱逃逸"
python3 evals/sandbox_smoke.py

echo "==> 多步 Agent"
python3 evals/codex_task_smoke.py

echo "全部评测通过"
