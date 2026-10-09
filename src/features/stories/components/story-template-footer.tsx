import { MatchDetails } from "@/src/features/match/types/match.types";
import { Text, View } from "react-native";

export default function StoryTemplateFooter({
  match,
}: {
  match: MatchDetails;
}) {
  return (
    <View className="bg-surface/90 border border-white/10 rounded-2xl p-4 mb-14 gap-2 items-center">
      {match.scheduled_at && (
        <Text className="text-white font-oswald text-base tracking-wide uppercase">
          {new Date(match.scheduled_at).toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
        </Text>
      )}

      {match.location && (
        <Text className="text-neutral text-xs tracking-wider" numberOfLines={1}>
          📍 {match.location}
        </Text>
      )}
      {match.format && (
        <Text className="text-muted text-[10px] font-bold tracking-widest uppercase">
          {match.format} sets gagnants
        </Text>
      )}
    </View>
  );
}
