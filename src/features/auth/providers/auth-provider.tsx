import { getClaims, onAuthStateChange } from "@/src/features/auth/api/auth-api";
import { AuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { getProfile } from "@/src/features/profile/api/profile-api";
import { PropsWithChildren, useEffect, useState } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [claims, setClaims] = useState<
    Record<string, any> | undefined | null
  >();
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the claims once, and subscribe to auth state changes
  useEffect(() => {
    const fetchClaims = async () => {
      setIsLoading(true);

      const claims = await getClaims();

      setClaims(claims);
      setIsLoading(false);
    };

    fetchClaims();

    const unsubscribe = onAuthStateChange(async () => {
      const claims = await getClaims();
      setClaims(claims);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Fetch the profile when the claims change
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);

      if (claims) {
        const data = await getProfile(claims.sub);
        setProfile(data);
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, [claims]);

  return (
    <AuthContext.Provider
      value={{
        claims,
        isLoading,
        profile,
        isLoggedIn: !!claims,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
