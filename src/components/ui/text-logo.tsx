import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

const LOGO_SOURCE = require("@/assets/images/Logo-Isku-Texte.svg");

export const TextLogo = ({
  className = "",
  width,
  height,
}: {
  className?: string;
  width: number;
  height: number;
}) => {
  return (
    <View className={className}>
      <Image
        source={LOGO_SOURCE}
        style={{ width, height }}
        contentFit="contain"
        alt="Logo Isku"
        transition={300}
      />
    </View>
  );
};
