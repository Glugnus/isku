export interface SportsRules {
  name: string;
  pointsToWinSet: number;
  pointsDifferenceToWinSet: number;
  servesPerPlayer: number;
  possibleSetsToWin: number[];
  servesPerPlayerAtDeuce: number;
}

export type Sport = "table_tennis";
