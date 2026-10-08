import {
  MatchDetails,
  MatchTeams,
} from "@/src/features/match/types/match.types";
import StoryTemplateFooter from "@/src/features/stories/components/story-template-footer";
import StoryTemplateHeader from "@/src/features/stories/components/story-template-header";
import { Text, View } from "react-native";

interface MatchDayStoryProps {
  teams: MatchTeams | null;
  match: MatchDetails;
}

export default function MatchDayStoryTemplate({
  teams,
  match,
}: MatchDayStoryProps) {
  return (
    <View className="flex-1 justify-between py-4 mt-8">
      <StoryTemplateHeader
        headerText="Prochain Match"
        sport={match.sport === "table_tennis" ? "Tennis de Table" : ""}
      />
      <View className="my-auto gap-4">
        <View className="self-start pl-4 border-l-4 border-primary">
          <Text
            numberOfLines={1}
            className="text-white font-oswald text-4xl uppercase tracking-wider max-w-[260px]"
          >
            {teams?.team1Name || "Joueur 1"}
          </Text>
        </View>
        <View className="items-center my-2">
          <Text className="text-primary font-orbitron text-3xl italic tracking-widest">
            VS
          </Text>
        </View>
        <View className="self-end pr-4 border-r-4 border-secondary items-end">
          <Text
            numberOfLines={1}
            className="text-white font-oswald text-4xl uppercase tracking-wider text-right max-w-[260px]"
          >
            {teams?.team2Name || "Joueur 2"}
          </Text>
        </View>
      </View>
      <StoryTemplateFooter match={match} />
    </View>
  );
}
