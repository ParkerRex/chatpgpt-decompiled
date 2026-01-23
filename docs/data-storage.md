# Data & Storage

## Observed local tables
The following tables are created in `chatgpt-base_jadx/sources/b10/a.java`:
- `DBCalpicoMessageRecord` (roomId, messageId, createdAt)
- `DBCalpicoMessageChunk` (roomId, messageId, chunkIndex, chunk blob)
- `DBCalpicoRoomPreviewsCache` (id, updatedAt, payload)
- `DBCalpicoRoomsCache` (id, updatedAt, payload)
- `DBCalpicoUsersCache` (accountUserId, payload)
- `DBWebSocketTopicOffset` (topicId, offset)

These suggest cached room/message data plus WebSocket cursoring.

## SQLDelight hints
- SQLDelight async driver warning: `chatgpt-base_jadx/sources/dq/j0.java`
- WebSocket offset queries:
  - Insert/replace + delete: `chatgpt-base_jadx/sources/vj0/g.java`
  - Select wrapper: `chatgpt-base_jadx/sources/q10/z3.java`

## Paging / data access
Calpico data layer classes (paging sources):
- `chatgpt-base_jadx/sources/com/openai/feature/calpico/impl/data/CalpicoRoomsPagingSource.java`
- `chatgpt-base_jadx/sources/com/openai/feature/calpico/impl/data/CalpicoMessagesPagingSource.java`
- `chatgpt-base_jadx/sources/com/openai/feature/calpico/impl/data/CalpicoConnectionsPagingSource.java`
- `chatgpt-base_jadx/sources/com/openai/feature/calpico/impl/data/CalpicoMessageSendWorker.java`

## Storage flow (inferred)
```mermaid
flowchart LR
    A[Network/WebSocket] --> B[Calpico data layer]
    B --> C[Local cache tables]
    C --> D[Paging sources -> UI]
```

## Notes
- The storage layer appears to be custom or abstracted; typical Room annotations are not obvious in `com/openai/*`.
- Obfuscation hides DAO/Repository names; search for SQL strings and table names to locate access points.
