import SwiftUI

struct LoginView: View {
    @ObservedObject var api: ApiClient
    @State private var password = ""
    @State private var errorMessage = ""
    @State private var working = false
    @State private var biometricsAvailable = false

    var body: some View {
        NavigationView {
            Form {
                Section("服务器") {
                    TextField("http://192.168.31.159:8765", text: $api.baseURL)
                        .keyboardType(.URL)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                }

                Section("访问验证") {
                    SecureField("密码", text: $password)
                    Button("进入星期一") {
                        Task { await login() }
                    }
                    .disabled(password.isEmpty || working)

                    if biometricsAvailable {
                        Button {
                            Task { await unlockWithBiometrics() }
                        } label: {
                            Label("使用\(BiometricAuth.biometricName())解锁", systemImage: "faceid")
                        }
                        .disabled(working)
                    }
                }

                if !errorMessage.isEmpty {
                    Section {
                        Text(errorMessage)
                            .foregroundStyle(.red)
                    }
                }
            }
            .navigationTitle("星期一")
            .overlay {
                if working {
                    ProgressView()
                }
            }
            .task {
                biometricsAvailable = BiometricAuth.canUseBiometrics()
            }
        }
    }

    private func login() async {
        working = true
        errorMessage = ""
        do {
            let response = try await api.login(password: password)
            api.token = response.token
            KeychainHelper.save(password: password)
            password = ""
        } catch {
            errorMessage = error.localizedDescription
        }
        working = false
    }

    private func unlockWithBiometrics() async {
        working = true
        errorMessage = ""
        defer { working = false }
        do {
            let authenticated = try await BiometricAuth.authenticate(reason: "解锁星期一")
            guard authenticated else { return }
            guard let savedPassword = KeychainHelper.readPassword() else {
                errorMessage = "还没有保存过密码，请先使用密码登录一次。"
                return
            }
            let response = try await api.login(password: savedPassword)
            api.token = response.token
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

struct SetupView: View {
    @ObservedObject var api: ApiClient
    @State private var password = ""
    @State private var errorMessage = ""
    @State private var working = false

    var body: some View {
        NavigationView {
            Form {
                Section("第一次使用") {
                    Text("请设置一个访问密码。人脸可以后续在电脑或网页端继续添加。")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                    SecureField("访问密码", text: $password)
                    Button("保存并进入") {
                        Task { await setup() }
                    }
                    .disabled(password.count < 4 || working)
                }

                if !errorMessage.isEmpty {
                    Section {
                        Text(errorMessage)
                            .foregroundStyle(.red)
                    }
                }
            }
            .navigationTitle("初始化")
        }
    }

    private func setup() async {
        working = true
        errorMessage = ""
        do {
            let response = try await api.setup(password: password)
            api.token = response.token
            KeychainHelper.save(password: password)
        } catch {
            errorMessage = error.localizedDescription
        }
        working = false
    }
}
