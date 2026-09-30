import ScreenLayout from "@/src/components/ui/screen-layout";
import StatsTabContent from "@/src/features/match/components/stats/stats-tab-content";
import { StatsTabSelector } from "@/src/features/match/components/stats/stats-tab-selector";
import { useRef, useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";

export default function StatsScreen() {
  const tabs = ["Match", "Set 1", "Set 2", "Set 3"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const pagerRef = useRef<PagerView>(null);

  return (
    <ScreenLayout>
      <View className="flex-1">
        {mode === "umpire" && (
          <StatsTabSelector
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={(tab) => {
              const index = tabs.indexOf(tab);
              pagerRef.current?.setPage(index);
              setSelectedTab(tab);
            }}
          />
        )}
        <PagerView
          ref={pagerRef}
          onPageSelected={(e) => setSelectedTab(tabs[e.nativeEvent.position])}
          className="flex-1"
          initialPage={tabs.indexOf(selectedTab)}
        >
          {tabs.map((tab) => (
            <View key={tab} className="flex-1">
              <StatsTabContent
                mode="quick"
                p1Name={"Aurelien"}
                p2Name={"Theo"}
              />
            </View>
          ))}
        </PagerView>
      </View>
    </ScreenLayout>
  );
}
