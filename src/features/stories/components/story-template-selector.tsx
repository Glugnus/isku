import { Pressable, Text, View } from "react-native";

export type StoryTemplateType = "scorecard" | "highlight";

interface StoryTemplateSelectorProps {
  selectedTemplate: StoryTemplateType;
  onSelect: (template: StoryTemplateType) => void;
}

export default function StoryTemplateSelector({
  selectedTemplate,
  onSelect,
}: StoryTemplateSelectorProps) {
  return (
    <View className="flex-row items-center justify-center gap-2 mb-3">
      <Pressable
        onPress={() => onSelect("scorecard")}
        className={`px-4 py-1.5 rounded-full border ${
          selectedTemplate === "scorecard"
            ? "bg-primary border-primary"
            : "bg-surface border-white/10"
        }`}
      >
        <Text
          className={`font-oswald text-xs uppercase tracking-wider ${
            selectedTemplate === "scorecard"
              ? "text-background font-bold"
              : "text-neutral"
          }`}
        >
          Résultat
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onSelect("highlight")}
        className={`px-4 py-1.5 rounded-full border ${
          selectedTemplate === "highlight"
            ? "bg-primary border-primary"
            : "bg-surface border-white/10"
        }`}
      >
        <Text
          className={`font-oswald text-xs uppercase tracking-wider ${
            selectedTemplate === "highlight"
              ? "text-background font-bold"
              : "text-neutral"
          }`}
        >
          Stats Clés
        </Text>
      </Pressable>
    </View>
  );
}
