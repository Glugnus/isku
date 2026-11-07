import Button from "@/src/components/ui/button";
import ControlledInput from "@/src/components/utils/controlled-input";
import AuthHeader from "@/src/features/auth/components/auth-header";
import AppleSignInButton from "@/src/features/auth/components/social-auth-buttons/apple-sign-in-button";
import GoogleSignInButton from "@/src/features/auth/components/social-auth-buttons/google-sign-in-button";
import { useLoginForm } from "@/src/features/auth/hooks/use-login-form";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform, Pressable, Text, View } from "react-native";

export default function LoginForm() {
  const { t } = useTranslation("auth");
  const { t: tc } = useTranslation();
  const { control, onSubmit, errors, isSubmitting } = useLoginForm();

  return (
    <>
      <AuthHeader subtitle={t("login.subtitle")} />
      <View className="my-4 gap-y-4">
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
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          isPassword
        />
        <Link asChild href="/(auth)/forgot-password">
          <Pressable className="mt-2 self-end active:opacity-70">
            <Text className="text-muted text-sm">
              {t("login.forgotPassword")}
            </Text>
          </Pressable>
        </Link>
      </View>
      {errors.root && (
        <Text className="text-center mb-4 font-bold text-danger">
          {errors.root?.message}
        </Text>
      )}
      <View className="gap-y-2 pb-4">
        <View className="gap-y-2">
          <Button
            title={t("login.submit")}
            variant="primary"
            onPress={onSubmit}
            isLoading={isSubmitting}
          />
          <Link href="/(auth)/register" asChild>
            <Button title={t("login.createAccount")} variant="surface" />
          </Link>
        </View>
        {Platform.OS === "android" && (
          <GoogleSignInButton title={t("login.googleButton")} />
        )}
        {Platform.OS === "ios" && <AppleSignInButton />}
      </View>
    </>
  );
}
