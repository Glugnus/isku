import { SPORTS_RULES } from "@/src/features/match/constants/sports-rules";
import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { Sport } from "@/src/features/match/types/sports-rules.types";
import { isDeuce } from "@/src/features/match/utils/score-calculator";

export const useTrackerService = (
  p1Score: number,
  p2Score: number,
  currentSet: number,
) => {
  const { firstServer, match } = useMatchStore();
  const totalPoints = p1Score + p2Score;

  const sport = match?.sport as Sport;
  const rules = sport ? SPORTS_RULES[sport] : SPORTS_RULES.table_tennis;
  const isCurrentDeuce = isDeuce(p1Score, p2Score, rules);

  const servesPerPlayer = isCurrentDeuce
    ? rules.servesPerPlayerAtDeuce
    : rules.servesPerPlayer;

  const servesLeft = servesPerPlayer - (totalPoints % servesPerPlayer);

  const matchOpponent = firstServer === "p1" ? "p2" : "p1";
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
    isDeuce: isCurrentDeuce,
  };
};
