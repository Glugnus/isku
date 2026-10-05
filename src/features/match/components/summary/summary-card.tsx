import { MatchSet, PlayerKey } from "@/src/features/match/types/match.types";
import { colors } from "@/src/lib/colors";
import { Trophy } from "lucide-react-native";
import { Text, View } from "react-native";

export default function SummaryCard({
  sets,
  profileIsWinner,
  p1SetsWon,
  p2SetsWon,
  profilePosition,
}: {
  sets: MatchSet[];
  profileIsWinner: boolean;
  p1SetsWon: number;
  p2SetsWon: number;
  profilePosition: PlayerKey;
}) {
  return (
    <View
      className={`w-full bg-surface p-8 rounded-3xl border-[3px] items-center mb-8 ${
        profilePosition === "p1" ? "border-primary" : "border-secondary"
      }`}
    >
      <Trophy
        size={64}
        className="mb-6"
        color={profilePosition === "p1" ? colors.primary : colors.secondary}
      />
      <Text className="text-muted text-xs font-bold uppercase tracking-widest mb-2">
        Résultat
      </Text>
      <Text
        className={`text-3xl font-oswald uppercase tracking-widest text-center mb-6 ${
          profilePosition === "p1" ? "text-primary" : "text-secondary"
        }`}
      >
        {profileIsWinner ? "Victoire" : "Défaite"}
      </Text>
      <View className="bg-background px-8 py-4 rounded-2xl border border-muted/20 flex-row items-center gap-x-3">
        <Text className={`text-5xl font-oswald tracking-widest text-primary`}>
          {p1SetsWon}
        </Text>
        <Text className="text-muted text-3xl font-oswald">-</Text>
        <Text className={`text-5xl font-oswald tracking-widest text-secondary`}>
          {p2SetsWon}
        </Text>
      </View>
      {sets?.length > 0 && (
        <View className="mt-6 items-center w-full">
          <Text className="text-muted text-xs font-bold uppercase tracking-widest mb-3">
            Détail des Sets
          </Text>
          <View className="flex-row flex-wrap justify-center items-center gap-2">
            {sets.map((s) => (
              <SummarySetBadge key={s.setNumber} set={s} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const SummarySetBadge = ({ set }: { set: MatchSet }) => {
  const isP1Winner = set.p1SetScore > set.p2SetScore;
  return (
    <View className="bg-background px-4 py-2.5 rounded-xl border border-muted/30 items-center justify-center min-w-[75px]">
      <Text className="text-muted text-[10px] font-bold uppercase tracking-widest mb-1">
        Set {set.setNumber}
      </Text>
      <View className="flex-row items-center gap-x-2">
        <Text
          className={`text-xl font-oswald ${isP1Winner ? "text-primary" : "text-primary/50"}`}
        >
          {set.p1SetScore}
        </Text>
        <Text className="text-muted text-base font-oswald">-</Text>
        <Text
          className={`text-xl font-oswald ${!isP1Winner ? "text-secondary" : "text-secondary/50"}`}
        >
          {set.p2SetScore}
        </Text>
      </View>
    </View>
  );
};
