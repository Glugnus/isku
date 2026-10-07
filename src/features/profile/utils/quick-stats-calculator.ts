import { calculateMatchScore } from "@/src/features/match/utils/score-calculator";
import { ProfileMatchData } from "@/src/features/profile/types/profiles-types";

export const calculateProfileQuickstats = (matchesData: ProfileMatchData) => {
  if (!matchesData || matchesData.length === 0)
    return {
      matchesPlayed: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      pending: 0,
      setsPlayed: 0,
    };

  const completedMatches = matchesData.filter(
    (match) => match.matches?.status === "completed",
  );

  const matchesPlayed = completedMatches.length;
  const wins = completedMatches.filter((match) => {
    const { p1SetsWon, p2SetsWon } = calculateMatchScore(
      match.matches?.match_sets ?? [],
    );
    const winnerPlayer = p1SetsWon > p2SetsWon ? "p1" : "p2";
    const profileTeam = match.team === 1 ? "p1" : "p2";
    return profileTeam === winnerPlayer;
  }).length;

  const setsPlayed = completedMatches.reduce((acc, match) => {
    return acc + (match.matches?.match_sets?.length || 0);
  }, 0);

  return {
    quickStats: {
      matchesPlayed,
      wins,
      losses: matchesPlayed - wins,
      winRate: matchesPlayed > 0 ? Math.round((wins / matchesPlayed) * 100) : 0,
      pending: matchesData.length - completedMatches.length,
      setsPlayed,
    },
  };
};
