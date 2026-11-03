import BaseModal from "@/src/components/ui/modal";
import { colors } from "@/src/lib/colors";
import { LanguageCode } from "@/src/lib/i18n/locales";
import { Check, ChevronRight, Globe } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

const SUPPORTED_LANGUAGES = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
] as const;

export default function LanguageSettingItem() {
  const { i18n, t } = useTranslation("settings");
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectLanguage = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    setCurrentLanguage(code);
    setIsVisible(false);
  };
  return (
    <>
      {/* A. LIGNE DU RÉGLAGE (DANS LA CARTE SETTINGS) */}
      <Pressable
        className="flex-row items-center justify-between py-3.5 active:opacity-70"
        onPress={() => setIsVisible(true)}
      >
        {/* Côté gauche : Icône + Label */}
        <View className="flex-row items-center">
          <View className="size-9 rounded-xl bg-primary/10 items-center justify-center mr-3">
            <Globe size={18} color={colors.primary} />
          </View>
          <Text className="text-white font-medium text-base">
            {/* t("settings.language") */}
            Langue
          </Text>
        </View>

        {/* Côté droit : Langue active + Flèche */}
        <View className="flex-row items-center gap-1">
          <Text className="text-muted text-sm">{currentLanguage}</Text>
          <ChevronRight size={18} color={colors.muted} />
        </View>
      </Pressable>

      {/* B. MODALE DE SÉLECTION */}
      <BaseModal visible={isVisible} onClose={() => setIsVisible(false)}>
        <Text className="text-white text-xl font-oswald uppercase text-center tracking-widest mb-6">
          Choisir la langue
        </Text>

        {/* Liste des langues */}
        <View className="gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <Pressable
              key={lang.code}
              onPress={() => handleSelectLanguage(lang.code)}
              className={`flex-row items-center justify-between p-4 rounded-xl border ${
                currentLanguage
                  ? "bg-primary/10 border-primary"
                  : "bg-surface border-muted/20 active:bg-muted/10"
              }`}
            >
              <Text
                className={`font-medium ${currentLanguage ? "text-primary" : "text-white"}`}
              >
                {lang.label}
              </Text>
              {currentLanguage && <Check size={18} color={colors.primary} />}
            </Pressable>
          ))}
        </View>
      </BaseModal>
    </>
  );
}
