import Button from "@/src/components/ui/button";
import ControlledInput from "@/src/components/utils/controlled-input";
import AuthHeader from "@/src/features/auth/components/auth-header";
import { useResendOtp } from "@/src/features/auth/hooks/use-resend-otp";
import { useVerifyOtpForm } from "@/src/features/auth/hooks/use-verify-otp-form";
import { EmailOtpType } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function VerifyOtpForm({
  type,
  email,
}: {
  type: EmailOtpType;
  email: string;
}) {
  const { t } = useTranslation("auth");
  const { control, onSubmit, errors, isSubmitting } = useVerifyOtpForm({
    type,
    email,
  });

  const { isResending, handleResend, secondsLeft, isRunning, message } =
    useResendOtp({ type, email });

  return (
    <>
      <AuthHeader subtitle={t("verifyOtp.subtitle")} />

      <View className="my-4">
        <ControlledInput
          control={control}
          label={t("verifyOtp.codeLabel")}
          name="code"
          variant="secondary"
          keyboardType="number-pad"
          autoCapitalize="none"
          placeholder={t("verifyOtp.codePlaceholder")}
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      </View>
      {message && (
        <Text className="text-center mb-4 font-bold text-primary">
          {message}
        </Text>
      )}
      {errors.root && (
        <Text className="text-center mb-4 font-bold text-danger">
          {errors.root?.message}
        </Text>
      )}
      <View className="gap-y-6 pb-4">
        <View className="gap-y-2">
          <Button
            title={t("verifyOtp.submit")}
            variant="primary"
            onPress={onSubmit}
            isLoading={isSubmitting}
          />
          <Button
            title={
              isRunning
                ? t("verifyOtp.resendWait", { seconds: secondsLeft })
                : t("verifyOtp.resendCode")
            }
            variant="surface"
            onPress={handleResend}
            isLoading={isResending}
            disabled={isRunning || isSubmitting || isResending}
          />
        </View>
      </View>
    </>
  );
}
