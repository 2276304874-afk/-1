import Foundation

@MainActor
final class ApiClient: ObservableObject {
    @Published var token: String {
        didSet {
            UserDefaults.standard.set(token, forKey: "monday_token")
        }
    }

    @Published var baseURL: String {
        didSet {
            let trimmed = baseURL.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
            UserDefaults.standard.set(trimmed, forKey: "monday_server_url")
        }
    }

    private let session: URLSession
    private let decoder: JSONDecoder
    private let encoder: JSONEncoder

    init() {
        self.token = UserDefaults.standard.string(forKey: "monday_token") ?? ""
        let storedURL = UserDefaults.standard.string(forKey: "monday_server_url") ?? "http://192.168.31.159:8765"
        self.baseURL = storedURL.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        self.session = URLSession.shared
        self.decoder = JSONDecoder()
        self.decoder.keyDecodingStrategy = .convertFromSnakeCase
        self.encoder = JSONEncoder()
        self.encoder.keyEncodingStrategy = .convertToSnakeCase
    }

    func authStatus() async throws -> AuthStatus {
        try await get(path: "/api/auth/status")
    }

    func setup(password: String) async throws -> TokenResponse {
        let body: [String: String] = [
            "password": password,
            "password_name": "主密码"
        ]
        return try await post(path: "/api/auth/setup", body: body)
    }

    func login(password: String) async throws -> TokenResponse {
        try await post(path: "/api/auth/password", body: ["password": password])
    }

    func logout() async throws {
        _ = try await request(path: "/api/auth/logout", method: "POST", body: Data())
    }

    func state() async throws -> StateResponse {
        try await get(path: "/api/state")
    }

    func overview() async throws -> AgentOverview {
        try await get(path: "/api/overview")
    }

    func approvals(status: String = "all") async throws -> ApprovalsResponse {
        try await get(path: "/api/approvals?status=\(status)")
    }

    func approveApproval(id: String) async throws {
        _ = try await post(path: "/api/approvals/approve", body: ["id": id]) as EmptyResponse
    }

    func rejectApproval(id: String) async throws {
        _ = try await post(path: "/api/approvals/reject", body: ["id": id]) as EmptyResponse
    }

    func memorySearch(query: String) async throws -> MemorySearchResponse {
        let encoded = query.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""
        return try await get(path: "/api/search?q=\(encoded)")
    }

    func scheduledTasks() async throws -> ScheduledTasksResponse {
        try await get(path: "/api/scheduled-tasks")
    }

    func chat(message: String) async throws -> ChatReply {
        try await post(path: "/api/chat", body: ["message": message])
    }

    func transferFiles() async throws -> [TransferFile] {
        let response: TransferListResponse = try await get(path: "/api/transfer/list")
        return response.files
    }

    func uploadTransfer(fileURL: URL) async throws -> TransferFile {
        let data = try Data(contentsOf: fileURL)
        let payload = UploadPayload(
            filename: fileURL.lastPathComponent,
            mime: mimeType(for: fileURL),
            dataBase64: data.base64EncodedString()
        )
        let response: UploadResponse = try await post(path: "/api/transfer/upload", body: payload)
        return response.file
    }

    func deleteTransfer(id: String) async throws {
        _ = try await post(path: "/api/transfer/delete", body: ["id": id]) as EmptyResponse
    }

    func downloadTransfer(fileID: String, filename: String) async throws -> URL {
        let data = try await request(path: "/api/transfer/download/\(fileID)")
        let url = FileManager.default.temporaryDirectory.appendingPathComponent(filename)
        try data.write(to: url)
        return url
    }

    private func get<T: Decodable>(path: String) async throws -> T {
        let data = try await request(path: path)
        return try decoder.decode(T.self, from: data)
    }

    private func post<T: Decodable, Body: Encodable>(path: String, body: Body) async throws -> T {
        let data = try encoder.encode(body)
        let responseData = try await request(path: path, method: "POST", body: data)
        return try decoder.decode(T.self, from: responseData)
    }

    private func request(path: String, method: String = "GET", body: Data? = nil) async throws -> Data {
        guard let url = URL(string: baseURL + path) else {
            throw AppError.invalidURL
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        if !token.isEmpty {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        request.httpBody = body

        let (data, response) = try await session.data(for: request)
        if let http = response as? HTTPURLResponse,
           !(200 ..< 300).contains(http.statusCode) {
            if let payload = try? decoder.decode(ServerErrorResponse.self, from: data) {
                throw AppError.server(payload.error)
            }
            throw AppError.server("请求失败：\(http.statusCode)")
        }
        return data
    }

    private func mimeType(for url: URL) -> String {
        switch url.pathExtension.lowercased() {
        case "txt": return "text/plain"
        case "jpg", "jpeg": return "image/jpeg"
        case "png": return "image/png"
        case "pdf": return "application/pdf"
        case "json": return "application/json"
        case "mp4": return "video/mp4"
        case "mov": return "video/quicktime"
        case "zip": return "application/zip"
        default: return "application/octet-stream"
        }
    }
}

private struct ServerErrorResponse: Decodable {
    let error: String
}
