import { StatsTab } from "@/src/features/match/types/match.types";
import { useEffect, useRef } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface StatsTabSelectorProps {
  tabs: StatsTab[];
  selectedTabKey: string;
  onTabChange: (tab: StatsTab) => void;
}

export const StatsTabSelector = ({
  tabs,
  selectedTabKey,
  onTabChange,
}: StatsTabSelectorProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.key === selectedTabKey);
    if (index !== -1) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index,
        viewPosition: 0.5,
      });
    }
  }, [selectedTabKey, tabs]);

  return (
    <View className="mb-4">
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4"
        onScrollToIndexFailed={() => {}}
        data={tabs}
        keyExtractor={(tab) => tab.key}
        renderItem={({ item: tab }) => {
          const isSelected = selectedTabKey === tab.key;
          return (
            <Pressable
              key={tab.key}
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
                {tab.label}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};
