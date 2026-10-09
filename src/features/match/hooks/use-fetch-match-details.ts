import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { getMatchDetails } from "@/src/features/match/api/matches-api";
import {
  MatchDetails,
  MatchTeams,
} from "@/src/features/match/types/match.types";
import { adaptMatchDetails } from "@/src/features/match/utils/adapt-match-details";
import { getMatchParticipantsTeams } from "@/src/features/match/utils/match-participants-teams";
import { useEffect, useState } from "react";

export const useFetchMatchDetails = (matchId: string) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [match, setMatch] = useState<MatchDetails | null>(null);
  const [teams, setTeams] = useState<MatchTeams | null>(null);
  const { profile } = useAuthContext();

  useEffect(() => {
    if (matchId) {
      const fetchDetailsMatch = async () => {
        setIsFetching(true);
        try {
          const match = await getMatchDetails(matchId);
          const { teams } = getMatchParticipantsTeams(
            match.match_participants,
            profile?.id,
          );
          setMatch(match);
          setTeams(teams);
        } catch (err) {
          setError("Erreur lors de la récupération des détails du match");
          console.log(err);
        } finally {
          setIsFetching(false);
        }
      };
      fetchDetailsMatch();
    }
  }, [matchId, profile?.id]);

  const { sets, points } = adaptMatchDetails(match?.match_sets || []);

  return {
    match,
    isFetching,
    error,
    teams,
    mode: match?.mode,
    points,
    sets,
    status: match?.status,
  };
};
