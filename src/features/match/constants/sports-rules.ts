import {
  Sport,
  SportsRules,
} from "@/src/features/match/types/sports-rules.types";

export const SPORTS_RULES: Record<Sport, SportsRules> = {
  table_tennis: {
    pointsToWinSet: 11,
    pointsDifferenceToWinSet: 2,
    servesPerPlayer: 2,
    possibleSetsToWin: [2, 3, 4],
    servesPerPlayerAtDeuce: 1,
  },
};
