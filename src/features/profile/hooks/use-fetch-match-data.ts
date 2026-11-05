import { getProfileMatchData } from "@/src/features/profile/api/profile-api";
import { ProfileMatchData } from "@/src/features/profile/types/profiles-types";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const useFetchMatchData = (profileId?: string) => {
  const { t } = useTranslation("profile");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchesData, setMatchesData] = useState<ProfileMatchData | null>(null);

  const fetchMatchData = useCallback(async () => {
    if (profileId) {
      setIsFetching(true);
      try {
        const matchData = await getProfileMatchData(profileId);
        setMatchesData(matchData);
      } catch (err) {
        setError(t("errors.fetchMatchData"));
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    }
  }, [profileId, t]);

  useFocusEffect(
    useCallback(() => {
      fetchMatchData();
    }, [fetchMatchData]),
  );

  return {
    isFetching,
    error,
    matchesData,
    refetch: fetchMatchData,
  };
};
