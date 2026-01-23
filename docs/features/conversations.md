# Conversations & Messaging Core

This is the deep‑dive of the **core chat/conversation system** in the Android client: how conversations are represented, cached, streamed, updated, and rendered.

## 1) Base endpoints & service roots
The app uses multiple service roots. Core conversation traffic is routed through the Android backend host.

**Base URLs (hard‑coded):**
- `https://android.chat.openai.com/backend-api/` — primary conversation API
- `https://android.chat.openai.com/backend-anon/` — anonymous flows
- `https://android.chat.openai.com/graphql` — GraphQL for discovery/other features
- `https://android.chat.openai.com/public-api/` — public endpoints
- `https://realtime.chatgpt.com/v1` — realtime voice

See: `chatgpt-base_jadx/sources/mi0/o.java`.

## 2) Conversation data model
### 2.1 Conversation object (`y30.q`)
`y30.q` is the top‑level conversation object. Key fields:
- `f71952a` — conversationId
- `C` — message tree (`p40.i`)
- timestamps, title, display metadata, flags, etc.

See: `chatgpt-base_jadx/sources/y30/q.java`.

### 2.2 Message tree (`p40.i`)
Messages are stored as a **tree** keyed by node id:
- `f49785a`: Map<nodeId, c40.n4>
- `f49787c`: size/serial
- Utility methods:
  - `b()`/`c()` return linearized paths
  - `d()`/`e()` derive ancestor/descendant chains
  - `h()` returns children of a node

See: `chatgpt-base_jadx/sources/p40/i.java`.

### 2.3 Message node (`c40.n4`)
Message nodes contain full message metadata and content:
- `f8312a` — node id
- `f8318d` — parent id
- `f8320e` — role enum (`c40.f5`: user/assistant/tool/etc.)
- `f8330j` — tool/content enum (`c40.z4`: Browser, Retrieval, ResearchStartTask, etc.)
- `f8335m0` — async task metadata (`c40.d5`) used by deep research & image gen
- `f8337n0` — message id in message DTO
- plus dozens of fields for attachments, tool metadata, timestamps, flags

See: `chatgpt-base_jadx/sources/c40/n4.java`, `chatgpt-base_jadx/sources/c40/f5.java`, `chatgpt-base_jadx/sources/c40/z4.java`.

### 2.4 Message DTO schema (`c40.k4`)
The message serializer enumerates **all payload fields** sent/received in conversation updates. Notable fields:
- `id`, `parentId`, `conversationId`, `role`, `content`, `createdDate`/`modificationDate`
- `toolMetadata`, `contentReferences`, `searchResultGroups`, `searchQueries`
- `attachments`, `imageOperationAttachment`, `nonImageAttachments`
- `asyncTaskId`, `asyncTaskTitle`, `asyncTaskStatusMessages`, `isAsyncTaskResultMessage`
- `researchTaskMetadata`, `resultResearchTaskId`
- `imageGenAsyncTaskId`, `imageGenGroupId`, `imageGenParagenMetadata`

See: `chatgpt-base_jadx/sources/c40/k4.java`.

### 2.5 Conversation metadata DTO (`q30.c`)
Conversation responses include conversation id, current node id, and anonymity:
- `conversationId`, `currentNodeId`, `isAnonymous`

See: `chatgpt-base_jadx/sources/q30/a.java` (serializer for `q30.c`).

## 3) Conversation cache & state flows
### 3.1 Conversation cache (`s60.h`)
`ConversationCache` stores a **StateFlow map** of conversations:
- `f56511e`: StateFlow<Map<conversationId, y30.q>>
- Provides add/update/delete operations

See: `chatgpt-base_jadx/sources/s60/h.java`.

### 3.2 Conversation coordinator (`w50.g1`)
The `ConversationCoordinator` wires together:
- conversation cache flow
- settings/feature flags
- tool repositories (including `ResearchTasksRepository`)
- UI state aggregation

See: `chatgpt-base_jadx/sources/w50/g1.java`.

### 3.3 Conversation bootstrap (`f60.v0`)
`f60.v0` builds a flow (`f20394e`) used across the app:
- Derived from `s60.h` (cache)
- Provides a unified, lifecycle‑aware conversation stream

See: `chatgpt-base_jadx/sources/f60/v0.java`.

## 4) Network operations for conversations
### 4.1 Conversation endpoints
`ma0.h` builds conversation requests with `kz0.d`:
- Uses path segment `"conversation"`
- Serializes request DTOs `k30.g7`, `k30.q7`, `k30.t7`
- Uses JSON content type

See: `chatgpt-base_jadx/sources/ma0/h.java`.

### 4.2 Conversation update streaming
Although the exact SSE/stream class is obfuscated, the architecture uses:
- `ConversationCache` → `ConversationCoordinator` → UI
- Stream/updates are merged into the message tree (`p40.i`) and surfaced through flows

(Entry points are visible in `f60.v0`, `s60.h`, `w50.g1`.)

### 4.3 Resumable streams config
Feature flag `resumable_streams` + token expiration settings exist:
- `token_expiration_seconds` and `resumable_streams` under config key

See: `chatgpt-base_jadx/sources/yy/c2.java`.

## 5) Message update propagation
### 5.1 Tree update flow
The message tree is incrementally updated by applying node changes and rebuilding view‑friendly projections. The tree structure is critical for:
- streaming partial answers
- tool sub‑messages
- async task association

Core helpers: `p40.i` (tree) + conversation cache updates in `s60.h`.

### 5.2 Task discovery from message nodes
As conversations are updated, the app scans message trees for async task metadata (`c40.d5`):
- This powers deep research resumption and async image gen UI

See: `chatgpt-base_jadx/sources/androidx/lifecycle/w.java` (case 6), `chatgpt-base_jadx/sources/c40/n4.java`.

## 6) UI rendering (high‑level)
UI code is mostly Compose‑based. Rendering uses:
- message nodes (`c40.n4`) for content + tool metadata
- conversation flow from `ConversationCoordinator`
- derived UI state in packages like `r50/` and `q10/`

(Concrete Compose renderers are scattered across `r50/*`.)

## 7) Analytics + feature flags (core chat)
Examples:
- Conversation fetch limits: `yy/m0.java` (android_conversation_fetch_limit)
- Conversation cache limit: `yy/l0.java` (android_conversation_cache_limit)
- Conversation notification config: `yy/y5.java`
- Other feature flags around back handler and banners

## 8) Summary of the end‑to‑end flow
1) User opens a conversation; cached `y30.q` loads from `s60.h`.
2) `f60.v0` exposes a stream of conversations to `ConversationCoordinator`.
3) New messages/stream updates arrive and update the message tree (`p40.i`).
4) UI reads the derived state and renders message nodes, tool blocks, attachments, etc.
5) Async tasks (research/image gen) are discovered from message metadata and start/continue streaming.

## 9) Practical implications
- **Message tree is the source of truth** for chat history.
- **Cache + streams** determine what the user sees; the app uses flow‑based state updates.
- **Async features** (research/image gen) are integrated into the message tree and surfaced via metadata.
