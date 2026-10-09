import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import useAppFonts from "@/src/hooks/use-app-fonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { loaded: fontsReady, error: fontError } = useAppFonts();
  const { isLoading } = useAuthContext();

  useEffect(() => {
    if (fontError) {
      console.error("Erreur de chargement des polices :", fontError);
    }
  }, [fontError]);

  useEffect(() => {
    const isAppReady = (fontsReady || fontError) && !isLoading;

    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsReady, fontError, isLoading]);

  return null;
}
