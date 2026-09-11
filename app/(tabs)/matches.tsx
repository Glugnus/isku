import ScreenLayout from "@/src/components/ui/screen-layout";
import MatchListCard from "@/src/features/match/components/matches/match-list-card";
import MatchesEmptyState from "@/src/features/match/components/matches/matches-empty-state";
import MatchesHeader from "@/src/features/match/components/matches/matches-header";
import { useMatchesList } from "@/src/features/match/hooks/use-matches-list";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { SectionList } from "react-native";

export default function MatchesScreen() {
  const { sections, getMatches, isLoading, error } = useMatchesList();
  useFocusEffect(
    useCallback(() => {
      getMatches();
    }, [getMatches]),
  );

  return (
    <ScreenLayout edges={["left", "right"]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={getMatches}
        renderSectionHeader={({ section }) => (
          <MatchesHeader
            title={section.title}
            isPrepared={section.isPrepared}
          />
        )}
        renderItem={({ item }) => {
          return <MatchListCard match={item} />;
        }}
        ListEmptyComponent={
          isLoading ? null : <MatchesEmptyState error={error ?? undefined} />
        }
      />
    </ScreenLayout>
  );
}
