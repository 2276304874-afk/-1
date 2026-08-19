#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGE="$ROOT/dist/MondayInstaller"

bash "$ROOT/mac_app/build_desktop_app.sh"
bash "$ROOT/mac_app/build_menu_app.sh"

rm -rf "$STAGE"
mkdir -p "$STAGE"
cp -R "$ROOT/dist/MondayDesktop.app" "$STAGE/星期一.app"
cp -R "$ROOT/dist/MondayMenu.app" "$STAGE/星期一菜单.app"

rm -f "$ROOT/dist/MondayInstaller.dmg"
hdiutil create -volname MondayInstaller -srcfolder "$STAGE" \
  -ov -format UDZO "$ROOT/dist/MondayInstaller.dmg"

echo "已生成：$ROOT/dist/MondayInstaller.dmg"
