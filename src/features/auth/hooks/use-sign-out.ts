import { signOut } from "@/src/features/auth/api/auth-api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useSignOut = () => {
  const { t } = useTranslation("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await signOut();
    } catch (err) {
      setError(t("errors.signOut"));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignOut, isLoading, error };
};
