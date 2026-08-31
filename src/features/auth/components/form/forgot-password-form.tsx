import Button from "@/src/components/ui/button";
import ControlledInput from "@/src/components/utils/controlled-input";
import AuthHeader from "@/src/features/auth/components/auth-header";
import { useForgotPasswordForm } from "@/src/features/auth/hooks/use-forgot-password-form";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function ForgotPasswordForm() {
  const { control, handleSubmit, onSubmit, errors, isSubmitting } =
    useForgotPasswordForm();

  return (
    <ScrollView
      contentContainerClassName="flex-grow p-6"
      className="flex-1"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader subtitle="Entrez votre email pour réinitialiser votre mot de passe" />

      <View className="my-4">
        <ControlledInput
          control={control}
          label="Email"
          name="email"
          variant="secondary"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="votre@email.com"
          textContentType="emailAddress"
          autoComplete="email"
          returnKeyType="done"
          onSubmitEditing={handleSubmit(onSubmit)}
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
            title="Réinitialiser"
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
          <Link href="/(auth)/login" asChild>
            <Button title="Annuler" variant="surface" />
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
