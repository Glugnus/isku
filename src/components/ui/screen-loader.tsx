import { colors } from "@/src/lib/colors";
import { ActivityIndicator, View } from "react-native";

export default function ScreenLoader({
  size = "large",
  color = colors.primary,
}: {
  size?: "small" | "large";
  color?: string;
}) {
  return (
    <View className="flex-1 items-center justify-center py-20">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
