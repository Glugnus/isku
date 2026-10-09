import { useFetchMatch } from "@/src/features/match/hooks/use-fetch-match";
import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { useEffect } from "react";

export const useInitMatch = (matchId: string) => {
  const { initMatch } = useMatchStore();
  const {
    isFetching,
    error: fetchError,
    match,
    teams,
  } = useFetchMatch(matchId);

  useEffect(() => {
    if (match && teams) {
      initMatch(match, teams);
    }
  }, [match, teams, initMatch]);

  return {
    isFetching,
    fetchError,
    match,
    teams,
  };
};
