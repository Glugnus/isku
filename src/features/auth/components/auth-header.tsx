import { Image } from "expo-image";
import { Text, View } from "react-native";

interface AuthHeaderProps {
  subtitle?: string;
}

export default function AuthHeader({ subtitle }: AuthHeaderProps) {
  return (
    <>
      <View className="items-center justify-center mb-2 mt-12">
        <Image
          source={require("@/assets/images/Logo-Isku-Texte.svg")}
          style={{ width: 300, height: 120 }}

          contentFit="contain"
        />
      </View>
      <Text className="text-muted text-center mb-8">{subtitle}</Text>
    </>
  );
}
