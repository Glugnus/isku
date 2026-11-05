import { Text, View } from "react-native";

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function SettingSection({
  title,
  children,
}: SettingSectionProps) {
  return (
    <View className="mb-6">
      <Text className="text-xs font-oswald text-muted uppercase tracking-widest mb-3 ml-1">
        {title}
      </Text>
      <View className="bg-surface rounded-2xl border border-muted/20 px-4 py-1 divide-y divide-muted/10">
        {children}
      </View>
    </View>
  );
}
