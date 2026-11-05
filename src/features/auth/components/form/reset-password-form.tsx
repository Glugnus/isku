import Button from "@/src/components/ui/button";
import ControlledInput from "@/src/components/utils/controlled-input";
import AuthHeader from "@/src/features/auth/components/auth-header";
import { useResetPasswordForm } from "@/src/features/auth/hooks/use-reset-password-form";
import { useTranslation } from "react-i18next";

import { Text, View } from "react-native";

export default function ResetPasswordForm() {
  const { t } = useTranslation("auth");
  const { t: tc } = useTranslation();
  const { control, onSubmit, errors, isSubmitting } = useResetPasswordForm();

  return (
    <>
      <AuthHeader subtitle={t("resetPassword.subtitle")} />

      <View className="my-4">
        <ControlledInput
          control={control}
          label={tc("fields.password.label")}
          name="password"
          variant="secondary"
          autoCapitalize="none"
          placeholder={tc("fields.password.placeholder")}
          textContentType="password"
          autoComplete="password"
          returnKeyType="next"
          isPassword
        />
        <ControlledInput
          control={control}
          label={tc("fields.confirmPassword.label")}
          name="confirmPassword"
          variant="secondary"
          autoCapitalize="none"
          placeholder={tc("fields.confirmPassword.placeholder")}
          textContentType="password"
          autoComplete="password"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          isPassword
        />
      </View>
      {errors.root && (
        <Text className="text-center mb-4 font-bold text-danger">
          {errors.root?.message}
        </Text>
      )}
      <View className="gap-y-6 pb-4">
        <View className="gap-y-2">
          <Button
            title={t("resetPassword.submit")}
            variant="primary"
            onPress={onSubmit}
            isLoading={isSubmitting}
          />
        </View>
      </View>
    </>
  );
}
