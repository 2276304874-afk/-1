import SwiftUI

struct SettingsView: View {
    @ObservedObject var api: ApiClient
    @State private var errorMessage = ""
    @State private var testing = false
    @State private var testMessage = ""

    var body: some View {
        NavigationView {
            Form {
                Section("本地服务") {
                    TextField("http://192.168.31.159:8765", text: $api.baseURL)
                        .keyboardType(.URL)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                    Text("手机和电脑需要连接同一个 Wi-Fi。")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                    Button {
                        Task { await testConnection() }
                    } label: {
                        Label("测试连接", systemImage: "bolt.horizontal.circle")
                    }
                    .disabled(testing)

                    if !testMessage.isEmpty {
                        Text(testMessage)
                            .font(.footnote)
                            .foregroundStyle(.secondary)
                    }
                }

                Section {
                    Button("退出登录", role: .destructive) {
                        Task { await logout() }
                    }
                }

                if !errorMessage.isEmpty {
                    Section {
                        Text(errorMessage)
                            .foregroundStyle(.red)
                    }
                }
            }
            .navigationTitle("设置")
        }
    }

    private func logout() async {
        do {
            try await api.logout()
            api.token = ""
            KeychainHelper.deletePassword()
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    private func testConnection() async {
        testing = true
        testMessage = ""
        do {
            let status = try await api.authStatus()
            testMessage = status.setupRequired ? "连接成功，服务等待初始化。" : "连接成功。"
        } catch {
            testMessage = "连接失败：\(error.localizedDescription)"
        }
        testing = false
    }
}
