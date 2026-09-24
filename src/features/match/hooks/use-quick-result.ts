import {
  createSetsMatch,
  updateMatch,
} from "@/src/features/match/api/matches-api";
import { PlayerKey } from "@/src/features/match/types/match.types";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { SPORTS_RULES } from "../constants/sports-rules";
import { calculateQuickResult } from "../utils/score-calculator";
import { useFetchMatch } from "./use-fetch-match";

export const useQuickResult = (matchId: string) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [scoreSets, setScoreSets] = useState<{ p1: string; p2: string }[]>([
    { p1: "", p2: "" },
  ]);
  const {
    isFetching,
    error: fetchError,
    match,
    teams,
  } = useFetchMatch(matchId);

  const players = [
    { id: "p1" as const, name: teams?.team1Name },
    { id: "p2" as const, name: teams?.team2Name },
  ];
  const setsToWin = match?.format;

  const matchResult = useMemo(() => {
    return calculateQuickResult(
      scoreSets,
      setsToWin ?? 3,
      SPORTS_RULES.table_tennis,
    );
  }, [scoreSets, setsToWin]);

  const handleScoreChange = (
    index: number,
    playerKey: PlayerKey,
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
        setSaveError("Erreur lors de l'enregistrement des sets" + err);
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
    saveError,
    fetchError,
    players,
    handleUndo,
    handleSaveMatchResult,
  };
};
