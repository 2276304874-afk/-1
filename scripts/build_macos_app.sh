#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/dist/MondayAssistant.app"
CONTENTS="$OUT/Contents"
RESOURCES="$CONTENTS/Resources/monday"

rm -rf "$OUT"
mkdir -p "$CONTENTS/MacOS" "$RESOURCES"

# 只复制运行所需的项目文件，不复制 data/.git/dist。
for item in .gitignore README.md LICENSE auth.py dev.py evals ios_app security.py server.py start.command static transfer.py scripts; do
  if [ -e "$ROOT/$item" ]; then
    cp -R "$ROOT/$item" "$RESOURCES/"
  fi
done

cat > "$CONTENTS/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleExecutable</key>
  <string>MondayAssistant</string>
  <key>CFBundleIdentifier</key>
  <string>com.monday.assistant.app</string>
  <key>CFBundleName</key>
  <string>星期一</string>
  <key>CFBundleDisplayName</key>
  <string>星期一</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>LSMinimumSystemVersion</key>
  <string>13.0</string>
</dict>
</plist>
PLIST

cat > "$CONTENTS/MacOS/MondayAssistant" <<'LAUNCHER'
#!/bin/bash
ROOT="$(cd "$(dirname "$0")/../../Resources/monday" && pwd)"
if [ ! -f "$ROOT/server.py" ]; then
  osascript -e 'display alert "星期一资源缺失" message "请重新打包 MondayAssistant.app"'
  exit 1
fi
open -a Terminal "$ROOT/start.command"
LAUNCHER
chmod +x "$CONTENTS/MacOS/MondayAssistant"

echo "已生成：$OUT"
echo "如需 DMG：hdiutil create -volname MondayAssistant -srcfolder $OUT $ROOT/dist/MondayAssistant.dmg"
