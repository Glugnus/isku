import { colors } from "@/src/lib/colors";
import { ReactNode } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  variant?: "primary" | "secondary" | "neutral";
  isRight?: boolean;
  rightIcon?: ReactNode;
  errorMessage?: string;
  containerClassName?: string;
  size?: "default" | "sm" | "lg";
  uppercase?: boolean;
  onPress?: () => void;
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

const INPUT_SIZES = {
  default: {
    container: "p-6 rounded-2xl",
    input: "text-xl",
    label: "text-[10px] mb-2",
  },
  sm: {
    container: "p-3 rounded-xl",
    input: "text-sm pb-1",
    label: "text-[9px] mb-1",
  },
  lg: {
    container: "p-7 rounded-3xl",
    input: "text-2xl",
    label: "text-xs mb-2",
  },
};

const CONTENT_CLASSNAME =
  "flex-row items-center justify-between border-b-2 pb-2 border-background";

export default function Input({
  label,
  variant = "primary",
  isRight = false,
  rightIcon,
  errorMessage,
  containerClassName,
  uppercase = false,
  onPress,
  size = "default",
  ...props
}: InputProps) {
  const textClassName = `flex-1 ${INPUT_SIZES[size].input} p-0 font-oswald font-bold ${
    isRight ? "text-right" : "text-left"
  } ${uppercase ? "uppercase tracking-wider" : ""}`;
  return (
    <View
      className={`${containerClassName || "w-full"} bg-surface ${INPUT_SIZES[size].container} ${size === "sm" ? "" : isRight ? INPUT_VARIANTS[variant].right : INPUT_VARIANTS[variant].left} ${size !== "sm" ? INPUT_VARIANTS[variant].shadow : ""} `}
    >
      {label && (
        <Text
          className={`text-muted ${INPUT_SIZES[size].label} pb-1 uppercase tracking-wider font-bold  ${
            isRight ? "text-right" : "text-left"
          }`}
        >
          {label}
        </Text>
      )}
      {onPress ? (
        <Pressable
          onPress={onPress}
          className={`active:opacity-70 ${CONTENT_CLASSNAME}`}
        >
          <Text
            className={`${textClassName} ${
              props.value ? "text-white" : "text-placeholder"
            }`}
            numberOfLines={1}
          >
            {props.value || props.placeholder}
          </Text>
          {rightIcon}
        </Pressable>
      ) : (
        <View className={CONTENT_CLASSNAME}>
          <TextInput
            className={`${textClassName} text-white`}
            placeholderTextColor={colors.placeholder}
            {...props}
          />
          {rightIcon}
        </View>
      )}
      {errorMessage && (
        <Text className="text-[10px] text-danger mt-1 font-bold">
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
