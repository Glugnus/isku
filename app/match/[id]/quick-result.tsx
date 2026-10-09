import ScreenLayout from "@/src/components/ui/screen-layout";
import ScreenLoader from "@/src/components/ui/screen-loader";
import UndoButton from "@/src/components/ui/undo-button";
import QuickResultFooter from "@/src/features/match/components/quick-result/quick-result-footer";
import QuickResultHeader from "@/src/features/match/components/quick-result/quick-result-header";
import QuickResultTable from "@/src/features/match/components/quick-result/quick-result-table";
import { useQuickResult } from "@/src/features/match/hooks/use-quick-result";
import { useLocalSearchParams } from "expo-router";

export default function QuickResultScreen() {
  const { id: matchId } = useLocalSearchParams<{
    id: string;
  }>();

  const {
    matchResult,
    players,
    handleScoreChange,
    handleUndo,
    scoreSets,
    handleSaveMatchResult,
    isSaving,
    isFetching,
  } = useQuickResult(matchId);

  return (
    <ScreenLayout>
      {isFetching ? (
        <ScreenLoader />
      ) : (
        <>
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
          <UndoButton onPress={handleUndo} label="Annuler le dernier set" />
          <QuickResultFooter
            winner={matchResult.matchWinner}
            onPress={handleSaveMatchResult}
            isLoading={isSaving}
          />
        </>
      )}
    </ScreenLayout>
  );
}
