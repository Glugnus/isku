import ScreenLayout from "@/src/components/ui/screen-layout";
import StatsTabContent from "@/src/features/match/components/stats/stats-tab-content";
import { View } from "react-native";

export default function StatsScreen() {
  return (
    <ScreenLayout>
      <View>
        <StatsTabContent mode="umpire" p1Name="Perne" p2Name="Alex" />
      </View>
    </ScreenLayout>
  );
}
