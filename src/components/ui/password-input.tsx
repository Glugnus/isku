import Input from "@/src/components/ui/input";
import { colors } from "@/src/lib/colors";
import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";
import { TouchableOpacity } from "react-native";

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
        <TouchableOpacity
          onPress={toggleHidePassword}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <FontAwesome
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color={colors.muted}
          />
        </TouchableOpacity>
      }
    />
  );
}
