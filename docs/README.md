# ChatGPT APK – Decompilation Notes

This folder contains curated documentation derived from the decompiled sources in `chatgpt-base_jadx/` and resources in `chatgpt-base_apktool/`. It is intended as a reverse-engineering guide: what the major components are, how data moves, and where to inspect code paths.

## Quick map (start here)
- Decompiled app (JADX):
  - Code: `chatgpt-base_jadx/sources/`
  - Resources: `chatgpt-base_jadx/resources/`
- APKTool output (smali + resources): `chatgpt-base_apktool/`
- Docs entry point: `docs/README.md`

## Why the docs are structured this way
Decompilation output is not a normal Android Studio project. This doc set is a curated map that makes review and navigation feasible: it highlights entry points, indexes large surfaces (classes, packages, URLs), and groups key feature areas.

## Doc set structure
- Indexes: `class-index.md`, `package-index.md`, `url-index.md`, `dependency-map.md`, `pairip-index.md`
- Architecture and entry points: `architecture-overview.md`, `entrypoints.md`, `manifest.md`, `permissions-capabilities.md`
- Feature deep dives: `features/README.md` and `features/*.md`
- Package deep dives: `packages/README.md` and `packages/*.md`
- Subsystems and cross-cutting areas: `networking.md`, `auth.md`, `data-storage.md`, `logging-telemetry.md`, `notifications-push.md`, `voice-realtime.md`, `assets-webview.md`, `commerce-billing.md`, `licensing-protection.md`, `experimentation-flags.md`, `schemas.md`

## Entry points for common tasks
- Understand app structure: `architecture-overview.md`
- Find launch wiring: `entrypoints.md`
- Check manifest components and permissions: `manifest.md`, `permissions-capabilities.md`
- Identify major features: `feature-map.md`, `features/README.md`
- Inspect packages and classes: `package-index.md`, `class-index.md`, `packages/README.md`
- Scan network surface: `url-index.md`, `networking.md`, `websockets.md`

## Full index
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
