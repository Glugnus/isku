import BaseModal from "@/src/components/ui/modal";
import SettingItem from "@/src/features/settings/components/setting-item";
import { colors } from "@/src/lib/colors";
import { LanguageCode, supportedLanguages } from "@/src/lib/i18n/locales";
import { Check, Globe } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

export default function LanguageSettingItem() {
  const { i18n, t } = useTranslation("settings");
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectLanguage = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    setIsVisible(false);
  };
  return (
    <>
      <SettingItem
        leftIcon={<Globe size={18} color={colors.primary} />}
        onPress={() => setIsVisible(true)}
        title={t("language.label")}
        value={supportedLanguages[i18n.language as LanguageCode]}
      />
      <BaseModal visible={isVisible} onClose={() => setIsVisible(false)}>
        <Text className="text-white text-xl font-oswald uppercase text-center tracking-widest mb-6">
          {t("language.modalTitle")}
        </Text>

        <View className="gap-2">
          {(Object.entries(supportedLanguages) as [LanguageCode, string][]).map(
            ([code, label]) => {
              const isSelected = code === i18n.language;
              return (
                <Pressable
                  key={code}
                  onPress={() => handleSelectLanguage(code)}
                  className={`flex-row items-center justify-between p-4 rounded-xl border ${
                    isSelected
                      ? "bg-primary/10 border-primary"
                      : "bg-surface border-muted/20 active:bg-muted/10"
                  }`}
                >
                  <Text
                    className={`font-medium ${isSelected ? "text-primary" : "text-white"}`}
                  >
                    {label}
                  </Text>
                  {isSelected && <Check size={18} color={colors.primary} />}
                </Pressable>
              );
            },
          )}
        </View>
      </BaseModal>
    </>
  );
}
