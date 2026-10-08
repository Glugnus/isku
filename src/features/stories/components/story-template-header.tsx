import { Text, View } from "react-native";

interface StoryTemplateHeaderProps {
  headerText: string;
  variant?: "primary" | "secondary" | "neutral";
  sport?: string;
}

export default function StoryTemplateHeader({
  headerText,
  sport,
  variant = "primary",
}: StoryTemplateHeaderProps) {
  return (
    <View className="items-center gap-2">
      <View
        className={`px-5 py-1.5 rounded-full border ${
          variant === "primary"
            ? "bg-primary/20 border-primary"
            : variant === "secondary"
              ? "bg-secondary/20 border-secondary"
              : "bg-surface border-white/20"
        }`}
      >
        <Text
          className={`font-orbitron text-sm tracking-widest uppercase font-bold ${
            variant === "primary"
              ? "text-primary"
              : variant === "secondary"
                ? "text-secondary"
                : "text-neutral"
          }`}
        >
          {headerText}
        </Text>
      </View>
      <Text className="text-neutral/80 text-xs tracking-wider uppercase font-semibold">
        {sport}
      </Text>
    </View>
  );
}
