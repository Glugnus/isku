import { useOAuth } from "@/src/features/auth/hooks/use-oauth";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton({ title }: { title: string }) {
  const { signInWithProvider, isLoading } = useOAuth();
  return (
    <TouchableOpacity
      onPress={() => signInWithProvider("google")}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#dbdbdb",
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2, // For Android shadow
      }}
      activeOpacity={0.8}
      disabled={isLoading}
    >
      <Image
        source={{
          uri: "https://developers.google.com/identity/images/g-logo.png",
        }}
        style={{ width: 24, height: 24, marginRight: 10 }}
      />
      <Text
        style={{
          fontSize: 16,
          color: "#757575",
          fontFamily: "Roboto-Regular", // Assuming Roboto is available; install via expo-google-fonts or similar if needed
          fontWeight: "500",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
