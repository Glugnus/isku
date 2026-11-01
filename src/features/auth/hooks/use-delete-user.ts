import { deleteUser } from "@/src/features/auth/api/auth-api";
import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { deleteAvatarProfile } from "@/src/features/profile/api/profile-api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useDeleteUser = () => {
  const { t } = useTranslation("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useAuthContext();

  const handleDeleteUser = async () => {
    if (!profile?.id) return;

    try {
      setError(null);
      setIsLoading(true);
      try {
        await deleteAvatarProfile(profile.id);
      } catch (error) {
        console.error(error);
      }
      await deleteUser();
    } catch (err) {
      setError(t("deleteAccount.error"));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDeleteUser, isLoading, error };
};
