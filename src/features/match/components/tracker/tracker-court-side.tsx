import {
  PlayerKey,
  PointActionType,
} from "@/src/features/match/types/match.types";
import { colors } from "@/src/lib/colors";
import { AlertCircle, Plus, Zap } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface TrackerCourtSideProps {
  playerKey: PlayerKey;
  score: number;
  currentServer: PlayerKey;
  servesLeft: number;
  onScorePoint: (action?: PointActionType) => void;
}

export default function TrackerCourtSide({
  playerKey,
  score,
  currentServer,
  servesLeft,
  onScorePoint,
}: TrackerCourtSideProps) {
  const THEME = {
    p1: {
      sideContainer: "bg-primary/5 rounded-l-2xl border-r pr-2",
      badge: "bg-primary/20 border-primary/60 text-primary",
      scoreText: "text-primary",
      btnPrimary: "bg-primary",
      actionBtn: "bg-primary/20 border-primary text-primary",
      iconColor: colors.primary,
    },
    p2: {
      sideContainer: "bg-secondary/5 rounded-r-2xl border-l pl-2",
      badge: "bg-secondary/20 border-secondary/60 text-secondary",
      scoreText: "text-secondary",
      btnPrimary: "bg-secondary",
      actionBtn: "bg-secondary/20 border-secondary text-secondary",
      iconColor: colors.secondary,
    },
  };

  return (
    <View
      className={`flex-1 justify-between items-center py-4 ${THEME[playerKey].sideContainer} border-white/20`}
    >
      <View className="h-7 justify-center">
        <View
          className={`flex-row items-center border px-3 py-1 rounded-full gap-x-1.5 ${THEME[playerKey].badge}`}
        >
          <Text
            className={`text-[10px] font-bold uppercase tracking-wider mr-1 ${THEME[playerKey].scoreText}`}
          >
            {currentServer === playerKey ? "Service" : "Réception"}
          </Text>
          {currentServer === playerKey &&
            Array.from({ length: servesLeft }).map((_, index) => (
              <View
                key={index}
                className="size-3.5 rounded-full bg-white border-white"
              />
            ))}
        </View>
      </View>
      <Pressable
        className="items-center justify-center my-2 w-full py-2 rounded-2xl active:opacity-80"
        onPress={() => onScorePoint()}
      >
        <Text
          className={`${THEME[playerKey].scoreText} font-oswald text-7xl md:text-8xl tracking-tighter`}
        >
          {score}
        </Text>
        <View
          className={`px-8 py-3 rounded-full flex-row items-center mt-2 border-2 border-white/20 ${THEME[playerKey].btnPrimary}`}
        >
          <Plus size={20} color={colors.white} strokeWidth={3} />
          <Text className="text-white text-sm font-oswald tracking-widest uppercase ml-2">
            Point +1
          </Text>
        </View>
      </Pressable>
      <View className="w-full px-1">
        <Pressable
          className={`${THEME[playerKey].actionBtn} border-2 py-3.5 px-3 rounded-2xl flex-row justify-center items-center active:opacity-80`}
          onPress={() => onScorePoint("winner")}
        >
          <Zap size={20} color={THEME[playerKey].iconColor} />
          <Text
            className={`${THEME[playerKey].scoreText} text-sm font-oswald uppercase tracking-wider ml-2 text-center`}
            numberOfLines={1}
          >
            Coup Gagnant
          </Text>
        </Pressable>
        <View className="h-4" />
        <Pressable
          className="bg-danger/15 border-2 border-danger py-3.5 px-3 rounded-2xl flex-row justify-center items-center active:bg-danger/30"
          onPress={() => onScorePoint("unforced_error")}
        >
          <AlertCircle size={20} color={colors.danger} />
          <Text
            className="text-danger text-sm font-oswald uppercase tracking-wider ml-2 text-center"
            numberOfLines={1}
          >
            Faute Directe
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
