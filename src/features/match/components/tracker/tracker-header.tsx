import { Text, View } from "react-native";
import TrackerHeaderPlayer from "./tracker-header-players";

export default function TrackerHeader() {
  return (
    <View>
      <View className="py-3 flex-row items-center justify-between">
        <TrackerHeaderPlayer
          name="JOUEUR 1"
          isServing={true}
          align="left"
          servesLeft={2}
          playerKey="p1"
        />
        <View className="items-center px-4 py-1.5 bg-background rounded-xl border border-muted/30 mx-1">
          <Text className="text-muted text-[8px] font-bold uppercase tracking-widest">
            SET 1
          </Text>
          <Text className="text-white text-lg font-oswald tracking-widest">
            <Text className="text-primary">2</Text> -{" "}
            <Text className="text-secondary">1</Text>
          </Text>
        </View>
        <TrackerHeaderPlayer
          name="JOUEUR 2"
          isServing={true}
          align="right"
          servesLeft={2}
          playerKey="p2"
        />
      </View>
      <View className="flex-row items-center justify-center gap-x-3 pt-2 px-4 bg-background/60 border-t border-muted/20">
        <Text className="text-muted text-[10px] font-bold uppercase tracking-wider">
          Sets précédents :
        </Text>
        <View className="flex-row items-center gap-x-2">
          {/* insérer un map sur les set précédents */}
          <View className="bg-surface px-2.5 py-0.5 rounded-md border border-muted/30 flex-row items-center gap-x-1">
            <Text className="text-muted text-[9px] font-bold">S1</Text>
            <Text className="text-primary text-xs font-oswald">11</Text>
            <Text className="text-muted text-[10px]">-</Text>
            <Text className="text-secondary text-xs font-oswald">5</Text>
          </View>
          <View className="bg-surface px-2.5 py-0.5 rounded-md border border-muted/30 flex-row items-center gap-x-1">
            <Text className="text-muted text-[9px] font-bold">S2</Text>
            <Text className="text-primary text-xs font-oswald">11</Text>
            <Text className="text-muted text-[10px]">-</Text>
            <Text className="text-secondary text-xs font-oswald">5</Text>
          </View>
          <View className="bg-surface px-2.5 py-0.5 rounded-md border border-muted/30 flex-row items-center gap-x-1">
            <Text className="text-muted text-[9px] font-bold">S3</Text>
            <Text className="text-primary text-xs font-oswald">11</Text>
            <Text className="text-muted text-[10px]">-</Text>
            <Text className="text-secondary text-xs font-oswald">5</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
