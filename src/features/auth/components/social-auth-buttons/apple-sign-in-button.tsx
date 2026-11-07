import { useAppleAuth } from "@/src/features/auth/hooks/use-apple-auth";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform, Text, View } from "react-native";

export default function AppleSignInButton() {
  const { signInWithApple, error, isLoading } = useAppleAuth();
  if (Platform.OS !== "ios") return null;
  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        style={{ width: "100%", height: 48 }}
        cornerRadius={12}
        onPress={() => {
          if (!isLoading) {
            signInWithApple();
          }
        }}
      />
      {error && (
        <Text className="text-danger text-sm text-center mt-2">{error}</Text>
      )}
    </View>
  );
}
