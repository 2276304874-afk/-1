#!/usr/bin/env python3
"""无模型 API 冒烟测试：覆盖核心读接口与可清理的写接口。"""

import base64
import datetime
import os
import shutil
import sys
import time
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from auth import create_session, destroy_session, load_auth
import server


BASE = os.environ.get("MONDAY_BASE_URL", "http://127.0.0.1:8766")
results = []


def check(name: str, response: httpx.Response) -> bool:
    try:
        data = response.json()
    except Exception:
        data = {}
    ok = response.status_code < 400 and "error" not in data
    results.append((name, ok, response.status_code, data.get("error") or ""))
    return data


def main() -> int:
    auth = load_auth()
    token = create_session(auth)
    import_id = f"smoke-{int(time.time())}"
    transfer_id = reminder_id = task_id = integration_id = None
    tts_path = None
    ocr_path = None
    import_root = None

    with httpx.Client(base_url=BASE, headers={"Authorization": f"Bearer {token}"}, timeout=45) as client:
        for path in [
            "health",
            "models",
            "diagnostics",
            "gui/status",
            "overview",
            "state",
            "skills",
            "workspaces",
            "reminders",
            "scheduled-tasks",
            "integrations/templates",
            "secrets",
            "approvals",
            "permissions",
            "audit",
            "backups",
            "plan",
            "profile",
            "events",
            "clipboard",
            "situation",
            "firewall",
            "browser/downloads",
            "transfer/list",
            "network",
            "files/permission",
            "readiness",
            "transcribe",
            "search?q=星期",
            "semantic-search?q=星期",
            "patterns",
            "routine",
            "persona",
        ]:
            try:
                check(f"GET /api/{path}", client.get(f"/api/{path}"))
            except Exception as exc:
                results.append((f"GET /api/{path}", False, 0, str(exc)))

        data = check(
            "POST /api/transfer/upload",
            client.post(
                "/api/transfer/upload",
                json={
                    "filename": "smoke.txt",
                    "mime": "text/plain",
                    "data_base64": base64.b64encode(b"hello").decode(),
                },
            ),
        )
        transfer_id = data.get("file", {}).get("id")
        if transfer_id:
            check("DELETE /api/transfer/delete", client.post("/api/transfer/delete", json={"id": transfer_id}))

        data = check(
            "POST /api/approvals/request",
            client.post(
                "/api/approvals/request",
                json={"action_type": "run_application", "target": "Calculator", "reason": "smoke"},
            ),
        )
        approval_id = data.get("pending_approval", {}).get("id")
        if approval_id:
            check("POST /api/approvals/reject", client.post("/api/approvals/reject", json={"id": approval_id}))

        check(
            "POST /api/permissions/rules",
            client.post(
                "/api/permissions/rules",
                json={"action": "allow", "rule": "get_time"},
            ),
        )
        check(
            "DELETE /api/permissions/rules",
            client.post(
                "/api/permissions/rules/delete",
                json={"action": "allow", "rule": "get_time"},
            ),
        )
        check(
            "POST /api/permissions/session-grant",
            client.post("/api/permissions/session-grant", json={"rule": "get_time"}),
        )
        check(
            "CLEAR /api/permissions/session-grants",
            client.post("/api/permissions/session-grants/clear", json={}),
        )

        data = check(
            "POST /api/reminders",
            client.post("/api/reminders", json={"message": "smoke", "minutes": 1}),
        )
        reminder_id = data.get("reminder", {}).get("id")
        if reminder_id:
            check("DELETE /api/reminders/delete", client.post("/api/reminders/delete", json={"id": reminder_id}))

        run_at = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)).isoformat()
        data = check(
            "POST /api/scheduled-tasks/at",
            client.post(
                "/api/scheduled-tasks/at",
                json={"title": "smoke", "prompt": "return ok", "run_at": run_at, "auto_run": True},
            ),
        )
        task_id = data.get("scheduled_task", {}).get("id")
        if task_id:
            check("POST /api/scheduled-tasks/cancel", client.post("/api/scheduled-tasks/cancel", json={"id": task_id}))

        data = check(
            "POST /api/integrations",
            client.post(
                "/api/integrations",
                json={
                    "name": "smoke",
                    "url": "https://example.com",
                    "method": "GET",
                    "headers": {"Authorization": "secret:SMOKE_KEY"},
                },
            ),
        )
        integration_id = data.get("integration", {}).get("id")
        if integration_id:
            check("POST /api/integrations/delete", client.post("/api/integrations/delete", json={"id": integration_id}))

        check(
            "POST /api/secrets",
            client.post("/api/secrets", json={"name": "SMOKE_KEY", "value": "smoke"}),
        )
        check(
            "DELETE /api/secrets",
            client.post("/api/secrets/delete", json={"name": "SMOKE_KEY"}),
        )

        data = check(
            "POST /api/import/upload",
            client.post(
                "/api/import/upload",
                json={
                    "import_id": import_id,
                    "relative_path": "folder/smoke.txt",
                    "mime": "text/plain",
                    "data_base64": base64.b64encode(b"smoke").decode(),
                },
            ),
        )
        if data.get("ok"):
            import_root = server.IMPORT_DIR / import_id
            check("POST /api/import/notify", client.post("/api/import/notify", json={"import_id": import_id, "count": 1}))

        try:
            from PIL import Image, ImageDraw

            server.OCR_RUNTIME_DIR.mkdir(parents=True, exist_ok=True)
            ocr_path = server.OCR_RUNTIME_DIR / "api_smoke_ocr.png"
            image = Image.new("RGB", (640, 160), "white")
            draw = ImageDraw.Draw(image)
            draw.text((24, 50), "Monday OCR 123 测试", fill="black")
            image.save(ocr_path)
            ocr_base64 = base64.b64encode(ocr_path.read_bytes()).decode()
            check(
                "POST /api/ocr",
                client.post("/api/ocr", json={"image_data": f"data:image/png;base64,{ocr_base64}"}),
            )
        except Exception as exc:
            results.append(("POST /api/ocr", False, 0, str(exc)))

        data = check("POST /api/tts", client.post("/api/tts", json={"text": "测试", "rate": 180}))
        if data.get("ok") and data.get("path"):
            tts_path = Path(data["path"])

    try:
        state = server.load_state()
        state["conversation"] = [
            item for item in state.get("conversation", []) if import_id not in str(item.get("content", ""))
        ]
        server.save_state(state)
        if import_root:
            shutil.rmtree(import_root, ignore_errors=True)
        if tts_path:
            tts_path.unlink(missing_ok=True)
        if ocr_path:
            ocr_path.unlink(missing_ok=True)
    finally:
        destroy_session(load_auth(), token)

    failed = [row for row in results if not row[1]]
    print(f"TOTAL {len(results)} PASS {len(results) - len(failed)} FAIL {len(failed)}")
    for row in failed:
        print("FAIL", row)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
