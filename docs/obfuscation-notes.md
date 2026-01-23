# Obfuscation Notes

## What’s obfuscated
- Most non‑`com.openai.*` packages are short/opaque (e.g., `a1`, `bq`, `mk0`, `yy`).
- Decompiled files include comments like `/* compiled from: r8-map-id-... */`, indicating R8/ProGuard mapping was applied and the mapping file is not present.

## What remains readable
- `com.openai.*` packages are largely intact and provide entry points and feature module boundaries.
- Third‑party libraries are identifiable by package (e.g., `io.ktor.*`, `io.sentry.*`, `com.stripe.*`).

## How to navigate obfuscated code
1) **Start from entry points**: manifest components → services/activities/providers.
2) **Trace call chains** from those entry points into obfuscated packages using import lists.
3) **Search by string literals**: SQL table names, event names, URL endpoints.
4) **Use resource IDs**: look for references to `R.string.*` or `R.drawable.*` in obfuscated code.
5) **Map common patterns**: e.g., Kotlin `Companion`, `getValue()` from lazy delegates, coroutines with `SuspendLambda`.

## Practical heuristics
- Packages with many coroutine classes or `SuspendLambda` often contain async pipelines.
- Tables created in SQL strings point to storage layer entry points (see `b10/a.java`).
- WebSocket references to `io.ktor.websocket` are reliable anchors in obfuscated packages.

## Limitations
Without the original mapping file, reconstructing original names is speculative. These docs focus on structural understanding rather than symbol‑perfect reconstruction.
