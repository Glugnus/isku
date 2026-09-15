import { getClaims, onAuthStateChange } from "@/src/features/auth/api/auth-api";
import { AuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { getProfile } from "@/src/features/profile/api/profile-api";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [claims, setClaims] = useState<
    Record<string, any> | undefined | null
  >();
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsPasswordRecovery(true);
      } else if (event === "SIGNED_OUT") {
        setIsPasswordRecovery(false);
      }
      const newClaims = await getClaims();
      setClaims(newClaims);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userId = claims?.sub;

  useEffect(() => {
    if (claims === undefined) return;
    let isMounted = true;

    const loadProfile = async () => {
      try {
        if (userId) {
          const data = await getProfile(userId);
          if (isMounted) setProfile(data);
        } else {
          if (isMounted) {
            setProfile(null);
          }
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du profil : ", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [userId, claims]);

  const value = useMemo(
    () => ({
      claims,
      isLoading,
      profile,
      isLoggedIn: !!claims && !isPasswordRecovery,
    }),
    [claims, isLoading, profile, isPasswordRecovery],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
