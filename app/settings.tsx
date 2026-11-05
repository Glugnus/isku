import ScreenLayout from "@/src/components/ui/screen-layout";
import DeleteUserSettingItem from "@/src/features/settings/components/delete-user-setting-item";
import LanguageSettingItem from "@/src/features/settings/components/language-setting-item";
import SettingFooter from "@/src/features/settings/components/setting-footer";
import SettingSection from "@/src/features/settings/components/setting-section";
import SignOutSettingItem from "@/src/features/settings/components/sign-out-setting-item";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation("settings");
  return (
    <ScreenLayout scrollable>
      <SettingSection title={t("sections.preference")}>
        <LanguageSettingItem />
      </SettingSection>
      <SettingSection title={t("sections.account")}>
        <SignOutSettingItem />
        <DeleteUserSettingItem />
      </SettingSection>
      <SettingFooter />
    </ScreenLayout>
  );
}
