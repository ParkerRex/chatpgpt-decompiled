# WebSockets

## Observed stack
WebSocket support is provided by Ktor’s WebSocket package.

Anchors:
- Ktor WebSocket package: `chatgpt-base_jadx/sources/io/ktor/websocket/*`

## WebSocket manager (core)
- Manager: `chatgpt-base_jadx/sources/tj0/k0.java`
  - Logger tag: `WebSocketManager`
  - Handles URL fetch + exponential backoff
  - Tracks topics and offsets
- Connection lifecycle logging: `chatgpt-base_jadx/sources/tj0/s.java`
  - Logs connect/disconnect events

## App‑level wrappers / usage (obfuscated)
- `chatgpt-base_jadx/sources/am0/a.java`
- `chatgpt-base_jadx/sources/am0/f.java`
- `chatgpt-base_jadx/sources/l80/s.java` (wraps `io.ktor.websocket.w`)
- `chatgpt-base_jadx/sources/pe/c.java`
- `chatgpt-base_jadx/sources/uz/b.java` (logger tag: `AuthChallengeWebSocket`)

## Offset persistence
- Table creation: `chatgpt-base_jadx/sources/b10/a.java` → `DBWebSocketTopicOffset`
- SQLDelight queries:
  - Insert/replace + delete: `chatgpt-base_jadx/sources/vj0/g.java`
  - Select (query wrapper): `chatgpt-base_jadx/sources/q10/z3.java`

## WebSocket flow (inferred)
```mermaid
flowchart TD
    A[Feature code] --> B[WebSocketManager (tj0.k0)]
    B --> C[Ktor WebSocket]
    C --> D[Message handling]
    D --> E[Offset persistence]
```

## What to inspect next
- Search for `tj0.k0` call sites to see where WS connections are created and managed.
- Follow SQLDelight queries in `vj0/g.java` to map offset update triggers.
