import ScreenLayout from "@/src/components/ui/screen-layout";
import ScreenLoader from "@/src/components/ui/screen-loader";
import { useFetchMatchDetails } from "@/src/features/match/hooks/use-fetch-match-details";
import StoriesHeader from "@/src/features/stories/components/stories-header";
import StoryCanvas from "@/src/features/stories/components/story-canvas";
import StoryTemplateSelector from "@/src/features/stories/components/story-template-selector";
import { useShareStory } from "@/src/features/stories/hooks/use-share-story";
import HighlightStoryTemplate from "@/src/features/stories/templates/highlight-story";
import MatchDayStoryTemplate from "@/src/features/stories/templates/match-day-story";
import ScoreCardStoryTemplate from "@/src/features/stories/templates/scorecard-story";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Text } from "react-native";
import ViewShot, { ViewShotRef } from "react-native-view-shot";

export default function StoriesScreen() {
  type StoryTemplateType = "scorecard" | "highlight";
  const [selectedTemplate, setSelectedTemplate] =
    useState<StoryTemplateType>("scorecard");

  const { id: matchId } = useLocalSearchParams<{ id: string }>();
  const { isFetching, error, match, teams } = useFetchMatchDetails(matchId);
  const viewShotRef = useRef<ViewShotRef>(null);
  const { shareStory } = useShareStory(viewShotRef);

  if (isFetching)
    return (
      <ScreenLayout>
        <ScreenLoader />
      </ScreenLayout>
    );
  if (error || !match)
    return (
      <ScreenLayout>
        <Text className="text-danger text-xs text-center">{error}</Text>
      </ScreenLayout>
    );

  return (
    <ScreenLayout>
      <StoriesHeader shareStory={shareStory} />
      {match.status !== "planned" && (
        <StoryTemplateSelector
          selectedTemplate={selectedTemplate}
          onSelect={setSelectedTemplate}
        />
      )}

      <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.95 }}>
        <StoryCanvas>
          {match.status === "planned" ? (
            <MatchDayStoryTemplate match={match} teams={teams} />
          ) : selectedTemplate === "scorecard" ? (
            <ScoreCardStoryTemplate match={match} teams={teams} />
          ) : (
            <HighlightStoryTemplate match={match} teams={teams} />
          )}
        </StoryCanvas>
      </ViewShot>
    </ScreenLayout>
  );
}
