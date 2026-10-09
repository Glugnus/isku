import { getProfileMatchData } from "@/src/features/profile/api/profile-api";
import { ProfileMatchData } from "@/src/features/profile/types/profiles-types";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export const useFetchMatchData = (profileId?: string) => {
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
        setError("Erreur lors de la récupération des données des match");
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    }
  }, [profileId]);

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
