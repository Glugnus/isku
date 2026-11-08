import { signInWithIdToken } from "@/src/features/auth/api/auth-api";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useAppleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation("auth");

  async function signInWithApple() {
    setError(null);
    try {
      setIsLoading(true);
      const nonce = Crypto.randomUUID();
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce,
      );
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });
      if (credential.identityToken) {
        await signInWithIdToken("apple", credential.identityToken, nonce);
      }
    } catch (err: any) {
      if (err.code === "ERR_REQUEST_CANCELED") return;
      console.error(err);
      setError(t("errors.oauthGeneric"));
    } finally {
      setIsLoading(false);
    }
  }

  return { signInWithApple, isLoading, error };
};
