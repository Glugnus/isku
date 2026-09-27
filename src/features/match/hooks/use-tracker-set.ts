//  * 3. use-tracker-sets.ts (useTrackerSets)
//  *    - Rôle : Surveillance des fins de set et de match.
//  *    - Entrées : p1Score, p2Score, p1SetsWon, p2SetsWon, rules
//  *    - Données calculées :
//  *        • setWinner ('p1' | 'p2' | null) via getSetWinner()
//  *        • matchWinner ('p1' | 'p2' | null) via getMatchWinner()
//  *    - Actions exposées :
//  *        • validateSet() -> appelle addSet() du store

import { SPORTS_RULES } from "@/src/features/match/constants/sports-rules";
import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { Sport } from "@/src/features/match/types/sports-rules.types";
import {
  getMatchWinner,
  getSetWinner,
} from "@/src/features/match/utils/score-calculator";

export const useTrackerSet = () => {
  const { sets, points, addSet, match } = useMatchStore();
  const currentSet = sets.length + 1;
  const p1Score = points.filter(
    (p) => p.scoredBy === "p1" && p.setNumber === currentSet,
  ).length;
  const p2Score = points.filter(
    (p) => p.scoredBy === "p2" && p.setNumber === currentSet,
  ).length;
  const sport = match?.sport as Sport;
  const rules = sport ? SPORTS_RULES[sport] : SPORTS_RULES.table_tennis;
  const setWinner = getSetWinner(p1Score, p2Score, rules);

  const validateSet = () => {
    if (setWinner) {
      addSet({
        setNumber: currentSet,
        p1SetScore: p1Score,
        p2SetScore: p2Score,
      });
    }
  };
  const p1SetsWon = sets.filter((s) => s.p1SetScore > s.p2SetScore).length;
  const p2SetsWon = sets.filter((s) => s.p2SetScore > s.p1SetScore).length;

  const matchWinner = match
    ? getMatchWinner(p1SetsWon, p2SetsWon, match.format)
    : null;

  return {
    validateSet,
    setWinner,
    matchWinner,
    p1SetsWon,
    p2SetsWon,
    isSetOver: Boolean(setWinner),
    isMatchOver: Boolean(matchWinner),
  };
};
