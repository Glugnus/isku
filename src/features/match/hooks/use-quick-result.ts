import { getMatch } from "@/src/features/match/api/matches-api";
import { Match, MatchTeams } from "@/src/features/match/types/match.types";
import { getMatchParticipantsTeams } from "@/src/features/match/utils/match-participants-teams";
import { useEffect, useMemo, useState } from "react";
import { SPORTS_RULES } from "../constants/sports-rules";
import { calculateQuickResult } from "../utils/score-calculator";

export const useQuickResult = (matchId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [teams, setTeams] = useState<MatchTeams | null>(null);
  const [scoreSets, setScoreSets] = useState<{ p1: string; p2: string }[]>([
    { p1: "", p2: "" },
  ]);

  const players = [
    { id: "p1" as const, name: teams?.team1Name },
    { id: "p2" as const, name: teams?.team2Name },
  ];
  const setsToWin = match?.format;

  //TODO sécuriser les saisie avec des retours en arrière

  useEffect(() => {
    if (matchId) {
      const fetchMatch = async () => {
        setIsLoading(true);
        try {
          const match = await getMatch(matchId.toString());
          const { teams } = getMatchParticipantsTeams(match.match_participants);
          setMatch(match);
          setTeams(teams);
        } catch (err) {
          setError("Erreur lors de la récupération du match" + err);
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMatch();
    }
  }, [matchId]);

  const matchResult = useMemo(() => {
    return calculateQuickResult(
      scoreSets,
      setsToWin ?? 3,
      SPORTS_RULES.table_tennis,
    );
  }, [scoreSets, setsToWin]);

  const handleScoreChange = (
    index: number,
    playerKey: "p1" | "p2",
    value: string,
  ) => {
    setScoreSets((prev) => {
      const updated = prev.map((set, i) =>
        i === index ? { ...set, [playerKey]: value } : set,
      );

      const result = calculateQuickResult(
        updated,
        setsToWin ?? 3,
        SPORTS_RULES.table_tennis,
      );
      const lastSet = result.setDetails[updated.length - 1];

      if (lastSet?.isCompleted && !result.isMatchOver) {
        return [...updated, { p1: "", p2: "" }];
      }
      return updated;
    });
  };

  return {
    scoreSets,
    handleScoreChange,
    matchResult,
    isLoading,
    error,
    players,
  };
};
