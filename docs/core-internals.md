# Core Internals (Obfuscated Packages)

This document lists high‑value, non‑`com.openai.*` classes that appear to implement core app behavior.

## Networking core
- Base URLs / endpoints: `chatgpt-base_jadx/sources/mi0/o.java`
- Request flags + host allowlist: `chatgpt-base_jadx/sources/mi0/p.java`
- HTTP requester + telemetry: `chatgpt-base_jadx/sources/mi0/l.java`
- Response wrapper: `chatgpt-base_jadx/sources/mi0/n0.java`
- Ktor client wrapper: `chatgpt-base_jadx/sources/wy0/c.java`

## WebSocket core
- WebSocket manager: `chatgpt-base_jadx/sources/tj0/k0.java`
- Connection lifecycle logging: `chatgpt-base_jadx/sources/tj0/s.java`

## WebSocket persistence (SQLDelight)
- Schema (tables): `chatgpt-base_jadx/sources/b10/a.java`
- Offset insert/delete: `chatgpt-base_jadx/sources/vj0/g.java`
- Offset query wrapper: `chatgpt-base_jadx/sources/q10/z3.java`

## Logging core
- Logger interface: `chatgpt-base_jadx/sources/gi0/a.java`
- Logger registry: `chatgpt-base_jadx/sources/gi0/b.java`
- Logger wrapper: `chatgpt-base_jadx/sources/gi0/c.java`

## Voice / RTC core
- PeerConnection factory: `chatgpt-base_jadx/sources/dx/u0.java`
- PeerConnection observer: `chatgpt-base_jadx/sources/dx/h1.java`
- Audio/video pipeline: `chatgpt-base_jadx/sources/dx/f0.java`, `chatgpt-base_jadx/sources/dx/n1.java`, `chatgpt-base_jadx/sources/dx/r.java`
- WebRTC logging: `chatgpt-base_jadx/sources/nf/c0.java`

## Experimentation / flags
- Statsig options builder: `chatgpt-base_jadx/sources/yy/nc.java`

## Notes
- These classes are typically referenced from `com.openai.*` features through DI (`ct/b` → `vx/h`).
- Most behavior is driven by coroutines and obfuscated lambdas; use call‑site tracing from feature modules to map actual flows.
