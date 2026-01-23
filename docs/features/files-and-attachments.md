# Files & Attachments

This document describes **file/attachment handling** in the Android client: models, message wiring, upload/download flows, and UI rendering.

## 1) Attachment model hierarchy
Attachments are modeled as a polymorphic hierarchy (`n00.g1`) with a serializer that dispatches by `type`.

**Attachment types (serializer dispatch):**
- `file`
- `media`
- `link`
- `post`
- `conversation`
- `sticker`

Files:
- `chatgpt-base_jadx/sources/n00/g1.java`
- `chatgpt-base_jadx/sources/n00/j0.java` (type switch)
- `chatgpt-base_jadx/sources/n00/q0.java` (file)
- `chatgpt-base_jadx/sources/n00/w0.java` (media)
- `chatgpt-base_jadx/sources/n00/t0.java` (link)
- `chatgpt-base_jadx/sources/n00/n0.java` (conversation attachment)

## 2) File attachment shape
### 2.1 File attachment object
`n00.q0` (type `"file"`) includes:
- `fileId`
- `file` object (details)

Serializer: `n00/o0.java`.

### 2.2 File details object
`n00.b4` (file details) includes:
- `id`
- `downloadUrl`
- `mimeType`
- `imageMetadata`
- `name`

Serializers: `n00/z3.java`, `n00/c4.java`, `n00/e4.java`.

## 3) Message models that carry attachments
### 3.1 Message DTO (primary)
The core message DTO includes `attachments` and other attachment‑related fields:
- `attachments`
- `imageOperationAttachment`
- `nonImageAttachments`

See: `chatgpt-base_jadx/sources/c40/k4.java`.

### 3.2 Other message‑like models
- `n00.r` includes `attachments` list (serializer `n00/p.java`).
- `x00/s0` and `n00/c3` include attachments + system hints for snippets.

Files:
- `chatgpt-base_jadx/sources/n00/r.java`
- `chatgpt-base_jadx/sources/n00/p.java`
- `chatgpt-base_jadx/sources/x00/s0.java`
- `chatgpt-base_jadx/sources/n00/c3.java`

## 4) Composer attachment input
### 4.1 Attachment input model
`li0.r3` allows **either**:
- `attachmentUri` (local URI)
- `attachmentAssetPointer` (`mk0.v4`) — pre‑uploaded asset pointer

It enforces **mutual exclusivity** between the two fields.

Files:
- `chatgpt-base_jadx/sources/li0/r3.java`
- `chatgpt-base_jadx/sources/li0/p3.java` (serializer)

### 4.2 Asset pointer (image)
`mk0.v4` represents an image asset pointer:
- `id` (asset id)
- width / height / size
- optional URL / metadata

File: `chatgpt-base_jadx/sources/mk0/v4.java`.

## 5) Download flow
The app can download attachments tied to a conversation via:
```
conversation/{conversationId}/attachment/{attachmentId}/download
```

This is constructed in the network layer.

File: `chatgpt-base_jadx/sources/o60/z0.java` (case 12).

## 6) Upload flows (known partials)
### 6.1 ImageTagFileUploadService
- `ia0/x.java` is labeled `ImageTagFileUploadService` (logger name).
- Initializes uploads and finalizes them via `ja0/p` / `qi0/b` network client.

Files:
- `chatgpt-base_jadx/sources/ia0/x.java`
- `chatgpt-base_jadx/sources/ja0/p.java`
- `chatgpt-base_jadx/sources/qi0/b.java`

### 6.2 File uploaded notification
- `o60/z0.java` constructs `files/{fileId}/uploaded` requests.

File: `chatgpt-base_jadx/sources/o60/z0.java` (case 13).

## 7) Local file access & sharing
- `com/openai/files/ChatFileProvider` provides secure access to local files for sharing/attachment.

File: `chatgpt-base_jadx/sources/com/openai/files/ChatFileProvider.java`.

## 8) UI rendering & icons
### 8.1 File type icon mapping
- Compose utilities map file types to icons (image/audio/video/etc.).

Files:
- `chatgpt-base_jadx/sources/dq/k8.java`
- `chatgpt-base_jadx/sources/a30/a0.java`

### 8.2 Attachments count strings
- Attachment count rendering uses plural resources (e.g., `calpico_room_snippet_attachments`).

File: `chatgpt-base_jadx/sources/q10/c4.java`.

## 9) Limits & flags
- `yy/e.java` controls attachments limit.
- `yy/e8.java` toggles “long paste as attachment.”

## 10) End‑to‑end attachment flow (client‑side)
1) User selects file → composer builds `li0.r3` (URI or asset pointer).
2) Upload service runs (if needed), producing asset pointer metadata.
3) Message send includes attachments list in message payload.
4) Server returns message nodes with `attachments` and file metadata.
5) UI renders attachment previews/icons; downloads use the conversation attachment endpoint.

## 11) Open gaps
- The exact file upload endpoint for ChatGPT attachments is not explicit in the decompiled client.
- Some upload logic appears shared with image tagging / other flows and requires deeper tracing.
