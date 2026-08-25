import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  isLoading?: boolean;
  variant: "primary" | "secondary" | "neutral" | "surface" | "danger" | "ghost";
}

const BUTTON_VARIANTS = {
  primary: {
    container: "bg-primary",
    text: "text-background",
    iconColor: "text-background",
  },
  secondary: {
    container: "bg-secondary",
    text: "text-white",
    iconColor: "text-white",
  },
  neutral: {
    container: "bg-neutral",
    text: "text-white",
    iconColor: "text-white",
  },
  surface: {
    container: "bg-surface",
    text: "text-white",
    iconColor: "text-white",
  },
  danger: {
    container: "bg-danger/10 border border-danger/30",
    text: "text-danger",
    iconColor: "text-danger",
  },
  ghost: {
    container: "bg-transparent border border-muted/30",
    text: "text-textBase",
    iconColor: "text-muted",
  },
};

export default function Button({
  title,
  isLoading = false,
  variant,
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`py-5 justify-center items-center ${BUTTON_VARIANTS[variant].container} rounded-2xl gap-x-3`}
    >
      {isLoading && (
        <ActivityIndicator
          color={BUTTON_VARIANTS[variant].iconColor}
          size={18}
        />
      )}
      <Text
        className={`${BUTTON_VARIANTS[variant].text} text-xl uppercase font-oswald tracking-widest`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
