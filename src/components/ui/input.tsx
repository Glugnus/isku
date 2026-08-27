import { colors } from "@/src/lib/colors";
import { ReactNode } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  variant?: "primary" | "secondary" | "neutral";
  isRight?: boolean;
  rightIcon?: ReactNode;
  errorMessage?: string;
}

const INPUT_VARIANTS = {
  primary: {
    color: "border-primary/30",
    right: "border-r-[3px] border-primary",
    left: "border-l-[3px] border-primary",
    shadow: "shadow-2xl shadow-primary",
  },
  secondary: {
    color: "border-secondary/30",
    right: "border-r-[3px] border-secondary",
    left: "border-l-[3px] border-secondary",
    shadow: "shadow-2xl shadow-secondary",
  },
  neutral: {
    color: "border-neutral/30",
    right: "border-r-[3px] border-neutral",
    left: "border-l-[3px] border-neutral",
    shadow: "shadow-2xl shadow-neutral",
  },
};

export default function Input({
  label,
  variant = "primary",
  isRight = false,
  rightIcon,
  errorMessage,
  ...props
}: InputProps) {
  return (
    <View
      className={`w-full bg-surface p-6 rounded-2xl ${isRight ? INPUT_VARIANTS[variant].right : INPUT_VARIANTS[variant].left} ${INPUT_VARIANTS[variant].shadow} `}
    >
      {label && (
        <Text className="text-muted text-[10px] uppercase tracking-wider font-bold mb-2">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center justify-between border-b-2 pb-2 border-background`}
      >
        <TextInput
          className="flex-1 text-xl p-0 text-white font-oswald font-bold"
          placeholderTextColor={colors.placeholder}
          {...props}
        />
        {rightIcon}
      </View>
      {errorMessage && (
        <Text className="text-[10px] text-danger mt-1 font-bold">
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
