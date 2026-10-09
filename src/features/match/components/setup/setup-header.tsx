import { Text, View } from "react-native";

export default function SetupHeader() {
  return (
    <View className="items-end justify-center mb-6 flex-row">
      <Text className="text-white text-xl font-bold uppercase tracking-wider mb-1.5 mr-2">
        Préparer mon
      </Text>
      <View className="items-center">
        <Text className="text-2xl text-primary font-oswald uppercase tracking-wider">
          Match
        </Text>
        <View className="w-full h-1 bg-primary mt-0.5 rounded-full"></View>
      </View>
    </View>
  );
}
