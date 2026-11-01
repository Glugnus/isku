import Button from "@/src/components/ui/button";
import ControlledInput from "@/src/components/utils/controlled-input";
import AuthHeader from "@/src/features/auth/components/auth-header";
import { useForgotPasswordForm } from "@/src/features/auth/hooks/use-forgot-password-form";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function ForgotPasswordForm() {
  const { t } = useTranslation("auth");
  const { t: tc } = useTranslation();
  const { control, onSubmit, errors, isSubmitting } = useForgotPasswordForm();

  return (
    <>
      <AuthHeader subtitle={t("forgotPassword.subtitle")} />

      <View className="my-4">
        <ControlledInput
          control={control}
          label={tc("fields.email.label")}
          name="email"
          variant="secondary"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder={tc("fields.email.placeholder")}
          textContentType="emailAddress"
          autoComplete="email"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
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
            title={t("forgotPassword.submit")}
            variant="primary"
            onPress={onSubmit}
            isLoading={isSubmitting}
          />
          <Link href="/(auth)/login" asChild>
            <Button title={tc("actions.cancel")} variant="surface" />
          </Link>
        </View>
      </View>
    </>
  );
}
