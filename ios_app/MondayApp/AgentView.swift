import SwiftUI

struct AgentView: View {
    @ObservedObject var api: ApiClient
    @State private var overview: AgentOverview?
    @State private var approvals: [ApprovalItem] = []
    @State private var scheduledTasks: [ScheduledTaskItem] = []
    @State private var searchQuery = ""
    @State private var searchResults: [MemorySearchResult] = []
    @State private var errorMessage = ""
    @State private var loading = false

    var body: some View {
        NavigationView {
            List {
                if let plan = overview?.taskPlan {
                    Section("任务计划") {
                        Text(plan.title)
                            .font(.headline)
                        ForEach(Array(plan.steps.enumerated()), id: \.offset) { index, step in
                            HStack(alignment: .top) {
                                Image(systemName: plan.completedSteps?.contains(index) == true ? "checkmark.circle.fill" : "circle")
                                Text(step)
                            }
                        }
                    }
                }

                Section("审批队列") {
                    if approvals.isEmpty {
                        Text("暂无审批")
                            .foregroundStyle(.secondary)
                    } else {
                        ForEach(approvals) { item in
                            VStack(alignment: .leading) {
                                Text("\(item.actionType) · \(item.status)")
                                    .font(.subheadline)
                                Text(item.target)
                                    .foregroundStyle(.secondary)
                                if item.status == "pending" {
                                    HStack {
                                        Button("批准") {
                                            Task { await resolve(item.id, approved: true) }
                                        }
                                        Button("拒绝", role: .destructive) {
                                            Task { await resolve(item.id, approved: false) }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                Section("记忆检索") {
                    HStack {
                        TextField("搜索记忆", text: $searchQuery)
                        Button("搜索") {
                            Task { await search() }
                        }
                        .disabled(searchQuery.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                    }
                    ForEach(Array(searchResults.enumerated()), id: \.offset) { _, item in
                        VStack(alignment: .leading) {
                            Text(item.type)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                            Text(item.content)
                        }
                    }
                }

                Section("定时任务") {
                    if scheduledTasks.isEmpty {
                        Text("暂无定时任务")
                            .foregroundStyle(.secondary)
                    } else {
                        ForEach(scheduledTasks) { task in
                            VStack(alignment: .leading) {
                                Text("\(task.title) · \(task.status)")
                                    .font(.subheadline)
                                Text(task.prompt)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                    }
                }

                if let overview {
                    Section("状态") {
                        HStack { Text("Agent").foregroundStyle(.secondary); Spacer(); Text(overview.agentMode) }
                        HStack { Text("自主级别").foregroundStyle(.secondary); Spacer(); Text(overview.autonomyLevel) }
                        HStack { Text("待审批").foregroundStyle(.secondary); Spacer(); Text("\(overview.counts.pendingApprovals)") }
                        HStack { Text("记忆").foregroundStyle(.secondary); Spacer(); Text("\(overview.counts.facts) 事实 · \(overview.counts.notes) 笔记") }
                    }
                }

                if !errorMessage.isEmpty {
                    Section {
                        Text(errorMessage)
                            .foregroundStyle(.red)
                    }
                }
            }
            .navigationTitle("Agent")
            .overlay {
                if loading {
                    ProgressView()
                }
            }
            .task {
                await load()
            }
        }
    }

    private func load() async {
        loading = true
        errorMessage = ""
        do {
            overview = try await api.overview()
            approvals = try await api.approvals(status: "all").approvals
            scheduledTasks = try await api.scheduledTasks().scheduledTasks
        } catch {
            errorMessage = error.localizedDescription
        }
        loading = false
    }

    private func search() async {
        let query = searchQuery.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !query.isEmpty else { return }
        do {
            searchResults = try await api.memorySearch(query: query).results
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    private func resolve(_ id: String, approved: Bool) async {
        do {
            if approved {
                try await api.approveApproval(id: id)
            } else {
                try await api.rejectApproval(id: id)
            }
            await load()
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}
