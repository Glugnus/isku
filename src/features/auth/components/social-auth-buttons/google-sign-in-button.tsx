import { useGoogleAuth } from "@/src/features/auth/hooks/use-google-auth";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

export default function GoogleSignInButton({ title }: { title: string }) {
  const { signInWithGoogle, isLoading, error } = useGoogleAuth();
  return (
    <View>
      <Pressable
        onPress={() => signInWithGoogle()}
        className="flex-row items-center justify-center bg-white rounded-xl p-4 active:opacity-80 shadow-sm"
        disabled={isLoading}
      >
        <Image
          source={{
            uri: "https://developers.google.com/identity/images/g-logo.png",
          }}
          style={{ width: 24, height: 24, marginRight: 10 }}
        />
        <Text className="text-textBase text-base font-semibold">{title}</Text>
      </Pressable>
      {error && (
        <Text className="text-danger text-sm text-center mt-2">{error}</Text>
      )}
    </View>
  );
}
