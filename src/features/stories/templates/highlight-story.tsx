import { useStats } from "@/src/features/match/hooks/use-stats";
import {
  MatchDetails,
  MatchTeams,
} from "@/src/features/match/types/match.types";
import { adaptMatchDetails } from "@/src/features/match/utils/adapt-match-details";
import StoryQuickStats from "@/src/features/stories/components/story-quick-stats";
import StoryScoreBanner from "@/src/features/stories/components/story-score-banner";
import StoryScoresSets from "@/src/features/stories/components/story-scores-sets";
import StoryTemplateFooter from "@/src/features/stories/components/story-template-footer";
import StoryTemplateHeader from "@/src/features/stories/components/story-template-header";
import StoryUmpireStats from "@/src/features/stories/components/story-umpire-stats";
import { View } from "react-native";

interface HighlightStoryTemplateProps {
  match: MatchDetails;
  teams: MatchTeams | null;
}

export default function HighlightStoryTemplate({
  match,
  teams,
}: HighlightStoryTemplateProps) {
  const { sets, points } = adaptMatchDetails(match.match_sets);
  const profilePosition = teams?.currentProfilePosition;

  const stats = useStats("Match", { points, teams, sets });
  const oppPosition = stats.profilePosition === "p1" ? "p2" : "p1";

  const hasWon =
    stats.setsWon[stats.profilePosition] > stats.setsWon[oppPosition];

  return (
    <View className="flex-1 justify-between py-4 mt-8">
      <StoryTemplateHeader
        headerText={hasWon ? "★ Grosse Perf !" : "Combat Épique"}
        variant={hasWon ? "primary" : "secondary"}
        sport={match.sport === "table_tennis" ? "Tennis de Table" : ""}
      />
      <View className="my-auto gap-3">
        <StoryScoreBanner
          p1Name={teams?.team1Name || ""}
          p2Name={teams?.team2Name || ""}
          p1SetsWon={stats.setsWon.p1}
          p2SetsWon={stats.setsWon.p2}
          profilePosition={stats.profilePosition}
          hasWon={hasWon}
        />
        <StoryScoresSets
          sets={match.match_sets}
          isUserP1={profilePosition === "p1"}
          hasWon={hasWon}
        />

        {match.mode === "umpire" && points.length > 0 ? (
          <StoryUmpireStats
            servePointsWinrate={stats.servePercentage[stats.profilePosition]}
            returnPointsWinrate={stats.returnPercentage[stats.profilePosition]}
            winners={stats.winners[stats.profilePosition]}
            errors={stats.unforcedErrors[stats.profilePosition]}
            hasWon={hasWon}
          />
        ) : (
          <StoryQuickStats
            maxMargin={stats.maxLead[stats.profilePosition]}
            myPoints={stats.pointsWon[stats.profilePosition]}
            oppPoints={stats.pointsWon[oppPosition]}
            hasWon={hasWon}
          />
        )}
      </View>
      <StoryTemplateFooter match={match} />
    </View>
  );
}
