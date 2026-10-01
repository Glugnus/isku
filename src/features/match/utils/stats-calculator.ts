import { MatchPoint, PlayerKey } from "@/src/features/match/types/match.types";

export const filterPointsByTab = (tab: string, points: MatchPoint[]) => {
  if (tab === "Match") return points;
  if (tab.startsWith("Set ")) {
    const setNumber = parseInt(tab.split(" ")[1], 10);
    return points.filter((p) => p.setNumber === setNumber);
  }
  return points;
};

export const countPointsWon = (points: MatchPoint[], player: PlayerKey) =>
  points.filter((p) => p.scoredBy === player).length;

export const countPointsWonOnOwnServe = (
  points: MatchPoint[],
  player: PlayerKey,
) => points.filter((p) => p.server === player && p.scoredBy === player).length;

export const countPointsWonOnOpponentServe = (
  points: MatchPoint[],
  player: PlayerKey,
) => points.filter((p) => p.server !== player && p.scoredBy === player).length;

export const calculateMaxLead = (points: MatchPoint[], player: PlayerKey) => {
  let playerScore = 0;
  let opponentScore = 0;
  let maxLead = 0;
  let currentSetNumber = 0;
  for (const point of points) {
    if (point.setNumber !== currentSetNumber) {
      playerScore = 0;
      opponentScore = 0;
      currentSetNumber = point.setNumber;
    }
    if (point.scoredBy === player) {
      playerScore++;
    } else {
      opponentScore++;
    }
    maxLead = Math.max(maxLead, playerScore - opponentScore);
  }
  return maxLead;
};

export const calculateLongestStreak = (
  points: MatchPoint[],
  player: PlayerKey,
) => {
  let streak = 0;
  let maxStreak = 0;
  let currentSetNumber = 0;
  for (const point of points) {
    if (point.setNumber !== currentSetNumber) {
      streak = 0;
      currentSetNumber = point.setNumber;
    }
    if (point.scoredBy === player) {
      streak++;
    } else {
      streak = 0;
    }
    maxStreak = Math.max(maxStreak, streak);
  }
  return maxStreak;
};

export const calculateMaxDeficitOvercome = (
  points: MatchPoint[],
  player: PlayerKey,
) => {
  let playerScore = 0;
  let opponentScore = 0;
  let maxDeficitOverCome = 0;
  let currentSetNumber = 0;
  let currentDeficit = 0;

  for (const point of points) {
    if (point.setNumber !== currentSetNumber) {
      playerScore = 0;
      opponentScore = 0;
      currentDeficit = 0;
      currentSetNumber = point.setNumber;
    }
    if (point.scoredBy === player) {
      playerScore++;
    } else {
      opponentScore++;
    }
    currentDeficit = Math.max(currentDeficit, opponentScore - playerScore);
    if (playerScore >= opponentScore) {
      maxDeficitOverCome = Math.max(maxDeficitOverCome, currentDeficit);
      currentDeficit = 0;
    }
  }
  return maxDeficitOverCome;
};

export const countWinnersPoints = (points: MatchPoint[], player: PlayerKey) =>
  points.filter((p) => p.actionType === "winner" && p.scoredBy === player)
    .length;

export const countUnforcedErrorsPoints = (
  points: MatchPoint[],
  player: PlayerKey,
) =>
  points.filter(
    (p) => p.actionType === "unforced_error" && p.scoredBy !== player,
  ).length;

export const calculateScoreEvolution = (points: MatchPoint[]) => {
  const dataP1: { value: number }[] = [{ value: 0 }];
  const dataP2: { value: number }[] = [{ value: 0 }];

  points.forEach((point) => {
    if (point.scoredBy === "p1") {
      dataP1.push({ value: dataP1[dataP1.length - 1].value + 1 });
      dataP2.push({ value: dataP2[dataP2.length - 1].value });
    } else {
      dataP1.push({ value: dataP1[dataP1.length - 1].value });
      dataP2.push({ value: dataP2[dataP2.length - 1].value + 1 });
    }
  });

  return { dataP1, dataP2 };
};
