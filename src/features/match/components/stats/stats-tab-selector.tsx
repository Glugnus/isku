import { useEffect, useRef } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface StatsTabSelectorProps {
  tabs: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

export const StatsTabSelector = ({
  tabs,
  selectedTab,
  onTabChange,
}: StatsTabSelectorProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const index = tabs.indexOf(selectedTab);
    if (index !== -1) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index,
        viewPosition: 0.5,
      });
    }
  }, [selectedTab, tabs]);

  return (
    <View className="mb-4">
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4"
        onScrollToIndexFailed={() => {}}
        data={tabs}
        keyExtractor={(tab) => tab}
        renderItem={({ item: tab }) => {
          const isSelected = selectedTab === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => onTabChange(tab)}
              className={`px-4 py-2 rounded-full mr-2 border active:opacity-70 ${
                isSelected
                  ? "border-primary bg-primary/20"
                  : "border-muted/30 bg-surface"
              }`}
            >
              <Text
                className={`font-oswald uppercase tracking-wider text-xs ${
                  isSelected ? "text-primary" : "text-muted"
                }`}
              >
                {tab}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};
