import {
  MatchDetails,
  MatchTeams,
} from "@/src/features/match/types/match.types";
import {
  calculateMatchScore,
  getMatchWinner,
} from "@/src/features/match/utils/score-calculator";
import StoryPlayerScoreRow from "@/src/features/stories/components/story-player-score-row";
import StoryScoresSets from "@/src/features/stories/components/story-scores-sets";
import StoryTemplateFooter from "@/src/features/stories/components/story-template-footer";
import StoryTemplateHeader from "@/src/features/stories/components/story-template-header";
import { View } from "react-native";

interface ScoreCardStoryProps {
  match: MatchDetails;
  teams: MatchTeams | null;
}

export default function ScoreCardStoryTemplate({
  match,
  teams,
}: ScoreCardStoryProps) {
  const { p1SetsWon, p2SetsWon } = calculateMatchScore(match.match_sets);
  const winner = getMatchWinner(p1SetsWon, p2SetsWon, match.format);
  const profilePosition = teams?.currentProfilePosition;
  const hasWon = winner === profilePosition;

  return (
    <View className="flex-1 justify-between py-4 mt-8">
      <StoryTemplateHeader
        headerText={hasWon ? "Victoire" : "Défaite"}
        variant={hasWon ? "primary" : "secondary"}
        sport={match.sport === "table_tennis" ? "Tennis de Table" : ""}
      />
      <View className="my-auto gap-5">
        <StoryPlayerScoreRow
          playerName={teams?.team1Name || "Joueur 1"}
          setsWon={p1SetsWon}
          isMe={profilePosition === "p1"}
          hasWon={hasWon}
        />
        <StoryPlayerScoreRow
          playerName={teams?.team2Name || "Joueur 2"}
          setsWon={p2SetsWon}
          isMe={profilePosition === "p2"}
          hasWon={hasWon}
        />
        <StoryScoresSets
          sets={match.match_sets}
          isUserP1={profilePosition === "p1"}
          hasWon={hasWon}
        />
      </View>

      <StoryTemplateFooter match={match} />
    </View>
  );
}
