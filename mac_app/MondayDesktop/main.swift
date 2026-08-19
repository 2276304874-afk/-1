import AppKit
import WebKit

final class AppDelegate: NSObject, NSApplicationDelegate {
    private var window: NSWindow!
    private var webView: WKWebView!
    private var serverProcess: Process?

    func applicationDidFinishLaunching(_ notification: Notification) {
        startServerIfNeeded()

        let configuration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: configuration)

        window = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 1280, height: 820),
            styleMask: [.titled, .closable, .miniaturizable, .resizable],
            backing: .buffered,
            defer: false
        )
        window.title = "星期一"
        window.setFrameAutosaveName("MondayMainWindow")
        window.contentView = webView
        window.center()
        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)

        loadWithRetry()
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        true
    }

    private func serverURL() -> URL {
        URL(string: "http://127.0.0.1:8766")!
    }

    private func startServerIfNeeded() {
        if isServerReachable() { return }
        guard let resources = Bundle.main.resourceURL?.appendingPathComponent("monday") else { return }
        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/usr/bin/python3")
        process.arguments = ["server.py"]
        process.currentDirectoryURL = resources
        var environment = ProcessInfo.processInfo.environment
        environment["MONDAY_HOST"] = "127.0.0.1"
        environment["MONDAY_PORT"] = "8766"
        process.environment = environment
        process.terminationHandler = { _ in }
        try? process.run()
        serverProcess = process
    }

    private func loadWithRetry() {
        var attempts = 0
        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { timer in
            attempts += 1
            if self.isServerReachable() || attempts > 20 {
                timer.invalidate()
                self.webView.load(URLRequest(url: self.serverURL()))
            }
        }
    }

    private func isServerReachable() -> Bool {
        var reachable = false
        let semaphore = DispatchSemaphore(value: 0)
        URLSession.shared.dataTask(with: serverURL()) { _, response, _ in
            if let http = response as? HTTPURLResponse, http.statusCode < 500 {
                reachable = true
            }
            semaphore.signal()
        }.resume()
        _ = semaphore.wait(timeout: .now() + 2)
        return reachable
    }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.regular)
app.run()
