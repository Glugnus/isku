import { TextLogo } from "@/src/components/ui/text-logo";
import { colors } from "@/src/lib/colors";
import { Tabs } from "expo-router";
import { History, Home, User } from "lucide-react-native";

const APP_TABS = [
  { name: "index", label: "Nouveau", Icon: Home },
  {
    name: "matches",
    label: "Mes Matchs",
    Icon: History,
  },
  { name: "profile", label: "Profil", Icon: User },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitle: () => <TextLogo width={200} height={38} />,
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
      {APP_TABS.map(({ name, label, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarLabel: label,
            tabBarIcon: ({ color, size }) => <Icon color={color} size={size} />,
          }}
        />
      ))}
    </Tabs>
  );
}
