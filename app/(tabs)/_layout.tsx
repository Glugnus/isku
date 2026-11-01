import { TextLogo } from "@/src/components/ui/text-logo";
import { colors } from "@/src/lib/colors";
import { Tabs } from "expo-router";
import { History, Home, User } from "lucide-react-native";
import { useTranslation } from "react-i18next";

const APP_TABS = [
  { name: "index", labelKey: "navigation.new", Icon: Home },
  {
    name: "matches",
    labelKey: "navigation.matches",
    Icon: History,
  },
  { name: "profile", labelKey: "navigation.profile", Icon: User },
] as const;

const headerTitle = () => <TextLogo width={200} height={38} />;

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerTitle,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.surface,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
      }}
    >
      {APP_TABS.map(({ name, labelKey, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarLabel: t(labelKey),
            tabBarIcon: ({ color, size }) => <Icon color={color} size={size} />,
          }}
        />
      ))}
    </Tabs>
  );
}
