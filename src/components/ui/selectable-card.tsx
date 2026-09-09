import { Pressable, Text } from "react-native";

export interface SelectableCardProps {
  title: string | number;
  subtitle?: string;
  isSelected: boolean;
  titleClassName?: string;
  onPress?: () => void;
}

export default function SelectableCard({
  title,
  subtitle,
  isSelected,
  titleClassName,
  onPress,
}: SelectableCardProps) {
  return (
    <Pressable
      className={`flex-1 active:opacity-70 w-full py-3 rounded-xl items-center  justify-center border-2 ${isSelected ? "border-neutral bg-neutral/20" : "border-transparent"}`}
      onPress={onPress}
    >
      <Text
        className={`font-oswald text-2xl ${isSelected ? "text-neutral" : "text-muted"} ${titleClassName}`}
      >
        {title}
      </Text>
      {subtitle && (
        <Text className="text-[10px] text-muted mt-1 text-center">
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
}
