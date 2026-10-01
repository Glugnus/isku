import ScreenLayout from "@/src/components/ui/screen-layout";
import StatsTabContent from "@/src/features/match/components/stats/stats-tab-content";
import { StatsTabSelector } from "@/src/features/match/components/stats/stats-tab-selector";
import { useStatsTabSelector } from "@/src/features/match/hooks/use-stats-tab-selector";
import { colors } from "@/src/lib/colors";
import { router } from "expo-router";
import { BarChart2, ChevronLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function StatsScreen() {
  const {
    mode,
    tabs,
    onTabChange,
    selectedTab,
    pagerRef,
    initialPage,
    onPageSelected,
  } = useStatsTabSelector();

  return (
    <ScreenLayout>
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-4 min-h-[44px]">
          <View className="flex-1 items-start">
            <Pressable
              className="p-2 -ml-2 rounded-full active:bg-surface"
              onPress={() => router.back()}
            >
              <ChevronLeft color={colors.white} size={28} />
            </Pressable>
          </View>
          <View className="flex-[2] flex-row items-center justify-center">
            <View className="mr-2">
              <BarChart2 size={24} color={colors.primary} />
            </View>
            <Text
              className="text-white text-xl font-oswald uppercase tracking-widest text-center"
              numberOfLines={1}
            >
              Statistiques
            </Text>
          </View>
          <View className="flex-1" />
        </View>
        {mode === "umpire" && (
          <StatsTabSelector
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={onTabChange}
          />
        )}
        <PagerView
          ref={pagerRef}
          onPageSelected={onPageSelected}
          style={{ flex: 1 }}
          initialPage={initialPage}
        >
          {tabs.map((tab) => (
            <View key={tab} className="flex-1">
              <StatsTabContent tab={tab} mode={mode!} />
            </View>
          ))}
        </PagerView>
      </View>
    </ScreenLayout>
  );
}
