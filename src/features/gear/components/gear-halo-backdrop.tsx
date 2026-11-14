import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

interface GearHaloBackdropProps {
  width?: number | string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

// Graduations radiales tous les 5 degrés
const TICKS_ANGLES = Array.from({ length: 72 }, (_, i) => i * 5);

export function GearHaloBackdrop({
  width = "100%",
  height = 390,
  style,
}: GearHaloBackdropProps) {
  return (
    <View style={[{ width: width as any, height }, style]} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 400 400">
        <Defs>
          {/* 1. Grand éclaircissement bleu élargi derrière la raquette */}
          <RadialGradient id="backLightBlue" cx="50%" cy="48%" r="50%">
            <Stop offset="0%" stopColor="#1E78FF" stopOpacity="0.55" />
            <Stop offset="38%" stopColor="#1554C8" stopOpacity="0.34" />
            <Stop offset="72%" stopColor="#0D2B6B" stopOpacity="0.14" />
            <Stop offset="100%" stopColor="#0A0B14" stopOpacity="0" />
          </RadialGradient>

          {/* Cœur lumineux central plus large derrière le bois et les plaques */}
          <RadialGradient id="coreGlow" cx="50%" cy="48%" r="34%">
            <Stop offset="0%" stopColor="#47A3FF" stopOpacity="0.4" />
            <Stop offset="65%" stopColor="#1769FF" stopOpacity="0.16" />
            <Stop offset="100%" stopColor="#1769FF" stopOpacity="0" />
          </RadialGradient>

          {/* Dégradé pour les arcs latéraux du HUD */}
          <LinearGradient id="hudArcBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#3898FF" stopOpacity="0.15" />
            <Stop offset="50%" stopColor="#47B0FF" stopOpacity="0.65" />
            <Stop offset="100%" stopColor="#1769FF" stopOpacity="0.15" />
          </LinearGradient>
        </Defs>

        {/* ============================================================ */}
        {/* 1. ÉCLAIRCISSEMENT ARRIÈRE-PLAN AGRANDI                      */}
        {/* ============================================================ */}
        <Circle cx="200" cy="190" r="200" fill="url(#backLightBlue)" />
        <Circle cx="200" cy="190" r="135" fill="url(#coreGlow)" />

        {/* ============================================================ */}
        {/* 2. CERCLES & GRADUATIONS HUD AGRANDIS AUTOUR DE LA RAQUETTE  */}
        {/* ============================================================ */}
        <G>
          {/* Grand cercle extérieur */}
          <Circle
            cx="200"
            cy="190"
            r="184"
            fill="none"
            stroke="#1F6FEB"
            strokeWidth="1"
            opacity="0.32"
          />

          {/* Cercle principal du radar */}
          <Circle
            cx="200"
            cy="190"
            r="166"
            fill="none"
            stroke="#2E88FF"
            strokeWidth="1.2"
            opacity="0.45"
          />

          {/* Arcs de mise en valeur sur les flancs gauche et droit du cercle 166 */}
          <Path
            d="M 51 117 A 166 166 0 0 0 51 263"
            fill="none"
            stroke="url(#hudArcBlue)"
            strokeWidth="1.8"
          />
          <Path
            d="M 349 117 A 166 166 0 0 1 349 263"
            fill="none"
            stroke="url(#hudArcBlue)"
            strokeWidth="1.8"
          />

          {/* Couronne de graduations fines (Ticks) agrandie */}
          <G
            transform="translate(200, 190)"
            stroke="#3898FF"
            strokeWidth="1"
            opacity="0.35"
          >
            {TICKS_ANGLES.map((angle) => {
              const isMajor = angle % 30 === 0;
              return (
                <Line
                  key={angle}
                  y1={isMajor ? -163 : -160}
                  y2="-154"
                  strokeWidth={isMajor ? "1.4" : "0.9"}
                  opacity={isMajor ? 0.6 : 0.35}
                  transform={`rotate(${angle})`}
                />
              );
            })}
          </G>

          {/* Cercle intermédiaire net */}
          <Circle
            cx="200"
            cy="190"
            r="144"
            fill="none"
            stroke="#3898FF"
            strokeWidth="1"
            opacity="0.35"
          />

          {/* Cercle interne en pointillés */}
          <Circle
            cx="200"
            cy="190"
            r="124"
            fill="none"
            stroke="#5ABFFF"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="2 5"
          />

          {/* Repères d'axe horizontaux à gauche et à droite */}
          <Line
            x1="4"
            y1="190"
            x2="26"
            y2="190"
            stroke="#3898FF"
            strokeWidth="1.2"
            opacity="0.5"
          />
          <Line
            x1="374"
            y1="190"
            x2="396"
            y2="190"
            stroke="#3898FF"
            strokeWidth="1.2"
            opacity="0.5"
          />
        </G>
      </Svg>
    </View>
  );
}
