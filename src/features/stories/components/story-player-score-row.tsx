import { Text, View } from "react-native";

interface StoryPlayerScoreRowProps {
  playerName: string;
  setsWon: number;
  isMe: boolean;
  hasWon: boolean;
}

export default function StoryPlayerScoreRow({
  playerName,
  setsWon,
  isMe,
  hasWon,
}: StoryPlayerScoreRowProps) {
  const borderStyle = isMe
    ? hasWon
      ? "border-primary/60 bg-surface shadow-lg"
      : "border-secondary/60 bg-surface shadow-lg"
    : "border-white/5 bg-surface/50 opacity-70";
  const scoreColor = isMe
    ? hasWon
      ? "text-primary"
      : "text-secondary"
    : "text-muted";

  return (
    <View
      className={`p-4 rounded-2xl flex-row items-center justify-between border ${borderStyle}`}
    >
      <View className="flex-1 mr-3">
        <Text
          numberOfLines={1}
          className={`font-oswald text-3xl uppercase tracking-wider ${isMe ? "text-white" : "text-neutral"}`}
        >
          {playerName}
        </Text>
      </View>
      <Text className={`font-orbitron text-5xl font-black ${scoreColor}`}>
        {setsWon}
      </Text>
    </View>
  );
}
