# ChatGPT APK – Decompilation Notes

This folder contains curated documentation derived from the decompiled sources in `chatgpt-base_jadx/` and resources in `chatgpt-base_apktool/`. It is intended as a reverse‑engineering guide: what the major components are, how data moves, and where to inspect code paths.

## Index
- [Architecture overview](architecture-overview.md)
- [App entry points](entrypoints.md)
- [Manifest summary](manifest.md)
- [Permissions & capabilities](permissions-capabilities.md)
- [Class index](class-index.md)
- [Top-level package index](package-index.md)
- [Package deep dives](packages/README.md)
- [Dependency map](dependency-map.md)
- [Core internals (obfuscated)](core-internals.md)
- [Feature map](feature-map.md)
- [Feature deep dives](features/README.md)
- [Networking](networking.md)
- [Auth flows](auth.md)
- [URL / endpoint index](url-index.md)
- [WebSockets](websockets.md)
- [Data & storage](data-storage.md)
- [Logging & telemetry](logging-telemetry.md)
- [Notifications & push](notifications-push.md)
- [Voice & realtime](voice-realtime.md)
- [Assets & embedded web content](assets-webview.md)
- [Commerce & billing](commerce-billing.md)
- [Third‑party libraries](third-party-libraries.md)
- [Schemas & protobuf](schemas.md)
- [Experimentation / flags](experimentation-flags.md)
- [Licensing & protection](licensing-protection.md)
- [Pairip class index](pairip-index.md)
- [Obfuscation notes](obfuscation-notes.md)

## Notes
- The APK is heavily obfuscated. Class names outside `com.openai.*` are mostly short/opaque; treat them as library or obfuscated app internals.
- Decompiled Java is approximate—expect missing generics, synthetic accessors, and inlined lambdas.
- These docs cite class references using their source paths for quick navigation.
