import { defaultNS, LanguageCode, resources } from "@/src/lib/i18n/locales";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18next, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";

const LANGUAGE_KEY = "user-language";
const DEFAULT_LANGUAGE: LanguageCode = "en";

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (storedLanguage && storedLanguage in resources) return storedLanguage;
      const deviceLang = getLocales()[0]?.languageCode as
        | LanguageCode
        | undefined;
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
    debug: __DEV__,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    defaultNS,
    resources,
    react: {
      useSuspense: false,
    },
  });

export default i18next;
