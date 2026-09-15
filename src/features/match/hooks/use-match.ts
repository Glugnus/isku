import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { getMatch } from "@/src/features/match/api/matches-api";
import { getMatchParticipantsTeams } from "@/src/features/match/utils/match-participants-teams";
import { useEffect, useMemo, useState } from "react";

type Match = Awaited<ReturnType<typeof getMatch>>;

export const useMatch = (matchId?: string) => {
  const { profile } = useAuthContext();
  const [isLoading, setIsLoading] = useState(Boolean(matchId));
  const [error, setError] = useState<string | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const teams = useMemo(() => {
    if (!match) return null;
    return getMatchParticipantsTeams(match.match_participants, profile?.id);
  }, [match, profile?.id]);

  useEffect(() => {
    const fetchMatch = async () => {
      if (matchId) {
        try {
          const data = await getMatch(matchId);
          setMatch(data);
        } catch (err) {
          setError("Erreur lors de la récupération du match");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchMatch();
  }, [matchId, reloadTrigger]);

  const refetch = () => {
    setIsLoading(true);
    setReloadTrigger((prev) => prev + 1);
  };

  return {
    match,
    isLoading,
    error,
    teams,
    refetch,
  };
};
