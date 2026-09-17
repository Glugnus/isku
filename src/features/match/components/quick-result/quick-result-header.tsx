import { Text, View } from "react-native";

export default function QuickResultHeader({
  p1SetsWon,
  p2SetsWon,
  winner,
}: {
  p1SetsWon: number;
  p2SetsWon: number;
  winner: "p1" | "p2" | null;
}) {
  return (
    <View className="flex-row items-end justify-between mb-6 mt-0">
      <View>
        <Text className="text-sm font-bold text-primary uppercase tracking-wider mb-1">
          Résultat Rapide
        </Text>
        <Text className="text-2xl text-white font-oswald uppercase tracking-widest">
          Score Final
        </Text>
      </View>
      <View>
        <Text
          className={`font-oswald text-5xl ${winner ? (winner === "p1" ? "text-primary" : "text-secondary") : "text-white"}`}
        >
          {p1SetsWon} - {p2SetsWon}
        </Text>
      </View>
    </View>
  );
}
