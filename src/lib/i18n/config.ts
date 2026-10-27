import { getLocales } from "expo-localization";
import i18next, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/src/lib/i18n/locales/en.json";
import fr from "@/src/lib/i18n/locales/fr.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGE_KEY = "user-language";
const DEFAULT_LANGUAGE = "en";
const resources = {
  en,
  fr,
};

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (storedLanguage) return storedLanguage;
      const deviceLang = getLocales()[0]?.languageCode;
      return deviceLang && deviceLang in resources
        ? deviceLang
        : DEFAULT_LANGUAGE;
    } catch (err) {
      console.error("Failed to detect language", err);
      return DEFAULT_LANGUAGE;
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    } catch (err) {
      console.error("Failed to cache user language", err);
    }
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: "common",
    resources,
    react: {
      useSuspense: false,
    },
  });

export default i18next;
