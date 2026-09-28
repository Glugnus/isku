import "@/global.css";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { SplashScreenController } from "@/src/components/utils/splash-screen-controller";
import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import AuthProvider from "@/src/features/auth/providers/auth-provider";
import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Separate RootNavigator so we can access the AuthContext
function RootNavigator() {
  const { isLoading, isLoggedIn } = useAuthContext();
  const router = useRouter();
  const match = useMatchStore((state) => state.match);

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      if (match?.status === "ongoing") {
        router.replace({
          pathname: "/match/[id]/tracker",
          params: {
            id: match?.id,
          },
        });
      }
    }
  }, [isLoading, isLoggedIn, match?.id, match?.status, router]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="match" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <SplashScreenController />
        <RootNavigator />
        <StatusBar style="light" />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
