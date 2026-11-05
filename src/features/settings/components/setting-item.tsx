import { colors } from "@/src/lib/colors";
import { ChevronRight } from "lucide-react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

interface SettingItemProps {
  leftIcon: React.ReactNode;
  onPress: () => void;
  title: string;
  value?: string;
  showChevron?: boolean;
  variant?: "default" | "danger";
  isLoading?: boolean;
}

export default function SettingItem({
  leftIcon,
  onPress,
  title,
  value,
  showChevron = true,
  variant = "default",
  isLoading = false,
}: SettingItemProps) {
  return (
    <Pressable
      className="flex-row items-center justify-between py-3.5 active:opacity-70"
      onPress={onPress}
      disabled={isLoading}
    >
      <View className="flex-row items-center">
        <View
          className={`size-9 rounded-xl ${variant === "default" ? "bg-primary/10" : "bg-danger/10"} items-center justify-center mr-3`}
        >
          {leftIcon}
        </View>
        <Text
          className={`font-medium text-base ${variant === "default" ? "text-white" : "text-danger"}`}
        >
          {title}
        </Text>
      </View>
      <View className="flex-row items-center gap-1">
        {value && <Text className="text-muted text-sm">{value}</Text>}
        {showChevron && <ChevronRight size={18} color={colors.muted} />}
        {isLoading && (
          <ActivityIndicator
            color={variant === "danger" ? colors.danger : colors.primary}
          />
        )}
      </View>
    </Pressable>
  );
}
