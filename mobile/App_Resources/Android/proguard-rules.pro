# NativeScript specific rules
-keepclassmembers class **.R$* {
    public static <fields>;
}

# React Native specific rules
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }

# Keep native methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep custom components
-keep public class com.didit360.app.** { *; }

# Biometric rules
-keep class androidx.biometric.** { *; }