#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/dist/MondayMenu.app"

rm -rf "$OUT"
mkdir -p "$OUT/Contents/MacOS"
cp "$ROOT/mac_app/MondayMenu/Info.plist" "$OUT/Contents/Info.plist"
swiftc "$ROOT/mac_app/MondayMenu/main.swift" -o "$OUT/Contents/MacOS/MondayMenu"
echo "已生成：$OUT"
