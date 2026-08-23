import useAppFonts from "@/src/hooks/use-app-fonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { loaded: fontsReady, error: fontError } = useAppFonts();

  useEffect(() => {
    if (fontError) {
      console.error("Erreur de chargement des polices :", fontError);
    }
  }, [fontError]);

  useEffect(() => {
    if (fontsReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsReady]);

  return null;
}
