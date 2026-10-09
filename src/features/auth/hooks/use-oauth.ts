import { expo } from "@/app.json";
import { setSession, signInWithOAuth } from "@/src/features/auth/api/auth-api";
import { extractParamsFromUrl } from "@/src/features/auth/utils/extract-params-from-url";
import { Provider } from "@supabase/supabase-js";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";

export const useOAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function signInWithProvider(provider: Provider) {
    try {
      setIsLoading(true);
      const oauthUrl = await signInWithOAuth(provider);

      const result = await WebBrowser.openAuthSessionAsync(
        oauthUrl,
        `${expo.scheme}://${provider}-auth`,
        { showInRecents: true },
      );

      if (result && result.type === "success") {
        const params = extractParamsFromUrl(result.url);

        if (params.access_token && params.refresh_token) {
          await setSession(params.access_token, params.refresh_token);
          return;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
  return { signInWithProvider, isLoading };
};
