# Feature Map

This is a best‑effort feature map based on `com/openai/feature/*` packages and manifest components.

## Assistant (Voice interaction)
- Assistant proxy activity: `chatgpt-base_apktool/AndroidManifest.xml` → `com.openai.feature.assistant.impl.AssistantProxyActivity`
- Voice interaction service: `chatgpt-base_apktool/AndroidManifest.xml` → `com.openai.feature.assistant.impl.AssistantVoiceInteractionService`
- Voice interaction session service: `chatgpt-base_apktool/AndroidManifest.xml` → `com.openai.feature.assistant.impl.AssistantVoiceInteractionSessionService`

## Conversation / Conversations
- Common API message type: `chatgpt-base_jadx/sources/com/openai/feature/conversation/common/api/message/ContentReference$PriceDetails$DisplayPriceType.java`
- Conversation streaming service: `chatgpt-base_jadx/sources/com/openai/feature/conversations/impl/coordinator/ConversationStreamingService.java`

## Voice
- Assistant activity: `chatgpt-base_jadx/sources/com/openai/voice/assistant/AssistantActivity.java`
- Foreground service: `chatgpt-base_jadx/sources/com/openai/voice/webrtc/VoiceModeForegroundService.java`
- Quick Settings tile: `chatgpt-base_jadx/sources/com/openai/feature/voice/impl/quicktile/QuickTileService.java`

## Auth
- Redirect activity (Auth0): `chatgpt-base_apktool/AndroidManifest.xml` → `com.auth0.android.provider.RedirectActivity`
- Authentication activity: `chatgpt-base_apktool/AndroidManifest.xml` → `com.auth0.android.provider.AuthenticationActivity`
- Token refresh worker: `chatgpt-base_jadx/sources/com/openai/feature/auth/impl/AccessTokenRefreshWorker.java`

## Onboarding
- OTP deep link activity: `chatgpt-base_jadx/sources/com/openai/feature/onboarding/impl/otp/OtpDeepLinkActivity.java`

## Commerce / Checkout
- Stripe payment flows (activities in manifest): `chatgpt-base_apktool/AndroidManifest.xml` (multiple `com.stripe.android.*` activities)
- RevenueCat billing activities: `chatgpt-base_apktool/AndroidManifest.xml` → `com.revenuecat.purchases.*`

## Gizmos Home
- Package root: `chatgpt-base_jadx/sources/com/openai/feature/gizmoshome/*`

## Notifications
- Notification broadcast receiver: `chatgpt-base_jadx/sources/com/openai/feature/notification/impl/NotificationBroadcastReceiver.java`
- App update receiver: `chatgpt-base_jadx/sources/com/openai/feature/notification/impl/AppUpdateReceiver.java`
- Notification service: `chatgpt-base_jadx/sources/com/openai/feature/notification/impl/NotificationService.java`

## Widgets
- Widget actions:
  - `chatgpt-base_jadx/sources/com/openai/feature/widget/ConversationAction.java`
  - `chatgpt-base_jadx/sources/com/openai/feature/widget/VoiceAction.java`
  - `chatgpt-base_jadx/sources/com/openai/feature/widget/CameraAction.java`
  - `chatgpt-base_jadx/sources/com/openai/feature/widget/ImageGalleryAction.java`
  - `chatgpt-base_jadx/sources/com/openai/feature/widget/WhisperAction.java`
- Widget receiver: `chatgpt-base_apktool/AndroidManifest.xml` → `com.openai.feature.widget.WidgetReceiver`
- Widget install receiver: `chatgpt-base_apktool/AndroidManifest.xml` → `com.openai.feature.widget.WidgetInstallBroadcastReceiver`

## Shortcuts
- Pinned shortcut receiver: `chatgpt-base_apktool/AndroidManifest.xml` → `com.openai.feature.shortcut.impl.PinnedShortcutReceiver`

## Calpico (rooms/messages)
- Paging/data layer: `chatgpt-base_jadx/sources/com/openai/feature/calpico/impl/data/CalpicoRoomsPagingSource.java`
- Paging/data layer: `chatgpt-base_jadx/sources/com/openai/feature/calpico/impl/data/CalpicoMessagesPagingSource.java`
- Worker: `chatgpt-base_jadx/sources/com/openai/feature/calpico/impl/data/CalpicoMessageSendWorker.java`

## App Base / Platform
- Startup provider: `chatgpt-base_jadx/sources/com/openai/apps/appbase/app/startup/FirebaseInitProvider.java`
- Platform utilities: `chatgpt-base_jadx/sources/com/openai/platform/uri/CustomTabsActivityResultContract.java`

## Files / Sharing
- File provider: `chatgpt-base_jadx/sources/com/openai/files/ChatFileProvider.java`
- Draw provider (glyphs): `chatgpt-base_apktool/AndroidManifest.xml` → `com.openai.draw.GlyphsFileProvider`

## Serialization & Models
- Serialization annotation: `chatgpt-base_jadx/sources/com/openai/serialization/Fallback.java`
- User model serializer: `chatgpt-base_jadx/sources/com/openai/user/model/AccentColor$Serializer.java`
