import { SportsRules } from "@/src/features/match/types/sports-rules.types";

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
) => {
  const matchOver = p1SetsWon === setsToWin || p2SetsWon === setsToWin;
  if (matchOver) {
    return p1SetsWon > p2SetsWon ? "p1" : "p2";
  }
  return null;
};

export const isSetScoreError = (
  p1Points: number,
  p2Points: number,
  rules: SportsRules,
) => {
  const max = Math.max(p1Points, p2Points);
  const min = Math.min(p1Points, p2Points);
  if (
    (max > rules.pointsToWinSet && min < rules.pointsToWinSet - 1) ||
    (max > rules.pointsToWinSet && max - min > rules.pointsDifferenceToWinSet)
  )
    return true;
  return false;
};

export const calculateQuickResult = (
  scores: { p1: string; p2: string }[],
  setsToWin: number,
  rules: SportsRules,
) => {
  let p1SetsWon = 0;
  let p2SetsWon = 0;
  let setDetails: {
    p1Points: number;
    p2Points: number;
    setIndex: number;
    setWinner: "p1" | "p2" | null;
    isCompleted?: boolean;
    hasError?: boolean;
  }[] = [];

  scores.forEach((score, index) => {
    const p1Points = parseInt(score.p1);
    const p2Points = parseInt(score.p2);
    const hasError =
      !isNaN(p1Points) &&
      !isNaN(p2Points) &&
      isSetScoreError(p1Points, p2Points, rules);

    const setWinner = hasError ? null : getSetWinner(p1Points, p2Points, rules);

    if (setWinner === "p1") {
      p1SetsWon++;
    } else if (setWinner === "p2") {
      p2SetsWon++;
    }
    setDetails.push({
      p1Points,
      p2Points,
      setIndex: index,
      setWinner,
      hasError,
      isCompleted: setWinner !== null,
    });
  });

  const matchWinner = getMatchWinner(p1SetsWon, p2SetsWon, setsToWin);
  const activeSetIndex = setDetails.findIndex((set) => !set.isCompleted);

  return {
    p1SetsWon,
    p2SetsWon,
    matchWinner,
    setDetails,
    activeSetIndex,
    isMatchOver: matchWinner !== null,
  };
};

export type QuickMatchResult = ReturnType<typeof calculateQuickResult>;
