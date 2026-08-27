import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { SplashScreenController } from "@/src/components/utils/splash-screen-controller";
import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import AuthProvider from "@/src/features/auth/providers/auth-provider";

// Separate RootNavigator so we can access the AuthContext
function RootNavigator() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
      <StatusBar style="light" />
    </AuthProvider>
  );
}
