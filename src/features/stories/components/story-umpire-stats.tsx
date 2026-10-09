import { Text, View } from "react-native";

interface StoryUmpireStatsProps {
  servePointsWinrate: number;
  returnPointsWinrate: number;
  winners: number;
  errors: number;
  hasWon: boolean;
}

export default function StoryUmpireStats({
  servePointsWinrate,
  returnPointsWinrate,
  winners,
  errors,
  hasWon,
}: StoryUmpireStatsProps) {
  const borderColor = hasWon ? "border-primary/40" : "border-secondary/40";
  const accentColor = hasWon ? "text-primary" : "text-secondary";

  return (
    <View className="gap-3">
      <View className={`bg-surface border ${borderColor} p-4 rounded-3xl`}>
        <Text className="text-muted text-[10px] font-bold uppercase tracking-widest text-center mb-3">
          Efficacité des points
        </Text>
        <View className="flex-row items-center justify-around">
          <View className="items-center">
            <Text
              className={`${accentColor} font-orbitron text-4xl font-black`}
            >
              {servePointsWinrate}%
            </Text>
            <Text className="text-neutral text-[10px] font-bold uppercase mt-1">
              Au Service
            </Text>
          </View>
          <View className="w-[1px] h-10 bg-white/10" />
          <View className="items-center">
            <Text className="text-white font-orbitron text-4xl font-black">
              {returnPointsWinrate}%
            </Text>
            <Text className="text-neutral text-[10px] font-bold uppercase mt-1">
              En Retour
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 bg-surface/80 border border-white/10 p-4 rounded-2xl items-center">
          <Text className={`${accentColor} font-orbitron text-3xl font-black`}>
            {winners}
          </Text>
          <Text className="text-neutral text-[10px] font-bold uppercase mt-1">
            Coups Gagnants
          </Text>
        </View>

        <View className="flex-1 bg-surface/80 border border-white/10 p-4 rounded-2xl items-center">
          <Text className="text-danger font-orbitron text-3xl font-black">
            {errors}
          </Text>
          <Text className="text-neutral text-[10px] font-bold uppercase mt-1">
            Fautes Directes
          </Text>
        </View>
      </View>
    </View>
  );
}
