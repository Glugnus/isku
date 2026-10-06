import { MatchSet } from "@/src/features/match/types/match.types";
import { Text, View } from "react-native";

export default function SummarySetBadge({ set }: { set: MatchSet }) {
  const isP1Winner = set.p1SetScore > set.p2SetScore;
  return (
    <View className="bg-background px-4 py-2.5 rounded-xl border border-muted/30 items-center justify-center min-w-[75px]">
      <Text className="text-muted text-[10px] font-bold uppercase tracking-widest mb-1">
        Set {set.setNumber}
      </Text>
      <View className="flex-row items-center gap-x-2">
        <Text
          className={`text-xl font-oswald ${isP1Winner ? "text-primary" : "text-primary/50"}`}
        >
          {set.p1SetScore}
        </Text>
        <Text className="text-muted text-base font-oswald">-</Text>
        <Text
          className={`text-xl font-oswald ${!isP1Winner ? "text-secondary" : "text-secondary/50"}`}
        >
          {set.p2SetScore}
        </Text>
      </View>
    </View>
  );
}
