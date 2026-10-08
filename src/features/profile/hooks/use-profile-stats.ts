import { useFetchMatchData } from "@/src/features/profile/hooks/use-fetch-match-data";
import { calculateProfilePerformanceStats } from "@/src/features/profile/utils/performance-stats-calculator";
import { calculateProfileQuickstats } from "@/src/features/profile/utils/quick-stats-calculator";
import { useMemo } from "react";

export const useProfileStats = (profileId?: string) => {
  const { matchesData, isFetching, error, refetch } =
    useFetchMatchData(profileId);
  const { quickStats } = useMemo(
    () => calculateProfileQuickstats(matchesData ?? []),
    [matchesData],
  );

  const { serveStats, performanceStats } = useMemo(
    () => calculateProfilePerformanceStats(matchesData ?? []),
    [matchesData],
  );

  return {
    quickStats,
    serveStats,
    performanceStats,
    isFetching,
    error,
    refetch,
  };
};
