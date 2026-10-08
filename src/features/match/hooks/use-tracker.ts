import { SPORTS_RULES } from "@/src/features/match/constants/sports-rules";
import { useSaveTrackerMatch } from "@/src/features/match/hooks/use-save-tracker-match";
import { useMatchStore } from "@/src/features/match/store/use-match-store";
import {
  PlayerKey,
  PointActionType,
} from "@/src/features/match/types/match.types";
import { Sport } from "@/src/features/match/types/sports-rules.types";
import {
  calculateCurrentSetScore,
  calculatePlayersSetsWon,
  getMatchWinner,
  getOpponent,
  getSetWinner,
} from "@/src/features/match/utils/score-calculator";
import { calculateCurrentServer } from "@/src/features/match/utils/service-calculator";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useEffect } from "react";

export const useTracker = () => {
  const {
    points,
    addPoint,
    addSet,
    undoLastPoint,
    sets,
    undoLastSet,
    firstServer,
    match,
    teams,
    resetMatch,
  } = useMatchStore();
  const { handleSaveMatchResult, isSaving, saveError } = useSaveTrackerMatch();

  const sport = match?.sport as Sport;
  const rules = sport ? SPORTS_RULES[sport] : SPORTS_RULES.table_tennis;

  const currentSet = sets.length + 1;

  const { p1Score, p2Score } = calculateCurrentSetScore(points, currentSet);
  const { p1SetsWon, p2SetsWon } = calculatePlayersSetsWon(sets);
  const setWinner = getSetWinner(p1Score, p2Score, rules);
  const matchWinner = match
    ? getMatchWinner(p1SetsWon, p2SetsWon, match.format)
    : null;

  const { currentServer, servesLeft } = calculateCurrentServer({
    p1Score,
    p2Score,
    currentSet,
    firstServer,
    rules,
  });

  const scorePoint = (player: PlayerKey, action: PointActionType = null) => {
    if (matchWinner) return;

    const opponent = getOpponent(player);
    const scoredBy = action === "unforced_error" ? opponent : player;

    const newP1Score = scoredBy === "p1" ? p1Score + 1 : p1Score;
    const newP2Score = scoredBy === "p2" ? p2Score + 1 : p2Score;
    const isSetOver = getSetWinner(newP1Score, newP2Score, rules);
    if (isSetOver) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(
        action === "winner"
          ? Haptics.ImpactFeedbackStyle.Medium
          : Haptics.ImpactFeedbackStyle.Light,
      );
    }

    addPoint({
      setNumber: currentSet,
      scoredBy,
      actionType: action,
      server: currentServer,
    });
    if (isSetOver) {
      addSet({
        setNumber: currentSet,
        p1SetScore: newP1Score,
        p2SetScore: newP2Score,
      });
    }
  };

  const undoPoint = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (points.length === 0) return;
    if (currentSet > 1 && p1Score === 0 && p2Score === 0) {
      undoLastSet();
      undoLastPoint();
    } else {
      undoLastPoint();
    }
  };

  const abandonMatch = () => {
    resetMatch();
    router.replace(`/(tabs)/matches`);
  };

  useEffect(() => {
    if (matchWinner && match?.status === "ongoing" && !saveError && !isSaving) {
      handleSaveMatchResult();
    }
  }, [matchWinner, match?.status, handleSaveMatchResult, saveError, isSaving]);

  return {
    currentSet,
    p1Score,
    p2Score,
    scorePoint,
    undoPoint,
    canUndo: points.length > 0 && match?.status === "ongoing" && !isSaving,
    matchWinner,
    p1SetsWon,
    p2SetsWon,
    isSetOver: Boolean(setWinner),
    isMatchOver: Boolean(matchWinner),
    servesLeft,
    currentServer,
    sets,
    teams,
    abandonMatch,
    isSaving,
    saveError,
    retrySave: handleSaveMatchResult,
  };
};
