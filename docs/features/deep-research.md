# Deep Research (long‑running tasks)

This document traces **Deep Research** end‑to‑end in the Android app: UI entry points, data models, task streaming, UI rendering, analytics, and resume behavior after app restarts.

## 1) Feature overview (what “Deep Research” is in the client)
- The client models Deep Research as a **long‑running task** identified by a **taskId**, not as a separate “job/run” object.
- Task progress is delivered via a **streaming endpoint** and rendered as **task events** (status updates + rows like search/website/open/etc.).
- The active in‑memory state for each task is `o40.p` (conversationId, taskId, list of events), stored by `ResearchTasksRepository`.

Key files:
- `chatgpt-base_jadx/sources/f60/s1.java` — ResearchTasksRepository (task map + stream starter)
- `chatgpt-base_jadx/sources/o40/p.java` — in‑memory task state and helpers
- `chatgpt-base_jadx/sources/k30/h5.java` — task event polymorphic dispatch
- `chatgpt-base_jadx/sources/k30/x6.java` — task status enum

## 2) UI entry points & toggles
### 2.1 Composer tool entry
- Composer tool list includes **Deep Research** as tool id `"research"` with label “Deep Research.”
- See: `chatgpt-base_jadx/sources/r50/c0.java`.

### 2.2 Composer icon mapping
- The `"research"` tool id maps to a telescope icon (`R.drawable.telescope`).
- See: `chatgpt-base_jadx/sources/v20/i.java`.

### 2.3 Analytics for toggle
- Toggling research fires a “Deep Research Toggled” event.
- See: `chatgpt-base_jadx/sources/ax/e2.java` and `chatgpt-base_jadx/sources/v20/l.java`.

### 2.4 “hasSeen” tooltip / onboarding
- Tooltip state stored in app settings.
- See: `chatgpt-base_jadx/sources/tk0/k2.java` (`hasSeenDeepResearchTooltip`) and `chatgpt-base_jadx/sources/cz/f0.java`.

### 2.5 Composer mode + slug
- Deep Research is a composer mode slugged `"deep_research"`.
- See: `chatgpt-base_jadx/sources/mk0/p1.java` (enum includes `DeepResearch`).

## 3) Message schema & metadata (what gets persisted in messages)
### 3.1 Message DTO includes research fields
- Message serialization includes:
  - `researchTaskMetadata`
  - `resultResearchTaskId`
- These are persisted on message objects to associate results with tasks.
- See: `chatgpt-base_jadx/sources/c40/k4.java`.

### 3.2 Research‑specific message/tool types
- Content/turn type enum includes:
  - `ResearchClarify`
  - `ResearchStartTask`
- Tool/role enum includes `ResearchKickoff`.
- See: `chatgpt-base_jadx/sources/c40/z4.java` and `chatgpt-base_jadx/sources/c40/f5.java`.

### 3.3 Task metadata object used in message nodes
- Message node model `c40.n4` contains `f8335m0` of type `c40.d5` (task metadata).
- `c40.d5` fields: `asyncTaskId`, `asyncTaskConversationId`, `asyncTaskCreatedAt`, `asyncTaskTitle`, `asyncTaskStatusMessages`.
- See: `chatgpt-base_jadx/sources/c40/n4.java`, `chatgpt-base_jadx/sources/c40/d5.java`, `chatgpt-base_jadx/sources/c40/b5.java`.

## 4) Task state model (client‑side)
### 4.1 In‑memory task container
`o40.p` has:
- `conversationId` (`f46530a`)
- `taskId` (`f46531b`)
- `events` list (`f46532c`) containing `k30.g5` events

Helpers:
- `d()` returns a **status** (`k30.x6`) derived from status events.
- `b()` returns **rows** (e.g., sources) by extracting `k30.h6` row events and filtering to `k30.g6`.

See: `chatgpt-base_jadx/sources/o40/p.java`.

### 4.2 Task events (k30.g5 polymorphic)
`k30.g5` is a sealed polymorphic event. Deserializer dispatch:
- `task_status` → `k30.l6` → `k30.x6` enum
- `row` → `k30.h6` → `k30.x5` (row content)
- `final_message` → `k30.j5`
- `fallback` → `k30.m6`

See: `chatgpt-base_jadx/sources/k30/h5.java`, `chatgpt-base_jadx/sources/k30/l6.java`, `chatgpt-base_jadx/sources/k30/j5.java`, `chatgpt-base_jadx/sources/k30/m6.java`.

### 4.3 Status enum
`k30.x6` values:
- Cancelled, Created, Running, Pending, Completed, Failed, Undetermined

See: `chatgpt-base_jadx/sources/k30/x6.java`.

### 4.4 Row event subtypes
Row event type is chosen by `k30.i6` based on `type` field:
- `search`
- `website_open`
- `file_open`
- `python_analysis`
- `summary`

See: `chatgpt-base_jadx/sources/k30/i6.java`.

## 5) Streaming pipeline (task updates)
### 5.1 Repository
`ResearchTasksRepository` (`f60.s1`) owns a `Map<taskId, o40.p>` in a StateFlow and starts streams.

Key method: `a(conversationId, taskId)`
- Creates `o40.p(conversationId, taskId)`
- Stores it under `taskId`
- Starts a coroutine to stream updates

See: `chatgpt-base_jadx/sources/f60/s1.java`.

### 5.2 Stream coroutine chain
Call chain when a task starts:
- `s1.a()` → `o1` → `n1` → `m1`
  - `o1` wraps stream with error handling (captures exceptions into task events).
  - `n1` starts flow collection from network via `o60.i2`.
  - `m1` appends each streamed `k30.g5` event to the task event list.

Files:
- `chatgpt-base_jadx/sources/f60/o1.java`
- `chatgpt-base_jadx/sources/f60/n1.java`
- `chatgpt-base_jadx/sources/f60/m1.java`

### 5.3 Network stream for tasks
- `o60.i2` creates task streams (long‑lived flow of events).
- Task stream request is constructed in `ma0.h` with `Connection: keep-alive`.
- Endpoint path is built as **`tasks/{taskId}/stream`**.

Files:
- `chatgpt-base_jadx/sources/o60/i2.java`
- `chatgpt-base_jadx/sources/ma0/h.java`
- `chatgpt-base_jadx/sources/md/u.java` (case 16 uses `"stream"` in path builder)

## 6) Resume behavior (app restart / leaving app)
### 6.1 Where task ids come from after restart
The app **does not persist running task state locally**; instead it rescans conversation data:
- Conversations are cached in `s60.h` as `Map<conversationId, y30.q>` (StateFlow `f56511e`).
- `f60.v0` exposes a conversation flow derived from that cache.
- `ResearchTasksRepository` subscribes to the conversation flow and **scans message trees for new task ids**.

Files:
- `chatgpt-base_jadx/sources/s60/h.java` — conversation cache
- `chatgpt-base_jadx/sources/f60/v0.java` — flow built over cache
- `chatgpt-base_jadx/sources/f60/s1.java` — subscribes to `v0.f20394e`

### 6.2 Task discovery scan
The scan is implemented as `androidx.lifecycle.w` case 6:
- Iterates each conversation’s message tree (`y30.q.C` → `p40.i`)
- Extracts `c40.n4.f8335m0` (task metadata)
- If taskId isn’t in repository map, start streaming it

Files:
- `chatgpt-base_jadx/sources/androidx/lifecycle/w.java` (case 6)
- `chatgpt-base_jadx/sources/y30/q.java` (conversation object w/ `C` message tree)
- `chatgpt-base_jadx/sources/p40/i.java` (message tree)
- `chatgpt-base_jadx/sources/c40/n4.java` (message node)

### 6.3 Practical result
After app relaunch:
1. Conversations rehydrate into cache.
2. ResearchTasksRepository scans for task metadata.
3. For any taskId, the repository restarts streaming `tasks/{taskId}/stream`.

## 7) UI rendering & status mapping
### 7.1 Progress indicators
- Async progress indicators exist in Compose (e.g., `asyncTaskProgressIndicator`).
- See: `chatgpt-base_jadx/sources/ny/c.java`.

### 7.2 Task state → UI state mapping
- `r30/a.java` inspects `o40.p.d()` (task status) to determine display state for a research task (e.g., running/completed/failed).
- This is used when rendering message sequences and tool summaries.

Files:
- `chatgpt-base_jadx/sources/r30/a.java`
- `chatgpt-base_jadx/sources/o40/p.java`

## 8) Analytics and flags
- Tool toggle logging: `ax/e2.java`, `v20/l.java`.
- Tooltip/NUX gating: `tk0/k2.java`, `cz/f0.java`.

## 9) Summary (answers to the original questions)
- **Is it a task or job/run?**
  - It is modeled as a **task** (taskId). All client‑side logic is task‑centric.
- **How does the app resume after exit/relaunch?**
  - It rescans conversation message trees for task metadata and re‑attaches streams to each task id.
- **How are long‑running tasks handled?**
  - Tasks are streamed via `tasks/{taskId}/stream`, events are appended to in‑memory state (`o40.p`), UI reads status/rows to display progress.

## 10) Open gaps (what’s not explicit in code)
- The client does not show durable persistence of task state; any “history” appears to come from server re‑streaming after reattach.
- `researchTaskMetadata` / `resultResearchTaskId` exist in DTOs but are not directly referenced in the visible code path; the active path uses `c40.n4.f8335m0` (`d5`) for discovery.
