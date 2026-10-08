import { ReactNode } from "react";
import { Text, View } from "react-native";

export default function ProfileStatRow({
  icon,
  label,
  value,
  subValue,
  isLast = false,
}: {
  icon?: ReactNode;
  label: string;
  value: string | number | undefined;
  subValue?: string;
  isLast?: boolean;
}) {
  return (
    <View
      className={`flex-row justify-between items-center py-2 ${!isLast ? "border-b border-muted/10" : ""}`}
    >
      <View className="flex-row items-center">
        {icon && (
          <View className="mr-3 w-6 items-center justify-center">{icon}</View>
        )}
        <Text className="text-muted text-base">{label}</Text>
      </View>
      <View className="items-end">
        <Text className="text-white font-oswald text-xl">{value}</Text>
        {subValue && <Text className="text-muted text-xs">{subValue}</Text>}
      </View>
    </View>
  );
}
