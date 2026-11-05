import { en } from "@/src/lib/i18n/locales/en";
import { fr } from "@/src/lib/i18n/locales/fr";

export const defaultNS = "common" as const;

export const resources = {
  fr,
  en,
} as const;

export type LanguageCode = keyof typeof resources;

export const supportedLanguages: Record<LanguageCode, string> = {
  fr: "Français",
  en: "English",
};
