const authScreen = document.querySelector("#authScreen");
const appScreen = document.querySelector("#appScreen");
const mobileAuthTitle = document.querySelector("#mobileAuthTitle");
const mobileAuthHint = document.querySelector("#mobileAuthHint");
const mobileAuthTabs = document.querySelector("#mobileAuthTabs");
const mobilePasswordPane = document.querySelector("#mobilePasswordPane");
const mobileFacePane = document.querySelector("#mobileFacePane");
const mobileSetupPane = document.querySelector("#mobileSetupPane");
const mobilePassword = document.querySelector("#mobilePassword");
const mobilePasswordSubmit = document.querySelector("#mobilePasswordSubmit");
const mobileFaceVideo = document.querySelector("#mobileFaceVideo");
const mobileFaceStatus = document.querySelector("#mobileFaceStatus");
const mobileFaceSubmit = document.querySelector("#mobileFaceSubmit");
const mobileSetupPassword = document.querySelector("#mobileSetupPassword");
const mobileSetupSave = document.querySelector("#mobileSetupSave");
const mobileMessages = document.querySelector("#mobileMessages");
const mobileInput = document.querySelector("#mobileInput");
const mobileSend = document.querySelector("#mobileSend");
const mobileMicBtn = document.querySelector("#mobileMicBtn");
const mobileVoiceToggle = document.querySelector("#mobileVoiceToggle");
const mobileLogout = document.querySelector("#mobileLogout");
const mobileStatus = document.querySelector("#mobileStatus");
const mobileToast = document.querySelector("#mobileToast");
const mobileAiMode = document.querySelector("#mobileAiMode");
const mobileTransferMode = document.querySelector("#mobileTransferMode");
const mobileTransferPanel = document.querySelector("#mobileTransferPanel");
const mobileTransferFile = document.querySelector("#mobileTransferFile");
const mobileTransferList = document.querySelector("#mobileTransferList");
const mobileMessagesArea = document.querySelector("#mobileMessages");
const mobileQuick = document.querySelector(".mobile-quick");
const mobileComposer = document.querySelector(".mobile-composer");

let authToken = localStorage.getItem("monday_mobile_token") || "";
let faceModelsReady = false;
let faceModelPromise = null;
let activeCameraStream = null;
let sending = false;
let state = { conversation: [] };
let mobileRecognition = null;
let mobileListening = false;
let mobileVoiceEnabled = true;
let sessionEnding = false;

function showToast(message) {
  mobileToast.textContent = message;
  mobileToast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => mobileToast.classList.remove("show"), 2600);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatText(value) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br>");
}

async function fetchJson(url, options = {}) {
  const headers = { "Content-Type": "application/json" };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;
  const response = await fetch(url, { headers, ...options });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    clearAuth();
    throw new Error(data.error || "需要身份验证");
  }
  if (!response.ok) throw new Error(data.error || `请求失败：${response.status}`);
  return data;
}

function setToken(token) {
  authToken = token;
  localStorage.setItem("monday_mobile_token", token);
}

async function endSession() {
  if (!authToken || sessionEnding) return;
  sessionEnding = true;
  try {
    await fetchJson("/api/session/end", {
      method: "POST",
      body: JSON.stringify({}),
      keepalive: true,
    });
  } catch (error) {
    // 手机端关闭时保存失败不阻塞退出；服务停止时另有兜底。
  } finally {
    window.setTimeout(() => {
      sessionEnding = false;
    }, 800);
  }
}

function clearAuth() {
  authToken = "";
  localStorage.removeItem("monday_mobile_token");
  stopCamera();
  authScreen.hidden = false;
  appScreen.hidden = true;
}

function showApp() {
  authScreen.hidden = true;
  appScreen.hidden = false;
}

function setAuthMode(mode) {
  const setup = mode === "setup";
  mobileAuthTitle.textContent = setup ? "初始化访问" : "访问验证";
  mobileAuthHint.textContent = setup ? "设置一个访问密码后进入。" : "使用密码或人脸解锁。";
  mobileAuthTabs.hidden = setup;
  mobilePasswordPane.hidden = setup;
  mobileFacePane.hidden = setup;
  mobileSetupPane.hidden = !setup;
  if (!setup) showMobileTab("password").catch(() => {});
}

async function showMobileTab(tab) {
  mobilePasswordPane.hidden = tab !== "password";
  mobileFacePane.hidden = tab !== "face";
  mobileSetupPane.hidden = true;
  mobileAuthTabs.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mobileTab === tab);
  });
  if (tab === "face") {
    mobileFaceStatus.textContent = "正在准备人脸识别";
    mobileFaceSubmit.disabled = true;
    try {
      await ensureFaceModels();
      if (!faceModelsReady) {
        throw new Error("人脸模型不可用，请使用密码登录。");
      }
      await startMobileCamera(mobileFaceVideo);
      mobileFaceStatus.textContent = "请正对镜头，保持脸部清晰";
      mobileFaceSubmit.disabled = false;
    } catch (error) {
      mobileFaceStatus.textContent = error.message;
      mobileFaceSubmit.disabled = true;
    }
  } else {
    stopCamera();
  }
}

function ensureFaceModels() {
  if (faceModelsReady) return Promise.resolve();
  if (!window.faceapi) return Promise.reject(new Error("人脸识别组件不可用，请使用密码。"));
  if (faceModelPromise) return faceModelPromise;

  faceModelPromise = (async () => {
    await window.faceapi.nets.tinyFaceDetector.loadFromUri("/static/models/tiny_face_detector");
    await window.faceapi.nets.faceLandmark68Net.loadFromUri("/static/models/face_landmark_68");
    await window.faceapi.nets.faceRecognitionNet.loadFromUri("/static/models/face_recognition");
    faceModelsReady = true;
    return true;
  })().catch((error) => {
    faceModelPromise = null;
    throw error;
  });
  return faceModelPromise;
}

async function startMobileCamera(videoEl) {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("当前微信环境不支持摄像头。");
  }
  if (activeCameraStream) stopCamera();
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "user",
      width: { ideal: 480 },
      height: { ideal: 640 },
    },
    audio: false,
  });
  activeCameraStream = stream;
  videoEl.srcObject = stream;
  videoEl.hidden = false;
  videoEl.play().catch(() => {});
  await wait(250);
}

function stopCamera() {
  if (activeCameraStream) {
    activeCameraStream.getTracks().forEach((track) => track.stop());
    activeCameraStream = null;
  }
  if (mobileFaceVideo) mobileFaceVideo.srcObject = null;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function captureFaceDescriptor(videoEl) {
  if (!faceModelsReady) throw new Error("人脸模型尚未就绪。");
  await wait(250);
  const detection = await window.faceapi
    .detectSingleFace(
      videoEl,
      new window.faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
    )
    .withFaceLandmarks()
    .withFaceDescriptor();
  if (!detection) throw new Error("没有检测到人脸。");
  return Array.from(detection.descriptor);
}

function messageNode(role, content) {
  const row = document.createElement("div");
  row.className = `mobile-message ${role}`;
  row.innerHTML = `
    <div class="role">${role === "user" ? "你" : "星期一"}</div>
    <div class="mobile-bubble">${role === "user" ? escapeHtml(content).replaceAll("\n", "<br>") : formatText(content)}</div>
  `;
  return row;
}

function renderMessages() {
  mobileMessages.innerHTML = "";
  if (!state.conversation.length) {
    mobileMessages.innerHTML = '<div class="mobile-status">星期一在线，直接问吧。</div>';
    return;
  }
  state.conversation.forEach((item) => {
    mobileMessages.appendChild(messageNode(item.role, item.content));
  });
  mobileMessages.scrollTop = mobileMessages.scrollHeight;
}

function addTyping() {
  const row = document.createElement("div");
  row.className = "mobile-message assistant";
  row.innerHTML = '<div class="role">星期一</div><div class="mobile-bubble mobile-typing"><span></span><span></span><span></span></div>';
  mobileMessages.appendChild(row);
  mobileMessages.scrollTop = mobileMessages.scrollHeight;
  return row;
}

function initMobileSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    mobileMicBtn.style.display = "none";
    return;
  }
  mobileRecognition = new SpeechRecognition();
  mobileRecognition.lang = "zh-CN";
  mobileRecognition.continuous = false;
  mobileRecognition.interimResults = false;
  mobileRecognition.maxAlternatives = 1;

  mobileRecognition.onstart = () => {
    mobileListening = true;
    mobileMicBtn.classList.add("active");
    mobileMicBtn.textContent = "停止";
  };

  mobileRecognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    mobileInput.value = transcript;
    sendMobileMessage(transcript);
  };

  mobileRecognition.onerror = (event) => {
    showToast(`语音输入失败：${event.error}`);
  };

  mobileRecognition.onend = () => {
    mobileListening = false;
    mobileMicBtn.classList.remove("active");
    mobileMicBtn.textContent = "语音";
  };
}

function speakMobile(text) {
  if (!mobileVoiceEnabled || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  const voice = window.speechSynthesis
    .getVoices()
    .find((item) => item.lang.toLowerCase().startsWith("zh"));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

async function sendMobileMessage(text) {
  const content = (text || mobileInput.value).trim();
  if (!content || sending) return;
  sending = true;
  mobileInput.value = "";
  mobileMessages.appendChild(messageNode("user", content));
  const typing = addTyping();
  mobileStatus.textContent = "正在处理";
  try {
    const result = await fetchJson("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: content }),
    });
    typing.remove();
    mobileMessages.appendChild(messageNode("assistant", result.reply));
    if (result.plan_pending && result.task_plan) {
      const actions = document.createElement("div");
      actions.className = "mobile-plan-actions";
      const approve = document.createElement("button");
      approve.type = "button";
      approve.textContent = "批准并执行";
      const reject = document.createElement("button");
      reject.type = "button";
      reject.textContent = "拒绝";
      approve.addEventListener("click", async () => {
        try {
          await fetchJson("/api/plan/approve", { method: "POST", body: JSON.stringify({}) });
          approve.disabled = true;
          sendMobileMessage("按照已批准的计划继续执行");
        } catch (error) {
          showToast(error.message);
        }
      });
      reject.addEventListener("click", async () => {
        try {
          await fetchJson("/api/plan/reject", { method: "POST", body: JSON.stringify({}) });
          actions.remove();
          showToast("计划已拒绝。");
        } catch (error) {
          showToast(error.message);
        }
      });
      actions.append(approve, reject);
      mobileMessages.appendChild(actions);
    }
    speakMobile(result.reply);
    state = await fetchJson("/api/state");
    mobileStatus.textContent = "本地 AI";
  } catch (error) {
    typing.remove();
    mobileMessages.appendChild(messageNode("assistant", `处理失败：${error.message}`));
    mobileStatus.textContent = "处理失败";
    showToast(error.message);
  } finally {
    sending = false;
    mobileMessages.scrollTop = mobileMessages.scrollHeight;
    mobileInput.focus();
  }
}

function setMobileAppMode(mode) {
  const transfer = mode === "transfer";
  mobileAiMode.classList.toggle("active", !transfer);
  mobileTransferMode.classList.toggle("active", transfer);
  mobileMessagesArea.hidden = transfer;
  mobileQuick.hidden = transfer;
  mobileComposer.hidden = transfer;
  mobileTransferPanel.hidden = !transfer;
  if (transfer) {
    loadMobileTransfer();
  } else {
    mobileInput.focus();
  }
}

function formatMobileFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function renderMobileTransfer(files) {
  mobileTransferList.innerHTML = "";
  if (!files.length) {
    mobileTransferList.innerHTML = '<div class="mobile-status">还没有文件。</div>';
    return;
  }
  files.forEach((file) => {
    const row = document.createElement("div");
    row.className = "mobile-transfer-item";
    const name = document.createElement("div");
    name.className = "mobile-transfer-item-name";
    name.innerHTML = `${escapeHtml(file.filename)}<div class="mobile-transfer-item-meta">${formatMobileFileSize(file.size || 0)}</div>`;
    const download = document.createElement("button");
    download.type = "button";
    download.textContent = "下载";
    download.addEventListener("click", () => downloadMobileTransfer(file.id, file.filename));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "删除";
    remove.addEventListener("click", async () => {
      try {
        await fetchJson("/api/transfer/delete", {
          method: "POST",
          body: JSON.stringify({ id: file.id }),
        });
        await loadMobileTransfer();
      } catch (error) {
        showToast(error.message);
      }
    });
    row.append(name, download, remove);
    mobileTransferList.appendChild(row);
  });
}

async function loadMobileTransfer() {
  try {
    const data = await fetchJson("/api/transfer/list");
    renderMobileTransfer(data.files || []);
  } catch (error) {
    mobileTransferList.innerHTML = '<div class="mobile-status">文件列表加载失败。</div>';
  }
}

function mobileFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result || "");
      const comma = value.indexOf(",");
      resolve(comma >= 0 ? value.slice(comma + 1) : value);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function uploadMobileFiles(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) return;
  for (const file of files) {
    try {
      showToast(`正在上传：${file.name}`);
      const dataBase64 = await mobileFileToBase64(file);
      await fetchJson("/api/transfer/upload", {
        method: "POST",
        body: JSON.stringify({
          filename: file.name,
          mime: file.type || "application/octet-stream",
          data_base64: dataBase64,
        }),
      });
    } catch (error) {
      showToast(`上传失败：${error.message}`);
    }
  }
  await loadMobileTransfer();
}

async function downloadMobileTransfer(fileId, filename) {
  try {
    const response = await fetch(`/api/transfer/download/${encodeURIComponent(fileId)}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!response.ok) throw new Error("下载失败");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "file";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    showToast(error.message);
  }
}

async function loginPassword() {
  const password = mobilePassword.value.trim();
  if (!password) return showToast("请输入密码。");
  try {
    const data = await fetchJson("/api/auth/password", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    setToken(data.token);
    mobilePassword.value = "";
    await enterApp();
  } catch (error) {
    showToast(error.message);
  }
}

async function loginFace() {
  try {
    mobileFaceStatus.textContent = "正在识别";
    const descriptor = await captureFaceDescriptor(mobileFaceVideo);
    const data = await fetchJson("/api/auth/face", {
      method: "POST",
      body: JSON.stringify({ descriptor }),
    });
    setToken(data.token);
    await enterApp();
  } catch (error) {
    mobileFaceStatus.textContent = error.message;
    showToast(error.message);
  }
}

async function setupPassword() {
  const password = mobileSetupPassword.value.trim();
  if (password.length < 4) return showToast("密码至少 4 位。");
  try {
    const data = await fetchJson("/api/auth/setup", {
      method: "POST",
      body: JSON.stringify({ password, password_name: "主密码" }),
    });
    setToken(data.token);
    await enterApp();
  } catch (error) {
    showToast(error.message);
  }
}

async function enterApp() {
  showApp();
  state = await fetchJson("/api/state");
  renderMessages();
}

async function logout() {
  try {
    await endSession();
    await fetchJson("/api/auth/logout", { method: "POST" });
  } catch (error) {}
  clearAuth();
  const status = await fetchJson("/api/auth/status");
  setAuthMode(status.setup_required ? "setup" : "login");
}

mobileAuthTabs.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    showMobileTab(button.dataset.mobileTab).catch(() => {});
  });
});
mobilePasswordSubmit.addEventListener("click", loginPassword);
mobilePassword.addEventListener("keydown", (event) => {
  if (event.key === "Enter") loginPassword();
});
mobileFaceSubmit.addEventListener("click", loginFace);
mobileSetupSave.addEventListener("click", setupPassword);
mobileSetupPassword.addEventListener("keydown", (event) => {
  if (event.key === "Enter") setupPassword();
});
mobileSend.addEventListener("click", () => sendMobileMessage());
mobileMicBtn.addEventListener("click", () => {
  if (!mobileRecognition) {
    showToast("当前浏览器不支持语音输入。");
    return;
  }
  if (mobileListening) {
    mobileRecognition.stop();
    return;
  }
  mobileRecognition.start();
});
mobileVoiceToggle.addEventListener("click", () => {
  mobileVoiceEnabled = !mobileVoiceEnabled;
  mobileVoiceToggle.classList.toggle("active", mobileVoiceEnabled);
  mobileVoiceToggle.textContent = mobileVoiceEnabled ? "朗读" : "静音";
  if (!mobileVoiceEnabled && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
});
mobileInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMobileMessage();
  }
});
mobileLogout.addEventListener("click", logout);
mobileAiMode.addEventListener("click", () => setMobileAppMode("ai"));
mobileTransferMode.addEventListener("click", () => setMobileAppMode("transfer"));
mobileTransferFile.addEventListener("change", () => {
  uploadMobileFiles(mobileTransferFile.files);
  mobileTransferFile.value = "";
});

document.querySelectorAll("[data-mobile-prompt]").forEach((button) => {
  button.addEventListener("click", () => sendMobileMessage(button.dataset.mobilePrompt));
});

async function bootstrapMobile() {
  initMobileSpeechRecognition();
  const status = await fetchJson("/api/auth/status");
  if (status.authenticated) {
    await enterApp();
    return;
  }
  authScreen.hidden = false;
  appScreen.hidden = true;
  setAuthMode(status.setup_required ? "setup" : "login");
}

bootstrapMobile();

window.addEventListener("pagehide", () => {
  endSession();
});
