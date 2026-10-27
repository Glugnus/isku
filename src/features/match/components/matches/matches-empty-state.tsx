import { colors } from "@/src/lib/colors";
import { History } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function MatchesEmptyState({ error }: { error?: string }) {
  const { t } = useTranslation("matches");
  return (
    <View className="flex-1 mt-12 items-center justify-center">
      <View className="bg-surface w-full p-8 rounded-3xl border border-muted/10 items-center">
        <View className="bg-primary/10 p-4 rounded-full mb-4">
          <History size={32} color={colors.muted} />
        </View>
        <Text className="text-white text-lg font-semibold mb-2">
          {error ? "Erreur" : t("emptyTitle")}
        </Text>
        <Text className="text-muted text-center text-sm">
          {error ? error : t("emptyDescription")}
        </Text>
      </View>
    </View>
  );
}
