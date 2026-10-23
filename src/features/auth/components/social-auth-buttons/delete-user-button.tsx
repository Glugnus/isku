import Button from "@/src/components/ui/button";
import ConfirmModal from "@/src/components/ui/confirm-modal";
import { useDeleteUser } from "@/src/features/auth/hooks/use-delete-user";
import { colors } from "@/src/lib/colors";
import { Trash2 } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

export default function DeleteUserButton() {
  const { handleDeleteUser, isLoading, error } = useDeleteUser();
  const [visible, setVisible] = useState(false);

  return (
    <View className="mt-4">
      <Button
        leftIcon={<Trash2 size={18} color={colors.danger} />}
        isLoading={isLoading}
        title="Supprimer mon compte"
        onPress={() => setVisible(true)}
        variant="danger"
        size="md"
      />
      <ConfirmModal
        message="Cette action est irréversible. Toutes vos statistiques et vos matchs seront définitivement supprimés."
        title="Supprimer mon compte"
        onConfirm={handleDeleteUser}
        onClose={() => setVisible(false)}
        cancelText="Annuler"
        confirmText="Supprimer"
        visible={visible}
        isLoading={isLoading}
        error={error}
      />
    </View>
  );
}
