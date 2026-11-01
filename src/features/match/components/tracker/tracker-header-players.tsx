import { PlayerKey } from "@/src/features/match/types/match.types";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function TrackerHeaderPlayer({
  name,
  isServing,
  align,
  servesLeft,
  playerKey,
}: {
  name: string;
  isServing: boolean;
  align: "left" | "right";
  servesLeft: number;
  playerKey: PlayerKey;
}) {
  const { t } = useTranslation("match");
  return (
    <View
      className={`flex-1  items-center ${align === "right" ? "justify-end flex-row-reverse" : "flex-row"}`}
    >
      <View
        className={`size-3 rounded-full ${align === "right" ? "ml-2" : "mr-2"}  ${!isServing ? "bg-transparent" : playerKey === "p1" ? "bg-primary" : "bg-secondary"}`}
      />

      <View className={`flex-1  ${align === "right" ? "items-end" : ""}`}>
        <Text
          className={`${
            playerKey === "p1" ? "text-primary" : "text-secondary"
          } text-xs font-bold uppercase tracking-wider`}
        >
          {isServing
            ? t("tracker.header.serve", { count: servesLeft })
            : t("tracker.header.receive")}
        </Text>
        <Text
          className={`${
            playerKey === "p1" ? "text-primary" : "text-secondary"
          } text-lg font-oswald uppercase tracking-wider ${
            align === "right" ? "text-right" : ""
          }`}
          numberOfLines={1}
        >
          {name}
        </Text>
      </View>
    </View>
  );
}
