import { colors } from "@/src/lib/colors";
import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  variant?:
    "primary" | "secondary" | "neutral" | "surface" | "danger" | "ghost";
  disabled?: boolean;
  leftIcon?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const BUTTON_SIZES = {
  padding: {
    sm: "px-4 py-3.5",
    md: "p-3",
    lg: "p-4",
    xl: "p-5",
  },
  text: {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  },
};

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
    container: "bg-surface border border-muted",
    text: "text-muted",
    iconColor: colors.muted,
  },
  danger: {
    container: "bg-danger/10 border border-danger/30",
    text: "text-danger",
    iconColor: colors.danger,
  },
  ghost: {
    container: "bg-background border border-muted/30 shadow-none",
    text: "text-muted",
    iconColor: colors.muted,
  },
};

export default function Button({
  title,
  isLoading = false,
  variant = "primary",
  disabled = false,
  leftIcon,
  size = "xl",
  className,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={`${BUTTON_SIZES.padding[size]} active:opacity-70 flex-row justify-center items-center ${BUTTON_VARIANTS[variant].container} rounded-2xl gap-x-3 ${isLoading || disabled ? "opacity-70" : ""} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={BUTTON_VARIANTS[variant].iconColor}
          size={18}
        />
      ) : (
        leftIcon && leftIcon
      )}
      <Text
        className={`${BUTTON_VARIANTS[variant].text} ${BUTTON_SIZES.text[size]} uppercase font-oswald tracking-widest`}
      >
        {title}
      </Text>
    </Pressable>
  );
}
