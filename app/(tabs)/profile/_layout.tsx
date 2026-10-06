import { colors } from "@/src/lib/colors";
import TopTabs from "expo-router/js-top-tabs";
import { View } from "react-native";

const PROFILE_TABS = [
  { name: "index", title: "APERÇU" },
  { name: "statistics", title: "STATS" },
];

export default function ProfileLayout() {
  return (
    <View className="flex-1 bg-background">
      <TopTabs
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.background },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarIndicatorStyle: { backgroundColor: colors.primary },
          tabBarLabelStyle: { fontWeight: "bold" as const },
        }}
      >
        {PROFILE_TABS.map((tab) => (
          <TopTabs.Screen
            key={tab.name}
            name={tab.name}
            options={{ title: tab.title }}
          />
        ))}
      </TopTabs>
    </View>
  );
}
