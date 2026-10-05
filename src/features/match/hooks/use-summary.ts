import { useMatchStore } from "@/src/features/match/store/use-match-store";
import {
  calculatePlayersSetsWon,
  getMatchWinner,
} from "@/src/features/match/utils/score-calculator";

export const useSummary = () => {
  const { match, teams, sets, resetMatch } = useMatchStore();

  const { p1SetsWon, p2SetsWon } = calculatePlayersSetsWon(sets);

  const winnerKey = match
    ? getMatchWinner(p1SetsWon, p2SetsWon, match.format)
    : null;

  const profileIsWinner = winnerKey === teams?.currentProfilePosition;

  return {
    p1SetsWon,
    p2SetsWon,
    teams,
    sets,
    match,
    resetMatch,
    profileIsWinner,
    profilePosition: teams?.currentProfilePosition ?? "p1",
  };
};
