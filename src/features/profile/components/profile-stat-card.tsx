import { ReactNode } from "react";
import { Text, View } from "react-native";

export default function ProfileStatCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <View className="bg-surface rounded-2xl border border-muted/20 p-6 mb-4">
      <View className="flex-row items-center mb-6">
        <View className="mr-3">{icon}</View>
        <Text className="text-xl font-oswald text-white uppercase">
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}
