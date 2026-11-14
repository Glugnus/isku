import ScreenLayout from "@/src/components/ui/screen-layout";
import { GearHaloBackdrop } from "@/src/features/gear/components/gear-halo-backdrop";
import { colors } from "@/src/lib/colors";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Check } from "lucide-react-native";
import { Text, View } from "react-native";
import Svg, { Circle, Polyline } from "react-native-svg";

export default function GearDraftScreen() {
  return (
    <ScreenLayout scrollable edges={["left", "right"]}>
      <View className="mb-4">
        <LinearGradient
          colors={[colors.primary, `${colors.primary}00`]}
          style={{
            width: "70%",
            height: 92,
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

        <View
          className="relative w-full items-center justify-center"
          style={{ height: 390, marginTop: -42 }}
        >
          <GearHaloBackdrop
            height={390}
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          />

          <Image
            source={require("@/assets/images/isku_racket_transparent.png")}
            style={{ width: "82%", height: 325, marginTop: -8 }}
            contentFit="contain"
          />

          <View
            style={{ position: "absolute", top: 96, left: 0 }}
            pointerEvents="none"
          >
            {/* 1. Ligne horizontale + diagonale + point jaune (coordonnées locales) */}
            <Svg width={125} height={58}>
              <Polyline
                points="0,22 60,22 95,50"
                fill="none"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="1.2"
              />
              {/* Halo doux autour du point */}
              <Circle
                cx="95"
                cy="50"
                r="6.5"
                fill={colors.primary}
                opacity={0.28}
              />
              {/* Point jaune sur le revêtement */}
              <Circle cx="95" cy="50" r="3" fill={colors.primary} />
            </Svg>

            {/* 2. Texte juste au-dessus de la ligne horizontale (y = 22) */}
            <Text
              style={{ position: "absolute", top: 2, left: 0 }}
              className="text-xs font-bold text-primary"
            >
              Tenergy 05
            </Text>

            {/* 3. Texte juste en dessous de la ligne horizontale (y = 22) */}
            <Text
              style={{ position: "absolute", top: 26, left: 0 }}
              className="text-[11px] text-white/90"
            >
              2.1 mm
            </Text>
          </View>
          <View
            style={{ position: "absolute", top: 96, right: 0 }}
            pointerEvents="none"
          >
            {/* 1. Point jaune à gauche (10,50) -> Coude (45,22) -> Bord droit (105,22) */}
            <Svg width={105} height={58}>
              <Polyline
                points="10,50 45,22 105,22"
                fill="none"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="1.2"
              />
              {/* Halo doux autour du point */}
              <Circle
                cx="10"
                cy="50"
                r="6.5"
                fill={colors.primary}
                opacity={0.28}
              />
              {/* Point jaune sur le revêtement rouge */}
              <Circle cx="10" cy="50" r="3" fill={colors.primary} />
            </Svg>

            {/* 2. Texte juste au-dessus de la ligne horizontale (aligné à droite) */}
            <Text
              style={{ position: "absolute", top: 2, right: 0 }}
              className="text-xs font-bold text-primary"
            >
              Dignics 09C
            </Text>

            {/* 3. Texte juste en dessous de la ligne horizontale (aligné à droite) */}
            <Text
              style={{ position: "absolute", top: 26, right: 0 }}
              className="text-[11px] text-white/90"
            >
              2.1 mm
            </Text>
          </View>

          {/* TODO: Ajouter les autres indications (Revêtement Rouge, Bois, Manche) */}
        </View>
      </View>
    </ScreenLayout>
  );
}
