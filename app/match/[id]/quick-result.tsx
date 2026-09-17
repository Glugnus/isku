import ScreenLayout from "@/src/components/ui/screen-layout";
import QuickResultHeader from "@/src/features/match/components/quick-result/quick-result-header";
import QuickResultTable from "@/src/features/match/components/quick-result/quick-result-table";
import { useQuickResult } from "@/src/features/match/hooks/use-quick-result";
import { useLocalSearchParams } from "expo-router";

export default function QuickResultScreen() {
  const { id: matchId } = useLocalSearchParams<{
    id: string;
  }>();

  const { matchResult, players, handleScoreChange, scoreSets } =
    useQuickResult(matchId);

  return (
    <ScreenLayout>
      <QuickResultHeader
        p1SetsWon={matchResult.p1SetsWon}
        p2SetsWon={matchResult.p2SetsWon}
        winner={matchResult.matchWinner}
      />
      <QuickResultTable
        players={players}
        handleScoreChange={handleScoreChange}
        scoreSets={scoreSets}
        matchResult={matchResult}
      />
    </ScreenLayout>
  );
}
