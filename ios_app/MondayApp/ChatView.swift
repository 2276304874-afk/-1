import SwiftUI

struct ChatView: View {
    @ObservedObject var api: ApiClient
    @StateObject private var speech = SpeechService()
    @StateObject private var speechOutput = SpeechOutputService()
    @State private var messages: [ChatMessage] = []
    @State private var input = ""
    @State private var sending = false
    @State private var errorMessage = ""

    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 14) {
                        ForEach(messages) { message in
                            ChatBubble(message: message)
                        }
                    }
                    .padding()
                }

                if !errorMessage.isEmpty {
                    Text(errorMessage)
                        .font(.footnote)
                        .foregroundStyle(.red)
                        .padding(.horizontal)
                }

                Text(speech.statusText)
                    .font(.footnote)
                    .foregroundStyle(speech.isListening ? Color.secondary : Color.orange)
                    .padding(.horizontal)

                HStack(spacing: 10) {
                    Button {
                        speech.toggleListening()
                    } label: {
                        Image(systemName: speech.isListening ? "waveform.circle.fill" : "mic.circle")
                            .font(.title2)
                    }
                    .disabled(sending)

                    TextField("和星期一说点什么", text: $input)
                        .textFieldStyle(.roundedBorder)

                    Button {
                        Task { await send() }
                    } label: {
                        Image(systemName: "arrow.up.circle.fill")
                            .font(.title2)
                    }
                    .disabled(input.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || sending)
                }
                .padding()
            }
            .navigationTitle("星期一")
            .navigationBarTitleDisplayMode(.inline)
            .navigationBarItems(trailing: HStack(spacing: 14) {
                Button {
                    speechOutput.toggle()
                } label: {
                    Image(systemName: speechOutput.enabled ? "speaker.wave.2.fill" : "speaker.slash.fill")
                }
                Button {
                    Task { await load() }
                } label: {
                    Image(systemName: "arrow.clockwise")
                }
            })
            .navigationBarTitleDisplayMode(.inline)
            .overlay {
                if sending {
                    ProgressView()
                }
            }
            .task {
                speech.onCommand = { text in
                    Task { await send(text) }
                }
                speech.startListening()
                await load()
            }
            .onDisappear {
                speech.stopListening()
                speechOutput.stop()
            }
        }
    }

    private func load() async {
        do {
            let state = try await api.state()
            messages = state.conversation
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    private func send(_ message: String? = nil) async {
        let text = (message ?? input).trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty else { return }
        input = ""
        sending = true
        errorMessage = ""
        messages.append(ChatMessage(role: "user", content: text))
        do {
            let reply = try await api.chat(message: text)
            messages.append(ChatMessage(role: "assistant", content: reply.reply))
            speechOutput.speak(reply.reply)
            _ = try await api.state()
        } catch {
            errorMessage = error.localizedDescription
        }
        sending = false
    }
}

struct ChatBubble: View {
    let message: ChatMessage

    var body: some View {
        HStack {
            if message.role == "user" {
                Spacer(minLength: 40)
            }
            Text(message.content)
                .padding(.horizontal, 12)
                .padding(.vertical, 9)
                .background(message.role == "user" ? Color.cyan.opacity(0.18) : Color.gray.opacity(0.12))
                .clipShape(RoundedRectangle(cornerRadius: 10))
            if message.role != "user" {
                Spacer(minLength: 40)
            }
        }
    }
}
