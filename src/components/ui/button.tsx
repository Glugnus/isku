import { colors } from "@/src/lib/colors";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  variant?:
    "primary" | "secondary" | "neutral" | "surface" | "danger" | "ghost";
  disabled?: boolean;
}

const BUTTON_VARIANTS = {
  primary: {
    container: "bg-primary shadow-2xl shadow-primary",
    text: "text-background",
    iconColor: colors.background,
  },
  secondary: {
    container: "bg-secondary shadow-2xl shadow-secondary",
    text: "text-white",
    iconColor: "white",
  },
  neutral: {
    container: "bg-neutral",
    text: "text-white",
    iconColor: "white",
  },
  surface: {
    container: "bg-surface",
    text: "text-white",
    iconColor: "white",
  },
  danger: {
    container: "bg-danger/10 border border-danger/30",
    text: "text-danger",
    iconColor: colors.danger,
  },
  ghost: {
    container: "bg-transparent border border-muted/30",
    text: "text-textBase",
    iconColor: colors.muted,
  },
};

export default function Button({
  title,
  isLoading = false,
  variant = "primary",
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`py-5 flex-row justify-center items-center ${BUTTON_VARIANTS[variant].container} rounded-2xl gap-x-3 ${isLoading || disabled ? "opacity-70" : ""} `}
      disabled={isLoading || disabled}
      activeOpacity={0.7}
      {...props}
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
