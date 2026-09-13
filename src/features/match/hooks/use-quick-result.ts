import { useMatch } from "./use-match";

export const useQuickResult = (matchId: string) => {
  const { match, isLoading, error, teams } = useMatch(matchId);
};
