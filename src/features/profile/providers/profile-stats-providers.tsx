import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { createContext, useContext } from "react";
import { useProfileStats } from "../hooks/use-profile-stats";

type ProfileStatsContextType = ReturnType<typeof useProfileStats>;

const ProfileStatsContext = createContext<ProfileStatsContextType | null>(null);

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

export const useProfileStatsContext = () => {
  const context = useContext(ProfileStatsContext);
  if (!context) {
    throw new Error(
      "useProfileStatsContext must be used within a ProfileStatsProvider",
    );
  }
  return context;
};
