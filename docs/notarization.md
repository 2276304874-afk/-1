# macOS 签名与公证

当前 `dist/MondayAssistant.app` 和 `dist/MondayMenu.app` 可本地运行，但未经 Apple 签名和公证，首次打开可能被 Gatekeeper 拦截。

## 1. 准备 Apple 开发者资料

需要：

- Apple Developer 账号
- Developer ID Application 证书
- Team ID
- Apple ID
- App 专用密码

## 2. 打包

```bash
bash scripts/build_macos_app.sh
bash mac_app/build_menu_app.sh
```

## 3. 签名和公证

```bash
export APPLE_DEVELOPER_ID="Developer ID Application: Your Name (TEAMID)"
export APPLE_TEAM_ID="TEAMID"
export APPLE_ID="you@example.com"
export APPLE_APP_SPECIFIC_PASSWORD="xxxx-xxxx-xxxx-xxxx"

bash scripts/notarize_macos.sh
```

脚本会：

1. 使用 runtime 选项签名两个 App；
2. 重新生成 DMG；
3. 提交给 Apple 公证；
4. 等待公证结果；
5. 把 stapler 凭证装订到 DMG。

## 4. 分发

完成后的文件：

```text
dist/MondayAssistant.dmg
```

未签名版本请勿直接宣传为“已上架”；测试机可用右键“打开”绕过一次 Gatekeeper。
