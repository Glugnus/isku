import { MatchDetails } from "@/src/features/match/types/match.types";
import { Text, View } from "react-native";

interface StoryScoresSetsProps {
  sets: MatchDetails["match_sets"];
  isUserP1: boolean;
  hasWon: boolean;
}

export default function StoryScoresSets({
  sets,
  isUserP1,
  hasWon,
}: StoryScoresSetsProps) {
  const profileColor = hasWon ? "text-primary" : "text-secondary";

  return (
    <View className="flex-row flex-wrap justify-center gap-2 my-2">
      {sets.map((set, idx) => {
        const mySetScore = isUserP1 ? set.score_team_1 : set.score_team_2;
        const oppSetScore = isUserP1 ? set.score_team_2 : set.score_team_1;
        const iWonThisSet = mySetScore > oppSetScore;
        return (
          <View
            key={idx}
            className={`px-3 py-1.5 rounded-xl items-center border ${
              iWonThisSet
                ? hasWon
                  ? "bg-surface border-primary/40"
                  : "bg-surface border-secondary/40"
                : "bg-surface/60 border-white/10"
            }`}
          >
            <Text className="text-muted text-[9px] font-bold tracking-wider uppercase mb-0.5">
              Set {set.set_number}
            </Text>
            <View className="flex-row items-center gap-1">
              <Text
                className={`font-oswald text-sm ${isUserP1 ? profileColor : "text-muted"}`}
              >
                {set.score_team_1}
              </Text>
              <Text className="text-muted text-xs">-</Text>
              <Text
                className={`font-oswald text-sm ${!isUserP1 ? profileColor : "text-muted"}`}
              >
                {set.score_team_2}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
