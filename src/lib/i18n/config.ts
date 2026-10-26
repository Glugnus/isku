import { getLocales } from "expo-localization";
import i18next, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/src/lib/i18n/locales/en.json";
import fr from "@/src/lib/i18n/locales/fr.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGE_KEY = "user-language";

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: async () => {
    try {
      const storagedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (storagedLanguage) return storagedLanguage;
      else return getLocales()[0]?.languageCode ?? "fr";
    } catch (err) {
      console.error(err);
      return getLocales()[0]?.languageCode ?? "fr";
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    await AsyncStorage.setItem(LANGUAGE_KEY, lng);
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    defaultNS: "common",
    resources: {
      en,
      fr,
    },
  });

export default i18next;
