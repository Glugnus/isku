import Button from "@/src/components/ui/button";
import ConfirmModal from "@/src/components/ui/confirm-modal";
import { colors } from "@/src/lib/colors";
import { router, useLocalSearchParams } from "expo-router";
import { BarChart2, Flag, Undo2 } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function TrackerFooter({
  currentSet,
  onUndo,
  canUndo,
  onConfirmAbandon,
}: {
  currentSet: number;
  onUndo: () => void;
  canUndo: boolean;
  onConfirmAbandon: () => void;
}) {
  const { t } = useTranslation("match");
  const { id: matchId } = useLocalSearchParams<{
    id: string;
  }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <View className="px-6 py-3 bg-surface flex-row items-center justify-between border-t border-muted/20 -mx-6">
      <Button
        title={t("tracker.footer.undo")}
        leftIcon={<Undo2 size={18} color={colors.muted} />}
        variant="ghost"
        size="sm"
        onPress={onUndo}
        disabled={!canUndo}
      />
      <Button
        title={t("tracker.footer.stats")}
        leftIcon={<BarChart2 size={18} color={colors.muted} />}
        variant="ghost"
        size="sm"
        onPress={() =>
          router.push({
            pathname: `/match/[id]/stats`,
            params: { id: matchId, currentSet },
          })
        }
      />
      <Button
        title={t("tracker.footer.abandon")}
        leftIcon={<Flag size={18} color={colors.muted} />}
        variant="ghost"
        size="sm"
        onPress={() => setIsModalOpen(true)}
      />
      <ConfirmModal
        visible={isModalOpen}
        title={t("tracker.footer.abandonModal.title")}
        message={t("tracker.footer.abandonModal.message")}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          onConfirmAbandon();
          setIsModalOpen(false);
        }}
        cancelText={t("tracker.footer.abandonModal.cancel")}
        confirmText={t("tracker.footer.abandonModal.confirm")}
      />
    </View>
  );
}
