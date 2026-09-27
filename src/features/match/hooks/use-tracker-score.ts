import { useTrackerService } from "@/src/features/match/hooks/use-tracker-service";
import { useMatchStore } from "@/src/features/match/store/use-match-store";
import {
  PlayerKey,
  PointActionType,
} from "@/src/features/match/types/match.types";

export const useTrackerScore = () => {
  const { points, addPoint, undoLastPoint, sets, undoLastSet } =
    useMatchStore();
  const currentSet = sets.length + 1;
  const p1Score = points.filter(
    (p) => p.scoredBy === "p1" && p.setNumber === currentSet,
  ).length;
  const p2Score = points.filter(
    (p) => p.scoredBy === "p2" && p.setNumber === currentSet,
  ).length;

  const { currentServer } = useTrackerService(p1Score, p2Score, currentSet);

  const scorePoint = (player: PlayerKey, action: PointActionType = null) => {
    const opponent = player === "p1" ? "p2" : "p1";
    const scoredBy = action === "unforced_error" ? opponent : player;

    addPoint({
      setNumber: currentSet,
      scoredBy,
      actionType: action,
      server: currentServer,
    });
  };

  const undoPoint = () => {
    if (points.length === 0) return;
    if (currentSet > 1 && p1Score === 0 && p2Score === 0) {
      undoLastSet();
      undoLastPoint();
    } else {
      undoLastPoint();
    }
  };

  return {
    currentSet,
    p1Score,
    p2Score,
    scorePoint,
    undoPoint,
    canUndo: points.length > 0,
  };
};
