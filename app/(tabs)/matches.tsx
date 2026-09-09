import ScreenLayout from "@/src/components/ui/screen-layout";
import MatchListCard from "@/src/features/match/components/matches/match-list-card";
import MatchesEmptyState from "@/src/features/match/components/matches/matches-empty-state";
import MatchesHeader from "@/src/features/match/components/matches/matches-header";
import { MOCK_MATCHES } from "@/src/features/match/constants/mock-matches";
import { SectionList } from "react-native";

export default function MatchesScreen() {
  return (
    <ScreenLayout edges={["left", "right"]}>
      <SectionList
        sections={MOCK_MATCHES}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <MatchesHeader
            title={section.status}
            isPrepared={section.status === "planned"}
          />
        )}
        renderItem={({ item, section }) => {
          return <MatchListCard match={item} section={section} />;
        }}
        ListEmptyComponent={<MatchesEmptyState />}
      />
    </ScreenLayout>
  );
}
