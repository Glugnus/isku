import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function SetupHeader() {
  const { t } = useTranslation("match");
  return (
    <View className="items-end justify-center mb-6 flex-row">
      <Text className="text-white text-xl font-bold uppercase tracking-wider mb-1.5 mr-2">
        {t("setup.header.prefix")}
      </Text>
      <View className="items-center">
        <Text className="text-2xl text-primary font-oswald uppercase tracking-wider">
          {t("setup.header.highlight")}
        </Text>
        <View className="w-full h-1 bg-primary mt-0.5 rounded-full"></View>
      </View>
    </View>
  );
}
