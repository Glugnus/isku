import Input, { InputProps } from "@/src/components/ui/input";
import PasswordInput from "@/src/components/ui/password-input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ControlledInputProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: Path<T>;
  isPassword?: boolean;
}

export default function ControlledInput<T extends FieldValues>({
  control,
  name,
  isPassword = false,
  ...props
}: ControlledInputProps<T>) {
  const Component = isPassword ? PasswordInput : Input;
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Component
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          errorMessage={error?.message}
          {...props}
        />
      )}
    />
  );
}
