# ChatGPT Android – Top 5 Features (deep‑dive docs)

This folder contains “excruciating detail” docs for the **five most user‑visible features** in the ChatGPT Android app, based on the decompiled client code under `chatgpt-base_jadx/`.

## Feature set
1) **Conversations & Messaging Core** → `docs/features/conversations.md`
2) **Deep Research** → `docs/features/deep-research.md`
3) **Image Generation (DALL·E / ImageGen)** → `docs/features/image-generation.md`
4) **Voice / Realtime Voice Chat** → `docs/features/voice.md`
5) **Files & Attachments** → `docs/features/files-and-attachments.md`

Each doc includes:
- entry points (UI/feature flags),
- data models & serializers,
- network/streaming paths,
- state machines & lifecycle,
- persistence/cache behavior,
- UI rendering & analytics hooks.
