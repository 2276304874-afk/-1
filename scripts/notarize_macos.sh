#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$APPLE_DEVELOPER_ID" ] || [ -z "$APPLE_TEAM_ID" ] || [ -z "$APPLE_ID" ] || [ -z "$APPLE_APP_SPECIFIC_PASSWORD" ]; then
  echo "缺少签名/公证环境变量。"
  echo "需要：APPLE_DEVELOPER_ID、APPLE_TEAM_ID、APPLE_ID、APPLE_APP_SPECIFIC_PASSWORD"
  exit 1
fi

echo "==> 签名"
codesign --force --deep --options runtime --sign "$APPLE_DEVELOPER_ID" \
  "$ROOT/dist/MondayAssistant.app"
codesign --force --deep --options runtime --sign "$APPLE_DEVELOPER_ID" \
  "$ROOT/dist/MondayMenu.app"

echo "==> 重新生成 DMG"
rm -f "$ROOT/dist/MondayAssistant.dmg"
hdiutil create -volname MondayAssistant -srcfolder "$ROOT/dist/MondayAssistant.app" \
  -ov -format UDZO "$ROOT/dist/MondayAssistant.dmg"

echo "==> 提交公证"
xcrun notarytool submit "$ROOT/dist/MondayAssistant.dmg" \
  --apple-id "$APPLE_ID" \
  --password "$APPLE_APP_SPECIFIC_PASSWORD" \
  --team-id "$APPLE_TEAM_ID" \
  --wait

echo "==> 装订"
xcrun stapler staple "$ROOT/dist/MondayAssistant.dmg"

echo "完成：$ROOT/dist/MondayAssistant.dmg"
