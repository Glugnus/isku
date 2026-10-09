import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { useProfileStats } from "@/src/features/profile/hooks/use-profile-stats";
import { createContext } from "react";

type ProfileStatsContextType = ReturnType<typeof useProfileStats>;

export const ProfileStatsContext =
  createContext<ProfileStatsContextType | null>(null);

export const ProfileStatsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { profile } = useAuthContext();
  const context = useProfileStats(profile?.id);
  return (
    <ProfileStatsContext.Provider value={context}>
      {children}
    </ProfileStatsContext.Provider>
  );
};
