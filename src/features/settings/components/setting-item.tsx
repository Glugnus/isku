import { colors } from "@/src/lib/colors";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface SettingItemProps {
  leftIcon: React.ReactNode;
  onPress: () => void;
  title: string;
  value?: string;
  showChevron?: boolean;
}

export default function SettingItem({
  leftIcon,
  onPress,
  title,
  value,
  showChevron = true,
}: SettingItemProps) {
  return (
    <Pressable
      className="flex-row items-center justify-between py-3.5 active:opacity-70"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <View className="size-9 rounded-xl bg-primary/10 items-center justify-center mr-3">
          {leftIcon}
        </View>
        <Text className="text-white font-medium text-base">{title}</Text>
      </View>
      <View className="flex-row items-center gap-1">
        {value && <Text className="text-muted text-sm">{value}</Text>}
        {showChevron && <ChevronRight size={18} color={colors.muted} />}
      </View>
    </Pressable>
  );
}
