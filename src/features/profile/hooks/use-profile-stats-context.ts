import { ProfileStatsContext } from "@/src/features/profile/providers/profile-stats-provider";
import { useContext } from "react";

export const useProfileStatsContext = () => {
  const context = useContext(ProfileStatsContext);
  if (!context) {
    throw new Error(
      "useProfileStatsContext must be used within a ProfileStatsProvider",
    );
  }
  return context;
};
