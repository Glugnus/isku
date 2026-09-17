import { getMatch } from "@/src/features/match/api/matches-api";
import { getMatchParticipantsTeams } from "@/src/features/match/utils/match-participants-teams";

export type Match = Awaited<ReturnType<typeof getMatch>>;
export type MatchTeams = ReturnType<typeof getMatchParticipantsTeams>["teams"];
export type SetScore = { p1: string; p2: string };
