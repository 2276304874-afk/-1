# 星期一 iOS App

这是原生 SwiftUI iOS 客户端，连接当前电脑上的“星期一”本地服务。

## 当前能力

- 密码登录和首次初始化
- Face ID / Touch ID 解锁
- AI 对话
- 文件传输模式
- 设置本地服务器地址
- 服务器连接测试
- 登录后访问 PC 端共享的对话、记忆、知识库和传输文件

## 运行前提

1. 安装完整 Xcode，而不是只有 Command Line Tools。
2. 安装 XcodeGen：

```bash
brew install xcodegen
```

3. 在 `ios_app/` 目录生成 Xcode 工程：

```bash
cd ios_app
xcodegen generate
open MondayApp.xcodeproj
```

4. 在 Xcode 中设置你的 Apple Developer Team。
5. 选择 iPhone 真机运行。第一次启动会请求“本地网络”权限，需要允许。

## 服务器地址

默认连接：

```text
http://192.168.31.159:8765
```

如果电脑 IP 变化，可以在 App 登录页或设置页修改。

## 注意

本机目前只安装了 Xcode Command Line Tools，没有完整 Xcode，所以这里只能完成工程源码和 Swift 语法检查，不能真机编译。安装完整 Xcode 后按上面步骤即可构建。
