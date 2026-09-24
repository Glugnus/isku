import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { useEffect } from "react";
import { useFetchMatch } from "./use-fetch-match";

export const useToss = (matchId: string) => {
  const { initMatch, firstServer, setFirstServer } = useMatchStore();
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

  const handleRandomToss = () => {};

  return {
    isFetching,
    error: fetchError,
    teams,
    firstServer,
    setFirstServer,
  };
};
