import AVFoundation
import Combine

@MainActor
final class SpeechOutputService: ObservableObject {
    @Published var enabled = true

    private let synthesizer = AVSpeechSynthesizer()

    func speak(_ text: String) {
        guard enabled else { return }
        stop()
        let utterance = AVSpeechUtterance(string: text)
        utterance.voice = AVSpeechSynthesisVoice(language: "zh-CN")
        utterance.rate = AVSpeechUtteranceDefaultSpeechRate
        utterance.pitchMultiplier = 1.0
        synthesizer.speak(utterance)
    }

    func stop() {
        synthesizer.stopSpeaking(at: .immediate)
    }

    func toggle() {
        enabled.toggle()
        if !enabled {
            stop()
        }
    }
}
