import { useMatchStore } from "@/src/features/match/store/use-match-store";
import {
  MatchPoint,
  MatchSet,
  MatchTeams,
} from "@/src/features/match/types/match.types";
import { calculateMatchScore } from "@/src/features/match/utils/score-calculator";
import {
  calculateLongestStreak,
  calculateMaxDeficitOvercome,
  calculateMaxLead,
  calculateScoreEvolution,
  countPointsWon,
  countPointsWonOnOpponentServe,
  countPointsWonOnOwnServe,
  countUnforcedErrorsPoints,
  countWinnersPoints,
  filterPointsByTab,
} from "@/src/features/match/utils/stats-calculator";

export const useStats = (
  tab: string,
  override?: {
    points?: MatchPoint[];
    teams?: MatchTeams | null;
    sets?: MatchSet[];
  },
) => {
  const store = useMatchStore();

  const points = override?.points ?? store.points;
  const teams = override?.teams ?? store.teams;
  const sets = override?.sets ?? store.sets;

  const filteredPoints = filterPointsByTab(tab, points);

  const { p1SetsWon, p2SetsWon } = calculateMatchScore(sets);

  const pointsWonP1 =
    points.length === 0
      ? sets.reduce((acc, set) => acc + set.p1SetScore, 0)
      : countPointsWon(filteredPoints, "p1");
  const pointsWonP2 =
    points.length === 0
      ? sets.reduce((acc, set) => acc + set.p2SetScore, 0)
      : countPointsWon(filteredPoints, "p2");

  const pointsWonP1OnOwnServe = countPointsWonOnOwnServe(filteredPoints, "p1");
  const pointsWonP2OnOwnServe = countPointsWonOnOwnServe(filteredPoints, "p2");

  const pointsWonP1OnOpponentServe = countPointsWonOnOpponentServe(
    filteredPoints,
    "p1",
  );
  const pointsWonP2OnOpponentServe = countPointsWonOnOpponentServe(
    filteredPoints,
    "p2",
  );

  const totalServesP1 = filteredPoints.filter((p) => p.server === "p1").length;
  const servePercentageP1 =
    totalServesP1 > 0
      ? Math.round((pointsWonP1OnOwnServe / totalServesP1) * 100)
      : 0;

  const totalServesP2 = filteredPoints.filter((p) => p.server === "p2").length;
  const servePercentageP2 =
    totalServesP2 > 0
      ? Math.round((pointsWonP2OnOwnServe / totalServesP2) * 100)
      : 0;

  const totalReturnP1 = filteredPoints.filter((p) => p.server === "p2").length;
  const returnPercentageP1 =
    totalReturnP1 > 0
      ? Math.round((pointsWonP1OnOpponentServe / totalReturnP1) * 100)
      : 0;

  const totalReturnP2 = filteredPoints.filter((p) => p.server === "p1").length;
  const returnPercentageP2 =
    totalReturnP2 > 0
      ? Math.round((pointsWonP2OnOpponentServe / totalReturnP2) * 100)
      : 0;

  const maxLeadP1 =
    filteredPoints.length > 0
      ? calculateMaxLead(filteredPoints, "p1")
      : Math.max(0, ...sets.map((s) => s.p1SetScore - s.p2SetScore));
  const maxLeadP2 =
    filteredPoints.length > 0
      ? calculateMaxLead(filteredPoints, "p2")
      : Math.max(0, ...sets.map((s) => s.p2SetScore - s.p1SetScore));

  const longestStreakP1 = calculateLongestStreak(filteredPoints, "p1");
  const longestStreakP2 = calculateLongestStreak(filteredPoints, "p2");

  const maxDeficitOvercomeP1 = calculateMaxDeficitOvercome(
    filteredPoints,
    "p1",
  );
  const maxDeficitOvercomeP2 = calculateMaxDeficitOvercome(
    filteredPoints,
    "p2",
  );

  const winnersP1 = countWinnersPoints(filteredPoints, "p1");
  const winnersP2 = countWinnersPoints(filteredPoints, "p2");

  const unforcedErrorsP1 = countUnforcedErrorsPoints(filteredPoints, "p1");
  const unforcedErrorsP2 = countUnforcedErrorsPoints(filteredPoints, "p2");

  const scoreEvolution = calculateScoreEvolution(filteredPoints);

  return {
    setsWon: { p1: p1SetsWon, p2: p2SetsWon },
    profilePosition: teams?.currentProfilePosition ?? "p1",
    pointsWon: { p1: pointsWonP1, p2: pointsWonP2 },
    pointsWonOnOwnServe: {
      p1: pointsWonP1OnOwnServe,
      p2: pointsWonP2OnOwnServe,
    },
    pointsWonOnOpponentServe: {
      p1: pointsWonP1OnOpponentServe,
      p2: pointsWonP2OnOpponentServe,
    },
    servePercentage: {
      p1: servePercentageP1,
      p2: servePercentageP2,
    },
    returnPercentage: {
      p1: returnPercentageP1,
      p2: returnPercentageP2,
    },
    maxLead: {
      p1: maxLeadP1,
      p2: maxLeadP2,
    },
    longestStreak: {
      p1: longestStreakP1,
      p2: longestStreakP2,
    },
    maxDeficitOvercome: {
      p1: maxDeficitOvercomeP1,
      p2: maxDeficitOvercomeP2,
    },
    winners: {
      p1: winnersP1,
      p2: winnersP2,
    },
    unforcedErrors: {
      p1: unforcedErrorsP1,
      p2: unforcedErrorsP2,
    },
    scoreEvolution,
    p1Name: teams?.team1Name ?? "Joueur 1",
    p2Name: teams?.team2Name ?? "Joueur 2",
  };
};
