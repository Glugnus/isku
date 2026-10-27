import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import useAppFonts from "@/src/hooks/use-app-fonts";
import { useI18nReady } from "@/src/hooks/use-i18n-ready";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { loaded: fontsReady, error: fontError } = useAppFonts();
  const { isLoading } = useAuthContext();
  const i18nReady = useI18nReady();

  useEffect(() => {
    if (fontError) {
      console.error("Erreur de chargement des polices :", fontError);
    }
  }, [fontError]);

  useEffect(() => {
    const isAppReady = (fontsReady || fontError) && !isLoading && i18nReady;

    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsReady, fontError, isLoading, i18nReady]);

  return null;
}
