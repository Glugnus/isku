import { MatchPoint } from "@/src/features/match/types/match.types";
import {
  calculateLongestStreak,
  calculateMaxDeficitOvercome,
  calculateMaxLead,
} from "@/src/features/match/utils/stats-calculator";
import { ProfileMatchData } from "@/src/features/profile/types/profiles-types";

export const calculateProfilePerformanceStats = (
  matchesData: ProfileMatchData,
) => {
  if (!matchesData || matchesData.length === 0)
    return {
      serveStats: {
        pointsPlayedOnServe: 0,
        pointsPlayedOnReturn: 0,
        pointsWonOnServe: 0,
        pointsWonOnReturn: 0,
        servePointsWonRate: 0,
        returnPointsWonRate: 0,
      },
      performanceStats: {
        winners: 0,
        winnersRate: 0,
        ufe: 0,
        ufeRate: 0,
        maxLead: 0,
        longestStreak: 0,
        maxDeficit: 0,
      },
    };
  let maxLead = 0;
  let longestStreak = 0;
  let maxDeficit = 0;

  const completedMatches = matchesData.filter(
    (match) => match.matches?.status === "completed",
  );

  const pointsPlayed = completedMatches.flatMap((match) =>
    (match.matches?.match_sets ?? []).flatMap((set) =>
      (set.match_points ?? []).map((point) => {
        return {
          isScoredByProfile: point.scored_by_team === match.team,
          isProfileServer: point.server_team === match.team,
          actionType: point.type,
        };
      }),
    ),
  );

  const pointsPlayedOnServe = pointsPlayed.filter(
    (point) => point.isProfileServer,
  );
  const pointsPlayedOnReturn = pointsPlayed.filter(
    (point) => !point.isProfileServer,
  );

  const pointsWonOnServe = pointsPlayedOnServe.filter(
    (point) => point.isScoredByProfile,
  ).length;
  const pointsWonOnReturn = pointsPlayedOnReturn.filter(
    (point) => point.isScoredByProfile,
  ).length;

  const winners = pointsPlayed.filter(
    (point) => point.actionType === "winner" && point.isScoredByProfile,
  ).length;
  const winnersRate =
    pointsPlayed.length > 0
      ? Math.round((winners / pointsPlayed.length) * 100)
      : 0;

  const ufe = pointsPlayed.filter(
    (point) =>
      point.actionType === "unforced_error" && !point.isScoredByProfile,
  ).length;
  const ufeRate =
    pointsPlayed.length > 0 ? Math.round((ufe / pointsPlayed.length) * 100) : 0;

  for (const match of completedMatches) {
    const matchPoints: MatchPoint[] = (match.matches?.match_sets ?? []).flatMap(
      (set) =>
        (set.match_points ?? []).map((point) => ({
          setNumber: set.set_number,
          scoredBy: point.scored_by_team === match.team ? "p1" : "p2",
          server: point.server_team === match.team ? "p1" : "p2",
          actionType: point.type,
        })),
    );
    maxLead = Math.max(maxLead, calculateMaxLead(matchPoints, "p1"));
    longestStreak = Math.max(
      longestStreak,
      calculateLongestStreak(matchPoints, "p1"),
    );
    maxDeficit = Math.max(
      maxDeficit,
      calculateMaxDeficitOvercome(matchPoints, "p1"),
    );
  }

  return {
    serveStats: {
      pointsPlayedOnServe: pointsPlayedOnServe.length,
      pointsPlayedOnReturn: pointsPlayedOnReturn.length,
      pointsWonOnServe,
      pointsWonOnReturn,
      servePointsWonRate:
        pointsPlayedOnServe.length > 0
          ? Math.round((pointsWonOnServe / pointsPlayedOnServe.length) * 100)
          : 0,
      returnPointsWonRate:
        pointsPlayedOnReturn.length > 0
          ? Math.round((pointsWonOnReturn / pointsPlayedOnReturn.length) * 100)
          : 0,
    },
    performanceStats: {
      winners,
      winnersRate,
      ufe,
      ufeRate,
      maxLead,
      longestStreak,
      maxDeficit,
    },
  };
};
