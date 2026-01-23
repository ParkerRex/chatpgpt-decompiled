# Voice / Realtime Voice Chat

This document explains the **voice feature** in the Android client: permissions, foreground service, WebRTC session, data channel messages, analytics, and lifecycle behavior.

## 1) Service roots
- Realtime voice uses the dedicated base URL: `https://realtime.chatgpt.com/v1`.
- See: `chatgpt-base_jadx/sources/mi0/o.java`.

## 2) Permissions + entry points
### 2.1 Permissions gate
- Voice requires `RECORD_AUDIO` and, on API 33+, `POST_NOTIFICATIONS` for foreground service notifications.
- Compose permission flow in `vk0/m.java`.

### 2.2 Entry activity
- `com/openai/voice/assistant/AssistantActivity.java` is the voice entry point and routes back to the launcher after gating.

### 2.3 Feature flag
- Voice integrated UX is gated via `yy/yb.java` (`voice_integrated_ux`).

## 3) Foreground service (FGS)
Voice sessions run under a foreground service to keep audio capture alive and avoid OS kill.

### 3.1 Service implementation
- `VoiceModeForegroundService`:
  - Calls `startForeground()` with notification.
  - Requires `RECORD_AUDIO` for Audio / AudioAndScreen modes.
  - Handles “End” action and task removal.

File: `chatgpt-base_jadx/sources/com/openai/voice/webrtc/VoiceModeForegroundService.java`.

### 3.2 FGS starter
- `cq/u.java` builds the service intent with:
  - `start_time`
  - `mode` (voice mode enum)
  - uses `startForegroundService` on API 26+

File: `chatgpt-base_jadx/sources/cq/u.java`.

### 3.3 Stop FGS
- `el0/v0.java` sends `"stop"` intent if flag enabled.

File: `chatgpt-base_jadx/sources/el0/v0.java`.

## 4) WebRTC session
### 4.1 Session manager
- `dx/f0` manages:
  - PeerConnection
  - DataChannel
  - JSON message send/receive
  - outbound queue until channel open

File: `chatgpt-base_jadx/sources/dx/f0.java`.

### 4.2 Data channel observer
- `dx/d0` receives DataChannel messages → wraps bytes → dispatches to coroutine handler.

File: `chatgpt-base_jadx/sources/dx/d0.java`.

### 4.3 PeerConnection observer
- `dx/h1` logs ICE / connection state and handles data channel opened by remote.

File: `chatgpt-base_jadx/sources/dx/h1.java`.

### 4.4 Track state updates
- `dx/x` defines `TrackStateUpdateMessage` with enums:
  - mediaType: `dx/v` (Audio/Video)
  - mediaSource: `dx/u` (CameraFront/Back/ScreenShare/Microphone)
  - state: `dx/w` (Live/Muted/Ended)

File: `chatgpt-base_jadx/sources/dx/x.java`.

## 5) Voice message envelope / protocol
### 5.1 Data channel message type mapping
`wk0/x` dispatches JSON `type` strings to serializers:
- `state_update`
- `usage_update`
- `conversation_update`
- `streaming_message_update`
- `speaking_update`
- `performance`
- `tool_update`
- `startup_telemetry`
- `full_chat_message`
- `live_captioning_text`

File: `chatgpt-base_jadx/sources/wk0/x.java`.

### 5.2 Message envelope
- `dx/l0` wraps outbound payloads with `type="data_message"`.

File: `chatgpt-base_jadx/sources/dx/l0.java`.

## 6) Session request payload
- Voice session request serializer includes fields like:
  - `voice`
  - `modelSlug`
  - `voiceSessionId`
  - `voiceTrainingAllowed`
  - `voiceMode`
  - `conversationId`

Files:
- `chatgpt-base_jadx/sources/xk0/b.java`
- `chatgpt-base_jadx/sources/xk0/d.java`

## 7) Audio capture pipeline (client)
- `yu0/k0` uses `AudioRecord` for audio capture and buffer sizing.

File: `chatgpt-base_jadx/sources/yu0/k0.java`.

## 8) Analytics & telemetry
- Voice session analytics are emitted via `ChatgptVoiceSession` proto.
- Tracks timestamps such as:
  - `data_channel_open_ts_ms`
  - `transport_connect_*`
  - session start/end

Files:
- `chatgpt-base_jadx/sources/el0/g1.java`
- `chatgpt-base_jadx/sources/protobuf_analytics_events/v1/ChatgptVoiceSession.java`.

## 9) End‑to‑end flow (voice session)
1) User taps voice entry → `AssistantActivity` launches.
2) Permission gate ensures `RECORD_AUDIO` and notifications on API 33+.
3) Foreground service starts to keep mic alive.
4) WebRTC session (`dx/f0`) creates PeerConnection + DataChannel.
5) Client sends session request payload to realtime service.
6) Data channel streams conversation updates + live captions + speaking state.
7) UI renders live transcript, assistant speech, and audio status.

## 10) Open gaps
- UI layer mapping of `streaming_message_update` and `live_captioning_text` is not explicitly traced here.
- The exact lifecycle wiring between `VoiceModeViewModel` (`gh0/n0.java`) and WebRTC session is not enumerated but is implied by analytics and FGS usage.
