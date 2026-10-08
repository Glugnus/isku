import { Text, View } from "react-native";

interface StoryScoreBannerProps {
  p1Name: string;
  p2Name: string;
  p1SetsWon: number;
  p2SetsWon: number;
  profilePosition: "p1" | "p2";
  hasWon: boolean;
}

export default function StoryScoreBanner({
  p1Name,
  p2Name,
  p1SetsWon,
  p2SetsWon,
  profilePosition,
  hasWon,
}: StoryScoreBannerProps) {
  const accentColor = hasWon ? "text-primary" : "text-secondary";
  return (
    <View className="bg-surface/70 border border-white/10 px-4 py-2.5 rounded-2xl flex-row items-center justify-between">
      <Text
        numberOfLines={1}
        className={`font-oswald text-base uppercase max-w-[110px] ${
          profilePosition === "p1" ? accentColor : "text-neutral"
        }`}
      >
        {p1Name}
      </Text>
      <View className="bg-background px-3 py-1 rounded-xl border border-white/10">
        <Text className="font-orbitron text-lg font-bold text-white tracking-widest">
          {p1SetsWon} - {p2SetsWon}
        </Text>
      </View>
      <Text
        numberOfLines={1}
        className={`font-oswald text-base uppercase text-right max-w-[110px] ${
          profilePosition === "p2" ? accentColor : "text-neutral"
        }`}
      >
        {p2Name}
      </Text>
    </View>
  );
}
