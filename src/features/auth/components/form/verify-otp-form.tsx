import Button from "@/src/components/ui/button";
import ControlledInput from "@/src/components/utils/controlled-input";
import { useResendOtp } from "@/src/features/auth/hooks/use-resend-otp";
import { useVerifyOtpForm } from "@/src/features/auth/hooks/use-verify-otp-form";
import { EmailOtpType } from "@supabase/supabase-js";
import { ScrollView, Text, View } from "react-native";
import AuthHeader from "../auth-header";

export default function VerifyOtpForm({
  type,
  email,
}: {
  type: EmailOtpType;
  email: string;
}) {
  const { control, handleSubmit, onSubmit, errors, isSubmitting } =
    useVerifyOtpForm({ type, email });

  const { isResending, handleResend, secondsLeft, isRunning, message } =
    useResendOtp({ type, email });

  return (
    <ScrollView
      contentContainerClassName="flex-grow p-6"
      className="flex-1"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader subtitle="Consultez votre boite mail pour renseigner le code" />

      <View className="my-4">
        <ControlledInput
          control={control}
          label="Code de vérification"
          name="code"
          variant="secondary"
          keyboardType="number-pad"
          autoCapitalize="none"
          placeholder="123456"
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
          returnKeyType="done"
          onSubmitEditing={handleSubmit(onSubmit)}
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
            title="Valider"
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
          <Button
            title={
              isRunning ? `Renvoyer dans ${secondsLeft}s` : "Renvoyer le code"
            }
            variant="surface"
            onPress={handleResend}
            isLoading={isResending}
            disabled={isRunning || isSubmitting || isResending}
          />
        </View>
      </View>
    </ScrollView>
  );
}
