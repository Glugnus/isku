import Button from "@/src/components/ui/button";
import ScreenLayout from "@/src/components/ui/screen-layout";
import TrackerCourt from "@/src/features/match/components/tracker/tracker-court";
import TrackerFooter from "@/src/features/match/components/tracker/tracker-footer";
import TrackerHeader from "@/src/features/match/components/tracker/tracker-header";
import { useTracker } from "@/src/features/match/hooks/use-tracker";
import { useKeepAwake } from "expo-keep-awake";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

export default function TrackerScreen() {
  const { t } = useTranslation("match");
  const { t: tc } = useTranslation();
  useKeepAwake();
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
    retrySave,
    isSaving,
  } = useTracker();

  return (
    <ScreenLayout>
      <TrackerHeader
        p1Name={
          teams?.team1Name || t("tracker.playerPlaceholder", { number: 1 })
        }
        p2Name={
          teams?.team2Name || t("tracker.playerPlaceholder", { number: 2 })
        }
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
        <>
          <Text className="text-center mb-4 font-bold text-danger">
            {saveError}
          </Text>
          <Button
            title={tc("actions.retry")}
            onPress={retrySave}
            isLoading={isSaving}
            variant="surface"
          />
        </>
      )}
    </ScreenLayout>
  );
}
