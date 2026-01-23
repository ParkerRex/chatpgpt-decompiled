# AndroidManifest Summary

## Application
- name: `com.pairip.application.Application`
- label: `@string/31`
- theme: `@style/Theme.App`

## Permissions
- android.permission.INTERNET
- android.permission.DETECT_SCREEN_CAPTURE
- com.google.android.gms.permission.AD_ID
- android.permission.POST_NOTIFICATIONS
- android.permission.ACCESS_COARSE_LOCATION
- android.permission.CAMERA
- android.permission.VIBRATE
- android.permission.ACCESS_FINE_LOCATION
- android.permission.FOREGROUND_SERVICE_MICROPHONE
- android.permission.RECORD_AUDIO
- android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION
- android.permission.READ_EXTERNAL_STORAGE
- android.permission.READ_MEDIA_IMAGES
- android.permission.READ_MEDIA_VISUAL_USER_SELECTED
- android.permission.ACCESS_NETWORK_STATE
- android.permission.WAKE_LOCK
- android.permission.ACCESS_WIFI_STATE
- com.android.vending.BILLING
- android.permission.USE_BIOMETRIC
- android.permission.USE_FINGERPRINT
- com.google.android.c2dm.permission.RECEIVE
- android.permission.RECEIVE_BOOT_COMPLETED
- android.permission.FOREGROUND_SERVICE
- com.openai.chatgpt.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION
- android.permission.BLUETOOTH
- android.permission.MODIFY_AUDIO_SETTINGS
- com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE
- com.android.vending.CHECK_LICENSE

## Features
- android.hardware.camera.any (required=false)
- android.hardware.camera (required=false)
- android.hardware.camera.autofocus (required=false)
- android.hardware.camera.flash (required=false)
- android.hardware.microphone (required=false)
- 0x00030000 (required=true)

## Activities
- `com.openai.chatgpt.MainActivity` (exported=true)
- `com.auth0.android.provider.RedirectActivity` (exported=true)
- `com.openai.feature.assistant.impl.AssistantProxyActivity` (exported=true, enabled=@bool/assistant_enabled)
- `com.openai.voice.assistant.AssistantActivity` (exported=true)
- `com.openai.feature.onboarding.impl.otp.OtpDeepLinkActivity` (exported=true)
- `com.google.android.libraries.places.widget.AutocompleteActivity` (exported=false, label=@string/797)
- `com.google.android.libraries.places.widget.BasicPlaceAutocompleteActivity` (exported=false)
- `com.google.android.libraries.places.widget.PlaceAutocompleteActivity` (exported=false)
- `com.google.android.libraries.places.widget.internal.photoviewer.PlacesLightboxActivity` (exported=false)
- `com.stripe.android.paymentsheet.PaymentSheetActivity` (exported=false)
- `com.stripe.android.paymentsheet.PaymentOptionsActivity` (exported=false)
- `com.stripe.android.customersheet.CustomerSheetActivity` (exported=false)
- `com.stripe.android.paymentsheet.addresselement.AddressElementActivity` (exported=false)
- `com.stripe.android.paymentsheet.addresselement.AutocompleteActivity` (exported=false)
- `com.stripe.android.paymentsheet.paymentdatacollection.bacs.BacsMandateConfirmationActivity` (exported=false)
- `com.stripe.android.paymentsheet.paymentdatacollection.polling.PollingActivity` (exported=false)
- `com.stripe.android.paymentsheet.ui.SepaMandateActivity` (exported=false)
- `com.stripe.android.paymentsheet.ExternalPaymentMethodProxyActivity` (exported=false)
- `com.stripe.android.paymentelement.confirmation.cpms.CustomPaymentMethodProxyActivity` (exported=false)
- `com.stripe.android.paymentsheet.paymentdatacollection.cvcrecollection.CvcRecollectionActivity`
- `com.stripe.android.paymentelement.embedded.form.FormActivity`
- `com.stripe.android.paymentelement.embedded.manage.ManageActivity`
- `com.stripe.android.attestation.AttestationActivity` (exported=false)
- `com.stripe.android.link.LinkActivity` (exported=false, label=@string/a59)
- `com.stripe.android.link.LinkForegroundActivity`
- `com.stripe.android.link.LinkRedirectHandlerActivity` (exported=true)
- `com.stripe.android.shoppay.ShopPayActivity`
- `com.stripe.android.view.PaymentAuthWebViewActivity` (exported=false)
- `com.stripe.android.view.PaymentRelayActivity` (exported=false)
- `com.stripe.android.payments.StripeBrowserLauncherActivity` (exported=false)
- `com.stripe.android.payments.StripeBrowserProxyReturnActivity` (exported=true)
- `com.stripe.android.payments.core.authentication.threeds2.Stripe3ds2TransactionActivity` (exported=false)
- `com.stripe.android.googlepaylauncher.GooglePayLauncherActivity` (exported=false)
- `com.stripe.android.googlepaylauncher.GooglePayPaymentMethodLauncherActivity` (exported=false)
- `com.stripe.android.payments.paymentlauncher.PaymentLauncherConfirmationActivity` (exported=false)
- `com.stripe.android.payments.bankaccount.ui.CollectBankAccountActivity` (exported=false)
- `com.stripe.android.challenge.passive.PassiveChallengeActivity` (exported=false)
- `com.stripe.android.challenge.passive.warmer.activity.PassiveChallengeWarmerActivity` (exported=false)
- `com.stripe.android.challenge.confirmation.IntentConfirmationChallengeActivity` (exported=false)
- `com.withpersona.sdk2.inquiry.internal.InquiryActivity` (exported=false)
- `com.stripe.android.stripe3ds2.views.ChallengeActivity` (exported=false)
- `com.revenuecat.purchases.amazon.purchasing.ProxyAmazonBillingActivity`
- `com.revenuecat.purchases.SimulatedStoreErrorDialogActivity`
- `com.android.billingclient.api.ProxyBillingActivity` (exported=false)
- `com.android.billingclient.api.ProxyBillingActivityV2` (exported=false)
- `com.auth0.android.provider.AuthenticationActivity` (exported=false)
- `com.stripe.android.financialconnections.lite.FinancialConnectionsSheetLiteRedirectActivity` (exported=true)
- `com.stripe.android.financialconnections.lite.FinancialConnectionsSheetLiteActivity`
- `androidx.credentials.playservices.HiddenActivity` (exported=false, enabled=true)
- `androidx.credentials.playservices.IdentityCredentialApiHiddenActivity` (exported=false, enabled=true)
- `androidx.glance.appwidget.action.ActionTrampolineActivity` (exported=false, enabled=true)
- `androidx.glance.appwidget.action.InvisibleActionTrampolineActivity` (exported=false, enabled=true)
- `com.google.android.gms.auth.api.signin.internal.SignInHubActivity` (exported=false)
- `com.google.android.gms.common.api.GoogleApiActivity` (exported=false)
- `com.google.android.play.core.common.PlayCoreDialogWrapperActivity` (exported=false)
- `com.pairip.licensecheck.LicenseActivity` (exported=false)

## Activity Aliases
- `com.openai.chatgpt.TextProcessorActivity` (exported=true, label=@string/33)

## Services
- `androidx.appcompat.app.AppLocalesMetadataHolderService` (exported=false, enabled=false)
- `com.openai.feature.assistant.impl.AssistantVoiceInteractionService` (exported=true, enabled=@bool/assistant_enabled, perm=android.permission.BIND_VOICE_INTERACTION, label=@string/31)
- `com.openai.feature.assistant.impl.AssistantVoiceInteractionSessionService` (enabled=@bool/assistant_enabled, perm=android.permission.BIND_VOICE_INTERACTION, label=@string/31)
- `com.openai.feature.conversations.impl.coordinator.ConversationStreamingService` (exported=false)
- `com.openai.feature.voice.impl.quicktile.QuickTileService` (exported=true, perm=android.permission.BIND_QUICK_SETTINGS_TILE, label=@string/31)
- `com.openai.feature.notification.impl.NotificationService` (exported=false)
- `com.openai.voice.webrtc.VoiceModeForegroundService` (exported=false)
- `androidx.camera.core.impl.MetadataHolderService` (exported=false, enabled=false)
- `androidx.credentials.playservices.CredentialProviderMetadataHolder` (exported=false, enabled=true)
- `com.google.mlkit.common.internal.MlKitComponentDiscoveryService` (exported=false)
- `androidx.glance.appwidget.GlanceRemoteViewsService` (exported=true, perm=android.permission.BIND_REMOTEVIEWS)
- `com.google.firebase.components.ComponentDiscoveryService` (exported=false)
- `com.google.firebase.messaging.FirebaseMessagingService` (exported=false)
- `com.google.android.gms.auth.api.signin.RevocationBoundService` (exported=true, perm=com.google.android.gms.auth.api.signin.permission.REVOCATION_NOTIFICATION)
- `androidx.work.impl.background.systemjob.SystemJobService` (exported=true, enabled=@bool/enable_system_job_service_default, perm=android.permission.BIND_JOB_SERVICE)
- `androidx.work.impl.foreground.SystemForegroundService` (exported=false, enabled=@bool/enable_system_foreground_service_default)
- `io.livekit.android.room.track.screencapture.ScreenCaptureService` (enabled=true)
- `androidx.room.MultiInstanceInvalidationService` (exported=false)
- `androidx.core.widget.RemoteViewsCompatService` (perm=android.permission.BIND_REMOTEVIEWS)
- `com.google.android.datatransport.runtime.backends.TransportBackendDiscovery` (exported=false)
- `com.google.android.datatransport.runtime.scheduling.jobscheduling.JobInfoSchedulerService` (exported=false, perm=android.permission.BIND_JOB_SERVICE)

## Receivers
- `com.openai.feature.calpico.impl.notification.CalpicoNotificationBroadcastReceiver` (exported=false)
- `com.openai.feature.notification.impl.NotificationBroadcastReceiver` (exported=false)
- `com.openai.feature.notification.impl.AppUpdateReceiver` (exported=false, enabled=false)
- `com.openai.feature.shortcut.impl.PinnedShortcutReceiver` (exported=false)
- `com.openai.feature.widget.WidgetReceiver` (exported=true)
- `com.openai.feature.widget.WidgetInstallBroadcastReceiver` (exported=true)
- `androidx.glance.appwidget.action.ActionCallbackBroadcastReceiver` (exported=false, enabled=true)
- `androidx.glance.appwidget.UnmanagedSessionReceiver` (exported=false, enabled=true)
- `androidx.glance.appwidget.MyPackageReplacedReceiver` (exported=false, enabled=true)
- `com.google.firebase.iid.FirebaseInstanceIdReceiver` (exported=true, perm=com.google.android.c2dm.permission.SEND)
- `androidx.work.impl.utils.ForceStopRunnable$BroadcastReceiver` (exported=false, enabled=true)
- `androidx.work.impl.background.systemalarm.RescheduleReceiver` (exported=false, enabled=false)
- `androidx.work.impl.diagnostics.DiagnosticsReceiver` (exported=true, enabled=true, perm=android.permission.DUMP)
- `androidx.profileinstaller.ProfileInstallReceiver` (exported=true, enabled=true, perm=android.permission.DUMP)
- `com.google.android.datatransport.runtime.scheduling.jobscheduling.AlarmManagerSchedulerBroadcastReceiver` (exported=false)

## Providers
- `com.openai.apps.appbase.app.startup.FirebaseInitProvider` (exported=false)
- `androidx.core.content.FileProvider` (exported=false)
- `com.openai.files.ChatFileProvider` (exported=false)
- `com.openai.draw.GlyphsFileProvider` (exported=false)
- `com.withpersona.sdk2.inquiry.DocumentFileProvider` (exported=false)
- `com.google.mlkit.common.internal.MlKitInitProvider` (exported=false)
- `androidx.startup.InitializationProvider` (exported=false)
- `com.datadog.android.rum.DdRumContentProvider` (exported=false)
- `com.pairip.licensecheck.LicenseContentProvider` (exported=false)

