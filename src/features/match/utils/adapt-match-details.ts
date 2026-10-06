import {
  MatchDetails,
  MatchPoint,
  MatchSet,
} from "@/src/features/match/types/match.types";

export const adaptMatchDetails = (sets: MatchDetails["match_sets"]) => {
  const adaptSets: MatchSet[] = sets.map((s) => ({
    setNumber: s.set_number,
    p1SetScore: s.score_team_1,
    p2SetScore: s.score_team_2,
  }));
  const adaptPoints: MatchPoint[] = sets.flatMap((s) =>
    s.match_points.map((p) => ({
      setNumber: s.set_number,
      scoredBy: p.scored_by_team === 1 ? "p1" : "p2",
      server: p.server_team === 1 ? "p1" : "p2",
      actionType: p.type,
    })),
  );

  return {
    sets: adaptSets,
    points: adaptPoints,
  };
};
