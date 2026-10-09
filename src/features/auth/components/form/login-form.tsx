import Button from "@/src/components/ui/button";
import ControlledInput from "@/src/components/utils/controlled-input";
import AuthHeader from "@/src/features/auth/components/auth-header";
import GoogleSignInButton from "@/src/features/auth/components/social-auth-buttons/google/google-sign-in-button";
import { useLoginForm } from "@/src/features/auth/hooks/use-login-form";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function LoginForm() {
  const { control, onSubmit, errors, isSubmitting } = useLoginForm();

  return (
    <>
      <AuthHeader subtitle="Connectez-vous pour retrouver vos matchs et statistiques" />
      <View className="my-4 gap-y-4">
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
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          isPassword
        />
        <Link asChild href="/(auth)/forgot-password">
          <Pressable className="mt-2 self-end active:opacity-70">
            <Text className="text-muted text-sm">Mot de passe oublié ?</Text>
          </Pressable>
        </Link>
      </View>
      {errors.root && (
        <Text className="text-center mb-4 font-bold text-danger">
          {errors.root?.message}
        </Text>
      )}
      <View className="gap-y-6 pb-4">
        <View className="gap-y-2">
          <Button
            title="Se connecter"
            variant="primary"
            onPress={onSubmit}
            isLoading={isSubmitting}
          />
          <Link href="/(auth)/register" asChild>
            <Button title="Créer un compte" variant="surface" />
          </Link>
        </View>
        <GoogleSignInButton title="Continuer avec Google" />
      </View>
    </>
  );
}
