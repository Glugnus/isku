import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import PasswordInput from "@/src/components/ui/password-input";
import AuthHeader from "@/src/features/auth/components/auth-header";
import GoogleSignInButton from "@/src/features/auth/components/social-auth-buttons/google/google-sign-in-button";
import { useLoginForm } from "@/src/features/auth/hooks/use-login-form";
import { router } from "expo-router";
import { Controller } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function LoginForm() {
  const { control, handleSubmit, onSubmit, errors, isSubmitting } =
    useLoginForm();

  const moveToForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };
  const moveToRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <ScrollView
      contentContainerClassName="flex-grow p-6"
      className="flex-1"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader subtitle="Connectez-vous pour retrouver vos matchs et statistiques" />
      <View className="my-8">
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              label="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              variant="secondary"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="votre@email.com"
              textContentType="emailAddress"
              autoComplete="email"
              errorMessage={error?.message}
              returnKeyType="next"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <PasswordInput
              label="Mot de passe"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              variant="secondary"
              autoCapitalize="none"
              placeholder="********"
              textContentType="password"
              autoComplete="password"
              errorMessage={error?.message}
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />

        <TouchableOpacity
          className="self-end mt-2"
          onPress={moveToForgotPassword}
        >
          <Text className="text-muted text-sm">Mot de passe oublié ?</Text>
        </TouchableOpacity>
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
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
          <Button
            title="Créer un compte"
            variant="surface"
            onPress={moveToRegister}
          />
        </View>
        <GoogleSignInButton title="Continuer avec Google" />
      </View>
    </ScrollView>
  );
}
