import ScreenLayout from "@/src/components/ui/screen-layout";
import TrackerCourt from "@/src/features/match/components/tracker/tracker-court";
import TrackerFooter from "@/src/features/match/components/tracker/tracker-footer";
import TrackerHeader from "@/src/features/match/components/tracker/tracker-header";
import { useTracker } from "@/src/features/match/hooks/use-tracker";
import { Text } from "react-native";

export default function TrackerScreen() {
  const {
    teams,
    currentServer,
    servesLeft,
    sets,
    currentSet,
    p1Score,
    p2Score,
    scorePoint,
    undoPoint,
    canUndo,
    abandonMatch,
    saveError,
  } = useTracker();

  return (
    <ScreenLayout>
      <TrackerHeader
        p1Name={teams?.team1Name || "Joueur 1"}
        p2Name={teams?.team2Name || "Joueur 2"}
        currentServer={currentServer}
        servesLeft={servesLeft}
        sets={sets}
        p1Score={p1Score}
        p2Score={p2Score}
        currentSet={currentSet}
      />
      <TrackerCourt
        p1Score={p1Score}
        p2Score={p2Score}
        currentServer={currentServer}
        servesLeft={servesLeft}
        scorePoint={scorePoint}
      />
      <TrackerFooter
        currentSet={currentSet}
        onUndo={undoPoint}
        canUndo={canUndo}
        onConfirmAbandon={abandonMatch}
      />
      {saveError && (
        <Text className="text-center mb-4 font-bold text-danger">
          {saveError}
        </Text>
      )}
    </ScreenLayout>
  );
}
