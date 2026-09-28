import { PlayerKey } from "@/src/features/match/types/match.types";
import { SportsRules } from "@/src/features/match/types/sports-rules.types";
import {
  getOpponent,
  isDeuce,
} from "@/src/features/match/utils/score-calculator";

export const calculateCurrentServer = ({
  p1Score,
  p2Score,
  currentSet,
  firstServer,
  rules,
}: {
  p1Score: number;
  p2Score: number;
  currentSet: number;
  firstServer: PlayerKey;
  rules: SportsRules;
}) => {
  const totalPoints = p1Score + p2Score;
  const isCurrentDeuce = isDeuce(p1Score, p2Score, rules);

  const servesPerPlayer = isCurrentDeuce
    ? rules.servesPerPlayerAtDeuce
    : rules.servesPerPlayer;

  const servesLeft = servesPerPlayer - (totalPoints % servesPerPlayer);

  const matchOpponent = getOpponent(firstServer);
  const setInitialServer = currentSet % 2 === 1 ? firstServer : matchOpponent;

  const serviceChanges = Math.floor(totalPoints / rules.servesPerPlayer);

  const isInitialServerTurn = isCurrentDeuce
    ? totalPoints % 2 === 0
    : serviceChanges % 2 === 0;

  const currentServer = isInitialServerTurn
    ? setInitialServer
    : setInitialServer === "p1"
      ? "p2"
      : "p1";

  return {
    servesLeft,
    currentServer,
  };
};
