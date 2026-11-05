import { ProfileStatsProvider } from "@/src/features/profile/providers/profile-stats-provider";
import { colors } from "@/src/lib/colors";
import { TopTabs } from "expo-router/js-top-tabs";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const PROFILE_TABS = [
  { name: "index", titleKey: "tabs.overview" },
  { name: "statistics", titleKey: "tabs.statistics" },
] as const;

export default function ProfileLayout() {
  const { t } = useTranslation("profile");

  return (
    <View className="flex-1 bg-background">
      <ProfileStatsProvider>
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
              options={{ title: t(tab.titleKey) }}
            />
          ))}
        </TopTabs>
      </ProfileStatsProvider>
    </View>
  );
}
