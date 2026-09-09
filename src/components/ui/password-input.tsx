import Input from "@/src/components/ui/input";
import { colors } from "@/src/lib/colors";
import { Eye, EyeOff } from "lucide-react-native";
import { ComponentProps, useState } from "react";
import { Pressable } from "react-native";

type PasswordInputProps = ComponentProps<typeof Input>;

export default function PasswordInput({ ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleHidePassword = () => setShowPassword((prev) => !prev);

  return (
    <Input
      {...props}
      secureTextEntry={!showPassword}
      autoCorrect={false}
      rightIcon={
        <Pressable
          onPress={toggleHidePassword}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          {showPassword ? (
            <EyeOff size={20} color={colors.muted} />
          ) : (
            <Eye size={20} color={colors.muted} />
          )}
        </Pressable>
      }
    />
  );
}
