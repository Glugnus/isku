import MatchEvolutionChart from "@/src/features/match/components/stats/match-evolution-chart";
import StatProgressBar from "@/src/features/match/components/stats/stat-progress-bar";
import { ScrollView, Text, View } from "react-native";

export default function StatsTabContent({
  mode,
  p1Name,
  p2Name,
}: {
  mode: "quick" | "umpire";
  p1Name: string;
  p2Name: string;
}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-6"
    >
      <View className="flex-row justify-between items-center bg-surface py-3 px-4 rounded-xl border border-muted/20 mb-4">
        <Text
          className="text-primary font-oswald text-base uppercase flex-1"
          numberOfLines={1}
        >
          {p1Name}
        </Text>
        <Text className="text-muted text-xs font-bold px-3">VS</Text>
        <Text
          className="text-secondary font-oswald text-base uppercase flex-1 text-right"
          numberOfLines={1}
        >
          {p2Name}
        </Text>
      </View>
      <View className="flex-row flex-wrap justify-between">
        <StatProgressBar
          title="Points Gagnés"
          valueP1={4}
          valueP2={8}
          isFullWidth={mode === "quick"}
        />
        {mode === "umpire" && (
          <>
            <StatProgressBar title="Sur son service" valueP1={4} valueP2={8} />
            <StatProgressBar
              title="Sur service adverse"
              valueP1={4}
              valueP2={8}
            />
            <StatProgressBar
              title="Plus grande avance"
              valueP1={4}
              valueP2={8}
            />
            <StatProgressBar
              title="Plus longue série"
              valueP1={4}
              valueP2={8}
            />
            <StatProgressBar title="Retard remonté" valueP1={4} valueP2={8} />
            <StatProgressBar title="Coups gagnants" valueP1={4} valueP2={8} />
            <StatProgressBar title="Fautes directes" valueP1={4} valueP2={8} />
          </>
        )}
        <MatchEvolutionChart p1Name={p1Name} p2Name={p2Name} />
      </View>
    </ScrollView>
  );
}
