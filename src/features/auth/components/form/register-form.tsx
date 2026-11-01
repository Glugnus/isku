import Button from "@/src/components/ui/button";
import ControlledInput from "@/src/components/utils/controlled-input";
import AuthHeader from "@/src/features/auth/components/auth-header";
import { useRegisterForm } from "@/src/features/auth/hooks/use-register-form";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function RegisterForm() {
  const { t } = useTranslation("auth");
  const { t: tc } = useTranslation();
  const { control, onSubmit, errors, isSubmitting } = useRegisterForm();
  return (
    <>
      <AuthHeader subtitle={t("register.subtitle")} />

      <View className="my-4 gap-y-2">
        <ControlledInput
          control={control}
          label={tc("fields.username.label")}
          name="username"
          variant="secondary"
          autoCapitalize="characters"
          placeholder={tc("fields.username.placeholder")}
          returnKeyType="next"
          uppercase
        />
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
          returnKeyType="next"
        />
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
            title={t("register.submit")}
            variant="primary"
            onPress={onSubmit}
            isLoading={isSubmitting}
          />
          <Link href="/(auth)/login" asChild>
            <Button
              title={t("register.alreadyHaveAccount")}
              variant="surface"
            />
          </Link>
        </View>
      </View>
    </>
  );
}
