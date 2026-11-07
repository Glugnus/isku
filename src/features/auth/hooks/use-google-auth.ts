import { signInWithIdToken } from "@/src/features/auth/api/auth-api";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { useTranslation } from "react-i18next";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID,
});

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation("auth");

  async function signInWithGoogle() {
    setError(null);
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (response.type === "success") {
        const idToken = response.data.idToken;
        if (idToken) {
          await signInWithIdToken("google", idToken);
        }
      } else return;
    } catch (err) {
      if (isErrorWithCode(err) && err.code === statusCodes.SIGN_IN_CANCELLED)
        return;
      console.error(err);
      setError(t("errors.oauthGeneric"));
    } finally {
      setIsLoading(false);
    }
  }

  return { signInWithGoogle, isLoading, error };
};
