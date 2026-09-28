import {
  PlayerKey,
  PointActionType,
} from "@/src/features/match/types/match.types";
import { View } from "react-native";
import TrackerCourtSide from "./tracker-court-side";

interface TrackerCourtProps {
  p1Score: number;
  p2Score: number;
  currentServer: PlayerKey;
  servesLeft: number;
  scorePoint: (player: PlayerKey, action?: PointActionType) => void;
}

export default function TrackerCourt({
  p1Score,
  p2Score,
  currentServer,
  servesLeft,
  scorePoint,
}: TrackerCourtProps) {
  const sides: { playerKey: PlayerKey; score: number }[] = [
    { playerKey: "p1", score: p1Score },
    { playerKey: "p2", score: p2Score },
  ];
  return (
    <View className="flex-1 py-3 my-1">
      <View className="flex-1 rounded-3xl border-x-2 border-y-4 border-white/20 p-2 flex-row overflow-hidden relative bg-background">
        {sides.map((side) => (
          <TrackerCourtSide
            key={side.playerKey}
            playerKey={side.playerKey}
            score={side.score}
            currentServer={currentServer}
            servesLeft={servesLeft}
            onScorePoint={(action) => scorePoint(side.playerKey, action)}
          />
        ))}
      </View>
    </View>
  );
}
