import MatchEvolutionChart from "@/src/features/match/components/stats/match-evolution-chart";
import StatProgressBar from "@/src/features/match/components/stats/stat-progress-bar";
import SummarySetBadge from "@/src/features/match/components/summary/summary-set-badge";
import { useStats } from "@/src/features/match/hooks/use-stats";
import {
  MatchPoint,
  MatchSet,
  MatchTeams,
} from "@/src/features/match/types/match.types";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function StatsTabContent({
  mode,
  setNumber,
  points,
  teams,
  sets,
  isLiveMatch = false,
}: {
  mode: "quick" | "umpire";
  setNumber?: number;
  points?: MatchPoint[];
  teams?: MatchTeams | null;
  sets?: MatchSet[];
  isLiveMatch: boolean;
}) {
  const { t } = useTranslation("match");
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
  } = useStats(setNumber, { points, teams, sets });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-6"
    >
      {!isLiveMatch && (
        <View className="flex-row justify-between items-center bg-surface py-3 px-4 rounded-xl border border-muted/20 mb-4">
          <Text
            className="text-primary font-oswald text-base uppercase flex-1"
            numberOfLines={1}
          >
            {p1Name}
          </Text>
          <View className="flex-row items-center gap-x-2 px-3">
            <Text className="text-primary font-oswald text-lg">
              {setsWon.p1}
            </Text>
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
      )}

      <View className="flex-row flex-wrap justify-between">
        {mode === "quick" && (
          <View className="flex-row flex-wrap justify-center gap-x-2 items-center w-full mb-3">
            {sets?.map((s) => (
              <SummarySetBadge key={s.setNumber} set={s} />
            ))}
          </View>
        )}
        <StatProgressBar
          title={t("stats.metrics.pointsWon")}
          valueP1={pointsWon.p1}
          valueP2={pointsWon.p2}
          isFullWidth={mode === "quick"}
        />
        {mode === "umpire" && (
          <>
            <StatProgressBar
              title={t("stats.metrics.ownServe")}
              valueP1={pointsWonOnOwnServe.p1}
              valueP2={pointsWonOnOwnServe.p2}
            />
            <StatProgressBar
              title={t("stats.metrics.opponentServe")}
              valueP1={pointsWonOnOpponentServe.p1}
              valueP2={pointsWonOnOpponentServe.p2}
            />
            <StatProgressBar
              title={t("stats.metrics.maxLead")}
              valueP1={maxLead.p1}
              valueP2={maxLead.p2}
            />
            <StatProgressBar
              title={t("stats.metrics.longestStreak")}
              valueP1={longestStreak.p1}
              valueP2={longestStreak.p2}
            />
            <StatProgressBar
              title={t("stats.metrics.deficitOvercome")}
              valueP1={maxDeficitOvercome.p1}
              valueP2={maxDeficitOvercome.p2}
            />
            <StatProgressBar
              title={t("stats.metrics.winners")}
              valueP1={winners.p1}
              valueP2={winners.p2}
            />
            <StatProgressBar
              title={t("stats.metrics.unforcedErrors")}
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
