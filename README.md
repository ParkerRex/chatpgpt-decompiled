Project name: ChatGPT APK - Decompiled Repo
One liner: A consolidated reverse-engineering workspace for the ChatGPT Android APK with decompiled code, resources, and curated analysis docs.
Stack: Android APK decompilation tooling (JADX, APKTool), Java/Kotlin decompiled sources, Smali, Android resources/XML, Markdown documentation, TypeScript helper script.
Problem: Make a decompiled Android app practical to inspect by organizing raw reverse-engineering outputs and adding navigable, review-focused documentation.

# ChatGPT APK - Decompiled Repo

This repo is a consolidated view of the decompiled ChatGPT Android app plus a curated documentation set.

## Quick map (start here)
- Decompiled app (JADX):
  - Code: `chatgpt-base_jadx/sources/`
  - Resources: `chatgpt-base_jadx/resources/` (includes `AndroidManifest.xml`, `META-INF/`, `res/`, `assets/`)
- APKTool output (smali + resources): `chatgpt-base_apktool/`
- Curated docs and indexes: `docs/`
- Original artifact: `chatgpt-base.apk`

## Why the repo is structured this way
Decompilation output is not a normal Android Studio project. We keep multiple views of the app to make navigation and review practical:
- `chatgpt-base_jadx/` for readable Java/Kotlin decompile output.
- `chatgpt-base_apktool/` for low-level resources and smali when JADX is ambiguous.
- `docs/` for curated maps, indices, and feature deep dives.

## Structure
Top-level
- `chatgpt-base_jadx/`
  - Purpose: canonical "full fidelity" decompile for source navigation.
  - Shape: `sources/` (Java/Kotlin) + `resources/` (manifest, META-INF, res, assets).
- `chatgpt-base_apktool/`
  - Purpose: raw APKTool output for smali/res inspection.
  - Shape: `AndroidManifest.xml`, `res/`, `assets/`, `smali*`, `original/`.
- `docs/`
  - Purpose: review-oriented docs, indices, and curated analysis.
  - Notable folders: `docs/features/`, `docs/packages/`.
- `chatgpt-base.apk`
  - Purpose: original input artifact.
- `client-api.ts`
  - Purpose: lightweight typed API helper (not part of the APK decompile).

## Entry points for common tasks
- Search app code: `chatgpt-base_jadx/sources/`
- Find Android manifest:
  - `chatgpt-base_jadx/resources/AndroidManifest.xml`
  - `chatgpt-base_apktool/AndroidManifest.xml`
- Browse resources: `chatgpt-base_apktool/res/` or `chatgpt-base_jadx/resources/res/`
- Inspect smali/bytecode: `chatgpt-base_apktool/smali*/`
- Start with docs: `docs/README.md`
- Feature deep dives: `docs/features/README.md`
- Package deep dives: `docs/packages/README.md`
- URL and endpoint index: `docs/url-index.md`
