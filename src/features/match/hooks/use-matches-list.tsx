import { getAllMatches } from "@/src/features/match/api/matches-api";
import { useCallback, useState } from "react";

interface Section {
  title: string;
  data: MatchListItem[];
  isPrepared: boolean;
}

export type MatchListItem = NonNullable<
  Awaited<ReturnType<typeof getAllMatches>>
>[number];

export const useMatchesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);

  const getMatches = useCallback(async () => {
    setError(null);
    try {
      setIsLoading(true);
      const matches = await getAllMatches();
      const groupedMatches = groupMatchesByStatus(matches);
      setSections(groupedMatches);
      console.log(JSON.stringify(groupedMatches, null, 2));
    } catch (err) {
      if (typeof err === "string") setError(err);
      else if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { sections, getMatches, isLoading, error };
};

function groupMatchesByStatus(matches: MatchListItem[]) {
  const preparedMatches = matches.filter((m) => m.status === "planned");
  const completedMatches = matches.filter((m) => m.status !== "planned");
  const groupedMatches = [];
  preparedMatches.length > 0 &&
    groupedMatches.push({
      title: "Matchs préparés",
      data: preparedMatches,
      isPrepared: true,
    });
  completedMatches.length > 0 &&
    groupedMatches.push({
      title: "Matchs terminés",
      data: completedMatches,
      isPrepared: false,
    });

  return groupedMatches;
}
