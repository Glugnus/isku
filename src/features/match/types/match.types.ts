import { getMatch } from "@/src/features/match/api/matches-api";
import { getMatchParticipantsTeams } from "@/src/features/match/utils/match-participants-teams";

export type Match = Awaited<ReturnType<typeof getMatch>>;
export type MatchTeams = ReturnType<typeof getMatchParticipantsTeams>["teams"];
export type SetScore = { p1: string; p2: string };
export type PlayerKey = "p1" | "p2";
export type PointActionType = "winner" | "unforced_error" | null;
export interface MatchPoint {
  setNumber: number;
  scoredBy: PlayerKey;
  actionType: PointActionType;
  server: PlayerKey;
}
export interface MatchSet {
  setNumber: number;
  p1SetScore: number;
  p2SetScore: number;
}
