import ConfirmModal from "@/src/components/ui/confirm-modal";
import { useDeleteUser } from "@/src/features/auth/hooks/use-delete-user";
import SettingItem from "@/src/features/settings/components/setting-item";
import { colors } from "@/src/lib/colors";
import { Trash2 } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function DeleteUserSettingItem() {
  const { t } = useTranslation("auth");
  const { t: tc } = useTranslation();
  const { handleDeleteUser, isLoading, error } = useDeleteUser();
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <SettingItem
        leftIcon={<Trash2 size={18} color={colors.danger} />}
        title={t("deleteAccount.button")}
        onPress={() => setVisible(true)}
        variant="danger"
        isLoading={isLoading}
        showChevron={false}
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
