import Button from "@/src/components/ui/button";
import { PlayerKey } from "@/src/features/match/types/match.types";
import { colors } from "@/src/lib/colors";
import { router } from "expo-router";
import { BarChart2, Home, Share2 } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function SummaryActions({
  matchId,
  resetMatch,
  profilePosition,
}: {
  matchId: string;
  resetMatch: () => void;
  profilePosition: PlayerKey;
}) {
  const { t } = useTranslation("match");
  return (
    <View className="w-full flex-col gap-4 mb-6">
      <Button
        title={t("summary.actions.stats")}
        variant="ghost"
        leftIcon={
          <BarChart2
            size={24}
            color={profilePosition === "p1" ? colors.primary : colors.secondary}
          />
        }
        onPress={() =>
          router.push({
            pathname: `/match/[id]/stats`,
            params: { id: matchId },
          })
        }
      />
      <Button
        title={t("summary.actions.share")}
        variant="ghost"
        onPress={() =>
          router.push({
            pathname: "/match/[id]/stories",
            params: { id: matchId },
          })
        }
        leftIcon={
          <Share2
            size={24}
            color={profilePosition === "p1" ? colors.primary : colors.secondary}
          />
        }
      />
      <Button
        title={t("summary.actions.backHome")}
        variant={profilePosition === "p1" ? "primary" : "secondary"}
        leftIcon={
          <Home
            size={24}
            color={profilePosition === "p1" ? colors.background : colors.white}
          />
        }
        onPress={() => {
          resetMatch();
          router.replace(`/(tabs)/matches`);
        }}
      />
    </View>
  );
}
