import { SPORTS_RULES } from "@/src/features/match/constants/sports-rules";
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
  } = useMatchStore();

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

  const validateSet = () => {
    if (setWinner) {
      addSet({
        setNumber: currentSet,
        p1SetScore: p1Score,
        p2SetScore: p2Score,
      });
    }
  };

  return {
    currentSet,
    p1Score,
    p2Score,
    scorePoint,
    undoPoint,
    canUndo: points.length > 0,
    validateSet,
    setWinner,
    matchWinner,
    p1SetsWon,
    p2SetsWon,
    isSetOver: Boolean(setWinner),
    isMatchOver: Boolean(matchWinner),
    servesLeft,
    currentServer,
    sets,
    teams,
  };
};
