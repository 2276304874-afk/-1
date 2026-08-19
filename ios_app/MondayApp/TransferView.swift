import SwiftUI
import UniformTypeIdentifiers
import UIKit

struct TransferView: View {
    @ObservedObject var api: ApiClient
    @State private var files: [TransferFile] = []
    @State private var showingImporter = false
    @State private var errorMessage = ""
    @State private var busy = false
    @State private var shareItem: ShareItem?

    var body: some View {
        NavigationView {
            List {
                Section {
                    Button {
                        showingImporter = true
                    } label: {
                        Label("上传文件", systemImage: "plus.circle.fill")
                    }
                }

                Section("传输文件") {
                    if files.isEmpty {
                        Text("还没有文件。")
                            .foregroundStyle(.secondary)
                    } else {
                        ForEach(files) { file in
                            HStack {
                                VStack(alignment: .leading) {
                                    Text(file.filename)
                                        .lineLimit(1)
                                    Text(Self.formatBytes(file.size))
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                                Spacer()
                                Button("下载") {
                                    Task { await download(file) }
                                }
                                Button("删除", role: .destructive) {
                                    Task { await delete(file) }
                                }
                            }
                        }
                    }
                }

                if !errorMessage.isEmpty {
                    Section {
                        Text(errorMessage)
                            .foregroundStyle(.red)
                    }
                }
            }
            .navigationTitle("文件传输助手")
            .navigationBarItems(trailing: Button {
                Task { await load() }
            } label: {
                Image(systemName: "arrow.clockwise")
            })
            .fileImporter(
                isPresented: $showingImporter,
                allowedContentTypes: [.item],
                allowsMultipleSelection: true
            ) { result in
                Task {
                    do {
                        let urls = try result.get()
                        for url in urls {
                            _ = try await api.uploadTransfer(fileURL: url)
                        }
                        await load()
                    } catch {
                        errorMessage = error.localizedDescription
                    }
                }
            }
            .sheet(item: $shareItem) { item in
                ShareSheet(items: [item.url])
            }
            .task {
                await load()
            }
            .overlay {
                if busy {
                    ProgressView()
                }
            }
        }
    }

    private func load() async {
        do {
            files = try await api.transferFiles()
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    private func download(_ file: TransferFile) async {
        busy = true
        do {
            let url = try await api.downloadTransfer(fileID: file.id, filename: file.filename)
            shareItem = ShareItem(url: url)
        } catch {
            errorMessage = error.localizedDescription
        }
        busy = false
    }

    private func delete(_ file: TransferFile) async {
        do {
            try await api.deleteTransfer(id: file.id)
            await load()
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    private static func formatBytes(_ value: Int) -> String {
        ByteCountFormatter.string(fromByteCount: Int64(value), countStyle: .file)
    }
}

struct ShareItem: Identifiable {
    let id = UUID()
    let url: URL
}

struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]

    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: items, applicationActivities: nil)
    }

    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}
