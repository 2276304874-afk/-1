from __future__ import annotations

import base64
import json
import threading
import time
import uuid
from pathlib import Path
from typing import Any, Dict, List, Optional


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
TRANSFER_DIR = DATA_DIR / "transfer"
META_PATH = DATA_DIR / "transfer.json"
TRANSFER_LOCK = threading.RLock()
MAX_FILE_BYTES = 30 * 1024 * 1024


def _default_meta() -> Dict[str, Any]:
    return {"files": []}


def load_meta() -> Dict[str, Any]:
    with TRANSFER_LOCK:
        if not META_PATH.exists():
            DATA_DIR.mkdir(parents=True, exist_ok=True)
            meta = _default_meta()
            save_meta(meta)
            return meta
        try:
            data = json.loads(META_PATH.read_text(encoding="utf-8"))
            base = _default_meta()
            base.update(data)
            return base
        except Exception:
            return _default_meta()


def save_meta(meta: Dict[str, Any]) -> None:
    with TRANSFER_LOCK:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        tmp = META_PATH.with_suffix(".tmp")
        tmp.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
        tmp.replace(META_PATH)


def public_files() -> List[Dict[str, Any]]:
    return [
        {
            "id": item.get("id"),
            "filename": item.get("filename"),
            "size": item.get("size"),
            "mime": item.get("mime"),
            "created_at": item.get("created_at"),
        }
        for item in load_meta().get("files", [])
    ]


def add_file(filename: str, data_base64: str, mime: str = "application/octet-stream") -> Dict[str, Any]:
    filename = Path(filename or "未命名文件").name.strip() or "未命名文件"
    try:
        content = base64.b64decode(data_base64)
    except Exception as exc:
        raise ValueError("文件内容不是有效的 Base64") from exc
    if len(content) > MAX_FILE_BYTES:
        raise ValueError("文件超过 30 MB，暂不支持传输")

    file_id = uuid.uuid4().hex
    TRANSFER_DIR.mkdir(parents=True, exist_ok=True)
    (TRANSFER_DIR / file_id).write_bytes(content)

    item = {
        "id": file_id,
        "filename": filename[:200],
        "size": len(content),
        "mime": mime[:120] or "application/octet-stream",
        "created_at": time.time(),
    }
    meta = load_meta()
    meta.setdefault("files", []).append(item)
    save_meta(meta)
    return {
        "id": item["id"],
        "filename": item["filename"],
        "size": item["size"],
        "mime": item["mime"],
        "created_at": item["created_at"],
    }


def get_file(file_id: str) -> Optional[Dict[str, Any]]:
    item = next((file for file in load_meta().get("files", []) if file.get("id") == file_id), None)
    path = TRANSFER_DIR / file_id
    if not item or not path.exists():
        return None
    return {"meta": item, "path": path}


def delete_file(file_id: str) -> bool:
    meta = load_meta()
    before = len(meta.get("files", []))
    meta["files"] = [item for item in meta.get("files", []) if item.get("id") != file_id]
    if len(meta["files"]) == before:
        return False
    (TRANSFER_DIR / file_id).unlink(missing_ok=True)
    save_meta(meta)
    return True
