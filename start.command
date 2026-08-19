#!/bin/zsh
set -u

cd "$(dirname "$0")" || exit 1

export MONDAY_PORT="${MONDAY_PORT:-8766}"
export MONDAY_HOST="${MONDAY_HOST:-127.0.0.1}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "错误：没有找到 python3。"
  exit 1
fi

if ! python3 -c 'import httpx, lxml, selenium, jieba, openpyxl, pptx, docx, PIL' >/dev/null 2>&1; then
  echo "正在安装/检查 Python 依赖..."
  python3 -m pip install -q httpx lxml selenium jieba openpyxl python-pptx python-docx Pillow
fi

echo "正在启动星期一..."
echo "本地地址：http://${MONDAY_HOST}:${MONDAY_PORT}"
echo "日志文件：$(pwd)/data/logs/server.log"
echo "按 Ctrl+C 停止。"
echo

exec python3 server.py
