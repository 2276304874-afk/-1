import AVFoundation
import Combine
import Speech

@MainActor
final class SpeechService: NSObject, ObservableObject, SFSpeechRecognizerDelegate {
    @Published var isListening = false
    @Published var isAwake = false
    @Published var statusText = "语音尚未启动"
    @Published var partialText = ""

    var onCommand: ((String) -> Void)?

    private let audioEngine = AVAudioEngine()
    private var recognizer = SFSpeechRecognizer(locale: Locale(identifier: "zh-CN"))
    private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
    private var recognitionTask: SFSpeechRecognitionTask?
    private var isCommandMode = false
    private var detectedText = ""
    private var isRestarting = false
    private var restartCount = 0

    private let wakeWords = ["星期一", "周一", "贾维斯", "jarvis"]

    func startListening() {
        guard !isListening else { return }
        requestPermissionsAndStart()
    }

    func stopListening() {
        isRestarting = true
        restartCount = 0
        audioEngine.stop()
        audioEngine.inputNode.removeTap(onBus: 0)
        recognitionRequest?.endAudio()
        recognitionTask?.cancel()
        recognitionTask = nil
        recognitionRequest = nil
        isListening = false
        isAwake = false
        isCommandMode = false
        detectedText = ""
        statusText = "语音已停止"
        partialText = ""
    }

    func toggleListening() {
        if isListening {
            stopListening()
        } else {
            startListening()
        }
    }

    private func requestPermissionsAndStart() {
        SFSpeechRecognizer.requestAuthorization { [weak self] status in
            Task { @MainActor in
                guard let self else { return }
                guard status == .authorized else {
                    self.statusText = "没有语音识别权限，请在设置中开启。"
                    return
                }
                AVAudioSession.sharedInstance().requestRecordPermission { granted in
                    Task { @MainActor in
                        if granted {
                            self.startAudioSession()
                        } else {
                            self.statusText = "没有麦克风权限，请在设置中开启。"
                        }
                    }
                }
            }
        }
    }

    private func startAudioSession() {
        do {
            let session = AVAudioSession.sharedInstance()
            try session.setCategory(.record, mode: .measurement, options: .duckOthers)
            try session.setActive(true, options: .notifyOthersOnDeactivation)
            startRecognition()
        } catch {
            statusText = "音频启动失败：\(error.localizedDescription)"
        }
    }

    private func startRecognition() {
        isRestarting = false
        guard let recognizer, recognizer.isAvailable else {
            statusText = "语音识别暂时不可用"
            return
        }

        audioEngine.inputNode.removeTap(onBus: 0)
        recognitionTask?.cancel()
        recognitionTask = nil
        recognitionRequest = nil

        let request = SFSpeechAudioBufferRecognitionRequest()
        request.shouldReportPartialResults = true
        recognitionRequest = request

        let inputNode = audioEngine.inputNode
        let format = inputNode.outputFormat(forBus: 0)
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { [weak self] buffer, _ in
            self?.recognitionRequest?.append(buffer)
        }

        audioEngine.prepare()
        do {
            try audioEngine.start()
            isListening = true
            statusText = isCommandMode ? "我在听，请说指令" : "等待说“星期一”"
        } catch {
            statusText = "无法启动麦克风：\(error.localizedDescription)"
            return
        }

        recognitionTask = recognizer.recognitionTask(with: request) { [weak self] result, error in
            guard let self else { return }

            if let error {
                Task { @MainActor in
                    guard !self.isRestarting else { return }
                    self.statusText = "语音识别中断：\(error.localizedDescription)"
                    self.restartAfterError()
                }
                return
            }

            guard let result else { return }
            let text = result.bestTranscription.formattedString.trimmingCharacters(in: .whitespacesAndNewlines)
            Task { @MainActor in
                self.restartCount = 0
                self.handleRecognition(text: text, isFinal: result.isFinal)
            }
        }
    }

    private func handleRecognition(text: String, isFinal: Bool) {
        guard isListening else { return }
        detectedText = text
        partialText = text

        if isCommandMode {
            statusText = isFinal ? "正在处理" : "正在识别：\(text)"
            guard isFinal, !text.isEmpty else { return }
            let command = cleanCommand(text)
            stopRecognitionAndRestart()
            onCommand?(command)
            return
        }

        let lower = text.lowercased()
        if wakeWords.contains(where: { lower.contains($0) }) {
            isAwake = true
            statusText = "我在，请说"
            isCommandMode = true
            detectedText = ""
            partialText = ""
            restartRecognition()
        } else {
            statusText = "等待说“星期一”"
        }
    }

    private func cleanCommand(_ text: String) -> String {
        var command = text
        for word in wakeWords {
            command = command.replacingOccurrences(of: word, with: "", options: [.caseInsensitive, .diacriticInsensitive])
        }
        return command.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private func restartRecognition() {
        isRestarting = true
        restartCount += 1
        audioEngine.inputNode.removeTap(onBus: 0)
        recognitionTask?.cancel()
        recognitionTask = nil
        recognitionRequest = nil
        audioEngine.stop()
        audioEngine.reset()
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) { [weak self] in
            self?.startRecognition()
        }
    }

    private func stopRecognitionAndRestart() {
        isRestarting = true
        restartCount += 1
        audioEngine.inputNode.removeTap(onBus: 0)
        recognitionTask?.cancel()
        recognitionTask = nil
        recognitionRequest = nil
        audioEngine.stop()
        audioEngine.reset()
        isCommandMode = false
        isAwake = false
        detectedText = ""
        partialText = ""
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) { [weak self] in
            self?.startRecognition()
        }
    }

    private func restartAfterError() {
        guard isListening else { return }
        restartCount += 1
        if restartCount > 3 {
            isListening = false
            statusText = "语音识别多次中断，请检查网络后重新开始。"
            audioEngine.stop()
            audioEngine.inputNode.removeTap(onBus: 0)
            recognitionTask?.cancel()
            recognitionTask = nil
            recognitionRequest = nil
            return
        }
        isRestarting = true
        audioEngine.inputNode.removeTap(onBus: 0)
        recognitionTask?.cancel()
        recognitionTask = nil
        recognitionRequest = nil
        audioEngine.stop()
        audioEngine.reset()
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in
            self?.startRecognition()
        }
    }
}
