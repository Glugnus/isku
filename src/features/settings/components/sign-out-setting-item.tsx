import { useSignOut } from "@/src/features/auth/hooks/use-sign-out";
import SettingItem from "@/src/features/settings/components/setting-item";
import { colors } from "@/src/lib/colors";
import { LogOut } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function SignOutSettingItem() {
  const { t } = useTranslation();
  const { handleSignOut, isLoading, error } = useSignOut();
  return (
    <View>
      <SettingItem
        leftIcon={<LogOut color={colors.danger} size={18} />}
        title={t("actions.signOut")}
        variant="danger"
        onPress={handleSignOut}
        isLoading={isLoading}
        showChevron={false}
      />
      {error && (
        <Text className="text-danger text-xs text-center mt-2">{error}</Text>
      )}
    </View>
  );
}
