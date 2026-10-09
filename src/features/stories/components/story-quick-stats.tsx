import { Text, View } from "react-native";

interface StoryQuickStatsProps {
  maxMargin: number;
  myPoints: number;
  oppPoints: number;
  hasWon: boolean;
}

export default function StoryQuickStats({
  maxMargin,
  myPoints,
  oppPoints,
  hasWon,
}: StoryQuickStatsProps) {
  const accentColor = hasWon ? "text-primary" : "text-secondary";
  const borderColor = hasWon ? "border-primary/40" : "border-secondary/40";

  return (
    <View className="gap-3">
      <View
        className={`bg-surface border ${borderColor} p-5 rounded-3xl items-center shadow-lg`}
      >
        <Text className="text-muted text-[10px] font-bold uppercase tracking-widest mb-1">
          Plus gros écart
        </Text>
        <Text className={`${accentColor} font-orbitron text-5xl font-black`}>
          {maxMargin > 0 ? `+${maxMargin}` : maxMargin}
        </Text>
        <Text className="text-white font-semibold text-xs mt-1 uppercase tracking-wider">
          Sur un set
        </Text>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 bg-surface/80 border border-white/10 p-4 rounded-2xl items-center">
          <Text className="text-white font-orbitron text-3xl font-black">
            {myPoints}
          </Text>
          <Text className="text-neutral text-[10px] font-bold uppercase mt-1 text-center">
            Points Marqués
          </Text>
        </View>
        <View className="flex-1 bg-surface/80 border border-white/10 p-4 rounded-2xl items-center">
          <Text className="text-danger font-orbitron text-3xl font-black">
            {oppPoints}
          </Text>
          <Text className="text-neutral text-[10px] font-bold uppercase mt-1 text-center">
            Points Concédés
          </Text>
        </View>
      </View>
    </View>
  );
}
