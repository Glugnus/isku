import {
  createPointsMatch,
  createSetsMatch,
  updateMatch,
} from "@/src/features/match/api/matches-api";
import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { router } from "expo-router";
import { useState } from "react";

export const useSaveTrackerMatch = () => {
  const { sets, points, match, updateMatchStatus } = useMatchStore();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSaveMatchResult = async () => {
    setSaveError(null);
    if (isSaving) return;
    if (match?.id && sets.length > 0) {
      try {
        setIsSaving(true);
        const setIds = await createSetsMatch(
          sets.map((s) => ({
            match_id: match.id.toString(),
            score_team_1: s.p1SetScore,
            score_team_2: s.p2SetScore,
            set_number: s.setNumber,
          })),
        );
        await createPointsMatch(
          points.map((p, index) => ({
            set_id: setIds.find((s) => s.set_number === p.setNumber)!.id,
            point_number: index + 1,
            scored_by_team: p.scoredBy === "p1" ? 1 : 2,
            server_team: p.server === "p1" ? 1 : 2,
            type: p.actionType,
          })),
        );
        await updateMatch(match.id.toString(), {
          status: "completed",
        });
        updateMatchStatus("completed");
        router.replace({
          pathname: "/match/[id]/summary",
          params: { id: match.id },
        });
      } catch (err) {
        setSaveError("Erreur lors de l'enregistrement des sets");
        console.log(err);
      } finally {
        setIsSaving(false);
      }
    }
  };
  return {
    handleSaveMatchResult,
    isSaving,
    saveError,
  };
};
