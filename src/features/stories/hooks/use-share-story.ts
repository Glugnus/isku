import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { incrementStoriesShared } from "@/src/features/stories/api/stories-api";
import * as Sharing from "expo-sharing";
import { RefObject, useState } from "react";
import { useTranslation } from "react-i18next";
import { ViewShotRef } from "react-native-view-shot";

export function useShareStory(viewShotRef: RefObject<ViewShotRef | null>) {
  const { t } = useTranslation("stories");
  const [error, setError] = useState<string | null>(null);
  const { profile, refreshProfile } = useAuthContext();

  const shareStory = async () => {
    try {
      if (viewShotRef.current && viewShotRef.current.capture) {
        const uri = await viewShotRef.current.capture();
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, {
            mimeType: "image/jpeg",
            dialogTitle: t("share.dialogTitle"),
          });
          if (profile?.id) {
            await incrementStoriesShared(profile.id);
            await refreshProfile();
          }
        }
      }
    } catch (err) {
      setError(t("errors.shareStory"));
      console.log(err);
    }
  };

  return { shareStory, error };
}
