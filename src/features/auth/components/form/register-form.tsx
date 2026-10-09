import Button from "@/src/components/ui/button";
import ControlledInput from "@/src/components/utils/controlled-input";
import AuthHeader from "@/src/features/auth/components/auth-header";
import { useRegisterForm } from "@/src/features/auth/hooks/use-register-form";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function RegisterForm() {
  const { control, onSubmit, errors, isSubmitting } = useRegisterForm();
  return (
    <>
      <AuthHeader subtitle="Rejoignez-nous pour suivre vos statistiques" />

      <View className="my-4 gap-y-2">
        <ControlledInput
          control={control}
          label="Pseudo"
          name="username"
          variant="secondary"
          autoCapitalize="characters"
          placeholder="Votre pseudo"
          returnKeyType="next"
          uppercase
        />
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
          returnKeyType="next"
        />
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
            title="S'inscrire"
            variant="primary"
            onPress={onSubmit}
            isLoading={isSubmitting}
          />
          <Link href="/(auth)/login" asChild>
            <Button title="J'ai déjà un compte" variant="surface" />
          </Link>
        </View>
      </View>
    </>
  );
}
