import MatchEvolutionChart from "@/src/features/match/components/stats/match-evolution-chart";
import StatProgressBar from "@/src/features/match/components/stats/stat-progress-bar";
import SummarySetBadge from "@/src/features/match/components/summary/summary-set-badge";
import { useStats } from "@/src/features/match/hooks/use-stats";
import {
  MatchPoint,
  MatchSet,
  MatchTeams,
} from "@/src/features/match/types/match.types";
import { ScrollView, Text, View } from "react-native";

export default function StatsTabContent({
  mode,
  tab,
  points,
  teams,
  sets,
}: {
  mode: "quick" | "umpire";
  tab: string;
  points?: MatchPoint[];
  teams?: MatchTeams | null;
  sets?: MatchSet[];
}) {
  const {
    setsWon,
    pointsWon,
    pointsWonOnOwnServe,
    pointsWonOnOpponentServe,
    maxLead,
    longestStreak,
    winners,
    unforcedErrors,
    maxDeficitOvercome,
    scoreEvolution,
    p1Name,
    p2Name,
  } = useStats(tab, { points, teams, sets });

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
        <View className="flex-row items-center gap-x-2 px-3">
          <Text className="text-primary font-oswald text-lg">{setsWon.p1}</Text>
          <Text className="text-muted text-sm font-bold">VS</Text>
          <Text className="text-secondary font-oswald text-lg">
            {setsWon.p2}
          </Text>
        </View>
        <Text
          className="text-secondary font-oswald text-base uppercase flex-1 text-right"
          numberOfLines={1}
        >
          {p2Name}
        </Text>
      </View>
      <View className="flex-row flex-wrap justify-between">
        {mode === "quick" && (
          <View className="flex-row flex-wrap justify-center gap-x-2 items-center w-full mb-3">
            {sets?.map((s) => (
              <SummarySetBadge key={s.setNumber} set={s} />
            ))}
          </View>
        )}
        <StatProgressBar
          title="Points Gagnés"
          valueP1={pointsWon.p1}
          valueP2={pointsWon.p2}
          isFullWidth={mode === "quick"}
        />
        {mode === "umpire" && (
          <>
            <StatProgressBar
              title="Sur son service"
              valueP1={pointsWonOnOwnServe.p1}
              valueP2={pointsWonOnOwnServe.p2}
            />
            <StatProgressBar
              title="Sur service adverse"
              valueP1={pointsWonOnOpponentServe.p1}
              valueP2={pointsWonOnOpponentServe.p2}
            />
            <StatProgressBar
              title="Plus grande avance"
              valueP1={maxLead.p1}
              valueP2={maxLead.p2}
            />
            <StatProgressBar
              title="Plus longue série"
              valueP1={longestStreak.p1}
              valueP2={longestStreak.p2}
            />
            <StatProgressBar
              title="Retard remonté"
              valueP1={maxDeficitOvercome.p1}
              valueP2={maxDeficitOvercome.p2}
            />
            <StatProgressBar
              title="Coups gagnants"
              valueP1={winners.p1}
              valueP2={winners.p2}
            />
            <StatProgressBar
              title="Fautes directes"
              valueP1={unforcedErrors.p1}
              valueP2={unforcedErrors.p2}
            />
          </>
        )}
        {mode === "umpire" && (
          <MatchEvolutionChart
            p1Name={p1Name}
            p2Name={p2Name}
            dataP1={scoreEvolution.dataP1}
            dataP2={scoreEvolution.dataP2}
          />
        )}
      </View>
    </ScrollView>
  );
}
