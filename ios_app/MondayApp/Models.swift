import Foundation

struct AuthStatus: Decodable {
    let setupRequired: Bool
    let authenticated: Bool
    let faceCount: Int
    let passwordCount: Int
}

struct TokenResponse: Decodable {
    let token: String
}

struct ChatMessage: Identifiable, Decodable {
    var id = UUID()
    let role: String
    let content: String

    enum CodingKeys: String, CodingKey {
        case role
        case content
    }

    init(role: String, content: String) {
        self.role = role
        self.content = content
    }
}

struct StateResponse: Decodable {
    let conversation: [ChatMessage]
}

struct ChatReply: Decodable {
    let reply: String
}

struct AgentCounts: Decodable {
    let pendingApprovals: Int
    let scheduledTasks: Int
    let backups: Int
    let integrations: Int
    let auditLog: Int
    let facts: Int
    let notes: Int
    let knowledge: Int
}

struct TaskPlan: Decodable {
    let title: String
    let steps: [String]
    let completedSteps: [Int]?
    let status: String?
}

struct AgentOverview: Decodable {
    let agentMode: String
    let autonomyLevel: String
    let taskPlan: TaskPlan?
    let counts: AgentCounts
}

struct ApprovalItem: Identifiable, Decodable {
    let id: String
    let actionType: String
    let target: String
    let reason: String?
    let status: String
}

struct ApprovalsResponse: Decodable {
    let approvals: [ApprovalItem]
}

struct MemorySearchResult: Decodable {
    let type: String
    let content: String
    let meta: String?
    let score: Double
}

struct MemorySearchResponse: Decodable {
    let query: String
    let count: Int
    let results: [MemorySearchResult]
}

struct ScheduledTaskItem: Identifiable, Decodable {
    let id: String
    let title: String
    let prompt: String
    let status: String
    let priority: String?
    let runAtIso: String?
}

struct ScheduledTasksResponse: Decodable {
    let scheduledTasks: [ScheduledTaskItem]
}

struct TransferFile: Identifiable, Decodable {
    let id: String
    let filename: String
    let size: Int
    let mime: String?
}

struct TransferListResponse: Decodable {
    let files: [TransferFile]
}

struct UploadPayload: Encodable {
    let filename: String
    let mime: String
    let dataBase64: String

    enum CodingKeys: String, CodingKey {
        case filename
        case mime
        case dataBase64 = "data_base64"
    }
}

struct UploadResponse: Decodable {
    let ok: Bool
    let file: TransferFile
}

struct EmptyResponse: Decodable {}

enum AppError: LocalizedError {
    case invalidURL
    case invalidResponse
    case server(String)

    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "服务器地址无效"
        case .invalidResponse:
            return "服务器返回无效数据"
        case let .server(message):
            return message
        }
    }
}
