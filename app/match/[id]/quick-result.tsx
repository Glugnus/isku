import ScreenLayout from "@/src/components/ui/screen-layout";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function QuickResultScreen() {
  const { id: matchId } = useLocalSearchParams<{
    id: string;
  }>();

  return (
    <ScreenLayout>
      <View className="flex-row items-end justify-between mb-6 mt-0">
        <View>
          <Text className="text-sm font-bold text-primary uppercase tracking-wider mb-1">
            Résultat Rapide
          </Text>
          <Text className="text-2xl text-white font-oswald uppercase tracking-widest">
            Score Final
          </Text>
        </View>
        <View>
          <Text className="font-oswald text-5xl text-white">11 - 6</Text>
        </View>
      </View>
    </ScreenLayout>
  );
}
