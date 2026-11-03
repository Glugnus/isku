import "@/global.css";
import { TextLogo } from "@/src/components/ui/text-logo";
import { SplashScreenController } from "@/src/components/utils/splash-screen-controller";
import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import AuthProvider from "@/src/features/auth/providers/auth-provider";
import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { colors } from "@/src/lib/colors";
import "@/src/lib/i18n/config";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const headerTitle = () => <TextLogo width={200} height={38} />;

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
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="match" />
        <Stack.Screen
          name="settings"
          options={{
            headerShown: true,
            headerTitle,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.white,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <AuthProvider>
        <SplashScreenController />
        <RootNavigator />
        <StatusBar style="light" />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
