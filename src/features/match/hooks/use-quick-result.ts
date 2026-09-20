import {
  createSetsMatch,
  getMatch,
  updateMatch,
} from "@/src/features/match/api/matches-api";
import { Match, MatchTeams } from "@/src/features/match/types/match.types";
import { getMatchParticipantsTeams } from "@/src/features/match/utils/match-participants-teams";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { SPORTS_RULES } from "../constants/sports-rules";
import { calculateQuickResult } from "../utils/score-calculator";

export const useQuickResult = (matchId: string) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  const handleUndo = () => {
    if (scoreSets.length > 1) {
      setScoreSets((prev) => {
        const updated = matchResult.isMatchOver
          ? [...prev]
          : prev.slice(0, prev.length - 1);
        updated[updated.length - 1] = { p1: "", p2: "" };
        return updated;
      });
    }
  };

  const handleSaveMatchResult = async () => {
    if (matchResult.isMatchOver) {
      setIsSaving(true);
      try {
        await createSetsMatch(
          scoreSets.map((set, index) => ({
            match_id: matchId.toString(),
            score_team_1: parseInt(set.p1, 10),
            score_team_2: parseInt(set.p2, 10),
            set_number: index + 1,
          })),
        );
        await updateMatch(matchId.toString(), {
          status: "completed",
        });
        router.back();
      } catch (err) {
        setError("Erreur lors de l'enregistrement des sets" + err);
        console.log(err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return {
    scoreSets,
    handleScoreChange,
    matchResult,
    isFetching,
    isSaving,
    error,
    players,
    handleUndo,
    handleSaveMatchResult,
  };
};
