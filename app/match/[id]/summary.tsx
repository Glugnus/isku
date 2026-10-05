import ScreenLayout from "@/src/components/ui/screen-layout";
import SummaryActions from "@/src/features/match/components/summary/summary-actions";
import SummaryCard from "@/src/features/match/components/summary/summary-card";
import { useSummary } from "@/src/features/match/hooks/use-summary";
import { Text, View } from "react-native";

export default function SummaryScreen() {
  const {
    profileIsWinner,
    p1SetsWon,
    p2SetsWon,
    sets,
    match,
    resetMatch,
    profilePosition,
  } = useSummary();

  return (
    <ScreenLayout scrollable>
      {typeof match?.id === "string" ? (
        <View className="flex-1 justify-center items-center">
          <View className="items-center justify-center mb-6 mt-0">
            <Text
              className={`text-sm font-bold uppercase tracking-wider mb-1 ${profilePosition === "p1" ? "text-primary" : "text-secondary"}`}
            >
              Bien joué !
            </Text>
            <Text className="text-2xl font-oswald uppercase tracking-widest text-white">
              Résultat Final
            </Text>
            <View
              className={`h-1 w-16 ${profilePosition === "p1" ? "bg-primary" : "bg-secondary"} rounded-full mt-1`}
            />
          </View>
          <SummaryCard
            sets={sets}
            profileIsWinner={profileIsWinner}
            profilePosition={profilePosition}
            p1SetsWon={p1SetsWon}
            p2SetsWon={p2SetsWon}
          />
          <SummaryActions
            resetMatch={resetMatch}
            matchId={match?.id}
            profilePosition={profilePosition}
          />
        </View>
      ) : (
        <View className="h-60 justify-center items-center">
          <Text className="text-muted text-xs text-center">
            Impossible de récupérer le match.
          </Text>
        </View>
      )}
    </ScreenLayout>
  );
}
