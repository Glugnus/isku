import Button from "@/src/components/ui/button";
import ConfirmModal from "@/src/components/ui/confirm-modal";
import { useDeleteUser } from "@/src/features/auth/hooks/use-delete-user";
import { colors } from "@/src/lib/colors";
import { Trash2 } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function DeleteUserButton() {
  const { t } = useTranslation("auth");
  const { t: tc } = useTranslation();
  const { handleDeleteUser, isLoading, error } = useDeleteUser();
  const [visible, setVisible] = useState(false);

  return (
    <View className="mt-4">
      <Button
        leftIcon={<Trash2 size={18} color={colors.danger} />}
        isLoading={isLoading}
        title={t("deleteAccount.button")}
        onPress={() => setVisible(true)}
        variant="danger"
        size="md"
      />
      <ConfirmModal
        message={t("deleteAccount.modalMessage")}
        title={t("deleteAccount.modalTitle")}
        onConfirm={handleDeleteUser}
        onClose={() => setVisible(false)}
        confirmText={tc("actions.delete")}
        visible={visible}
        isLoading={isLoading}
        error={error}
      />
    </View>
  );
}
