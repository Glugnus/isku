import { Sport, SportsRules } from "../types/sports-rules.types";

export const SPORTS_RULES: Record<Sport, SportsRules> = {
  table_tennis: {
    name: "Tennis de Table",
    pointsToWinSet: 11,
    pointsDifferenceToWinSet: 2,
    servesPerPlayer: 2,
    possibleSetsToWin: [2, 3, 4],
    servesPerPlayerAtDeuce: 1,
  },
};
