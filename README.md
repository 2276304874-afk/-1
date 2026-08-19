# 星期一

“星期一”是一个运行在你自己 Mac 上的本地智能助手，交互风格参考 J.A.R.V.I.S.。它使用本机 Ollama 进行推理，不把对话上传到云端。

## 当前能力

- 中文对话与上下文记忆
- 当前时间、系统状态查询
- 目录浏览、文件搜索、文本读取
- 打开 Mac 应用、文件夹和网址
- 低风险只读命令，例如 `git status`、`df -h`
- 联网搜索、网页正文抓取与自主学习
- 本地知识库召回
- 密码登录和摄像头人脸识别门禁
- 多密码、多人脸管理
- 浏览器语音输入与语音朗读
- 桌面端“星期一 / 贾维斯”连续唤醒监听
- 本地图片理解，可上传图片或拍摄摄像头画面进行分析
- 截取当前屏幕并交给本地视觉模型分析
- 使用 macOS 原生 Vision 识别屏幕文字或上传图片文字，并使用本地 `say` 生成中文语音
- 聊天框可直接上传单个文件或整个文件夹，文件复制到本地 `data/imports/` 后即可读取
- 文件访问面板显示桌面/文稿/下载的权限状态，并可直接打开 macOS 系统权限设置
- 查询电池、运行应用、读写剪贴板、锁屏和显示器休眠
- 多个低风险命令并行执行
- 从对话中自动抽取长期语义记忆
- 把可复用的工作方法、项目结论和上下文自动写入持续学习笔记
- 每轮对话会召回相关长期事实、知识、旧对话片段、笔记和提醒
- 自动学习每次真实工具调用任务的经验，后续相似任务会直接召回可复用路径
- 基于系统状态、记忆和提醒生成主动建议
- 三档自主模式：安全、辅助、监督
- Codex 式权限规则：允许/拒绝工具、按命令前缀授权、本会话临时授权，均可在界面管理
- 本地密钥管理：GitHub、OpenAI、Notion 等密钥保存在本机，界面不显示明文，集成模板自动填入 `secret:` 请求头
- 受控导出：可直接把工作区项目复制到桌面、写入桌面一键启动脚本，均需用户批准且不使用危险 shell 命令
- 默认关闭的 Codex 模式，可在工作区内读改文件、运行项目命令
- Codex 多步任务计划面板和操作审计日志
- 到期提醒通知与提醒管理
- 提醒完成历史、直接添加提醒和清空完成记录
- 长期记忆、已学知识的查看和清理
- 对话历史持久化

## 安全防护

联网和学习请求会经过 `security.py` 中的本地防火墙：

- 仅允许 `http/https`
- 拦截本机、内网、保留地址和非常规端口
- 校验重定向，防止通过跳转绕过地址检查
- 限制每分钟全局请求数和单域名请求数
- 限制网页体积，并移除脚本、样式和导航
- 自动隐藏邮箱、手机号、银行卡号、API 密钥和访问令牌
- 拦截试图关闭安全策略、泄露提示词或绕过命令限制的请求
- 继续拒绝 `rm`、`mv`、`cp`、`sudo`、`shutdown`、`kill` 等高风险命令

自主模式说明：

- `安全`：只执行用户明确要求的低风险工具，不生成主动建议。
- `辅助`：默认模式，允许生成本地建议，但仍不自动执行高风险操作。
- `监督`：增强主动性，所有新增的屏幕、剪贴板、锁屏和休眠能力仍需要用户发起。

Codex 模式说明：

- 默认关闭，页面顶栏手动开启。
- 只能操作 `MONDAY_WORKSPACE` 指定的工作区，默认是本项目目录。
- 支持读取、创建、覆盖、查找替换和删除普通文件。
- 支持在 macOS 沙箱中运行 Python / Node 代码，禁止网络和写入工作区外。
- 项目命令仍经过命令白名单，不能执行 `rm`、`sudo`、`shutdown`、任意脚本等高风险操作。
- 支持在工作区内执行 `pip install -r requirements.txt` 和本地包安装；远程 URL/git 安装仍被拒绝。
- GUI 操作不会直接执行，先进入待审批队列，批准后才运行。
- GUI 审批支持 Safari 当前页面 JavaScript 脚本执行，需要手动批准。
- 新增 SafariDriver 浏览器自动化请求：打开网页、读取正文、点击 CSS 元素、执行 JS。
- GUI 审批新增鼠标点击坐标和按键码操作。
- 支持跨事实、笔记、知识、提醒和旧对话主动检索记忆。
- 定时任务默认到点自动执行；每个任务可单独选择“到点自动执行”或“先审批”。
- 修复状态热路径中 jieba 分词可能导致的并发卡死：记忆去重和过期归档改为低频后台维护。
- 审批、审计、定时任务、记忆搜索、Skill 等长内容支持折叠展开，审计和审批按日期收纳。
- 启动时自动检测 Ollama 模型：默认模型不可用时会自动选择已安装且支持 tools 的模型。
- 新增可选本地 ASR：安装 `faster-whisper` 后 `/api/transcribe` 可提供完全本地语音转写。
- 准备 whisper 模型：`bash scripts/download_whisper_model.sh small`，也可用 `MONDAY_WHISPER_MODEL` 指定本地模型路径。
- 界面支持直接录制麦克风音频并本地转写；默认使用已下载的 `tiny` 模型。
- 已提供 macOS 打包脚本：`bash scripts/build_macos_app.sh`，会生成 `dist/MondayAssistant.app` 和 DMG。
- 已提供 macOS 菜单栏入口：`bash mac_app/build_menu_app.sh`，生成 `dist/MondayMenu.app`。
- 已提供原生桌面 App：`bash mac_app/build_desktop_app.sh`，生成 `dist/MondayDesktop.app`，内置 WebView 窗口并自动连接/启动服务。
- 新增多步 Agent 评测脚本 `evals/codex_task_smoke.py` 和统一评测入口 `evals/run_all.sh`。
- 新增本地模型速度基准 `evals/model_benchmark.py`，可自动推荐响应最快的本地模型。
- 新增签名/公证文档 `docs/notarization.md` 和脚本 `scripts/notarize_macos.sh`。
- 敏感路径读取和危险命令已加固，并提供 `evals/security_smoke.py` 安全冒烟测试。
- 代码沙箱已禁止读取 `/etc/passwd`、`~/.ssh`、认证/密钥/记忆文件，禁止外网和写工作区外，提供 `evals/sandbox_smoke.py` 逃逸测试。
- 支持手动添加外部 HTTP API 集成，并通过 `call_integration` 调用。

## 首次访问

第一次打开页面时，会要求创建访问密码或注册第一张人脸。完成任一种方式后，星期一会创建本地会话。

- 密码使用 PBKDF2 加盐哈希保存，不会保存明文。
- 人脸特征只保存在本机 `data/auth.json`。
- 人脸模型来自 `static/models/`，摄像头画面只在浏览器本地处理。
- 登录后可以在“访问管理”中继续添加多个密码和多张人脸。

## 启动

前提：已经安装并启动 Ollama，且至少有一个本地模型。

```bash
python3 server.py
```

也可以在访达中双击 `start.command`。新版启动脚本会检查依赖、设置默认端口和地址，并输出日志位置。

启动后打开：

```text
http://127.0.0.1:8766
```

## 模型

默认模型是 `gemma4:e4b`。视觉分析需要选择 Ollama 中带 `vision` 能力的模型，例如 `minimax-m3:cloud`。如果你的 Ollama 中没有这个模型，可以修改环境变量后启动：

```bash
MONDAY_MODEL=llama3:latest python3 server.py
```

也可以在页面右上角切换模型。只有支持 tools 能力的模型才能调用本机工具。

## 安全边界

“星期一”默认只执行只读或低风险命令，并由 `security.py` 统一保护联网访问。它会拒绝 `rm`、`mv`、`cp`、`sudo`、`shutdown`、`kill` 等可能修改或破坏系统的操作。如果你真的需要执行这些命令，请在终端中自行确认。

## 数据位置

对话和长期记忆保存在：

```text
data/memory.json
```

界面文件位于 `static/`，核心服务是 `server.py`，安全网关是 `security.py`，身份认证是 `auth.py`。

## 本轮升级

- 新增 `/api/vision`，可分析浏览器上传的图片或摄像头抓拍；LLM 工具中同步加入 `analyze_image`。
- 新增 `/api/memory`、`/api/memory/delete`、`/api/memory/clear`，用于查看和清理长期事实与已学知识。
- 新增 `/api/reminders/delete`，桌面端会轮询到期提醒，并用浏览器通知和语音播报。
- 新增 `/api/reminders`、`/api/reminders/ack`、`/api/reminders/clear-history`，提醒支持完成历史和直接创建。
- 长期事实和持续笔记增加相似项合并，避免“最喜欢的颜色是深蓝色/黑色”这类冲突记忆同时存在。
- 新增 Codex 工作区工具：`list_workspace`、`search_workspace`、`read_workspace_file`、`write_workspace_file`、`edit_workspace_file`、`delete_workspace_file`、`run_project_command`。
- 新增沙箱代码运行工具 `run_code`，Codex 模式下最多执行 12 轮工具调用。
- 新增 `set_task_plan`，Codex 模式可先创建任务计划，再逐步执行。
- 新增操作审计日志，记录工作区写入、编辑、删除、项目命令和代码运行。
- 工作区文件修改前自动备份，可从“文件备份”面板恢复。
- Codex 模式下工具失败时会收到错误反思提示，允许继续修正。
- 完成任务后会把工具调用链一起用于沉淀持续学习笔记。
- 新增 `request_gui_action` 和 GUI 审批接口，支持激活应用、打开网址、键盘输入。
- 新增 `search_memory` 和 `/api/search`，用于主动检索本地长期记忆。
- 记忆搜索升级为本地 BM25 排序，比简单关键词匹配更准确。
- 自动模型路由：工具任务优先选择支持 tools 的模型，视觉任务优先选择支持 vision 的模型。
- 外部集成使用防火墙校验，密钥建议用 `env:变量名` 引用，不存明文。
- 新增 `research_web`，可一次搜索并抓取多个网页，用于深度研究和报告整理。
- 任务计划支持进度跟踪和完成标记：`update_task_plan`、`finish_task_plan`。
- 旧对话超过阈值后会自动压缩成情境摘要，并用于后续上下文召回。
- Agent 会对多个只读工具调用并行执行，减少多任务等待时间。
- 主动记忆检索和上下文召回现在包含旧对话摘要。
- 新待审批操作会通过浏览器通知和语音提醒，不再只显示在侧栏。
- Codex 模式会对复杂任务自动生成计划，再进入执行循环。
- 新增 GUI 状态面板和“撤销最近文件操作”。
- 浏览器自动化新增填表动作 `browser_fill`。
- 浏览器自动化新增截图动作 `browser_screenshot`，文件保存在本地。
- 浏览器自动化新增下载动作 `browser_download`，文件保存在 `data/browser_downloads`。
- 审批历史支持按状态筛选：全部、待审批、已批准、已拒绝、失败。
- 同一轮 agent 任务中，重复的只读工具调用会使用缓存，减少重复查询。
- `/api/approvals` 支持 `?status=pending|approved|rejected|failed|all` 服务端筛选。
- 新增 `watch_web_page`，可创建网页监控定时任务，定期抓取并进入审批。
- GUI 状态面板支持手动刷新，便于授权 SafariDriver 后立即查看状态。
- 定时任务新增优先级：低、普通、高。
- 定时任务新增失败重试次数，失败后可自动重试。
- 记忆搜索增加结果缓存，重复查询更快。
- 浏览器自动化新增等待动作 `browser_wait`。
- 浏览器自动化新增后退和前进动作。
- 浏览器自动化新增刷新、新建标签页、关闭标签页和切换标签页。
- 新增 `/api/overview`，一次获取 agent 状态、任务计划、审批、备份、集成和 GUI 状态。
- 定时任务支持依赖关系，前置任务完成或取消后才会进入审批。
- 新增 `schedule_report`，可创建每日、每周或自定义周期报告任务。
- 新增 `/api/integrations/templates`，提供 GitHub、OpenAI、Notion、天气等常用集成模板。
- 外部集成面板支持选择模板并自动填入名称、URL 和方法。
- 完成任务计划后沉淀为任务经验，可被后续记忆检索和上下文召回。
- 浏览器新增 Cookie 保存/加载、等待元素出现、下载文件列表和按扩展名筛选。
- 新增绝对时间定时任务 `schedule_task_at`。
- GUI 审批新增 `send_wechat_message`，目标格式为 联系人||消息。
- 定时任务支持“自动执行”开关，开启后到点直接执行，不再生成审批。
- GUI 审批新增 `run_shortcut`，可运行 macOS 快捷指令。
- 前端新增自动化动作面板和绝对时间定时任务入口。
- 前端新增浏览器下载面板，支持扩展名筛选和删除。
- 前端新增“功能自检”面板，可检测绝对时间任务、审批、下载、模板和权限状态。
- 修复静态文件路径穿越漏洞，所有静态文件请求被限制在 `static/` 内。
- 启动时加进程锁，禁止多个服务实例同时写 `data/memory.json`。
- 减少旧对话召回数量，并防止未调用工具的行为类幻觉写入长期记忆。
- 默认只绑定 `127.0.0.1`；需要局域网访问时显式设置 `MONDAY_HOST=0.0.0.0`。
- 登录接口增加频率限制，降低密码爆破风险。
- 启动时自动备份 `data/memory.json`，并写入请求日志到 `data/logs/server.log`。
- 新增 `dev.py` 开发热重启脚本，监听核心文件变化自动重启。
- 修复当前用户消息没有加入上下文的问题，明显减少模型答旧问题。
- 记忆抽取和任务计划改用 Ollama `format: json`，降低 JSON 解析失败率。
- 新增用户画像聚合：从 facts/notes 生成结构化画像并注入上下文；`GET /api/profile`、`POST /api/profile/refresh`。
- 新增记忆强度机制：同一事实重复出现会增强；30 天未被召回且强度低会自动归档。
- 新增回答自检循环：工具任务回答后自动判断是否命中当前问题，不合格会重试一次。
- 新增 `parse_natural_time`，支持“30分钟后”“明天早上九点”等自然语言时间。
- 新增 embedding 可用性检测；当前 Ollama 未启用 embedding 时继续使用 BM25，拉取 embedding 模型后可直接升级语义检索。
- 新增 `semantic_search` 和 `/api/semantic-search`，embedding 可用时使用向量相似度，否则回退 BM25。
- embedding 结果增加相似度阈值过滤，减少无关低分记忆进入上下文。
- embedding 阈值已配置化：`embedding_min_score`，默认 0.80。
- embedding 增加缓存，重复文本不再重复调用 embedding 模型。
- 新增后台系统事件观察：前台应用切换、剪贴板变化、低电量事件会进入最近环境上下文。
- 新增屏幕情境标签：`capture_screen_context`，截图生成 3-5 个情境标签并写入环境事件，不保存图片。
- 新增“贾维斯汇报”接口 `/api/briefing`，生成系统、提醒、审批、任务和环境事件简报。
- 唤醒词无具体指令时，会自动播报一条主动建议。
- 工具任务完成后前端会显示“任务完成，已调用…”提示。
- 新增 `/api/patterns`，分析最近高频工具调用并提出自动化建议。
- 新增 `schedule_nightly_reflection`，可创建每天夜间反思任务。
- 新增 `/api/chat/stream` SSE 流式回复接口，后续前端可切换为打字机效果。
- 上下文预算控制：减少注入项，并在超预算时自动裁剪，降低静默截断。
- 工具结果统一压缩，避免单次工具返回撑爆 8K 上下文。
- 语义检索改为 embedding + BM25 混合排序。
- 辅助判断统一使用 `MONDAY_AUX_MODEL`，默认 `glm-5.2:cloud`。
- 新增基础评测脚本 `evals/smoke_eval.py`。
- 新增无模型 API 回归脚本 `evals/api_smoke.py`，一条命令覆盖核心读接口和可清理写接口。
- 修复审批/审计/任务列表满容量时新记录被旧记录挤掉的问题，并让集成模板自动携带 `secret:` 请求头。
- 补充接口：`/api/events`、`/api/clipboard`、`/api/situation`、`/api/intent`、`/api/routine`、`/api/persona`、`/api/report`。
- 屏幕 OCR 与本地 TTS 已实现；语音转写已接入 faster-whisper，模型就绪后可用。
- 新增“环境就绪”检测：屏幕录制、辅助功能、SafariDriver、微信状态均可一键检测并打开对应系统设置。
- 前端已接入 `/api/chat/stream`，回复以打字机效果显示。
- 混合检索升级为 RRF 融合，并加入 jieba 中文分词。
- 辅助判断模型改为 `llama3:latest`，num_ctx 2048，主模型只做生成和工具决策。
- 新增 `evals/cases.json` 和 `evals/run.py`，可跑分评测。
- 记忆冲突合并改为强度比较，新事实强度更高时覆盖旧事实。
- 回答格式约束为结论优先 + 短列表，前端 Markdown 支持标题和列表渲染。
- 新增 Skill 自定义：可录入团队规范、编码/文档风格，并自动注入相关上下文。
- 新增隔离任务工作区：可创建/切换独立项目目录，文件、命令、代码沙箱跟随当前工作区。
- 新增批量重构：`batch_replace_workspace` 可在工作区批量替换文本。
- 新增代码审查：`review_project` 检查 TODO/FIXME、语法和 git 状态。
- `run_project_command` 在 Codex 模式下支持安装依赖、运行测试、构建脚本和 git 操作。
- 新增 `scaffold_project`：按文件清单一键创建完整项目。
- 新增 `generate_project`：根据一句话需求自动生成完整多文件项目。
- 新增 `write_unit_test`：读取源码自动生成单元测试文件。
- 新增 `process_csv`：支持汇总、筛选、排序、截取和输出结果。
- `process_csv` 新增 `report`：自动生成数值统计报表。
- 新增 `process_office_document`：支持 Excel、PPT、Word 文档摘要和批量替换文本。
- 新增 `process_images`：批量调整尺寸、生成缩略图或转换格式。
- 新增 `rename_files_batch`：批量重命名文件，支持 dry-run。
- GUI 审批新增 `run_application`：可带参数调用 Blender、ComfyUI 等本地软件。
- 已安装并导入官方强 Skill：CLI 工具创建、目标定义、Playwright、安全最佳实践、PDF、截图、语音、转写。
- 第二轮已安装并导入：CI 修复、Jupyter Notebook、Notion 研究文档、规格转实现、交互式浏览器、威胁建模、安全责任地图、Sentry、Vercel/Cloudflare/Netlify/Render 部署。
- 第三轮已安装并导入：ChatGPT 应用、Figma 实现、Figma 使用、Linear、迁移到 Codex、Notion 会议智能、OpenAI 文档、ASP.NET Core。
- 审批执行改为显示具体结果；微信发送改用剪贴板粘贴，避免中文消息键入失败；审批每 15 秒自动轮询。
- 新增定时任务工具和接口：`schedule_task`、`list_scheduled_tasks`、`cancel_scheduled_task`。
- 桌面端新增连续唤醒监听，默认关闭，可在顶栏开启；唤醒词支持“星期一”“贾维斯”等。
- 视觉分析、记忆清理和提醒操作都复用现有身份认证与安全边界，不会绕过防火墙。
- 新增 `/api/suggestions`，结合当前时间、系统状态、长期记忆和提醒生成一句主动建议。
- 新增屏幕分析、电池、运行应用、剪贴板、锁屏、休眠和并行命令工具。
- 新增后台语义记忆抽取，会在对话后把稳定的个人事实写入 `data/memory.json`。
- 新增持续学习笔记，会在对话后把可复用结论和上下文写入 `data/memory.json` 的 `notes` 字段。
- 新增上下文召回：聊天前会检索旧对话、长期事实、知识和笔记，再叠加最近对话上下文。
