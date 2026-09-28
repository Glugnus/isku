import TrackerHeaderPlayer from "@/src/features/match/components/tracker/tracker-header-players";
import { MatchSet, PlayerKey } from "@/src/features/match/types/match.types";
import { Text, View } from "react-native";

interface TrackerHeaderProps {
  p1Name: string;
  p2Name: string;
  currentServer: PlayerKey;
  servesLeft: number;
  sets: MatchSet[];
  p1SetsWon: number;
  p2SetsWon: number;
  currentSet: number;
}

export default function TrackerHeader({
  p1Name,
  p2Name,
  currentServer,
  servesLeft,
  sets,
  p1SetsWon,
  p2SetsWon,
  currentSet,
}: TrackerHeaderProps) {
  return (
    <View>
      <View className="py-3 flex-row items-center justify-between">
        <TrackerHeaderPlayer
          name={p1Name}
          isServing={currentServer === "p1"}
          align="left"
          servesLeft={servesLeft}
          playerKey="p1"
        />
        <View className="items-center px-4 py-1.5 bg-background rounded-xl border border-muted/30 mx-1">
          <Text className="text-muted text-[8px] font-bold uppercase tracking-widest">
            SET {currentSet}
          </Text>
          <Text className="text-white text-lg font-oswald tracking-widest">
            <Text className="text-primary">{p1SetsWon}</Text> -{" "}
            <Text className="text-secondary">{p2SetsWon}</Text>
          </Text>
        </View>
        <TrackerHeaderPlayer
          name={p2Name}
          isServing={currentServer === "p2"}
          align="right"
          servesLeft={servesLeft}
          playerKey="p2"
        />
      </View>
      {sets.length > 0 && (
        <View className="flex-row items-center justify-center gap-x-3 pt-2 px-4 bg-background/60 border-t border-muted/20">
          <Text className="text-muted text-[10px] font-bold uppercase tracking-wider">
            Sets précédents :
          </Text>
          <View className="flex-row items-center gap-x-2">
            {sets.map((set) => (
              <View
                key={`set-${set.setNumber}`}
                className="bg-surface px-2.5 py-0.5 rounded-md border border-muted/30 flex-row items-center gap-x-1"
              >
                <Text className="text-muted text-[9px] font-bold">
                  S{set.setNumber}
                </Text>
                <Text className="text-primary text-xs font-oswald">
                  {set.p1SetScore}
                </Text>
                <Text className="text-muted text-[10px]">-</Text>
                <Text className="text-secondary text-xs font-oswald">
                  {set.p2SetScore}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
