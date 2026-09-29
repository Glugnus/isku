import Button from "@/src/components/ui/button";
import ConfirmModal from "@/src/components/ui/confirm-modal";
import { colors } from "@/src/lib/colors";
import { router, useLocalSearchParams } from "expo-router";
import { BarChart2, Flag, Undo2 } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

export default function TrackerFooter({
  onUndo,
  canUndo,
  onConfirmAbandon,
}: {
  onUndo: () => void;
  canUndo: boolean;
  onConfirmAbandon: () => void;
}) {
  const { id: matchId } = useLocalSearchParams<{
    id: string;
  }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <View className="px-6 py-3 bg-surface flex-row items-center justify-between border-t border-muted/20 -mx-6">
      <Button
        title="Annuler"
        leftIcon={<Undo2 size={18} color={colors.muted} />}
        variant="ghost"
        size="sm"
        onPress={onUndo}
        disabled={!canUndo}
      />
      <Button
        title="Stats"
        leftIcon={<BarChart2 size={18} color={colors.muted} />}
        variant="ghost"
        size="sm"
        onPress={() =>
          router.push({
            pathname: `/match/[id]/stats`,
            params: { id: matchId },
          })
        }
      />
      <Button
        title="Abandonner"
        leftIcon={<Flag size={18} color={colors.muted} />}
        variant="ghost"
        size="sm"
        onPress={() => setIsModalOpen(true)}
      />
      <ConfirmModal
        visible={isModalOpen}
        title="Arrêter le match"
        message="Le match n'est pas terminé. Êtes-vous sûr de vouloir l'abandonner ?"
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          onConfirmAbandon();
          setIsModalOpen(false);
        }}
        cancelText="Non, reprendre"
        confirmText="Oui, abandonner"
      />
    </View>
  );
}
