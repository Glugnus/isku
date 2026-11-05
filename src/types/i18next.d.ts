import type { defaultNS } from "@/src/lib/i18n/locales";
import type { fr } from "@/src/lib/i18n/locales/fr";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof fr;
  }
}
