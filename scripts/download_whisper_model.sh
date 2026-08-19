#!/bin/bash
set -e

MODEL="${1:-small}"
if [[ ! "$MODEL" =~ ^[a-z0-9.-]+$ ]]; then
  echo "模型名不合法，只支持 small/base/medium/large-v3 等名称。"
  exit 1
fi

export HF_ENDPOINT="${HF_ENDPOINT:-https://hf-mirror.com}"
echo "正在准备 faster-whisper 模型：$MODEL"
python3 - <<PY
from faster_whisper import WhisperModel
WhisperModel("$MODEL", device="cpu", compute_type="int8")
print("模型已就绪：$MODEL")
PY
