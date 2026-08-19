#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/dist/MondayDesktop.app"
CONTENTS="$OUT/Contents"
RESOURCES="$CONTENTS/Resources/monday"

rm -rf "$OUT"
mkdir -p "$CONTENTS/MacOS" "$RESOURCES"

for item in .gitignore README.md LICENSE auth.py dev.py evals ios_app security.py server.py start.command static transfer.py scripts; do
  if [ -e "$ROOT/$item" ]; then
    cp -R "$ROOT/$item" "$RESOURCES/"
  fi
done

cp "$ROOT/mac_app/MondayDesktop/Info.plist" "$CONTENTS/Info.plist"
swiftc "$ROOT/mac_app/MondayDesktop/main.swift" -o "$CONTENTS/MacOS/MondayDesktop"
echo "已生成：$OUT"
