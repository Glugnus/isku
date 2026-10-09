import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { updateProfile } from "@/src/features/profile/api/profile-api";
import { useState } from "react";

export const useUpdateUsername = () => {
  const { profile, refreshProfile } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateUsername = async (newUsername: string) => {
    setError(null);
    if (!profile?.id) return false;
    try {
      setIsLoading(true);
      await updateProfile(profile.id, { username: newUsername });
      await refreshProfile();
      return true;
    } catch (err) {
      setError("Erreur lors de la mise à jour du nom d'utilisateur.");
      console.log(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUsername, error, isLoading };
};
