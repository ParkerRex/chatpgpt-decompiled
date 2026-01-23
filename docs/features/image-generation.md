# Image Generation (DALL·E / ImageGen)

This document explains how **image generation** works in the Android client, from message metadata and async tasks to UI progress indicators and analytics.

## 1) High‑level model
- Image generation is treated as a **tool invocation** embedded in the conversation stream.
- Outputs and progress are tracked via **async task metadata** and **image result fields** on messages.
- Client‑side “ImageGen” is usually shown as an **async banner** with progress text and percent completion.

## 2) Tool and mode wiring
### 2.1 Tool identifiers
- Tool enums include `Dalle` and `ImageGen` in multiple places:
  - `c40.f5` role/tool enum (Dalle, ImageGen)
  - `c40.z4` tool/content enum (Dalle, ImageGen)
  - `mk0.r4` “tool slug” enum includes `dalle` (Dalle)
  - `mk0.q3` includes `ImageGen("image-gen")`

Files:
- `chatgpt-base_jadx/sources/c40/f5.java`
- `chatgpt-base_jadx/sources/c40/z4.java`
- `chatgpt-base_jadx/sources/mk0/r4.java`
- `chatgpt-base_jadx/sources/mk0/q3.java`

### 2.2 Tool selection logic
- `mk0.t4` selects between Dalle vs GPT‑4o image capabilities based on metadata.

See: `chatgpt-base_jadx/sources/mk0/t4.java`.

### 2.3 “ImageGen” feature flagging / entry
- UI starter prompt banners and upsell counters exist:
  - `yy/j7.java`, `yy/k7.java`, `yy/l7.java`, `yy/m7.java`
  - “ImageGenBanner” enum: `yy/eb.java`

## 3) Message schema: image‑gen fields
The message DTO (`c40.k4` and `o30.a1`) includes a large set of image‑gen fields:
- `imageGenAsyncTaskId`
- `asyncImageGenMetadata`
- `imageGenGroupId`
- `imageGenParagenMetadata`
- `imagePromptId`
- `imageSendUuid` / `imagePromptSendUuid`
- `imageResults`
- `dalle` / `image_gen` tool slots

Files:
- `chatgpt-base_jadx/sources/c40/k4.java`
- `chatgpt-base_jadx/sources/o30/a1.java`

## 4) Async task metadata
Image gen uses the **async task metadata object** `c40.d5` (same shape as Deep Research):
- `asyncTaskId`
- `asyncTaskConversationId`
- `asyncTaskCreatedAt`
- `asyncTaskTitle`
- `asyncTaskStatusMessages`

Files:
- `chatgpt-base_jadx/sources/c40/b5.java`
- `chatgpt-base_jadx/sources/c40/d5.java`

### 4.1 Async task status messages
- Task status messages are a structured object (`o30.i5`) with four strings.
- Used to display progress and error/cancel text.

Files:
- `chatgpt-base_jadx/sources/o30/i5.java`
- `chatgpt-base_jadx/sources/o30/g5.java`

## 5) Image result model
### 5.1 Image results container
- `imageResults` field is modeled by classes in `o30`:
  - `o30.na`, `o30.pa`, `o30.hb`
- These represent generated image entries and their metadata.

Files:
- `chatgpt-base_jadx/sources/o30/na.java`
- `chatgpt-base_jadx/sources/o30/pa.java`
- `chatgpt-base_jadx/sources/o30/hb.java`

## 5.2 Image generation settings (size / preset)
The image generation settings model includes size presets and related metadata:\n- `mk0.n4` contains image generation settings fields (id, prompt, size preset, etc.).\n- `mk0.m4` defines size preset values (`smimage`, `image`, `xlimage`, `unknown`).\n\nFiles:\n- `chatgpt-base_jadx/sources/mk0/n4.java`\n- `chatgpt-base_jadx/sources/mk0/m4.java`

## 6) UI rendering and progress
### 6.1 Progress text + percent
- Progress strings live in `R.plurals.image_gen_tool_summarizer_display_text_*`.
- Compose UI builds progress string from percent completed and stage:
  - `u30/f.java` and `u50/a.java` show the progress banner.

Files:
- `chatgpt-base_jadx/sources/u30/f.java`
- `chatgpt-base_jadx/sources/u50/a.java`

### 6.2 Iconography
- Image gen uses `R.drawable.image_gen` in UI.

Files:
- `chatgpt-base_jadx/sources/u50/h.java`
- `chatgpt-base_jadx/sources/a30/a0.java`

### 6.3 Inline async banner
- The inline async UI entry `AsyncImageGenInline` exists as a UI mode.

File: `chatgpt-base_jadx/sources/li0/vb.java`.

## 7) Analytics & instrumentation
### 7.1 Client‑side stage tracking
- Image generation stage checkpoints are tracked via protobuf analytics:
  - `ChatgptImageGenClientCheckpoint`
  - `ChatgptImageGenClientStageType`
  - `ChatgptImageGenClientSegmentMetadata`

Files:
- `chatgpt-base_jadx/sources/protobuf_analytics_events/v1/ChatgptImageGenClientCheckpoint.java`
- `chatgpt-base_jadx/sources/protobuf_analytics_events/v1/ChatgptImageGenClientStageType.java`
- `chatgpt-base_jadx/sources/protobuf_analytics_events/v1/ChatgptImageGenClientSegmentMetadata.java`

### 7.2 Usage tracking / ratings
- There are analytics events around image gen ratings and paragen actions:
  - `nk0/s.java`, `nk0/u.java`, `nk0/t.java`, `nk0/w.java`

## 8) Deep links
- AndroidManifest declares deep links for image‑gen routes (`/image-gen`, `/images`).

File: `chatgpt-base_jadx/resources/AndroidManifest.xml`.

## 9) Network layer and API notes
- Base URLs include `https://android.chat.openai.com/backend-api/` and `backend-anon`.
- No standalone `/image-gen` endpoint is visible in decompiled code; image gen appears to ride on **conversation message tool payloads** and async task updates in the conversation stream.

File: `chatgpt-base_jadx/sources/mi0/o.java`.

## 10) End‑to‑end flow (client‑side)
1) User selects image gen or prompts for images in chat.
2) Request is sent as a **conversation message with tool metadata** (`dalle` / `image_gen`).
3) Server responds with a message containing async task metadata (`d5`) and image gen fields.
4) UI shows async banner with progress strings and percent (stage updates).
5) Final `imageResults` populate the message node; user can open / view / rate / download.

## 11) Open gaps
- The exact endpoint for image generation isn’t explicit in the decompiled client; the structure strongly implies it is **embedded in conversation API** rather than a standalone endpoint.
- The full mapping from `asyncImageGenMetadata` → UI is not fully visible without deeper Compose‑level inspection.
