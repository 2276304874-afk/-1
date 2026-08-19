import SwiftUI

struct RootView: View {
    @StateObject private var api = ApiClient()
    @State private var status: AuthStatus?
    @State private var loading = true

    private var isAuthenticated: Bool {
        !api.token.isEmpty
    }

    var body: some View {
        Group {
            if loading {
                ProgressView("正在连接星期一")
            } else if let status {
                if status.setupRequired {
                    SetupView(api: api)
                } else if isAuthenticated {
                    MainView(api: api)
                } else {
                    LoginView(api: api)
                }
            } else {
                LoginView(api: api)
            }
        }
        .task {
            await refreshStatus()
        }
    }

    private func refreshStatus() async {
        loading = true
        do {
            status = try await api.authStatus()
            if status?.authenticated == false && !api.token.isEmpty {
                api.token = ""
            }
        } catch {
            status = nil
        }
        loading = false
    }
}

struct MainView: View {
    @ObservedObject var api: ApiClient

    var body: some View {
        TabView {
            ChatView(api: api)
                .tabItem {
                    Label("对话", systemImage: "bubble.left.and.bubble.right")
                }
            AgentView(api: api)
                .tabItem {
                    Label("Agent", systemImage: "sparkles")
                }
            TransferView(api: api)
                .tabItem {
                    Label("传输", systemImage: "arrow.left.arrow.right")
                }
            SettingsView(api: api)
                .tabItem {
                    Label("设置", systemImage: "gearshape")
                }
        }
    }
}
