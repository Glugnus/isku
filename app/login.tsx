import GoogleSignInButton from "@/src/features/auth/components/social-auth-buttons/google/google-sign-in-button";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />
      <View>
        <Text>Login</Text>
        <GoogleSignInButton />
        <Link href="/">
          <Text>Try to navigate to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
