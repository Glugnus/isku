import ScreenLayout from "@/src/components/ui/screen-layout";
import { colors } from "@/src/lib/colors";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Check } from "lucide-react-native";
import { Text, View } from "react-native";

export default function GearDraftScreen() {
  return (
    <ScreenLayout scrollable edges={["left", "right"]}>
      <View className="mb-4">
        <LinearGradient
          colors={[colors.primary, `${colors.primary}00`]}
          style={{
            width: "70%",
            height: 150,
            alignSelf: "center",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 2,
            paddingHorizontal: 2,
          }}
        >
          <View className=" bg-background px-4 py-3 flex-1 rounded-t-3xl">
            <View className="flex-row items-center justify-between gap-2">
              <Text
                className="flex-1 font-oswald text-base text-white tracking-wide"
                numberOfLines={1}
              >
                SETUP 1 - OFF+
              </Text>

              <View className="flex-row items-center gap-1 rounded-full bg-primary px-2.5 py-0.5">
                <Text className="text-[11px] font-bold text-background">
                  Actif
                </Text>
                <Check size={11} color={colors.background} strokeWidth={3} />
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Zone Showcase : Halo SVG (fond transparent) + Raquette PNG */}
        <View
          className="relative w-full items-center justify-center"
          style={{ height: 390, marginTop: -90 }}
        >
          {/* <GearHaloBackdrop
            height={390}
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          /> */}

          <Image
            source={require("@/assets/images/isku_racket_transparent.png")}
            style={{ width: "82%", height: 325, marginTop: -8 }}
            contentFit="contain"
          />
        </View>
      </View>
    </ScreenLayout>
  );
}
