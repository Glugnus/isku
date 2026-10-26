import fr from "@/src/lib/i18n/locales/fr.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: typeof fr;
  }
}
