import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { getAllMatches } from "@/src/features/match/api/matches-api";
import { TFunction } from "i18next";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface Section {
  title: string;
  data: MatchListItem[];
  isPrepared: boolean;
}

export type MatchListItem = NonNullable<
  Awaited<ReturnType<typeof getAllMatches>>
>[number];

export const useMatchesList = () => {
  const { t } = useTranslation("match");
  const { profile } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);

  const profileId = profile?.id;

  const getMatches = useCallback(async () => {
    if (profileId) {
      setError(null);
      try {
        setIsLoading(true);
        const matches = await getAllMatches(profileId);
        const groupedMatches = groupMatchesByStatus(matches, t);
        setSections(groupedMatches);
      } catch (err) {
        if (typeof err === "string") setError(err);
        else if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [profileId, t]);
  return { sections, getMatches, isLoading, error };
};

function groupMatchesByStatus(matches: MatchListItem[], t: TFunction<"match">) {
  const preparedMatches = matches.filter((m) => m.status === "planned");
  const completedMatches = matches.filter((m) => m.status !== "planned");
  const groupedMatches = [];
  preparedMatches.length > 0 &&
    groupedMatches.push({
      title: t("matches.sections.planned"),
      data: preparedMatches,
      isPrepared: true,
    });
  completedMatches.length > 0 &&
    groupedMatches.push({
      title: t("matches.sections.completed"),
      data: completedMatches,
      isPrepared: false,
    });

  return groupedMatches;
}
