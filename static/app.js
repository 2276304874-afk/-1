const messagesEl = document.querySelector("#messages");
const messageInput = document.querySelector("#messageInput");
const sendBtn = document.querySelector("#sendBtn");
const micBtn = document.querySelector("#micBtn");
const wakeToggle = document.querySelector("#wakeToggle");
const agentToggle = document.querySelector("#agentToggle");
const planModeToggle = document.querySelector("#planModeToggle");
const voiceToggle = document.querySelector("#voiceToggle");
const resetBtn = document.querySelector("#resetBtn");
const refreshSystem = document.querySelector("#refreshSystem");
const refreshFirewall = document.querySelector("#refreshFirewall");
const toggleWeb = document.querySelector("#toggleWeb");
const toggleLearning = document.querySelector("#toggleLearning");
const modelSelect = document.querySelector("#modelSelect");
const statusDot = document.querySelector("#statusDot");
const statusText = document.querySelector("#statusText");
const systemInfo = document.querySelector("#systemInfo");
const firewallInfo = document.querySelector("#firewallInfo");
const core = document.querySelector("#core");
const toast = document.querySelector("#toast");

const authOverlay = document.querySelector("#authOverlay");
const authTitle = document.querySelector("#authTitle");
const authHint = document.querySelector("#authHint");
const authTabs = document.querySelector("#authTabs");
const passwordAuth = document.querySelector("#passwordAuth");
const faceAuth = document.querySelector("#faceAuth");
const setupPane = document.querySelector("#setupPane");
const passwordInput = document.querySelector("#passwordInput");
const passwordSubmit = document.querySelector("#passwordSubmit");
const faceVideo = document.querySelector("#faceVideo");
const faceCanvas = document.querySelector("#faceCanvas");
const faceStatus = document.querySelector("#faceStatus");
const faceSubmit = document.querySelector("#faceSubmit");
const setupPassword = document.querySelector("#setupPassword");
const setupSave = document.querySelector("#setupSave");
const setupFaceVideo = document.querySelector("#setupFaceVideo");
const setupFaceStatus = document.querySelector("#setupFaceStatus");
const setupFace = document.querySelector("#setupFace");
const refreshAccess = document.querySelector("#refreshAccess");
const accessInfo = document.querySelector("#accessInfo");
const newPasswordInput = document.querySelector("#newPasswordInput");
const addPasswordBtn = document.querySelector("#addPasswordBtn");
const registerFaceBtn = document.querySelector("#registerFaceBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const manageFaceVideo = document.querySelector("#manageFaceVideo");
const refreshNetwork = document.querySelector("#refreshNetwork");
const mobileQr = document.querySelector("#mobileQr");
const mobileUrl = document.querySelector("#mobileUrl");
const modeAi = document.querySelector("#modeAi");
const modeTransfer = document.querySelector("#modeTransfer");
const chatPanel = document.querySelector("#chatPanel");
const transferPanel = document.querySelector("#transferPanel");
const transferFileInput = document.querySelector("#transferFileInput");
const transferDrop = document.querySelector("#transferDrop");
const transferList = document.querySelector("#transferList");
const chatFileBtn = document.querySelector("#chatFileBtn");
const chatFileInput = document.querySelector("#chatFileInput");
const chatFolderBtn = document.querySelector("#chatFolderBtn");
const chatFolderInput = document.querySelector("#chatFolderInput");
const filePermissionInfo = document.querySelector("#filePermissionInfo");
const refreshFilePermissionBtn = document.querySelector("#refreshFilePermissionBtn");
const openFilePermissionBtn = document.querySelector("#openFilePermissionBtn");
const refreshPermissionsBtn = document.querySelector("#refreshPermissionsBtn");
const permissionAction = document.querySelector("#permissionAction");
const permissionRule = document.querySelector("#permissionRule");
const addPermissionRuleBtn = document.querySelector("#addPermissionRuleBtn");
const permissionRuleList = document.querySelector("#permissionRuleList");
const sessionGrantRule = document.querySelector("#sessionGrantRule");
const grantSessionRuleBtn = document.querySelector("#grantSessionRuleBtn");
const clearSessionGrantsBtn = document.querySelector("#clearSessionGrantsBtn");
const sessionGrantList = document.querySelector("#sessionGrantList");
const refreshMemory = document.querySelector("#refreshMemory");
const memoryInfo = document.querySelector("#memoryInfo");
const memoryFacts = document.querySelector("#memoryFacts");
const memoryNotes = document.querySelector("#memoryNotes");
const knowledgeList = document.querySelector("#knowledgeList");
const reminderList = document.querySelector("#reminderList");
const reminderHistory = document.querySelector("#reminderHistory");
const reminderMessage = document.querySelector("#reminderMessage");
const reminderMinutes = document.querySelector("#reminderMinutes");
const addReminderBtn = document.querySelector("#addReminderBtn");
const clearFactsBtn = document.querySelector("#clearFactsBtn");
const clearNotesBtn = document.querySelector("#clearNotesBtn");
const clearKnowledgeBtn = document.querySelector("#clearKnowledgeBtn");
const clearReminderHistoryBtn = document.querySelector("#clearReminderHistoryBtn");
const taskPlanPanel = document.querySelector("#taskPlanPanel");
const clearPlanBtn = document.querySelector("#clearPlanBtn");
const auditLog = document.querySelector("#auditLog");
const clearAuditBtn = document.querySelector("#clearAuditBtn");
const backupList = document.querySelector("#backupList");
const undoLatestBackupBtn = document.querySelector("#undoLatestBackupBtn");
const clearBackupsBtn = document.querySelector("#clearBackupsBtn");
const approvalList = document.querySelector("#approvalList");
const approvalFilterStatus = document.querySelector("#approvalFilterStatus");
const refreshApprovalsBtn = document.querySelector("#refreshApprovalsBtn");
const guiStatusInfo = document.querySelector("#guiStatusInfo");
const refreshGuiStatusBtn = document.querySelector("#refreshGuiStatusBtn");
const refreshReadinessBtn = document.querySelector("#refreshReadinessBtn");
const readinessInfo = document.querySelector("#readinessInfo");
const openScreenRecordingBtn = document.querySelector("#openScreenRecordingBtn");
const openAccessibilityBtn = document.querySelector("#openAccessibilityBtn");
const startSafariDriverBtn = document.querySelector("#startSafariDriverBtn");
const refreshDiagnosticsBtn = document.querySelector("#refreshDiagnosticsBtn");
const diagnosticsInfo = document.querySelector("#diagnosticsInfo");
const requestAutomationBtn = document.querySelector("#requestAutomationBtn");
const automationActionType = document.querySelector("#automationActionType");
const automationTarget = document.querySelector("#automationTarget");
const automationResult = document.querySelector("#automationResult");
const browserDownloadFilter = document.querySelector("#browserDownloadFilter");
const browserDownloadList = document.querySelector("#browserDownloadList");
const refreshBrowserDownloadsBtn = document.querySelector("#refreshBrowserDownloadsBtn");
const memorySearchInput = document.querySelector("#memorySearchInput");
const memorySearchBtn = document.querySelector("#memorySearchBtn");
const memorySearchResults = document.querySelector("#memorySearchResults");
const scheduledTaskTitle = document.querySelector("#scheduledTaskTitle");
const scheduledTaskPrompt = document.querySelector("#scheduledTaskPrompt");
const scheduledTaskMinutes = document.querySelector("#scheduledTaskMinutes");
const scheduledTaskPriority = document.querySelector("#scheduledTaskPriority");
const scheduledTaskRetries = document.querySelector("#scheduledTaskRetries");
const scheduledTaskDependsOn = document.querySelector("#scheduledTaskDependsOn");
const scheduledTaskAt = document.querySelector("#scheduledTaskAt");
const scheduledTaskAutoRun = document.querySelector("#scheduledTaskAutoRun");
const addScheduledTaskBtn = document.querySelector("#addScheduledTaskBtn");
const scheduledTaskList = document.querySelector("#scheduledTaskList");
const refreshScheduledTasksBtn = document.querySelector("#refreshScheduledTasksBtn");
const autoRunScheduledToggle = document.querySelector("#autoRunScheduledToggle");
const integrationName = document.querySelector("#integrationName");
const integrationTemplateSelect = document.querySelector("#integrationTemplateSelect");
const integrationUrl = document.querySelector("#integrationUrl");
const integrationHeaders = document.querySelector("#integrationHeaders");
const integrationMethod = document.querySelector("#integrationMethod");
const addIntegrationBtn = document.querySelector("#addIntegrationBtn");
const integrationList = document.querySelector("#integrationList");
const refreshSecretsBtn = document.querySelector("#refreshSecretsBtn");
const secretName = document.querySelector("#secretName");
const secretValue = document.querySelector("#secretValue");
const saveSecretBtn = document.querySelector("#saveSecretBtn");
const secretList = document.querySelector("#secretList");
const refreshIntegrationsBtn = document.querySelector("#refreshIntegrationsBtn");
const skillName = document.querySelector("#skillName");
const skillContent = document.querySelector("#skillContent");
const addSkillBtn = document.querySelector("#addSkillBtn");
const skillList = document.querySelector("#skillList");
const refreshSkillsBtn = document.querySelector("#refreshSkillsBtn");
const workspaceName = document.querySelector("#workspaceName");
const createWorkspaceBtn = document.querySelector("#createWorkspaceBtn");
const workspaceList = document.querySelector("#workspaceList");
const refreshWorkspacesBtn = document.querySelector("#refreshWorkspacesBtn");
const suggestBtn = document.querySelector("#suggestBtn");
const autonomySelect = document.querySelector("#autonomySelect");
const suggestionResult = document.querySelector("#suggestionResult");
const visionPreview = document.querySelector("#visionPreview");
const visionVideo = document.querySelector("#visionVideo");
const visionImage = document.querySelector("#visionImage");
const visionCanvas = document.querySelector("#visionCanvas");
const visionFileInput = document.querySelector("#visionFileInput");
const visionQuestion = document.querySelector("#visionQuestion");
const visionCameraBtn = document.querySelector("#visionCameraBtn");
const visionCaptureBtn = document.querySelector("#visionCaptureBtn");
const visionAnalyzeBtn = document.querySelector("#visionAnalyzeBtn");
const screenOcrBtn = document.querySelector("#screenOcrBtn");
const imageOcrBtn = document.querySelector("#imageOcrBtn");
const visionResult = document.querySelector("#visionResult");

let state = {
  conversation: [],
  conversation_summaries: [],
  facts: [],
  notes: [],
  knowledge: [],
  reminders: [],
  reminder_history: [],
  task_plan: null,
  task_history: [],
  audit_log: [],
  file_backups: [],
  pending_approvals: [],
  scheduled_tasks: [],
  integrations: [],
  skills: [],
  workspaces: [],
  active_workspace: "",
  settings: {
    model: "",
    voice_enabled: true,
    wake_word_enabled: false,
    autonomy_level: "assisted",
    agent_mode: "chat",
    scheduled_auto_run: false,
    semantic_memory_enabled: true,
    web_enabled: true,
    learning_enabled: true,
  },
};
let models = {};
let recognition = null;
let listening = false;
let wakeRecognition = null;
let wakeListening = false;
let wakeCommandMode = false;
let wakeBriefingSpoken = false;
let speaking = false;
let sending = false;
let authToken = localStorage.getItem("monday_token") || "";
let sessionEnding = false;
let faceModelsReady = false;
let faceModelPromise = null;
let activeCameraStream = null;
let visionImageData = "";
let visionEnabled = false;
let visionCameraActive = false;
let reminderTimer = null;
let approvalFilter = "all";
let notifiedReminders = new Set(JSON.parse(localStorage.getItem("monday_notified_reminders") || "[]"));
let notifiedApprovals = new Set(JSON.parse(localStorage.getItem("monday_notified_approvals") || "[]"));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMarkdown(text) {
  // 将模型返回的轻量 Markdown 转成安全 HTML，支持标题、列表、代码和粗体。
  let value = escapeHtml(text);
  value = value.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
  value = value.replace(/`([^`]+)`/g, "<code>$1</code>");
  value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const lines = value.split("\n");
  let html = "";
  let listType = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (listType) {
        html += listType === "ul" ? "</ul>" : "</ol>";
        listType = "";
      }
      continue;
    }
    const heading = trimmed.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      if (listType) {
        html += listType === "ul" ? "</ul>" : "</ol>";
        listType = "";
      }
      const level = Math.min(Number(heading[1].length) + 2, 5);
      html += `<h${level}>${heading[2]}</h${level}>`;
      continue;
    }
    const bullet = trimmed.match(/^[-*]\s+(.*)$/);
    const ordered = trimmed.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || ordered) {
      const nextType = bullet ? "ul" : "ol";
      if (listType !== nextType) {
        if (listType) html += listType === "ul" ? "</ul>" : "</ol>";
        html += nextType === "ul" ? "<ul>" : "<ol>";
        listType = nextType;
      }
      html += `<li>${bullet ? bullet[1] : ordered[1]}</li>`;
      continue;
    }
    if (listType) {
      html += listType === "ul" ? "</ul>" : "</ol>";
      listType = "";
    }
    html += `<p>${trimmed}</p>`;
  }
  if (listType) html += listType === "ul" ? "</ul>" : "</ol>";
  return html || "<p></p>";
}

function messageNode(role, content, toolCalls = [], toolDetails = [], plan = null) {
  const row = document.createElement("article");
  row.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = role === "user" ? "你" : "一";

  const contentWrap = document.createElement("div");
  contentWrap.className = "message-content";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.innerHTML = role === "user" ? escapeHtml(content).replaceAll("\n", "<br>") : collapseAssistantReply(content);

  contentWrap.appendChild(bubble);

  if (plan) contentWrap.appendChild(planCard(plan));

  if (role === "assistant" && toolCalls.length) {
    const trace = document.createElement("div");
    trace.className = "tool-trace";
    trace.textContent = `已调用本机能力：${toolCalls.join(" · ")}`;
    contentWrap.appendChild(trace);
  }

  if (role === "assistant" && toolDetails.length) {
    contentWrap.appendChild(toolDetailsBlock(toolDetails));
  }

  row.append(avatar, contentWrap);
  return row;
}

function toolDetailsBlock(details) {
  // 工具执行明细：状态图标 + 名称 + 参数摘要 + 结果摘要，可折叠。
  const block = document.createElement("div");
  block.className = "tool-details";
  details.forEach((item) => {
    const row = document.createElement("details");
    row.className = "tool-detail";
    const icon =
      item.status === "done" ? "check-circle-2" : item.status === "error" ? "alert-circle" : "loader-2";
    row.innerHTML = `
      <summary>
        <i data-lucide="${icon}"></i>
        <strong>${escapeHtml(item.tool || "工具")}</strong>
        <span class="tool-status ${item.status || ""}">${escapeHtml(item.status || "")}</span>
        ${item.duration_ms ? `<time>${item.duration_ms} ms</time>` : ""}
      </summary>
      <div class="tool-detail-body">
        ${item.args ? `<div class="tool-detail-line"><label>参数</label><code>${escapeHtml(item.args)}</code></div>` : ""}
        ${item.result ? `<div class="tool-detail-line"><label>结果</label><code>${escapeHtml(item.result)}</code></div>` : ""}
      </div>
    `;
    if (item.approval_id && item.status === "awaiting_approval") {
      const actions = document.createElement("div");
      actions.className = "permission-actions";
      actions.innerHTML = `
        <button type="button" class="btn sm" data-act="approve">批准</button>
        <button type="button" class="btn sm ghost" data-act="reject">拒绝</button>
      `;
      actions.querySelector('[data-act="approve"]').addEventListener("click", () => resolveApproval(item.approval_id, true, "once"));
      actions.querySelector('[data-act="reject"]').addEventListener("click", () => resolveApproval(item.approval_id, false));
      row.appendChild(actions);
    }
    block.appendChild(row);
  });
  if (window.lucide) window.lucide.createIcons();
  return block;
}

function planCard(plan) {
  // 计划卡片：步骤列表 + 状态徽章；待批准时提供批准/拒绝按钮。
  const card = document.createElement("div");
  card.className = "plan-card";
  const steps = Array.isArray(plan.steps) ? plan.steps : [];
  const statusText = plan.approved ? "已批准执行" : "待你批准";
  card.innerHTML = `
    <div class="plan-head">
      <i data-lucide="clipboard-list"></i>
      <strong>${escapeHtml(plan.title || "执行计划")}</strong>
      <span class="plan-status ${plan.approved ? "ok" : "wait"}">${statusText}</span>
    </div>
    <ol class="plan-steps">
      ${steps.map((s) => `<li>${escapeHtml(typeof s === "string" ? s : s.desc || s.step || "")}</li>`).join("")}
    </ol>
  `;
  if (!plan.approved) {
    const actions = document.createElement("div");
    actions.className = "permission-actions";
    actions.innerHTML = `
      <button type="button" class="btn sm" data-act="run">批准并执行</button>
      <button type="button" class="btn sm ghost" data-act="reject">拒绝</button>
    `;
    actions.querySelector('[data-act="run"]').addEventListener("click", () => approveAndRunPlan(plan.id, card));
    actions.querySelector('[data-act="reject"]').addEventListener("click", async () => {
      try {
        await fetchJson("/api/plan/reject", { method: "POST", body: JSON.stringify({}) });
        card.querySelector(".plan-status").textContent = "已拒绝";
        card.querySelector(".plan-status").className = "plan-status bad";
        card.querySelector(".permission-actions")?.remove();
        showToast("计划已拒绝。");
      } catch (error) {
        showToast(error.message);
      }
    });
    card.appendChild(actions);
  }
  if (window.lucide) window.lucide.createIcons();
  return card;
}

async function approveAndRunPlan(planId, card) {
  // 批准计划并自动继续执行：先 /api/plan/approve，再 /api/plan/execute。
  if (!card) return;
  card.querySelector(".plan-status").textContent = "执行中…";
  card.querySelector(".plan-status").className = "plan-status";
  try {
    await fetchJson("/api/plan/approve", { method: "POST", body: JSON.stringify({}) });
    const runBtn = card.querySelector('[data-act="run"]');
    if (runBtn) runBtn.disabled = true;
    setStatus("busy", "正在执行计划");
    const text = `按照已批准的计划继续执行`;
    await sendMessage(text, { skipRenderUser: true, continueApprovedPlan: true });
    card.querySelector(".plan-status").textContent = "执行完成";
    card.querySelector(".plan-status").className = "plan-status ok";
    showToast("计划执行完成。");
  } catch (error) {
    card.querySelector(".plan-status").textContent = "执行失败";
    card.querySelector(".plan-status").className = "plan-status bad";
    showToast(error.message);
  }
}

function typingNode() {
  const row = document.createElement("article");
  row.className = "message assistant";
  row.innerHTML = `
    <div class="message-avatar">一</div>
    <div class="message-content">
      <div class="message-bubble typing"><span></span><span></span><span></span></div>
    </div>
  `;
  return row;
}

function renderConversation() {
  messagesEl.innerHTML = "";
  if (!state.conversation.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `
      <h2>星期一在线</h2>
      <p>可以问我时间、电脑状态、文件位置，也可以让我联网搜索、学习网页内容或执行受保护的只读命令。</p>
    `;
    messagesEl.appendChild(empty);
    return;
  }
  state.conversation.forEach((item) => {
    messagesEl.appendChild(messageNode(item.role, item.content, item.tool_calls || []));
  });
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function setStatus(mode, text) {
  statusDot.className = "status-dot";
  core.classList.remove("active", "speaking");

  if (mode === "online") {
    statusDot.classList.add("online");
  } else if (mode === "busy") {
    statusDot.classList.add("busy");
    core.classList.add("active");
  } else {
    statusDot.classList.add("offline");
  }
  statusText.textContent = text;
}

async function fetchJson(url, options = {}) {
  // 统一 JSON 请求：带 token、统一错误处理。
  const headers = { "Content-Type": "application/json" };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  const response = await fetch(url, {
    headers,
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    clearAuth();
    throw new Error(data.error || "需要身份验证");
  }
  if (!response.ok) {
    throw new Error(data.error || `请求失败：${response.status}`);
  }
  return data;
}

async function endSession() {
  // 清空/退出/关页前把当天对话先沉淀到长期记忆，避免关闭后丢失。
  if (!authToken || sessionEnding) return;
  sessionEnding = true;
  try {
    await fetchJson("/api/session/end", {
      method: "POST",
      body: JSON.stringify({}),
      keepalive: true,
    });
  } catch (error) {
    // 保存失败不应阻断退出流程；服务停止时还有信号钩子兜底。
  } finally {
    window.setTimeout(() => {
      sessionEnding = false;
    }, 800);
  }
}

async function loadState() {
  state = await fetchJson("/api/state");
  renderConversation();
  updateVoiceButton();
  updateWakeButton();
  updateAgentButton();
  updatePlanModeButton();
  updateAutoRunButton();
  updateAutonomyControls();
  updateFirewallButtons();
  renderMemoryAndReminders();
  renderTaskAndAudit();
}

async function loadHealth() {
  try {
    const health = await fetchJson("/api/health");
    models = health.models || [];
    visionEnabled = Boolean(health.vision_enabled);
    if (health.agent_mode) {
      state.settings.agent_mode = health.agent_mode;
      updateAgentButton();
    }
    populateModels(health.model);
    if (!health.ok) {
      setStatus("offline", "Ollama 未连接");
    } else if (!health.model_available) {
      setStatus("offline", "模型不可用");
    } else {
      setStatus("online", "Ollama 已连接");
    }
  } catch (error) {
    setStatus("offline", "服务未连接");
  }
}

function populateModels(currentModel) {
  const current = modelSelect.value;
  modelSelect.innerHTML = "";
  const modelNames = (Array.isArray(models) ? models : Object.keys(models)).slice().sort();
  if (!modelNames.length) {
    const option = document.createElement("option");
    option.textContent = currentModel || "未发现模型";
    option.value = currentModel || "";
    modelSelect.appendChild(option);
    return;
  }

  modelNames.forEach((name) => {
    const option = document.createElement("option");
    option.textContent = name;
    option.value = name;
    modelSelect.appendChild(option);
  });

  if (current && modelNames.includes(current)) {
    modelSelect.value = current;
  } else {
    modelSelect.value = currentModel || modelNames[0];
  }
}

async function loadSystemInfo() {
  try {
    const info = await fetchJson("/api/system");
    const rows = [
      ["主机", info.hostname],
      ["系统", info.os],
      ["CPU", info.cpu_model],
      ["内存", `${info.memory_used} / ${info.memory_total}`],
      ["磁盘", `${info.disk_used} / ${info.disk_total}（${info.disk_percent}）`],
      ["局域网", info.local_ip],
      ["运行时间", info.uptime],
    ];
    systemInfo.innerHTML = rows
      .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "未知")}</dd>`)
      .join("");
  } catch (error) {
    systemInfo.innerHTML = '<dt>状态</dt><dd>暂不可用</dd>';
  }
}

async function loadFirewall() {
  try {
    const data = await fetchJson("/api/firewall");
    const info = data.firewall || {};
    const settings = data.settings || state.settings;
    state.settings.web_enabled = settings.web_enabled;
    state.settings.learning_enabled = settings.learning_enabled;
    const rows = [
      ["状态", info.enabled === false ? "已停用" : "已启用"],
      ["网络访问", settings.web_enabled ? "允许" : "已关闭"],
      ["自主学习", settings.learning_enabled ? "允许" : "已关闭"],
      ["已拦截", info.blocked_count ?? 0],
      ["已放行", info.allowed_count ?? 0],
      ["限速", `${info.rate_limit_requests_per_minute ?? 24} 次/分`],
    ];
    firewallInfo.innerHTML = rows
      .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`)
      .join("");
    updateFirewallButtons();
  } catch (error) {
    firewallInfo.innerHTML = '<dt>状态</dt><dd>暂不可用</dd>';
  }
}

function updateFirewallButtons() {
  const webEnabled = state.settings.web_enabled;
  const learningEnabled = state.settings.learning_enabled;
  toggleWeb.textContent = webEnabled ? "关闭联网" : "开启联网";
  toggleLearning.textContent = learningEnabled ? "关闭学习" : "开启学习";
  toggleWeb.classList.toggle("active", webEnabled);
  toggleLearning.classList.toggle("active", learningEnabled);
}

function formatReminderTime(value) {
  if (!value) return "时间未知";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncateText(value, max = 140) {
  const text = String(value || "");
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
}

function detailRow(summary, detail) {
  const details = document.createElement("details");
  details.className = "memory-detail";
  const head = document.createElement("summary");
  head.textContent = summary;
  const body = document.createElement("div");
  body.className = "memory-detail-body";
  body.textContent = detail;
  details.append(head, body);
  return details;
}

function dateGroupTitle(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "未知日期";
  const now = new Date();
  const day = (input) => `${input.getFullYear()}-${input.getMonth()}-${input.getDate()}`;
  if (day(date) === day(now)) return "今天";
  const yesterday = new Date(now.getTime() - 86400000);
  if (day(date) === day(yesterday)) return "昨天";
  return date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
}

function renderDateGrouped(container, items, renderer) {
  const groups = new Map();
  items.forEach((item, index) => {
    const key = dateGroupTitle(item.created_at || item.completed_at || item.resolved_at || "");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push([item, index]);
  });
  for (const [title, entries] of groups) {
    const section = document.createElement("div");
    section.className = "date-group";
    const heading = document.createElement("div");
    heading.className = "date-group-title";
    heading.textContent = title;
    section.appendChild(heading);
    entries.forEach(([item, index]) => section.appendChild(renderer(item, index)));
    container.appendChild(section);
  }
}

function collapseAssistantReply(reply) {
  const html = formatMarkdown(reply);
  if (reply.length <= 700) return html;
  const preview = escapeHtml(reply.replace(/\s+/g, " ").slice(0, 160));
  return `<details class="message-collapse"><summary>${preview}… 展开完整回复</summary>${html}</details>`;
}

function renderMemoryAndReminders() {
  const facts = Array.isArray(state.facts) ? state.facts : [];
  const notes = Array.isArray(state.notes) ? state.notes : [];
  const knowledge = Array.isArray(state.knowledge) ? state.knowledge : [];
  const reminders = Array.isArray(state.reminders) ? state.reminders : [];
  const history = Array.isArray(state.reminder_history) ? state.reminder_history : [];
  memoryInfo.innerHTML = [
    ["长期事实", `${facts.length} 条`],
    ["持续笔记", `${notes.length} 条`],
    ["已学知识", `${knowledge.length} 条`],
    ["提醒事项", `${reminders.length} 个`],
    ["已完成", `${history.length} 个`],
    ["对话摘要", `${Array.isArray(state.conversation_summaries) ? state.conversation_summaries.length : 0} 条`],
    ["任务经验", `${Array.isArray(state.task_experience) ? state.task_experience.length : 0} 条`],
  ]
    .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`)
    .join("");

  memoryFacts.innerHTML = "";
  const appendEmpty = (container, text) => {
    const empty = document.createElement("div");
    empty.className = "memory-item";
    empty.textContent = text;
    container.appendChild(empty);
  };
  facts.forEach((content, index) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const text = content.length > 140 ? detailRow(`事实：${truncateText(content, 80)}`, content) : Object.assign(document.createElement("span"), { textContent: content });
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "删除";
    button.addEventListener("click", () => deleteMemoryItem("fact", index));
    row.append(text, button);
    memoryFacts.appendChild(row);
  });
  if (!facts.length) appendEmpty(memoryFacts, "暂无长期事实");

  memoryNotes.innerHTML = "";
  notes.forEach((content, index) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const text = content.length > 140 ? detailRow(`笔记：${truncateText(content, 80)}`, content) : Object.assign(document.createElement("span"), { textContent: content });
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "删除";
    button.addEventListener("click", () => deleteMemoryItem("note", index));
    row.append(text, button);
    memoryNotes.appendChild(row);
  });
  if (!notes.length) appendEmpty(memoryNotes, "暂无持续笔记");

  knowledgeList.innerHTML = "";
  knowledge.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const title = document.createElement("strong");
    title.textContent = item.topic || "未命名知识";
    const summaryText = item.summary || "";
    const summary = summaryText.length > 140
      ? detailRow(`知识摘要：${truncateText(summaryText, 80)}`, summaryText)
      : Object.assign(document.createElement("span"), { textContent: summaryText });
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "删除";
    button.addEventListener("click", () => deleteMemoryItem("knowledge", index));
    row.append(title, summary, button);
    knowledgeList.appendChild(row);
  });
  if (!knowledge.length) appendEmpty(knowledgeList, "暂无已学知识");

  reminderList.innerHTML = "";
  const sortedReminders = [...reminders].sort((a, b) => {
    const left = a.due_at ? new Date(a.due_at).getTime() : Number.MAX_SAFE_INTEGER;
    const right = b.due_at ? new Date(b.due_at).getTime() : Number.MAX_SAFE_INTEGER;
    return left - right;
  });
  sortedReminders.forEach((reminder) => {
    const dueAt = reminder.due_at ? new Date(reminder.due_at) : null;
    const due = dueAt && dueAt.getTime() <= Date.now();
    const row = document.createElement("div");
    row.className = "memory-item";
    const title = document.createElement("strong");
    title.textContent = due ? `提醒到期：${reminder.message}` : reminder.message;
    const time = document.createElement("time");
    time.textContent = due ? "现在" : `${formatReminderTime(reminder.due_at)} · ${reminder.due_in_minutes ?? ""} 分钟`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = due ? "完成" : "删除";
    button.addEventListener("click", () => {
      if (due) {
        acknowledgeReminder(reminder.id);
      } else {
        deleteReminder(reminder.id);
      }
    });
    row.append(title, time, button);
    reminderList.appendChild(row);
  });
  if (!sortedReminders.length) appendEmpty(reminderList, "暂无提醒");

  reminderHistory.innerHTML = "";
  history.slice(0, 20).forEach((reminder) => {
    const row = document.createElement("div");
    row.className = "memory-item completed";
    const title = document.createElement("strong");
    title.textContent = reminder.message;
    const time = document.createElement("time");
    time.textContent = reminder.completed_at
      ? `完成于 ${formatReminderTime(reminder.completed_at)}`
      : "已完成";
    row.append(title, time);
    reminderHistory.appendChild(row);
  });
  if (!history.length) appendEmpty(reminderHistory, "暂无完成记录");
}

function renderTaskAndAudit() {
  const plan = state.task_plan;
  taskPlanPanel.innerHTML = "";
  if (!plan || !Array.isArray(plan.steps) || !plan.steps.length) {
    taskPlanPanel.textContent = "暂无任务计划。";
  } else {
    const title = document.createElement("strong");
    title.textContent = `${plan.status === "completed" ? "已完成" : "进行中"} · ${plan.title || "未命名任务"}`;
    const list = document.createElement("ol");
    const completed = new Set(plan.completed_steps || []);
    plan.steps.forEach((step, index) => {
      const item = document.createElement("li");
      item.textContent = `${completed.has(index) ? "✓ " : "○ "}${step}`;
      item.style.color = completed.has(index) ? "var(--green)" : "";
      list.appendChild(item);
    });
    taskPlanPanel.append(title, list);
  }

  auditLog.innerHTML = "";
  const logs = Array.isArray(state.audit_log) ? state.audit_log.slice(0, 20) : [];
  renderDateGrouped(auditLog, logs, (item) => {
    const row = document.createElement("div");
    row.className = `memory-item audit-${item.status || "info"}`;
    const title = document.createElement("strong");
    title.textContent = `${item.tool || "操作"} · ${item.status || "info"}`;
    const summary = item.detail
      ? detailRow(item.summary || "详情", `${item.summary || ""}\n${item.detail}`)
      : Object.assign(document.createElement("span"), { textContent: item.summary || "" });
    const time = document.createElement("time");
    time.textContent = item.created_at ? formatReminderTime(item.created_at) : "";
    row.append(title, summary, time);
    return row;
  });
  if (!logs.length) auditLog.innerHTML = '<div class="memory-item">暂无操作日志</div>';

  backupList.innerHTML = "";
  const backups = Array.isArray(state.file_backups) ? state.file_backups.slice(0, 20) : [];
  backups.forEach((item) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const title = item.relative_path && String(item.relative_path).length > 120
      ? detailRow(item.relative_path, `${item.path || ""}\n备份 ID：${item.backup_id || ""}`)
      : Object.assign(document.createElement("strong"), { textContent: item.relative_path || item.path || "未知文件" });
    const time = document.createElement("time");
    time.textContent = item.created_at ? formatReminderTime(item.created_at) : "";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "恢复";
    button.addEventListener("click", () => restoreBackup(item.id));
    row.append(title, time, button);
    backupList.appendChild(row);
  });
  if (!backups.length) backupList.innerHTML = '<div class="memory-item">暂无文件备份</div>';

  approvalList.innerHTML = "";
  const approvals = Array.isArray(state.pending_approvals)
    ? state.pending_approvals
        .filter((item) => approvalFilter === "all" || item.status === approvalFilter)
        .slice(0, 20)
    : [];
  renderDateGrouped(approvalList, approvals, (item) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const isToolCall = item.kind === "tool_call";
    const title = document.createElement("strong");
    title.textContent = isToolCall
      ? `工具授权：${item.tool || "未知工具"}`
      : `${item.action_type || "操作"}：${item.target || ""}`;
    const reasonText = isToolCall && item.arguments
      ? `${item.reason || ""}\n参数：${typeof item.arguments === "string" ? item.arguments : JSON.stringify(item.arguments)}`
      : `${item.reason || ""}${item.target ? `\n目标：${item.target}` : ""}${item.result ? `\n结果：${typeof item.result === "string" ? item.result : JSON.stringify(item.result)}` : ""}`;
    const reason = reasonText.length > 160
      ? detailRow(truncateText(reasonText, 120), reasonText)
      : Object.assign(document.createElement("span"), { textContent: reasonText });
    const actions = document.createElement("div");
    actions.className = "approval-actions";
    if (item.status === "pending") {
      if (isToolCall) {
        const once = document.createElement("button");
        once.type = "button";
        once.textContent = "批准一次";
        once.addEventListener("click", () => resolveApproval(item.id, true, "once"));
        const session = document.createElement("button");
        session.type = "button";
        session.textContent = "本次会话";
        session.addEventListener("click", () => resolveApproval(item.id, true, "session"));
        const always = document.createElement("button");
        always.type = "button";
        always.textContent = "永久允许";
        always.addEventListener("click", () => resolveApproval(item.id, true, "always"));
        const reject = document.createElement("button");
        reject.type = "button";
        reject.textContent = "拒绝";
        reject.addEventListener("click", () => resolveApproval(item.id, false));
        actions.append(once, session, always, reject);
      } else {
        const approve = document.createElement("button");
        approve.type = "button";
        approve.textContent = "批准";
        approve.addEventListener("click", () => resolveApproval(item.id, true));
        const reject = document.createElement("button");
        reject.type = "button";
        reject.textContent = "拒绝";
        reject.addEventListener("click", () => resolveApproval(item.id, false));
        actions.append(approve, reject);
      }
    } else {
      const status = document.createElement("time");
      status.textContent = item.status || "已处理";
      actions.appendChild(status);
    }
    row.append(title, reason, actions);
    return row;
  });
  if (!approvals.length) approvalList.innerHTML = '<div class="memory-item">暂无审批记录</div>';

  scheduledTaskList.innerHTML = "";
  const scheduled = Array.isArray(state.scheduled_tasks) ? state.scheduled_tasks.slice(0, 20) : [];
  scheduled.forEach((item) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const title = document.createElement("strong");
    const mode = item.auto_run === false ? "审批" : "自动";
    title.textContent = `${item.status || "active"} · ${mode} · ${item.title || "定时任务"}`;
    const detailText = [item.prompt, item.last_result, item.last_error]
      .filter(Boolean)
      .map((value) => String(value))
      .join("\n\n");
    const prompt = detailText.length > 160
      ? detailRow(`任务内容：${truncateText(item.prompt || detailText, 100)}`, detailText)
      : Object.assign(document.createElement("span"), { textContent: item.prompt || detailText || "" });
    const time = document.createElement("time");
    time.textContent = item.run_at_iso ? formatReminderTime(item.run_at_iso) : "";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "取消";
    button.addEventListener("click", () => cancelScheduledTask(item.id));
    row.append(title, prompt, time, button);
    scheduledTaskList.appendChild(row);
  });
  if (!scheduled.length) scheduledTaskList.innerHTML = '<div class="memory-item">暂无定时任务</div>';

  integrationList.innerHTML = "";
  const integrations = Array.isArray(state.integrations) ? state.integrations.slice(0, 20) : [];
  integrations.forEach((item) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const title = document.createElement("strong");
    title.textContent = `${item.name} · ${item.method}`;
    const url = document.createElement("span");
    url.textContent = item.url || "";
    const headerNames = Object.keys(item.headers || {});
    let headers = null;
    if (headerNames.length) {
      headers = document.createElement("small");
      headers.textContent = `Headers: ${headerNames.join(", ")}`;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "删除";
    button.addEventListener("click", () => deleteIntegration(item.id));
    const parts = [title, url, button];
    if (headers) parts.splice(2, 0, headers);
    row.append(...parts);
    integrationList.appendChild(row);
  });
  if (!integrations.length) integrationList.innerHTML = '<div class="memory-item">暂无外部集成</div>';

  const pendingCount = (Array.isArray(state.pending_approvals) ? state.pending_approvals : []).filter(
    (item) => item.status === "pending"
  ).length;
  const tasksNav = document.querySelector('.side-nav button[data-side-nav="tasks"]');
  if (tasksNav) tasksNav.textContent = pendingCount ? `任务 ${pendingCount}` : "任务";
}

function renderSkillWorkspacePanels() {
  skillList.innerHTML = "";
  (state.skills || []).forEach((item) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const name = document.createElement("strong");
    name.textContent = item.name || "Skill";
    const contentText = item.content || "";
    const content = contentText.length > 160
      ? detailRow(`Skill 内容：${truncateText(contentText, 100)}`, contentText)
      : Object.assign(document.createElement("span"), { textContent: contentText });
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "删除";
    button.addEventListener("click", () => deleteSkill(item.id));
    row.append(name, content, button);
    skillList.appendChild(row);
  });
  if (!(state.skills || []).length) skillList.innerHTML = '<div class="memory-item">暂无 Skill</div>';

  workspaceList.innerHTML = "";
  (state.workspaces || []).forEach((item) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const name = document.createElement("strong");
    name.textContent = `${item.name}${item.id === state.active_workspace ? "（当前）" : ""}`;
    const pathText = item.path || "";
    const path = pathText.length > 120
      ? detailRow(`路径：${truncateText(pathText, 80)}`, pathText)
      : Object.assign(document.createElement("span"), { textContent: pathText });
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "切换";
    button.addEventListener("click", () => switchWorkspace(item.id));
    row.append(name, path, button);
    workspaceList.appendChild(row);
  });
  if (!(state.workspaces || []).length) workspaceList.innerHTML = '<div class="memory-item">暂无隔离工作区</div>';
}

async function loadSkillsAndWorkspaces() {
  const [skills, workspaces] = await Promise.all([
    fetchJson("/api/skills"),
    fetchJson("/api/workspaces"),
  ]);
  state.skills = skills.skills || [];
  state.workspaces = workspaces.workspaces || [];
  state.active_workspace = workspaces.active_workspace || "";
  renderSkillWorkspacePanels();
}

async function addSkill() {
  const name = skillName.value.trim();
  const content = skillContent.value.trim();
  if (!name || !content) {
    showToast("请填写 Skill 名称和内容。");
    return;
  }
  try {
    const data = await fetchJson("/api/skills", {
      method: "POST",
      body: JSON.stringify({ name, content }),
    });
    state.skills = data.skills || [];
    skillName.value = "";
    skillContent.value = "";
    renderSkillWorkspacePanels();
    showToast("Skill 已添加。");
  } catch (error) {
    showToast(error.message);
  }
}

async function deleteSkill(id) {
  try {
    const data = await fetchJson("/api/skills/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    state.skills = data.skills || [];
    renderSkillWorkspacePanels();
  } catch (error) {
    showToast(error.message);
  }
}

async function createWorkspace() {
  const name = workspaceName.value.trim();
  if (!name) {
    showToast("请输入工作区名称。");
    return;
  }
  try {
    const data = await fetchJson("/api/workspaces", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    state.workspaces = data.workspaces || [];
    state.active_workspace = data.active_workspace || "";
    workspaceName.value = "";
    renderSkillWorkspacePanels();
    showToast("隔离工作区已创建并切换。");
  } catch (error) {
    showToast(error.message);
  }
}

async function switchWorkspace(id) {
  try {
    const data = await fetchJson("/api/workspaces/switch", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    state.workspaces = data.workspaces || [];
    state.active_workspace = data.active_workspace || "";
    renderSkillWorkspacePanels();
    showToast("已切换工作区。");
  } catch (error) {
    showToast(error.message);
  }
}

async function loadTaskAndAudit() {
  const [plan, audit, backups, approvals, scheduled, integrations] = await Promise.all([
    fetchJson("/api/plan"),
    fetchJson("/api/audit"),
    fetchJson("/api/backups"),
    fetchJson("/api/approvals"),
    fetchJson("/api/scheduled-tasks"),
    fetchJson("/api/integrations"),
  ]);
  state.task_plan = plan.task_plan || null;
  state.audit_log = audit.audit_log || [];
  state.file_backups = backups.backups || [];
  state.pending_approvals = approvals.approvals || [];
  state.scheduled_tasks = scheduled.scheduled_tasks || [];
  state.integrations = integrations.integrations || [];
  renderTaskAndAudit();
  checkPendingApprovals();
  loadGuiStatus();
  loadDiagnostics();
  loadBrowserDownloads();
  loadIntegrationTemplates();
}

async function loadIntegrationTemplates() {
  try {
    const data = await fetchJson("/api/integrations/templates");
    integrationTemplateSelect.innerHTML = '<option value="">选择模板</option>';
    (data.templates || []).forEach((template) => {
      const option = document.createElement("option");
      option.value = template.name || "";
      option.textContent = template.name || "未命名模板";
      option.dataset.url = template.url || "";
      option.dataset.method = template.method || "GET";
      option.dataset.headers = JSON.stringify(template.headers || {});
      integrationTemplateSelect.appendChild(option);
    });
  } catch (error) {
    // Templates are optional; the manual form remains usable.
  }
}

function renderSecrets(names) {
  secretList.innerHTML = "";
  const items = Array.isArray(names) ? names : [];
  if (!items.length) {
    secretList.innerHTML = '<div class="memory-item">暂无已保存密钥</div>';
    return;
  }
  items.forEach((name) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const text = document.createElement("strong");
    text.textContent = name;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "删除";
    button.addEventListener("click", async () => {
      try {
        await fetchJson("/api/secrets/delete", {
          method: "POST",
          body: JSON.stringify({ name }),
        });
        await loadSecrets();
        showToast("密钥已删除。");
      } catch (error) {
        showToast(error.message);
      }
    });
    row.append(text, button);
    secretList.appendChild(row);
  });
}

async function loadSecrets() {
  try {
    const data = await fetchJson("/api/secrets");
    renderSecrets(data.names || []);
  } catch (error) {
    secretList.innerHTML = '<div class="memory-item">密钥列表加载失败</div>';
  }
}

async function saveSecret() {
  const name = secretName.value.trim();
  const value = secretValue.value.trim();
  if (!name || !value) {
    showToast("请输入密钥名称和值。");
    return;
  }
  try {
    await fetchJson("/api/secrets", {
      method: "POST",
      body: JSON.stringify({ name, value }),
    });
    secretName.value = "";
    secretValue.value = "";
    await loadSecrets();
    showToast("密钥已保存，不会在列表中显示明文。");
  } catch (error) {
    showToast(error.message);
  }
}

async function loadGuiStatus() {
  try {
    const data = await fetchJson("/api/gui/status");
    guiStatusInfo.innerHTML = [
      ["SafariDriver", data.safaridriver ? "已安装" : "未安装"],
      ["Selenium", data.selenium ? "已安装" : "未安装"],
      ["辅助功能", data.accessibility_ready ? "已授权" : "未授权"],
      ["浏览器自动化", data.browser_automation_ready ? "可启用" : "需配置"],
    ]
      .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`)
      .join("");
  } catch (error) {
    guiStatusInfo.innerHTML = '<dt>状态</dt><dd>暂不可用</dd>';
  }
}

async function loadReadiness() {
  try {
    const data = await fetchJson("/api/readiness");
    const screen = data.screen_recording || {};
    const accessibility = data.accessibility || {};
    const safari = data.safaridriver || {};
    const wechat = data.wechat || {};
    const rows = [
      ["屏幕录制", screen.ready ? "已授权" : `需要授权：${screen.process || "Python"}`],
      ["辅助功能", accessibility.ready ? "已授权" : `需要授权：${accessibility.process || "Python"}`],
      ["SafariDriver", safari.running ? "运行中" : safari.installed ? "已安装未运行" : "未安装"],
      ["微信", wechat.running ? "运行中" : wechat.installed ? "已安装未运行" : "未安装"],
      ["微信登录状态", wechat.logged_in === "unknown" ? "无法自动检测" : wechat.logged_in ? "已登录" : "未登录"],
    ]
      .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`)
      .join("");
    readinessInfo.innerHTML = rows;
  } catch (error) {
    readinessInfo.innerHTML = "<dt>状态</dt><dd>检测失败</dd>";
  }
}

async function loadDiagnostics() {
  try {
    const data = await fetchJson("/api/diagnostics");
    diagnosticsInfo.innerHTML = [
      ["绝对时间任务", data.absolute_time_tasks ? "可用" : "不可用"],
      ["自动化审批", data.automation_approvals ? "可用" : "不可用"],
      ["浏览器下载", data.browser_downloads ? "可用" : "不可用"],
      ["集成模板", data.integration_templates ? "可用" : "不可用"],
      ["自动执行", data.scheduled_auto_run ? "开启" : "关闭"],
      ["SafariDriver", data.safaridriver ? "已安装" : "未安装"],
      ["Embedding", data.embedding_available ? "可用" : "不可用"],
      ["辅助功能", data.accessibility_ready ? "已授权" : "未授权"],
    ]
      .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`)
      .join("");
  } catch (error) {
    diagnosticsInfo.innerHTML = '<dt>状态</dt><dd>暂不可用</dd>';
  }
}

async function loadBrowserDownloads() {
  const filter = browserDownloadFilter.value.trim();
  const query = filter ? `?ext=${encodeURIComponent(filter)}` : "";
  try {
    const data = await fetchJson(`/api/browser/downloads${query}`);
    browserDownloadList.innerHTML = "";
    (data.downloads || []).forEach((item) => {
      const row = document.createElement("div");
      row.className = "memory-item";
      const name = document.createElement("strong");
      name.textContent = item.filename;
      const meta = document.createElement("time");
      meta.textContent = `${formatFileSize(item.size || 0)} · ${formatReminderTime(item.modified)}`;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "删除";
      button.addEventListener("click", () => deleteBrowserDownload(item.filename));
      row.append(name, meta, button);
      browserDownloadList.appendChild(row);
    });
  } catch (error) {
    browserDownloadList.innerHTML = `<div class="memory-item">下载列表加载失败：${escapeHtml(error.message)}</div>`;
  }
}

async function deleteBrowserDownload(filename) {
  try {
    await fetchJson("/api/browser/downloads/delete", {
      method: "POST",
      body: JSON.stringify({ filename }),
    });
    await loadBrowserDownloads();
  } catch (error) {
    showToast(error.message);
  }
}

async function clearTaskPlan() {
  try {
    await fetchJson("/api/plan/clear", { method: "POST" });
    state.task_plan = null;
    renderTaskAndAudit();
    showToast("任务计划已清除。");
  } catch (error) {
    showToast(error.message);
  }
}

async function clearAuditLog() {
  try {
    await fetchJson("/api/audit/clear", { method: "POST" });
    state.audit_log = [];
    renderTaskAndAudit();
    showToast("操作日志已清空。");
  } catch (error) {
    showToast(error.message);
  }
}

async function restoreBackup(id) {
  try {
    const data = await fetchJson("/api/backups/restore", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    state.file_backups = data.backups || [];
    renderTaskAndAudit();
    showToast("文件已恢复。");
  } catch (error) {
    showToast(error.message);
  }
}

async function clearBackups() {
  try {
    await fetchJson("/api/backups/clear", { method: "POST" });
    state.file_backups = [];
    renderTaskAndAudit();
    showToast("文件备份已清空。");
  } catch (error) {
    showToast(error.message);
  }
}

async function undoLatestBackup() {
  try {
    const data = await fetchJson("/api/backups/undo-latest", { method: "POST" });
    state.file_backups = data.backups || [];
    renderTaskAndAudit();
    showToast("最近一次文件操作已撤销。");
  } catch (error) {
    showToast(error.message);
  }
}

async function searchMemory() {
  const query = memorySearchInput.value.trim();
  if (!query) {
    showToast("请输入搜索内容。");
    return;
  }
  memorySearchBtn.disabled = true;
  memorySearchResults.innerHTML = "";
  try {
    const data = await fetchJson(`/api/search?q=${encodeURIComponent(query)}`);
    const results = data.results || [];
    if (!results.length) {
      memorySearchResults.innerHTML = '<div class="memory-item">没有找到相关内容。</div>';
      return;
    }
    results.forEach((item) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const title = document.createElement("strong");
    title.textContent = item.type || "记忆";
    const contentText = item.content || "";
    const content = contentText.length > 160
      ? detailRow(truncateText(contentText, 120), contentText)
      : Object.assign(document.createElement("span"), { textContent: contentText });
      const score = document.createElement("time");
      score.textContent = `相关度 ${item.score ?? ""}`;
      row.append(title, content, score);
      memorySearchResults.appendChild(row);
    });
  } catch (error) {
    memorySearchResults.innerHTML = `<div class="memory-item">搜索失败：${escapeHtml(error.message)}</div>`;
  } finally {
    memorySearchBtn.disabled = false;
  }
}

async function resolveApproval(id, approved, scope = "once") {
  try {
    const path = approved ? "/api/approvals/approve" : "/api/approvals/reject";
    const data = await fetchJson(path, {
      method: "POST",
      body: JSON.stringify({ id, scope }),
    });
    state.pending_approvals = data.approvals || [];
    notifiedApprovals.delete(id);
    saveNotifiedApprovals();
    renderTaskAndAudit();
    const result = data.result || {};
    if (approved && result?.error) {
      showToast(`执行失败：${result.error}`);
    } else if (approved) {
      showToast(scope === "once" ? "操作已批准并执行。" : `已批准并加入${scope === "session" ? "本次会话" : "永久"}授权。`);
    } else {
      showToast("操作已拒绝。");
    }
  } catch (error) {
    showToast(error.message);
  }
}

async function requestAutomation() {
  const actionType = automationActionType.value;
  const target = automationTarget.value.trim();
  if (!target) {
    showToast("请填写自动化动作目标。");
    return;
  }
  try {
    const data = await fetchJson("/api/approvals/request", {
      method: "POST",
      body: JSON.stringify({ action_type: actionType, target }),
    });
    state.pending_approvals = data.approvals || [];
    automationTarget.value = "";
    renderTaskAndAudit();
    showToast("已创建待审批动作。");
  } catch (error) {
    automationResult.textContent = `创建失败：${error.message}`;
    showToast(error.message);
  }
}

async function addScheduledTask() {
  const title = scheduledTaskTitle.value.trim();
  const prompt = scheduledTaskPrompt.value.trim();
  const minutes = Number(scheduledTaskMinutes.value);
  const priority = scheduledTaskPriority.value;
  const maxRetries = Number(scheduledTaskRetries.value);
  const dependsOn = scheduledTaskDependsOn.value.trim();
  const atValue = scheduledTaskAt.value;
  const autoRun = scheduledTaskAutoRun.checked;
  if (!title || !prompt) {
    showToast("请填写任务标题和指令。");
    return;
  }
  if (!Number.isFinite(minutes) || minutes < 1) {
    showToast("执行时间至少为 1 分钟。");
    return;
  }
  if (!Number.isInteger(maxRetries) || maxRetries < 0 || maxRetries > 5) {
    showToast("重试次数需在 0 到 5 之间。");
    return;
  }
  try {
    const payload = atValue
      ? { title, prompt, run_at: atValue, auto_run: autoRun }
      : { title, prompt, minutes, priority, max_retries: maxRetries, depends_on: dependsOn, auto_run: autoRun };
    const data = await fetchJson(atValue ? "/api/scheduled-tasks/at" : "/api/scheduled-tasks", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    state.scheduled_tasks = data.scheduled_tasks || [];
    scheduledTaskTitle.value = "";
    scheduledTaskPrompt.value = "";
    scheduledTaskDependsOn.value = "";
    scheduledTaskAt.value = "";
    renderTaskAndAudit();
    showToast(autoRun ? "定时任务已创建，到点自动执行。" : "定时任务已创建，到点后进入审批。");
  } catch (error) {
    showToast(error.message);
  }
}

async function cancelScheduledTask(id) {
  try {
    const data = await fetchJson("/api/scheduled-tasks/cancel", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    state.scheduled_tasks = data.scheduled_tasks || [];
    renderTaskAndAudit();
    showToast("定时任务已取消。");
  } catch (error) {
    showToast(error.message);
  }
}

async function addIntegration() {
  const name = integrationName.value.trim();
  const url = integrationUrl.value.trim();
  const method = integrationMethod.value;
  let headers = {};
  try {
    headers = JSON.parse(integrationHeaders.value.trim() || "{}");
  } catch (error) {
    showToast("请求头必须是合法 JSON。");
    return;
  }
  if (!headers || typeof headers !== "object" || Array.isArray(headers)) {
    showToast("请求头必须是 JSON 对象。");
    return;
  }
  if (!name || !url) {
    showToast("请填写集成名称和网址。");
    return;
  }
  try {
    const data = await fetchJson("/api/integrations", {
      method: "POST",
      body: JSON.stringify({ name, url, method, headers }),
    });
    state.integrations = data.integrations || [];
    integrationName.value = "";
    integrationUrl.value = "";
    integrationHeaders.value = "";
    renderTaskAndAudit();
    showToast("外部集成已添加。");
  } catch (error) {
    showToast(error.message);
  }
}

async function deleteIntegration(id) {
  try {
    const data = await fetchJson("/api/integrations/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    state.integrations = data.integrations || [];
    renderTaskAndAudit();
    showToast("外部集成已删除。");
  } catch (error) {
    showToast(error.message);
  }
}

function saveNotifiedReminders() {
  localStorage.setItem("monday_notified_reminders", JSON.stringify([...notifiedReminders]));
}

function saveNotifiedApprovals() {
  localStorage.setItem("monday_notified_approvals", JSON.stringify([...notifiedApprovals]));
}

function ensureNotificationPermission() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission().catch(() => {});
  }
}

function checkPendingApprovals() {
  const approvals = Array.isArray(state.pending_approvals)
    ? state.pending_approvals.filter((item) => item.status === "pending")
    : [];
  approvals.forEach((item) => {
    if (notifiedApprovals.has(item.id)) return;
    notifiedApprovals.add(item.id);
    saveNotifiedApprovals();
    const message = `星期一有待审批操作：${item.action_type || "操作"} ${item.target || ""}`;
    speak(message);
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("星期一待审批", { body: message });
    }
  });
}

function checkDueReminders() {
  const reminders = Array.isArray(state.reminders) ? state.reminders : [];
  reminders.forEach((reminder) => {
    const dueAt = reminder.due_at ? new Date(reminder.due_at) : null;
    if (!dueAt || dueAt.getTime() > Date.now()) return;
    if (notifiedReminders.has(reminder.id)) return;
    notifiedReminders.add(reminder.id);
    saveNotifiedReminders();
    const message = `星期一提醒：${reminder.message}`;
    speak(message);
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("星期一提醒", { body: reminder.message });
    }
  });
}

async function loadMemoryData() {
  const [memory, reminders] = await Promise.all([
    fetchJson("/api/memory"),
    fetchJson("/api/reminders"),
  ]);
  state.facts = (memory.facts || []).map((item) => item.content);
  state.notes = (memory.notes || []).map((item) => item.content);
  state.knowledge = memory.knowledge || [];
  state.reminders = reminders.reminders || [];
  state.reminder_history = reminders.history || [];
  renderMemoryAndReminders();
  checkDueReminders();
}

async function deleteMemoryItem(kind, index) {
  try {
    const data = await fetchJson("/api/memory/delete", {
      method: "POST",
      body: JSON.stringify({ kind, index }),
    });
    if (data.memory) {
      state.facts = data.memory.facts.map((item) => item.content);
      state.notes = data.memory.notes.map((item) => item.content);
      state.knowledge = data.memory.knowledge;
    }
    renderMemoryAndReminders();
    showToast("记忆已删除。");
  } catch (error) {
    showToast(error.message);
  }
}

async function clearMemory(kind) {
  try {
    const data = await fetchJson("/api/memory/clear", {
      method: "POST",
      body: JSON.stringify({ kind }),
    });
    if (data.memory) {
      state.facts = data.memory.facts.map((item) => item.content);
      state.notes = data.memory.notes.map((item) => item.content);
      state.knowledge = data.memory.knowledge;
    }
    renderMemoryAndReminders();
    showToast(kind === "all" ? "长期记忆已清空。" : "已清空所选记忆。");
  } catch (error) {
    showToast(error.message);
  }
}

async function addReminder() {
  const message = reminderMessage.value.trim();
  const minutes = Number(reminderMinutes.value);
  if (!message) {
    showToast("请输入提醒内容。");
    return;
  }
  if (!Number.isFinite(minutes) || minutes < 1 || minutes > 43200) {
    showToast("提醒时间需在 1 到 43200 分钟之间。");
    return;
  }
  try {
    const data = await fetchJson("/api/reminders", {
      method: "POST",
      body: JSON.stringify({ message, minutes }),
    });
    state.reminders = data.overview?.reminders || [];
    state.reminder_history = data.overview?.history || [];
    reminderMessage.value = "";
    renderMemoryAndReminders();
    showToast("提醒已添加。");
  } catch (error) {
    showToast(error.message);
  }
}

async function acknowledgeReminder(id) {
  try {
    const data = await fetchJson("/api/reminders/ack", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    state.reminders = data.overview?.reminders || [];
    state.reminder_history = data.overview?.history || [];
    notifiedReminders.delete(id);
    saveNotifiedReminders();
    renderMemoryAndReminders();
    showToast("提醒已完成。");
  } catch (error) {
    showToast(error.message);
  }
}

async function deleteReminder(id) {
  try {
    const data = await fetchJson("/api/reminders/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    state.reminders = data.overview?.reminders || [];
    state.reminder_history = data.overview?.history || [];
    notifiedReminders.delete(id);
    saveNotifiedReminders();
    renderMemoryAndReminders();
    showToast("提醒已移除。");
  } catch (error) {
    showToast(error.message);
  }
}

async function clearReminderHistory() {
  try {
    const data = await fetchJson("/api/reminders/clear-history", {
      method: "POST",
    });
    state.reminder_history = data.overview?.history || [];
    renderMemoryAndReminders();
    showToast("完成记录已清空。");
  } catch (error) {
    showToast(error.message);
  }
}

async function loadSuggestion() {
  suggestBtn.disabled = true;
  suggestionResult.textContent = "正在结合当前状态生成建议...";
  try {
    const data = await fetchJson("/api/suggestions");
    suggestionResult.textContent = data.suggestion || "目前不需要主动干预。";
    if (data.autonomy_level) {
      state.settings.autonomy_level = data.autonomy_level;
      updateAutonomyControls();
    }
  } catch (error) {
    suggestionResult.textContent = `建议生成失败：${error.message}`;
  } finally {
    suggestBtn.disabled = false;
  }
}

async function streamChat(message, onDelta, onToolCalls, onMeta, onStatus) {
  const headers = { "Content-Type": "application/json" };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;
  const response = await fetch("/api/chat/stream", {
    method: "POST",
    headers,
    body: JSON.stringify({ message }),
  });
  if (!response.ok || !response.body) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `请求失败：${response.status}`);
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (payload === "[DONE]") return;
      let data;
      try {
        data = JSON.parse(payload);
      } catch (error) {
        continue;
      }
      if (data.error) throw new Error(data.error);
      if (data.status && onStatus) onStatus(data.status);
      if (data.delta) onDelta(data.delta);
      if (Array.isArray(data.tool_calls) && data.tool_calls.length) onToolCalls(data.tool_calls);
      if (
        onMeta &&
        ((Array.isArray(data.tool_details) && data.tool_details.length) ||
          data.plan_pending ||
          data.task_plan)
      ) {
        onMeta({
          tool_details: Array.isArray(data.tool_details) ? data.tool_details : undefined,
          plan_pending: Boolean(data.plan_pending),
          task_plan: data.task_plan,
        });
      }
    }
  }
}

async function sendMessage(message, options = {}) {
  // 主对话入口：发送用户消息，接收 SSE 流式回复并实时渲染。
  const text = (message || messageInput.value).trim();
  if (!text || sending) return;

  sending = true;
  messageInput.value = "";
  autoResize();
  if (!options.skipRenderUser) {
    messagesEl.appendChild(messageNode("user", text));
  }
  const typing = typingNode();
  messagesEl.appendChild(typing);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  setStatus("busy", "星期一正在处理");
  core.classList.add("active");

  try {
    typing.remove();
    const assistantRow = messageNode("assistant", "");
    messagesEl.appendChild(assistantRow);
    const bubble = assistantRow.querySelector(".message-bubble");
    let reply = "";
    let toolCalls = [];
    let meta = null;
    let planCardEl = null;
    let toolDetailsEl = null;
    await streamChat(
      text,
      (delta) => {
        reply += delta;
        bubble.innerHTML = formatMarkdown(reply);
        messagesEl.scrollTop = messagesEl.scrollHeight;
      },
      (calls) => {
        toolCalls = calls;
        const trace = assistantRow.querySelector(".tool-trace") || document.createElement("div");
        trace.className = "tool-trace";
        trace.textContent = `正在调用：${calls.join("、")}`;
        if (!trace.parentElement) assistantRow.querySelector(".message-content").appendChild(trace);
      },
      (incoming) => {
        meta = meta || {};
        if (Array.isArray(incoming.tool_details) && incoming.tool_details.length) {
          meta.tool_details = incoming.tool_details;
        }
        if (incoming.task_plan) {
          meta.task_plan = incoming.task_plan;
        }
        if (incoming.plan_pending) {
          meta.plan_pending = true;
        }
        const contentWrap = assistantRow.querySelector(".message-content");
        // 计划待批准：渲染计划卡片（只渲染一次）。
        if (meta.plan_pending && meta.task_plan && !planCardEl) {
          planCardEl = planCard({ ...meta.task_plan, approved: false });
          contentWrap.insertBefore(planCardEl, contentWrap.querySelector(".message-bubble"));
          messagesEl.scrollTop = messagesEl.scrollHeight;
        }
        // 工具明细：实时刷新。
        if (Array.isArray(meta.tool_details) && meta.tool_details.length) {
          if (toolDetailsEl) toolDetailsEl.remove();
          toolDetailsEl = toolDetailsBlock(meta.tool_details);
          contentWrap.appendChild(toolDetailsEl);
          messagesEl.scrollTop = messagesEl.scrollHeight;
        }
      },
      (status) => {
        setStatus("busy", status.message || "星期一正在处理");
      }
    );
    if (reply) {
      bubble.innerHTML = collapseAssistantReply(reply);
    } else if (meta && meta.plan_pending) {
      bubble.innerHTML = "<p>已生成执行计划，请确认后再执行。</p>";
    }
    state = await fetchJson("/api/state");
    if (toolCalls.length) {
      showToast(`任务完成，已调用：${toolCalls.join("、")}`);
    }
    renderMemoryAndReminders();
    renderTaskAndAudit();
    checkDueReminders();
    if (reply) speak(reply);
    setStatus("online", "Ollama 已连接");
  } catch (error) {
    typing.remove();
    messagesEl.appendChild(messageNode("assistant", `处理失败：${error.message}`));
    setStatus("offline", "处理失败");
    showToast(error.message);
  } finally {
    sending = false;
    core.classList.remove("active", "speaking");
    messagesEl.scrollTop = messagesEl.scrollHeight;
    messageInput.focus();
  }
}

function autoResize() {
  messageInput.style.height = "auto";
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 150)}px`;
}

function updateVoiceButton() {
  const enabled = state.settings.voice_enabled;
  voiceToggle.classList.toggle("active", enabled);
  voiceToggle.innerHTML = `<i data-lucide="${enabled ? "volume-2" : "volume-x"}"></i>`;
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateWakeButton() {
  const enabled = state.settings.wake_word_enabled && Boolean(wakeListening);
  wakeToggle.classList.toggle("active", enabled);
  wakeToggle.innerHTML = `<i data-lucide="${enabled ? "audio-lines" : "audio-lines"}"></i>`;
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateAgentButton() {
  const enabled = state.settings.agent_mode === "codex";
  agentToggle.classList.toggle("active", enabled);
  agentToggle.innerHTML = `<i data-lucide="${enabled ? "code-2" : "code-2"}"></i>`;
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updatePlanModeButton() {
  const enabled = Boolean(state.settings.plan_mode);
  planModeToggle.classList.toggle("active", enabled);
  planModeToggle.title = enabled
    ? "计划先审已开启：复杂任务先展示计划，批准后才执行"
    : "计划先审已关闭：复杂任务直接执行";
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateAutoRunButton() {
  const enabled = Boolean(state.settings.scheduled_auto_run);
  autoRunScheduledToggle.textContent = `自动执行：${enabled ? "开" : "关"}`;
  autoRunScheduledToggle.classList.toggle("active", enabled);
}

function updateAutonomyControls() {
  const level = state.settings.autonomy_level || "assisted";
  if (["safe", "assisted", "supervised"].includes(level)) {
    autonomySelect.value = level;
  }
}

function speak(text) {
  if (!state.settings.voice_enabled || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 1;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const zhVoice =
    voices.find((voice) => voice.lang.toLowerCase().startsWith("zh")) ||
    voices.find((voice) => voice.lang.toLowerCase().includes("zh"));
  if (zhVoice) {
    utterance.voice = zhVoice;
  }
  utterance.onstart = () => {
    speaking = true;
    core.classList.add("speaking");
  };
  utterance.onend = () => {
    speaking = false;
    core.classList.remove("speaking");
  };
  window.speechSynthesis.speak(utterance);
}

async function speakWakeBriefing() {
  if (wakeBriefingSpoken || sending) return;
  wakeBriefingSpoken = true;
  try {
    const data = await fetchJson("/api/suggestions");
    const text = data.suggestion || "我在，请说。";
    speak(text);
  } catch (error) {
    speak("我在，请说。");
  }
}

function setVisionPreviewText(message) {
  visionPreview.hidden = false;
  visionPreview.textContent = message;
  visionImage.hidden = true;
  visionVideo.hidden = true;
}

function showVisionImage(dataUrl) {
  visionImageData = dataUrl;
  visionPreview.hidden = true;
  visionVideo.hidden = true;
  visionImage.hidden = false;
  visionImage.src = dataUrl;
  visionCaptureBtn.hidden = true;
  visionResult.textContent = "";
}

function stopVisionCamera() {
  visionCameraActive = false;
  visionCameraBtn.textContent = "摄像头";
  visionCaptureBtn.hidden = true;
  visionVideo.hidden = true;
  visionVideo.srcObject = null;
  if (activeCameraStream) {
    stopCamera();
  }
}

async function openVisionCamera() {
  if (visionCameraActive) {
    stopVisionCamera();
    setVisionPreviewText("上传图片或打开摄像头，可让支持视觉的模型分析内容。");
    return;
  }
  try {
    await startCamera(visionVideo);
    visionCameraActive = true;
    visionCameraBtn.textContent = "关闭";
    visionCaptureBtn.hidden = false;
    visionPreview.hidden = true;
    visionImage.hidden = true;
    visionResult.textContent = "";
    showToast("摄像头已打开，点击“拍一张”后分析。");
  } catch (error) {
    showToast(error.message);
  }
}

function captureVisionFrame() {
  if (!visionCameraActive || !visionVideo.videoWidth) {
    showToast("请先打开摄像头。");
    return;
  }
  visionCanvas.width = visionVideo.videoWidth;
  visionCanvas.height = visionVideo.videoHeight;
  const context = visionCanvas.getContext("2d");
  context.drawImage(visionVideo, 0, 0, visionCanvas.width, visionCanvas.height);
  showVisionImage(visionCanvas.toDataURL("image/jpeg", 0.88));
}

async function analyzeVisionImage() {
  if (!visionImageData) {
    showToast("请先上传图片或拍摄一张。");
    return;
  }
  const question = visionQuestion.value.trim() || "请描述图片中的主要内容。";
  visionAnalyzeBtn.disabled = true;
  visionResult.textContent = "正在分析图片...";
  try {
    const result = await fetchJson("/api/vision", {
      method: "POST",
      body: JSON.stringify({ image_data: visionImageData, question }),
    });
    visionResult.textContent = result.reply || result.error || "没有返回内容。";
  } catch (error) {
    visionResult.textContent = `分析失败：${error.message}`;
  } finally {
    visionAnalyzeBtn.disabled = false;
  }
}

async function runScreenOcr() {
  setStatus("busy", "正在识别屏幕文字");
  try {
    const data = await fetchJson("/api/screen/ocr");
    if (data.error) throw new Error(data.error);
    const text = data.text || "未识别到文字";
    setVisionPreviewText(`屏幕文字（${(data.lines || []).length} 行）`);
    visionResult.textContent = text;
    showToast("屏幕文字识别完成。");
  } catch (error) {
    visionResult.textContent = `OCR 失败：${error.message}`;
    showToast(error.message);
  } finally {
    setStatus("online", "在线");
  }
}

async function runImageOcr() {
  if (!visionImageData) {
    showToast("请先上传图片或拍摄一张。");
    return;
  }
  try {
    const data = await fetchJson("/api/ocr", {
      method: "POST",
      body: JSON.stringify({ image_data: visionImageData }),
    });
    if (data.error) throw new Error(data.error);
    visionResult.textContent = data.text || "未识别到文字";
    showToast("图片文字识别完成。");
  } catch (error) {
    visionResult.textContent = `OCR 失败：${error.message}`;
    showToast(error.message);
  }
}

function handleVisionFile(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showToast("请选择图片文件。");
    return;
  }
  if (file.size > 8 * 1024 * 1024) {
    showToast("图片超过 8 MB，请换一张。");
    return;
  }
  stopVisionCamera();
  const reader = new FileReader();
  reader.onload = () => showVisionImage(String(reader.result || ""));
  reader.onerror = () => showToast("图片读取失败。");
  reader.readAsDataURL(file);
}

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    micBtn.style.display = "none";
    wakeToggle.style.display = "none";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    listening = true;
    micBtn.classList.add("active");
    core.classList.add("active");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    messageInput.value = transcript;
    autoResize();
    sendMessage(transcript);
  };

  recognition.onerror = (event) => {
    showToast(`语音识别失败：${event.error}`);
  };

  recognition.onend = () => {
    listening = false;
    micBtn.classList.remove("active");
    if (!sending && !speaking) {
      core.classList.remove("active");
    }
  };
}

function normalizeSpokenText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[，。！？、,.!?！？\s]/g, "");
}

function extractWakeCommand(text) {
  const normalized = normalizeSpokenText(text);
  const wakeWords = ["星期一", "嘿星期一", "嗨星期一", "贾维斯", "jarvis"];
  for (const word of wakeWords) {
    if (normalized.includes(word)) {
      return text.replace(new RegExp(word, "gi"), "").trim();
    }
  }
  return "";
}

function startWakeRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition || wakeListening) return;

  if (recognition && listening) {
    recognition.stop();
  }

  wakeRecognition = new SpeechRecognition();
  wakeRecognition.lang = "zh-CN";
  wakeRecognition.continuous = true;
  wakeRecognition.interimResults = true;
  wakeRecognition.maxAlternatives = 1;
  wakeCommandMode = false;
  wakeBriefingSpoken = false;

  wakeRecognition.onstart = () => {
    wakeListening = true;
    updateWakeButton();
    core.classList.add("listening");
    setStatus("online", "等待唤醒：说“星期一”");
  };

  wakeRecognition.onresult = (event) => {
    const result = event.results[event.resultIndex];
    const text = result[0].transcript.trim();
    if (!text) return;

    if (!wakeCommandMode) {
      const command = extractWakeCommand(text);
      if (command || normalizeSpokenText(text).includes("星期一")) {
        wakeCommandMode = true;
        setStatus("busy", "已唤醒，请说指令");
        if (command) {
          messageInput.value = command;
          autoResize();
        } else {
          speakWakeBriefing();
        }
      }
      return;
    }

    if (result.isFinal) {
      const command = (extractWakeCommand(text) || text).trim();
      if (command) {
        setStatus("busy", "正在处理语音指令");
        sendMessage(command);
      }
      wakeCommandMode = false;
      restartWakeRecognition();
    } else {
      messageInput.value = text;
      autoResize();
      setStatus("busy", `正在识别：${text}`);
    }
  };

  wakeRecognition.onerror = (event) => {
    if (event.error === "not-allowed") {
      showToast("唤醒监听需要麦克风权限。");
      stopWakeRecognition();
      return;
    }
    if (event.error === "no-speech") {
      setStatus("online", "没有听到声音，继续等待唤醒");
      return;
    }
    if (wakeListening) {
      setStatus("online", `唤醒监听中断：${event.error}`);
      restartWakeRecognition();
    }
  };

  wakeRecognition.onend = () => {
    if (!wakeListening) return;
    wakeListening = false;
    core.classList.remove("listening");
    updateWakeButton();
    if (state.settings.wake_word_enabled) {
      restartWakeRecognition();
    } else {
      setStatus("online", "Ollama 已连接");
    }
  };

  wakeRecognition.start();
}

function stopWakeRecognition() {
  if (wakeRecognition) {
    wakeRecognition.onend = null;
    wakeRecognition.onerror = null;
    wakeRecognition.stop();
    wakeRecognition = null;
  }
  wakeListening = false;
  wakeCommandMode = false;
  core.classList.remove("listening");
  updateWakeButton();
}

function restartWakeRecognition() {
  stopWakeRecognition();
  window.setTimeout(() => {
    if (state.settings.wake_word_enabled) {
      startWakeRecognition();
    }
  }, 260);
}

function setToken(token) {
  authToken = token;
  localStorage.setItem("monday_token", token);
}

function clearAuth() {
  authToken = "";
  localStorage.removeItem("monday_token");
  window.clearInterval(reminderTimer);
  reminderTimer = null;
  stopWakeRecognition();
  stopVisionCamera();
  stopCamera();
  authOverlay.classList.remove("hidden");
  document.body.classList.add("locked");
}

function showApp() {
  authOverlay.classList.add("hidden");
  document.body.classList.remove("locked");
}

function sideGroupForTitle(title) {
  const text = title || "";
  if (
    text.includes("系统") ||
    text.includes("防火墙") ||
    text.includes("GUI") ||
    text.includes("功能自检") ||
    text.includes("自主建议") ||
    text.includes("视觉")
  ) {
    return "status";
  }
  if (text.includes("记忆")) return "memory";
  if (
    text.includes("任务") ||
    text.includes("操作日志") ||
    text.includes("自动化") ||
    text.includes("待审批") ||
    text.includes("定时") ||
    text.includes("工作区")
  ) {
    return "tasks";
  }
  if (
    text.includes("文件备份") ||
    text.includes("文件访问") ||
    text.includes("浏览器下载") ||
    text.includes("外部集成")
  ) {
    return "files";
  }
  if (text.includes("Skill")) return "skills";
  if (text.includes("权限")) return "permissions";
  return "other";
}

function initSideGroups() {
  const panels = document.querySelectorAll(".side-panel > .panel, .side-panel > .core-block");
  panels.forEach((panel) => {
    if (panel.classList.contains("core-block")) {
      panel.dataset.sideGroup = "status";
      return;
    }
    const heading = panel.querySelector(":scope > .panel-heading h2, :scope > h2");
    panel.dataset.sideGroup = sideGroupForTitle(heading ? heading.textContent : "");
  });

  function selectGroup(group) {
    panels.forEach((panel) => {
      panel.classList.toggle("side-group-hidden", group !== "all" && panel.dataset.sideGroup !== group);
    });
    document.querySelectorAll(".side-nav button").forEach((button) => {
      button.classList.toggle("active", button.dataset.sideNav === group);
    });
  }

  document.querySelectorAll(".side-nav button").forEach((button) => {
    button.addEventListener("click", () => selectGroup(button.dataset.sideNav));
  });
  selectGroup("status");
}

function setAuthMode(mode) {
  const setup = mode === "setup";
  authTitle.textContent = setup ? "初始化访问" : "访问验证";
  authHint.textContent = setup
    ? "先创建一个密码，或注册一张人脸。"
    : "密码或人脸验证通过后才能使用星期一。";
  authTabs.hidden = setup;
  passwordAuth.hidden = setup;
  faceAuth.hidden = setup;
  setupPane.hidden = !setup;
  setupFaceVideo.hidden = true;
  if (!setup) {
    showAuthTab("password").catch(() => {});
  } else {
    stopCamera();
  }
}

async function showAuthTab(tab) {
  passwordAuth.hidden = tab !== "password";
  faceAuth.hidden = tab !== "face";
  setupPane.hidden = true;
  authTabs.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.authTab === tab);
  });

  if (tab === "face") {
    faceSubmit.disabled = true;
    faceStatus.textContent = "正在准备人脸识别";
    try {
      await ensureFaceModels();
      if (!faceModelsReady) {
        throw new Error("人脸模型不可用，请使用密码登录。");
      }
      await startCamera(faceVideo);
      faceSubmit.disabled = false;
      faceStatus.textContent = "请正对镜头";
    } catch (error) {
      faceSubmit.disabled = true;
      faceStatus.textContent = error.message;
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
    setupFace.disabled = false;
    setupFaceStatus.textContent = "人脸模型已就绪，点击下方按钮开始注册。";
    return true;
  })().catch((error) => {
    faceModelPromise = null;
    setupFaceStatus.textContent = `人脸模型加载失败：${error.message}`;
    throw error;
  });
  return faceModelPromise;
}

async function startCamera(videoEl) {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("浏览器不支持摄像头访问。");
  }
  if (activeCameraStream) {
    stopCamera();
  }
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 640 },
      height: { ideal: 480 },
      facingMode: "user",
    },
    audio: false,
  });
  activeCameraStream = stream;
  videoEl.srcObject = stream;
  videoEl.hidden = false;
  videoEl.play().catch(() => {});
  await wait(250);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stopCamera() {
  if (activeCameraStream) {
    activeCameraStream.getTracks().forEach((track) => track.stop());
    activeCameraStream = null;
  }
  if (faceVideo) faceVideo.srcObject = null;
  if (setupFaceVideo) {
    setupFaceVideo.srcObject = null;
    setupFaceVideo.hidden = true;
  }
  if (manageFaceVideo) {
    manageFaceVideo.srcObject = null;
    manageFaceVideo.hidden = true;
  }
}

async function captureFaceDescriptor(videoEl) {
  if (!faceModelsReady) {
    throw new Error("人脸模型尚未就绪。");
  }
  const detection = await window.faceapi
    .detectSingleFace(
      videoEl,
      new window.faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
    )
    .withFaceLandmarks()
    .withFaceDescriptor();
  if (!detection) {
    throw new Error("没有检测到人脸，请正对镜头。");
  }
  return Array.from(detection.descriptor);
}

async function loginPassword() {
  const password = passwordInput.value.trim();
  if (!password) {
    showToast("请输入密码。");
    return;
  }
  try {
    const data = await fetchJson("/api/auth/password", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    setToken(data.token);
    passwordInput.value = "";
    await enterApp();
  } catch (error) {
    showToast(error.message);
  }
}

async function loginFace() {
  try {
    faceStatus.textContent = "正在识别";
    await wait(600);
    const descriptor = await captureFaceDescriptor(faceVideo);
    const data = await fetchJson("/api/auth/face", {
      method: "POST",
      body: JSON.stringify({ descriptor }),
    });
    setToken(data.token);
    await enterApp();
  } catch (error) {
    faceStatus.textContent = error.message;
  }
}

async function setupAccess() {
  const password = setupPassword.value.trim();
  if (!password) {
    showToast("请先设置一个密码。");
    return;
  }
  try {
    const data = await fetchJson("/api/auth/setup", {
      method: "POST",
      body: JSON.stringify({ password, password_name: "主密码" }),
    });
    setToken(data.token);
    setupPassword.value = "";
    await enterApp();
  } catch (error) {
    showToast(error.message);
  }
}

async function setupFaceAccess() {
  if (!faceModelsReady) {
    setupFaceStatus.textContent = "正在加载人脸模型。";
    try {
      await ensureFaceModels();
    } catch (error) {
      setupFaceStatus.textContent = error.message;
      return;
    }
    if (!faceModelsReady) return;
  }
  try {
    setupFaceVideo.hidden = false;
    setupFaceStatus.textContent = "正在打开摄像头，请允许浏览器使用摄像头。";
    await startCamera(setupFaceVideo);
    setupFaceStatus.textContent = "请正对镜头，保持脸部清晰。";
    await wait(800);
    let descriptor = null;
    let lastError = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        descriptor = await captureFaceDescriptor(setupFaceVideo);
        break;
      } catch (error) {
        lastError = error;
        setupFaceStatus.textContent = attempt < 2 ? "没有识别到人脸，请调整位置。" : error.message;
        await wait(800);
      }
    }
    if (!descriptor) {
      throw lastError || new Error("没有检测到人脸。");
    }
    setupFaceStatus.textContent = "正在注册人脸。";
    const data = await fetchJson("/api/auth/setup", {
      method: "POST",
      body: JSON.stringify({ descriptor, face_name: "我的脸" }),
    });
    setToken(data.token);
    await enterApp();
  } catch (error) {
    setupFaceStatus.textContent = error.message;
    showToast(error.message);
  }
}

async function enterApp() {
  showApp();
  await Promise.all([
    loadHealth(),
    loadSystemInfo(),
    loadFirewall(),
    loadState(),
    loadAccess(),
    loadFilePermission(),
    loadPermissions(),
    loadReadiness(),
    loadNetwork(),
    loadTransferFiles(),
    loadMemoryData(),
    loadTaskAndAudit(),
    loadSkillsAndWorkspaces(),
    loadSecrets(),
  ]);
  ensureNotificationPermission();
  window.clearInterval(reminderTimer);
  reminderTimer = window.setInterval(async () => {
    if (!sending) {
      try {
        state = await fetchJson("/api/state");
        renderMemoryAndReminders();
        await loadTaskAndAudit();
        checkDueReminders();
        checkPendingApprovals();
      } catch (error) {
        // The next interval will retry; avoid noisy alerts for transient local failures.
      }
    }
  }, 15000);
  if (window.lucide) {
    window.lucide.createIcons();
  }
  messageInput.focus();
}

async function loadAccess() {
  try {
    const data = await fetchJson("/api/auth/faces");
    const faces = data.faces || [];
    const passwords = data.passwords || [];
    const rows = [
      ["人脸", faces.map((item) => item.name).join("、") || "未注册"],
      ["密码", passwords.map((item) => item.name).join("、") || "未设置"],
      ["数量", `${faces.length} 张人脸 · ${passwords.length} 个密码`],
    ];
    accessInfo.innerHTML = rows
      .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`)
      .join("");
  } catch (error) {
    accessInfo.innerHTML = '<dt>状态</dt><dd>暂不可用</dd>';
  }
}

async function loadNetwork() {
  try {
    const data = await fetchJson("/api/network");
    mobileUrl.textContent = data.mobile_url;
    mobileUrl.dataset.url = data.mobile_url;
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(data.mobile_url)}`;
    mobileQr.innerHTML = `<img src="${qrSrc}" alt="手机访问二维码">`;
  } catch (error) {
    mobileUrl.textContent = "局域网地址不可用";
    mobileQr.textContent = "无法生成二维码";
  }
}

function setAppMode(mode) {
  const transfer = mode === "transfer";
  modeAi.classList.toggle("active", !transfer);
  modeTransfer.classList.toggle("active", transfer);
  chatPanel.hidden = transfer;
  transferPanel.hidden = !transfer;
  if (transfer) {
    loadTransferFiles();
  } else {
    messageInput.focus();
  }
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function renderTransferFiles(files) {
  transferList.innerHTML = "";
  if (!files.length) {
    transferList.innerHTML = '<div class="transfer-item-name">还没有文件，从手机或电脑上传一个试试。</div>';
    return;
  }
  files.forEach((file) => {
    const row = document.createElement("div");
    row.className = "transfer-item";
    const name = document.createElement("div");
    name.className = "transfer-item-name";
    name.innerHTML = `${escapeHtml(file.filename)}<div class="transfer-item-meta">${formatFileSize(file.size || 0)}</div>`;
    const download = document.createElement("button");
    download.type = "button";
    download.textContent = "下载";
    download.addEventListener("click", () => downloadTransferFile(file.id, file.filename));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "删除";
    remove.addEventListener("click", async () => {
      try {
        await fetchJson("/api/transfer/delete", {
          method: "POST",
          body: JSON.stringify({ id: file.id }),
        });
        await loadTransferFiles();
      } catch (error) {
        showToast(error.message);
      }
    });
    row.append(name, download, remove);
    transferList.appendChild(row);
  });
}

async function loadTransferFiles() {
  try {
    const data = await fetchJson("/api/transfer/list");
    renderTransferFiles(data.files || []);
  } catch (error) {
    transferList.innerHTML = '<div class="transfer-item-name">文件列表加载失败。</div>';
  }
}

function fileToBase64(file) {
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

async function uploadTransferFiles(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) return;
  for (const file of files) {
    try {
      const dataBase64 = await fileToBase64(file);
      showToast(`正在上传：${file.name}`);
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
  await loadTransferFiles();
}

async function uploadImportedFiles(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) return;
  const importId = `import-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  let imported = 0;
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const relativePath = file.webkitRelativePath || file.name;
    showToast(`正在导入 ${index + 1}/${files.length}：${file.name}`);
    try {
      const dataBase64 = await fileToBase64(file);
      const result = await fetchJson("/api/import/upload", {
        method: "POST",
        body: JSON.stringify({
          import_id: importId,
          relative_path: relativePath,
          mime: file.type || "application/octet-stream",
          data_base64: dataBase64,
        }),
      });
      if (result.ok) imported += 1;
    } catch (error) {
      showToast(`导入失败：${error.message}`);
    }
  }
  if (imported > 0) {
    try {
      await fetchJson("/api/import/notify", {
        method: "POST",
        body: JSON.stringify({ import_id: importId, count: imported }),
      });
      state = await fetchJson("/api/state");
      renderConversation();
    } catch (error) {
      // 提示写入失败不影响已落盘的文件。
    }
  }
  showToast(`已导入 ${imported}/${files.length} 个文件：${importId}`);
}

function renderFilePermission(data) {
  const rows = (data.protected_paths || [])
    .map(
      (item) =>
        `<dt>${escapeHtml(item.label)}</dt>` +
        `<dd>${item.readable ? "可读取" : "需要授权"}</dd>`
    )
    .join("");
  filePermissionInfo.innerHTML = rows || "<dt>权限</dt><dd>未知</dd>";
}

async function loadFilePermission() {
  try {
    const data = await fetchJson("/api/files/permission");
    renderFilePermission(data);
  } catch (error) {
    filePermissionInfo.innerHTML = "<dt>权限</dt><dd>检测失败</dd>";
  }
}

function renderPermissionRules(data) {
  const rules = data.permissions || {};
  permissionRuleList.innerHTML = "";
  let count = 0;
  for (const action of ["deny", "allow", "ask"]) {
    for (const rule of rules[action] || []) {
      count += 1;
      const row = document.createElement("div");
      row.className = "memory-item";
      const label = action === "deny" ? "拒绝" : action === "allow" ? "允许" : "询问";
      const text = document.createElement("span");
      text.textContent = `${label}：${rule}`;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "删除";
      button.addEventListener("click", async () => {
        try {
          await fetchJson("/api/permissions/rules/delete", {
            method: "POST",
            body: JSON.stringify({ action, rule }),
          });
          await loadPermissions();
        } catch (error) {
          showToast(error.message);
        }
      });
      row.append(text, button);
      permissionRuleList.appendChild(row);
    }
  }
  if (!count) {
    const empty = document.createElement("div");
    empty.className = "memory-item";
    empty.textContent = "暂无权限规则";
    permissionRuleList.appendChild(empty);
  }
}

function renderSessionGrants(grants) {
  sessionGrantList.innerHTML = "";
  const items = Array.isArray(grants) ? grants : [];
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "memory-item";
    empty.textContent = "暂无本会话临时授权";
    sessionGrantList.appendChild(empty);
    return;
  }
  items.forEach((grant) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const text = document.createElement("span");
    text.textContent = `临时授权：${grant.rule}`;
    const expires = document.createElement("small");
    expires.textContent = new Date((grant.expires_at || 0) * 1000).toLocaleString();
    row.append(text, expires);
    sessionGrantList.appendChild(row);
  });
}

async function loadPermissions() {
  try {
    const data = await fetchJson("/api/permissions");
    renderPermissionRules(data);
    renderSessionGrants(data.session_grants);
  } catch (error) {
    showToast(error.message);
  }
}

async function addPermissionRule() {
  const rule = permissionRule.value.trim();
  if (!rule) {
    showToast("请输入权限规则。");
    return;
  }
  try {
    await fetchJson("/api/permissions/rules", {
      method: "POST",
      body: JSON.stringify({ action: permissionAction.value, rule }),
    });
    permissionRule.value = "";
    await loadPermissions();
    showToast("权限规则已添加。");
  } catch (error) {
    showToast(error.message);
  }
}

async function grantSessionRule() {
  const rule = sessionGrantRule.value.trim();
  if (!rule) {
    showToast("请输入临时授权规则。");
    return;
  }
  try {
    await fetchJson("/api/permissions/session-grant", {
      method: "POST",
      body: JSON.stringify({ rule }),
    });
    sessionGrantRule.value = "";
    await loadPermissions();
    showToast("本会话临时授权已生效。");
  } catch (error) {
    showToast(error.message);
  }
}

async function clearSessionGrants() {
  try {
    await fetchJson("/api/permissions/session-grants/clear", { method: "POST" });
    await loadPermissions();
    showToast("本会话临时授权已清空。");
  } catch (error) {
    showToast(error.message);
  }
}

async function downloadTransferFile(fileId, filename) {
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

async function addPasswordAction() {
  const password = newPasswordInput.value.trim();
  if (password.length < 4) {
    showToast("新密码至少 4 位。");
    return;
  }
  try {
    await fetchJson("/api/auth/passwords", {
      method: "POST",
      body: JSON.stringify({ password, name: "新增密码" }),
    });
    newPasswordInput.value = "";
    await loadAccess();
    showToast("密码已添加。");
  } catch (error) {
    showToast(error.message);
  }
}

async function registerFaceAction() {
  if (!faceModelsReady) {
    showToast("正在加载人脸模型。");
    try {
      await ensureFaceModels();
    } catch (error) {
      showToast(error.message);
      return;
    }
    if (!faceModelsReady) return;
  }
  try {
    manageFaceVideo.hidden = false;
    showToast("正在打开摄像头。");
    await startCamera(manageFaceVideo);
    showToast("请正对镜头，稍候将自动识别。");
    await wait(800);
    let descriptor = null;
    let lastError = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        descriptor = await captureFaceDescriptor(manageFaceVideo);
        break;
      } catch (error) {
        lastError = error;
        await wait(700);
      }
    }
    if (!descriptor) {
      throw lastError || new Error("没有检测到人脸。");
    }
    await fetchJson("/api/auth/faces", {
      method: "POST",
      body: JSON.stringify({ descriptor, name: "新增人脸" }),
    });
    stopCamera();
    await loadAccess();
    showToast("人脸已注册。");
  } catch (error) {
    showToast(error.message);
  }
}

async function logout() {
  try {
    await endSession();
    await fetchJson("/api/auth/logout", { method: "POST" });
  } catch (error) {
    // Ignore network errors; the local token is removed either way.
  }
  window.clearInterval(reminderTimer);
  reminderTimer = null;
  stopWakeRecognition();
  stopVisionCamera();
  clearAuth();
  const status = await fetchJson("/api/auth/status");
  setAuthMode(status.setup_required ? "setup" : "login");
}

function bindAuthEvents() {
authTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      showAuthTab(button.dataset.authTab).catch(() => {});
    });
  });
  passwordSubmit.addEventListener("click", loginPassword);
  passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") loginPassword();
  });
  faceSubmit.addEventListener("click", loginFace);
  setupSave.addEventListener("click", setupAccess);
  setupPassword.addEventListener("keydown", (event) => {
    if (event.key === "Enter") setupAccess();
  });
  setupFace.addEventListener("click", setupFaceAccess);
  addPasswordBtn.addEventListener("click", addPasswordAction);
  registerFaceBtn.addEventListener("click", registerFaceAction);
  logoutBtn.addEventListener("click", logout);
  refreshAccess.addEventListener("click", async () => {
    refreshAccess.disabled = true;
    await loadAccess();
    refreshAccess.disabled = false;
    showToast("访问方式已刷新。");
  });
  refreshNetwork.addEventListener("click", async () => {
    refreshNetwork.disabled = true;
    await loadNetwork();
    refreshNetwork.disabled = false;
    showToast("手机访问地址已刷新。");
  });

  modeAi.addEventListener("click", () => setAppMode("ai"));
  modeTransfer.addEventListener("click", () => setAppMode("transfer"));
  chatFileBtn.addEventListener("click", () => chatFileInput.click());
  chatFolderBtn.addEventListener("click", () => chatFolderInput.click());
  chatFileInput.addEventListener("change", () => {
    uploadImportedFiles(chatFileInput.files);
    chatFileInput.value = "";
  });
  chatFolderInput.addEventListener("change", () => {
    uploadImportedFiles(chatFolderInput.files);
    chatFolderInput.value = "";
  });
  refreshFilePermissionBtn.addEventListener("click", loadFilePermission);
  openFilePermissionBtn.addEventListener("click", async () => {
    try {
      const data = await fetchJson("/api/files/open-settings", { method: "POST" });
      if (!data.ok) throw new Error(data.error || "打开失败");
      showToast("已打开系统权限设置。");
    } catch (error) {
      window.location.href = "x-apple.systempreferences:com.apple.preference.security?Privacy_AllFiles";
      showToast(error.message);
    }
  });
  refreshPermissionsBtn.addEventListener("click", loadPermissions);
  addPermissionRuleBtn.addEventListener("click", addPermissionRule);
  permissionRule.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addPermissionRule();
  });
  grantSessionRuleBtn.addEventListener("click", grantSessionRule);
  sessionGrantRule.addEventListener("keydown", (event) => {
    if (event.key === "Enter") grantSessionRule();
  });
  clearSessionGrantsBtn.addEventListener("click", clearSessionGrants);
  transferFileInput.addEventListener("change", () => {
    uploadTransferFiles(transferFileInput.files);
    transferFileInput.value = "";
  });
  transferDrop.addEventListener("dragover", (event) => {
    event.preventDefault();
    transferDrop.classList.add("dragover");
  });
  transferDrop.addEventListener("dragleave", () => {
    transferDrop.classList.remove("dragover");
  });
  transferDrop.addEventListener("drop", (event) => {
    event.preventDefault();
    transferDrop.classList.remove("dragover");
    uploadTransferFiles(event.dataTransfer.files);
  });
}

async function bootstrapAuth() {
  const status = await fetchJson("/api/auth/status");
  if (status.authenticated) {
    await enterApp();
    return;
  }
  authOverlay.classList.remove("hidden");
  document.body.classList.add("locked");
  setAuthMode(status.setup_required ? "setup" : "login");
}

async function changeModel() {
  const model = modelSelect.value;
  try {
    await fetchJson("/api/settings", {
      method: "POST",
      body: JSON.stringify({ model }),
    });
    state.settings.model = model;
    showToast(`已切换到 ${model}`);
    await loadHealth();
  } catch (error) {
    showToast(error.message);
  }
}

sendBtn.addEventListener("click", () => sendMessage());
messageInput.addEventListener("input", autoResize);
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

micBtn.addEventListener("click", () => {
  if (!recognition) {
    showToast("当前浏览器不支持语音识别，请使用 Chrome 或 Edge。");
    return;
  }
  if (wakeListening) {
    stopWakeRecognition();
  }
  if (listening) {
    recognition.stop();
    return;
  }
  recognition.start();
});

wakeToggle.addEventListener("click", async () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("当前浏览器不支持连续唤醒监听。");
    return;
  }
  const enabled = !state.settings.wake_word_enabled;
  state.settings.wake_word_enabled = enabled;
  ensureNotificationPermission();
  if (enabled) {
    startWakeRecognition();
  } else {
    stopWakeRecognition();
    setStatus("online", "Ollama 已连接");
  }
  updateWakeButton();
  try {
    await fetchJson("/api/settings", {
      method: "POST",
      body: JSON.stringify({ wake_word_enabled: enabled }),
    });
  } catch (error) {
    showToast(error.message);
  }
});

agentToggle.addEventListener("click", async () => {
  const enabled = state.settings.agent_mode !== "codex";
  state.settings.agent_mode = enabled ? "codex" : "chat";
  updateAgentButton();
  showToast(enabled ? "Codex 模式已开启，修改仅限工作区。" : "Codex 模式已关闭。");
  try {
    await fetchJson("/api/settings", {
      method: "POST",
      body: JSON.stringify({ agent_mode: state.settings.agent_mode }),
    });
  } catch (error) {
    showToast(error.message);
  }
});

planModeToggle.addEventListener("click", async () => {
  const enabled = !state.settings.plan_mode;
  state.settings.plan_mode = enabled;
  updatePlanModeButton();
  showToast(enabled ? "计划先审已开启：复杂任务将先展示计划。" : "计划先审已关闭。");
  try {
    await fetchJson("/api/settings", {
      method: "POST",
      body: JSON.stringify({ plan_mode: enabled }),
    });
  } catch (error) {
    showToast(error.message);
  }
});

voiceToggle.addEventListener("click", async () => {
  state.settings.voice_enabled = !state.settings.voice_enabled;
  updateVoiceButton();
  if (!state.settings.voice_enabled) {
    window.speechSynthesis?.cancel();
    core.classList.remove("speaking");
  }
  try {
    await fetchJson("/api/settings", {
      method: "POST",
      body: JSON.stringify({ voice_enabled: state.settings.voice_enabled }),
    });
  } catch (error) {
    showToast(error.message);
  }
});

resetBtn.addEventListener("click", async () => {
  try {
    showToast("正在保存今日知识，请稍候...");
    await endSession();
    await fetchJson("/api/reset", { method: "POST" });
    state.conversation = [];
    renderConversation();
    showToast("对话已清空，长期记忆仍保留。");
  } catch (error) {
    showToast(error.message);
  }
});

refreshSystem.addEventListener("click", async () => {
  refreshSystem.disabled = true;
  await loadSystemInfo();
  refreshSystem.disabled = false;
  showToast("系统信息已刷新。");
});

refreshFirewall.addEventListener("click", async () => {
  refreshFirewall.disabled = true;
  await loadFirewall();
  refreshFirewall.disabled = false;
  showToast("防火墙状态已刷新。");
});

toggleWeb.addEventListener("click", async () => {
  const enabled = !state.settings.web_enabled;
  try {
    await fetchJson("/api/firewall", {
      method: "POST",
      body: JSON.stringify({ web_enabled: enabled }),
    });
    state.settings.web_enabled = enabled;
    await loadFirewall();
    showToast(enabled ? "联网访问已开启。" : "联网访问已关闭。");
  } catch (error) {
    showToast(error.message);
  }
});

toggleLearning.addEventListener("click", async () => {
  const enabled = !state.settings.learning_enabled;
  try {
    await fetchJson("/api/firewall", {
      method: "POST",
      body: JSON.stringify({ learning_enabled: enabled }),
    });
    state.settings.learning_enabled = enabled;
    await loadFirewall();
    showToast(enabled ? "自主学习已开启。" : "自主学习已关闭。");
  } catch (error) {
    showToast(error.message);
  }
});

refreshMemory.addEventListener("click", async () => {
  refreshMemory.disabled = true;
  try {
    await loadMemoryData();
    showToast("记忆与提醒已刷新。");
  } catch (error) {
    showToast(error.message);
  } finally {
    refreshMemory.disabled = false;
  }
});

clearFactsBtn.addEventListener("click", () => clearMemory("facts"));
clearNotesBtn.addEventListener("click", () => clearMemory("notes"));
clearKnowledgeBtn.addEventListener("click", () => clearMemory("knowledge"));
clearReminderHistoryBtn.addEventListener("click", clearReminderHistory);
addReminderBtn.addEventListener("click", addReminder);
reminderMessage.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addReminder();
});
clearPlanBtn.addEventListener("click", clearTaskPlan);
clearAuditBtn.addEventListener("click", clearAuditLog);
undoLatestBackupBtn.addEventListener("click", undoLatestBackup);
clearBackupsBtn.addEventListener("click", clearBackups);
refreshApprovalsBtn.addEventListener("click", async () => {
  refreshApprovalsBtn.disabled = true;
  try {
    await loadTaskAndAudit();
    showToast("待审批操作已刷新。");
  } catch (error) {
    showToast(error.message);
  } finally {
    refreshApprovalsBtn.disabled = false;
  }
});
refreshGuiStatusBtn.addEventListener("click", async () => {
  refreshGuiStatusBtn.disabled = true;
  try {
    await loadGuiStatus();
    showToast("GUI 状态已刷新。");
  } catch (error) {
    showToast(error.message);
  } finally {
    refreshGuiStatusBtn.disabled = false;
  }
});
refreshReadinessBtn.addEventListener("click", async () => {
  refreshReadinessBtn.disabled = true;
  try {
    await loadReadiness();
    showToast("环境检测已完成。");
  } catch (error) {
    showToast(error.message);
  } finally {
    refreshReadinessBtn.disabled = false;
  }
});
openScreenRecordingBtn.addEventListener("click", async () => {
  try {
    await fetchJson("/api/permissions/open-settings", {
      method: "POST",
      body: JSON.stringify({ kind: "screen_recording" }),
    });
    showToast("已打开屏幕录制权限设置。");
  } catch (error) {
    showToast(error.message);
  }
});
openAccessibilityBtn.addEventListener("click", async () => {
  try {
    await fetchJson("/api/permissions/open-settings", {
      method: "POST",
      body: JSON.stringify({ kind: "accessibility" }),
    });
    showToast("已打开辅助功能权限设置。");
  } catch (error) {
    showToast(error.message);
  }
});
startSafariDriverBtn.addEventListener("click", async () => {
  startSafariDriverBtn.disabled = true;
  try {
    const data = await fetchJson("/api/tools/safaridriver/start", { method: "POST" });
    showToast(data.message || "SafariDriver 已启动。");
    await loadReadiness();
  } catch (error) {
    showToast(error.message);
  } finally {
    startSafariDriverBtn.disabled = false;
  }
});
refreshDiagnosticsBtn.addEventListener("click", async () => {
  refreshDiagnosticsBtn.disabled = true;
  try {
    await loadDiagnostics();
    showToast("功能自检完成。");
  } catch (error) {
    showToast(error.message);
  } finally {
    refreshDiagnosticsBtn.disabled = false;
  }
});
refreshBrowserDownloadsBtn.addEventListener("click", loadBrowserDownloads);
browserDownloadFilter.addEventListener("keydown", (event) => {
  if (event.key === "Enter") loadBrowserDownloads();
});
requestAutomationBtn.addEventListener("click", requestAutomation);
approvalFilterStatus.addEventListener("change", () => {
  approvalFilter = approvalFilterStatus.value;
  renderTaskAndAudit();
});
memorySearchBtn.addEventListener("click", searchMemory);
memorySearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchMemory();
});
addScheduledTaskBtn.addEventListener("click", addScheduledTask);
refreshScheduledTasksBtn.addEventListener("click", async () => {
  refreshScheduledTasksBtn.disabled = true;
  try {
    await loadTaskAndAudit();
    showToast("定时任务已刷新。");
  } catch (error) {
    showToast(error.message);
  } finally {
    refreshScheduledTasksBtn.disabled = false;
  }
});
autoRunScheduledToggle.addEventListener("click", async () => {
  const enabled = !state.settings.scheduled_auto_run;
  state.settings.scheduled_auto_run = enabled;
  updateAutoRunButton();
  try {
    await fetchJson("/api/settings", {
      method: "POST",
      body: JSON.stringify({ scheduled_auto_run: enabled }),
    });
    showToast(enabled ? "定时任务到点后将自动执行。" : "定时任务恢复审批后执行。");
  } catch (error) {
    showToast(error.message);
  }
});
addIntegrationBtn.addEventListener("click", addIntegration);
addSkillBtn.addEventListener("click", addSkill);
refreshSkillsBtn.addEventListener("click", async () => {
  try {
    await loadSkillsAndWorkspaces();
    showToast("Skill 已刷新。");
  } catch (error) {
    showToast(error.message);
  }
});
createWorkspaceBtn.addEventListener("click", createWorkspace);
refreshWorkspacesBtn.addEventListener("click", async () => {
  try {
    await loadSkillsAndWorkspaces();
    showToast("工作区已刷新。");
  } catch (error) {
    showToast(error.message);
  }
});
integrationTemplateSelect.addEventListener("change", () => {
  const option = integrationTemplateSelect.selectedOptions[0];
  if (!option || !option.value) return;
  integrationName.value = option.value;
  integrationUrl.value = option.dataset.url || "";
  integrationMethod.value = option.dataset.method || "GET";
  integrationHeaders.value = option.dataset.headers || "";
});
refreshIntegrationsBtn.addEventListener("click", async () => {
  refreshIntegrationsBtn.disabled = true;
  try {
    await loadTaskAndAudit();
    showToast("外部集成已刷新。");
  } catch (error) {
    showToast(error.message);
  } finally {
    refreshIntegrationsBtn.disabled = false;
  }
});
refreshSecretsBtn.addEventListener("click", loadSecrets);
saveSecretBtn.addEventListener("click", saveSecret);
secretName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") saveSecret();
});
secretValue.addEventListener("keydown", (event) => {
  if (event.key === "Enter") saveSecret();
});
suggestBtn.addEventListener("click", loadSuggestion);
autonomySelect.addEventListener("change", async () => {
  const autonomyLevel = autonomySelect.value;
  state.settings.autonomy_level = autonomyLevel;
  try {
    await fetchJson("/api/settings", {
      method: "POST",
      body: JSON.stringify({ autonomy_level: autonomyLevel }),
    });
    showToast(`自主模式已切换为：${autonomyLevel}`);
  } catch (error) {
    showToast(error.message);
  }
});

visionFileInput.addEventListener("change", () => {
  handleVisionFile(visionFileInput.files?.[0]);
  visionFileInput.value = "";
});
visionCameraBtn.addEventListener("click", openVisionCamera);
visionCaptureBtn.addEventListener("click", captureVisionFrame);
visionAnalyzeBtn.addEventListener("click", analyzeVisionImage);
screenOcrBtn.addEventListener("click", runScreenOcr);
imageOcrBtn.addEventListener("click", runImageOcr);

modelSelect.addEventListener("change", changeModel);

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

async function init() {
  autoResize();
  initSideGroups();
  initSpeechRecognition();
  bindAuthEvents();
  await bootstrapAuth();
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

init();

window.addEventListener("pagehide", () => {
  endSession();
});
