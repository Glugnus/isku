import Button from "@/src/components/ui/button";
import ControlledInput from "@/src/components/utils/controlled-input";
import AuthHeader from "@/src/features/auth/components/auth-header";
import { useResetPasswordForm } from "@/src/features/auth/hooks/use-reset-password-form";
import { ScrollView, Text, View } from "react-native";

export default function ResetPasswordForm() {
  const { control, handleSubmit, onSubmit, errors, isSubmitting } =
    useResetPasswordForm();

  return (
    <ScrollView
      contentContainerClassName="flex-grow p-6"
      className="flex-1"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader subtitle="Entrez votre nouveau mot de passe" />

      <View className="my-4">
        <ControlledInput
          control={control}
          label="Mot de passe"
          name="password"
          variant="secondary"
          autoCapitalize="none"
          placeholder="********"
          textContentType="password"
          autoComplete="password"
          returnKeyType="next"
          isPassword
        />
        <ControlledInput
          control={control}
          label="Confirmer le mot de passe"
          name="confirmPassword"
          variant="secondary"
          autoCapitalize="none"
          placeholder="********"
          textContentType="password"
          autoComplete="password"
          returnKeyType="done"
          onSubmitEditing={handleSubmit(onSubmit)}
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
            title="Modifier le mot de passe"
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        </View>
      </View>
    </ScrollView>
  );
}
