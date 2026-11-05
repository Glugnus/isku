import { APP_CONFIG } from "@/src/app-config";
import { Text, View } from "react-native";

export default function SettingFooter() {
  return (
    <View className="mt-8 mb-4 items-center">
      <Text className="text-xs text-muted/50 tracking-wider">
        {APP_CONFIG.name} {APP_CONFIG.version}
      </Text>
    </View>
  );
}
