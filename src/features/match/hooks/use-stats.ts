import { getMatchDetails } from "@/src/features/match/api/matches-api";
import { useMatchStore } from "@/src/features/match/store/use-match-store";
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
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export const useStats = (tab: string) => {
  const { id: matchId } = useLocalSearchParams<{
    id: string;
  }>();

  const { points, teams } = useMatchStore();

  useEffect(() => {
    const fetchMatchDetails = async () => {
      if (!teams) {
        try {
          const data = await getMatchDetails(matchId);
        } catch (err) {}
      }
    };
    fetchMatchDetails();
  }, [teams]);

  const filteredPoints = filterPointsByTab(tab, points);

  const pointsWonP1 = countPointsWon(filteredPoints, "p1");
  const pointsWonP2 = countPointsWon(filteredPoints, "p2");

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

  const maxLeadP1 = calculateMaxLead(filteredPoints, "p1");
  const maxLeadP2 = calculateMaxLead(filteredPoints, "p2");

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
    pointsWon: { p1: pointsWonP1, p2: pointsWonP2 },
    pointsWonOnOwnServe: {
      p1: pointsWonP1OnOwnServe,
      p2: pointsWonP2OnOwnServe,
    },
    pointsWonOnOpponentServe: {
      p1: pointsWonP1OnOpponentServe,
      p2: pointsWonP2OnOpponentServe,
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
