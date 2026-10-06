import {
  MatchPoint,
  MatchSet,
  PlayerKey,
} from "@/src/features/match/types/match.types";
import { SportsRules } from "@/src/features/match/types/sports-rules.types";

export const isDeuce = (
  p1Points: number,
  p2Points: number,
  rules: SportsRules,
) =>
  p1Points >= rules.pointsToWinSet - 1 && p2Points >= rules.pointsToWinSet - 1;

export const getSetWinner = (
  p1Points: number,
  p2Points: number,
  rules: SportsRules,
) => {
  const setOver =
    (p1Points >= rules.pointsToWinSet || p2Points >= rules.pointsToWinSet) &&
    Math.abs(p1Points - p2Points) >= rules.pointsDifferenceToWinSet;

  if (setOver) {
    return p1Points > p2Points ? "p1" : "p2";
  }
  return null;
};

export const getMatchWinner = (
  p1SetsWon: number,
  p2SetsWon: number,
  setsToWin: number,
): PlayerKey | null => {
  const matchOver = p1SetsWon === setsToWin || p2SetsWon === setsToWin;
  if (matchOver) {
    return p1SetsWon > p2SetsWon ? "p1" : "p2";
  }
  return null;
};

export const calculateMatchScore = (
  sets: { score_team_1: number; score_team_2: number }[] | MatchSet[] = [],
) => {
  const { p1SetsWon, p2SetsWon } = sets.reduce(
    (acc, set) => {
      const s1 = "p1SetScore" in set ? set.p1SetScore : set.score_team_1;
      const s2 = "p2SetScore" in set ? set.p2SetScore : set.score_team_2;
      if (s1 > s2) {
        acc.p1SetsWon++;
      } else if (s2 > s1) {
        acc.p2SetsWon++;
      }
      return acc;
    },
    { p1SetsWon: 0, p2SetsWon: 0 },
  );
  return { p1SetsWon, p2SetsWon };
};

export const calculateCurrentSetScore = (
  points: MatchPoint[],
  currentSet: number,
) => {
  const p1Score = points.filter(
    (p) => p.scoredBy === "p1" && p.setNumber === currentSet,
  ).length;
  const p2Score = points.filter(
    (p) => p.scoredBy === "p2" && p.setNumber === currentSet,
  ).length;
  return { p1Score, p2Score };
};

export const calculatePlayersSetsWon = (sets: MatchSet[]) => {
  const p1SetsWon = sets.filter((s) => s.p1SetScore > s.p2SetScore).length;
  const p2SetsWon = sets.filter((s) => s.p2SetScore > s.p1SetScore).length;
  return { p1SetsWon, p2SetsWon };
};

export const getOpponent = (player: PlayerKey): PlayerKey =>
  player === "p1" ? "p2" : "p1";
