import { colors } from "@/src/lib/colors";
import { Play, Share2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface MatchListCardProps {
  match: any;
  section: any;
}

export default function MatchListCard({ match, section }: MatchListCardProps) {
  return (
    <Pressable className="flex-row p-4 mb-3 justify-between items-center bg-surface rounded-2xl border border-background/20">
      <View className="flex-1 mr-4">
        <Text className="text-white font-bold mb-1">Team 1 vs Team 2</Text>
        <Text className="text-muted text-xs capitalize">
          Tennis de table • {""}
          {section.status === "planned" ? "Préparé" : "Terminé"}
        </Text>
      </View>
      <View className="flex-row items-center">
        {section.status === "planned" && (
          <Text className="text-muted text-xs mr-4 font-medium">
            {match.mode === "quick" ? "Mode rapide" : "Mode arbitre"}
          </Text>
        )}
        <Pressable className="bg-background border border-background/30 p-2.5 rounded-xl items-center mr-3 justify-center active:opacity-70">
          <Share2 color={colors.muted} size={18} />
        </Pressable>
        {section.status === "planned" ? (
          <Pressable className="bg-primary p-2.5 rounded-xl items-center justify-center active:opacity-80">
            <Play color={colors.white} size={18} />
          </Pressable>
        ) : (
          <Text className="font-oswald text-lg text-primary">2 - 1</Text>
        )}
      </View>
    </Pressable>
  );
}
