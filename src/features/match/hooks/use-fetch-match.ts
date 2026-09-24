import { getMatch } from "@/src/features/match/api/matches-api";
import { Match, MatchTeams } from "@/src/features/match/types/match.types";
import { getMatchParticipantsTeams } from "@/src/features/match/utils/match-participants-teams";
import { useEffect, useState } from "react";

export const useFetchMatch = (matchId: string) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [teams, setTeams] = useState<MatchTeams | null>(null);

  useEffect(() => {
    if (matchId) {
      const fetchMatch = async () => {
        setIsFetching(true);
        try {
          const match = await getMatch(matchId.toString());
          const { teams } = getMatchParticipantsTeams(match.match_participants);
          setMatch(match);
          setTeams(teams);
        } catch (err) {
          setError("Erreur lors de la récupération du match" + err);
          console.log(err);
        } finally {
          setIsFetching(false);
        }
      };
      fetchMatch();
    }
  }, [matchId]);

  return { isFetching, error, match, teams };
};
