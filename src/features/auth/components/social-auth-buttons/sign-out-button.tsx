import Button from "@/src/components/ui/button";
import { useSignOut } from "@/src/features/auth/hooks/use-sign-out";
import { colors } from "@/src/lib/colors";
import { LogOut } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function SignOutButton() {
  const { t } = useTranslation();
  const { handleSignOut, isLoading, error } = useSignOut();
  return (
    <View>
      <Button
        title={t("actions.signOut")}
        variant="danger"
        leftIcon={<LogOut color={colors.danger} size={18} />}
        onPress={handleSignOut}
        isLoading={isLoading}
        size="md"
      />
      {error && (
        <Text className="text-danger text-xs text-center mt-2">{error}</Text>
      )}
    </View>
  );
}
