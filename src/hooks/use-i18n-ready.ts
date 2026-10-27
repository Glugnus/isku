import i18n from "@/src/lib/i18n/config";
import { useEffect, useState } from "react";

export const useI18nReady = () => {
  const [isReady, setIsReady] = useState(i18n.isInitialized);

  useEffect(() => {
    const handleInitialized = () => setIsReady(true);
    if (i18n.isInitialized) {
      handleInitialized();
      return;
    }
    i18n.on("initialized", handleInitialized);
    return () => {
      i18n.off("initialized", handleInitialized);
    };
  }, []);

  return isReady;
};
