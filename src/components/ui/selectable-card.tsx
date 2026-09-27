import { colors } from "@/src/lib/colors";
import { Pressable, Text } from "react-native";

export interface SelectableCardProps {
  title: string | number;
  subtitle?: string;
  isSelected: boolean;
  titleClassName?: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "neutral" | "surface" | "danger";
}

const CARD_VARIANTS = {
  primary: {
    container: "bg-primary/20 border-primary",
    text: "text-primary",
    iconColor: colors.primary,
  },
  secondary: {
    container: "bg-secondary/20 border-secondary",
    text: "text-secondary",
    iconColor: colors.secondary,
  },
  neutral: {
    container: "border-neutral bg-neutral/20",
    text: "text-neutral",
    iconColor: colors.neutral,
  },
  surface: {
    container: "bg-surface/20 border-surface",
    text: "text-surface",
    iconColor: colors.surface,
  },
  danger: {
    container: "bg-danger/20 border-danger",
    text: "text-danger",
    iconColor: colors.danger,
  },
};

export default function SelectableCard({
  title,
  subtitle,
  isSelected,
  titleClassName,
  onPress,
  variant = "neutral",
}: SelectableCardProps) {
  return (
    <Pressable
      className={`flex-1 active:opacity-70 w-full py-3 rounded-xl items-center  justify-center border-2 ${isSelected ? CARD_VARIANTS[variant].container : "border-transparent"}`}
      onPress={onPress}
    >
      <Text
        className={`font-oswald text-2xl ${isSelected ? CARD_VARIANTS[variant].text : "text-muted"} ${titleClassName}`}
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
