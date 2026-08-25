import Button from "@/src/components/ui/button";
import ControlledInput from "@/src/components/ui/controlled-input";
import AuthHeader from "@/src/features/auth/components/auth-header";
import GoogleSignInButton from "@/src/features/auth/components/social-auth-buttons/google/google-sign-in-button";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function LoginForm() {
  return (
    <ScrollView
      contentContainerClassName="flex-grow p-6 justify-between"
      className="flex-1"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader />
      <View className="gap-y-4 my-6">
        <ControlledInput />
        <ControlledInput />
        <TouchableOpacity className="self-end mt-2">
          <Text className="text-muted text-sm">Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>
      {/* {error.root && <Text>{error.root.message}</Text>} */}
      <View className="gap-y-2">
        <Button title="Se connecter" variant="primary" />
        <GoogleSignInButton title="Continuer avec Google" />
        <Button title="Créer un compte" variant="surface" />
      </View>
    </ScrollView>
  );
}
