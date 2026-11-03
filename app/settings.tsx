import { APP_CONFIG } from "@/src/app-config";
import ScreenLayout from "@/src/components/ui/screen-layout";
import DeleteUserButton from "@/src/features/auth/components/social-auth-buttons/delete-user-button";
import SignOutButton from "@/src/features/auth/components/social-auth-buttons/sign-out-button";
import LanguageSettingItem from "@/src/features/settings/components/language-setting-item";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function SettingsPage() {
  const { t } = useTranslation("settings");
  return (
    <ScreenLayout scrollable>
      <View className="mb-6">
        <Text className="text-xs font-oswald text-muted uppercase tracking-widest mb-3 ml-1">
          {t("sections.preference")}
        </Text>
        <View className="bg-surface rounded-2xl border border-muted/20 px-4 py-1 divide-y divide-muted/10">
          {/* Composant Ligne Langue */}
          <LanguageSettingItem />
        </View>
      </View>
      {/* SECTION 2 : COMPTE & SÉCURITÉ */}
      <View className="mb-6">
        <Text className="text-xs font-oswald text-muted uppercase tracking-widest mb-3 ml-1">
          {t("sections.account")}
        </Text>

        <View className="space-y-4">
          <SignOutButton />
          <DeleteUserButton />
        </View>
      </View>
      <View className="mt-8 mb-4 items-center">
        <Text className="text-xs text-muted/50 tracking-wider">
          {APP_CONFIG.name} {APP_CONFIG.version}
        </Text>
      </View>
    </ScreenLayout>
  );
}
