import Button from "@/src/components/ui/button";
import ScreenLayout from "@/src/components/ui/screen-layout";
import TossComponent from "@/src/features/match/components/toss/toss-component";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function TossScreen() {
  const { id: matchId } = useLocalSearchParams<{
    id: string;
  }>();

  return (
    <ScreenLayout>
      <View className="mt-12 mb-12 items-center">
        <Text className="font-oswald text-3xl uppercase tracking-widest mb-2 text-center text-primary">
          Avant-match
        </Text>
        <Text className="text-muted text-sm uppercase tracking-wider text-center">
          Définissez le premier serveur
        </Text>
      </View>
      <TossComponent />
      <Button title="Démarrer le match" />
    </ScreenLayout>
  );
}
