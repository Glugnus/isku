import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Svg, {
  Circle,
  Defs,
  Ellipse,
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
          {/* 1. Halo bleu profond d'arrière-plan */}
          <RadialGradient id="backLightBlue" cx="50%" cy="46%" r="48%">
            <Stop offset="0%" stopColor="#1A6BFF" stopOpacity="0.42" />
            <Stop offset="42%" stopColor="#1244A8" stopOpacity="0.24" />
            <Stop offset="75%" stopColor="#0B2258" stopOpacity="0.09" />
            <Stop offset="100%" stopColor="#0A0B14" stopOpacity="0" />
          </RadialGradient>

          {/* Cœur lumineux derrière la palette et les revêtements */}
          <RadialGradient id="coreGlow" cx="50%" cy="45%" r="30%">
            <Stop offset="0%" stopColor="#3B9EFF" stopOpacity="0.30" />
            <Stop offset="65%" stopColor="#1769FF" stopOpacity="0.10" />
            <Stop offset="100%" stopColor="#1769FF" stopOpacity="0" />
          </RadialGradient>

          {/* Dégradé vertical pour que les cercles du radar s'effacent en haut et en bas */}
          <LinearGradient id="radarVerticalFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#2E88FF" stopOpacity="0" />
            <Stop offset="22%" stopColor="#2E88FF" stopOpacity="0.03" />
            <Stop offset="50%" stopColor="#3898FF" stopOpacity="0.18" />
            <Stop offset="78%" stopColor="#2E88FF" stopOpacity="0.03" />
            <Stop offset="100%" stopColor="#2E88FF" stopOpacity="0" />
          </LinearGradient>

          {/* Dégradé pour les arcs latéraux du HUD (très doux en haut/bas) */}
          <LinearGradient id="hudArcBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#3898FF" stopOpacity="0" />
            <Stop offset="25%" stopColor="#3898FF" stopOpacity="0.04" />
            <Stop offset="50%" stopColor="#47B0FF" stopOpacity="0.22" />
            <Stop offset="75%" stopColor="#3898FF" stopOpacity="0.04" />
            <Stop offset="100%" stopColor="#1769FF" stopOpacity="0" />
          </LinearGradient>

          {/* 3. Dégradés du grand socle 3D sous le manche (très large et fondu) */}
          <RadialGradient id="podiumBlueGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#1E78FF" stopOpacity="0.20" />
            <Stop offset="55%" stopColor="#1244A8" stopOpacity="0.07" />
            <Stop offset="100%" stopColor="#0A0B14" stopOpacity="0" />
          </RadialGradient>

          <RadialGradient id="podiumGoldGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#FFD700" stopOpacity="0.32" />
            <Stop offset="40%" stopColor="#F59E0B" stopOpacity="0.10" />
            <Stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </RadialGradient>

          {/* Fondu horizontal large pour les arcs du socle (invisible sur les bords) */}
          <LinearGradient id="podiumWideFade" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#1E78FF" stopOpacity="0" />
            <Stop offset="20%" stopColor="#2E88FF" stopOpacity="0.08" />
            <Stop offset="50%" stopColor="#3898FF" stopOpacity="0.22" />
            <Stop offset="80%" stopColor="#2E88FF" stopOpacity="0.08" />
            <Stop offset="100%" stopColor="#1E78FF" stopOpacity="0" />
          </LinearGradient>

          {/* Reflet doré central ultra-fin sous le manche */}
          <LinearGradient id="podiumGoldStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#1E78FF" stopOpacity="0" />
            <Stop offset="30%" stopColor="#3898FF" stopOpacity="0.12" />
            <Stop offset="50%" stopColor="#FFD700" stopOpacity="0.42" />
            <Stop offset="70%" stopColor="#3898FF" stopOpacity="0.12" />
            <Stop offset="100%" stopColor="#1E78FF" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* ============================================================ */}
        {/* 1. LUMIÈRE D'AMBIANCE ARRIÈRE-PLAN                           */}
        {/* ============================================================ */}
        <Circle cx="200" cy="182" r="195" fill="url(#backLightBlue)" />
        <Circle cx="200" cy="182" r="125" fill="url(#coreGlow)" />

        {/* ============================================================ */}
        {/* 2. RADAR EN FILIGRANE PARTIEL (EFFACÉ EN HAUT ET EN BAS)     */}
        {/* ============================================================ */}
        <G>
          {/* Cercles fondus verticalement : on ne voit jamais le cercle complet */}
          <Circle
            cx="200"
            cy="182"
            r="168"
            fill="none"
            stroke="url(#radarVerticalFade)"
            strokeWidth="0.7"
          />

          <Circle
            cx="200"
            cy="182"
            r="152"
            fill="none"
            stroke="url(#radarVerticalFade)"
            strokeWidth="0.9"
          />

          {/* Arcs latéraux sur les flancs (9h et 3h) */}
          <Path
            d="M 60 120 A 152 152 0 0 0 60 244"
            fill="none"
            stroke="url(#hudArcBlue)"
            strokeWidth="1.2"
          />
          <Path
            d="M 340 120 A 152 152 0 0 1 340 244"
            fill="none"
            stroke="url(#hudArcBlue)"
            strokeWidth="1.2"
          />

          {/* Graduations uniquement visibles sur les flancs gauche et droit */}
          <G
            transform="translate(200, 182)"
            stroke="#3898FF"
            strokeWidth="0.7"
          >
            {TICKS_ANGLES.map((angle) => {
              // On ne garde que les graduations proches de 9h (235°..305°) et 3h (55°..125°)
              const distRight = Math.abs(angle - 90);
              const distLeft = Math.abs(angle - 270);
              const minDist = Math.min(distRight, distLeft);
              if (minDist > 40) return null;

              const fadeFactor = 1 - minDist / 40;
              const isMajor = angle % 30 === 0;
              return (
                <Line
                  key={angle}
                  y1={isMajor ? -149 : -147}
                  y2="-142"
                  strokeWidth={isMajor ? "1" : "0.6"}
                  opacity={(isMajor ? 0.22 : 0.12) * fadeFactor}
                  transform={`rotate(${angle})`}
                />
              );
            })}
          </G>

          {/* Cercle interne également fondu en haut et en bas */}
          <Circle
            cx="200"
            cy="182"
            r="132"
            fill="none"
            stroke="url(#radarVerticalFade)"
            strokeWidth="0.7"
          />

          {/* Repères d'axe horizontaux très fins à 9h et 3h */}
          <Line
            x1="14"
            y1="182"
            x2="36"
            y2="182"
            stroke="#3898FF"
            strokeWidth="0.9"
            opacity="0.22"
          />
          <Line
            x1="364"
            y1="182"
            x2="386"
            y2="182"
            stroke="#3898FF"
            strokeWidth="0.9"
            opacity="0.22"
          />
        </G>

        {/* ============================================================ */}
        {/* 3. GRAND SOCLE EN PERSPECTIVE (BASCULÉ VERS L'ÉCRAN)         */}
        {/* ============================================================ */}
        {/* Astuce : ajuste le 2e chiffre de translate(0, 12) pour monter/descendre tout le socle */}
        <G transform="translate(0, 12)">
          {/* Halo bleu diffus au sol (plus profond en Y pour suivre l'inclinaison) */}
          <Ellipse
            cx="200"
            cy="342"
            rx="185"
            ry="38"
            fill="url(#podiumBlueGlow)"
          />

          {/* Point d'impact lumineux doré juste sous le talon du manche */}
          <Ellipse
            cx="200"
            cy="338"
            rx="95"
            ry="8"
            fill="url(#podiumGoldGlow)"
          />

          {/* Reflet horizontal franc (ligne d'horizon dorée sous le manche) */}
          <Line
            x1="70"
            y1="338"
            x2="330"
            y2="338"
            stroke="url(#podiumGoldStroke)"
            strokeWidth="1.2"
          />

          {/* 1. Onde interne (autour de la base du manche, ry=18) */}
          <Path
            d="M 110 338 A 90 18 0 1 0 290 338"
            fill="none"
            stroke="url(#podiumGoldStroke)"
            strokeWidth="0.9"
            opacity="0.75"
          />
          {/* Arc arrière léger de l'onde interne */}
          <Path
            d="M 125 332 A 75 12 0 0 1 275 332"
            fill="none"
            stroke="url(#podiumWideFade)"
            strokeWidth="0.6"
            opacity="0.35"
          />

          {/* 2. Onde intermédiaire (plus ouverte vers le bas de l'écran, ry=30) */}
          <Path
            d="M 55 338 A 145 30 0 1 0 345 338"
            fill="none"
            stroke="url(#podiumWideFade)"
            strokeWidth="1"
          />
          {/* Arc arrière léger de l'onde intermédiaire */}
          <Path
            d="M 80 328 A 120 20 0 0 1 320 328"
            fill="none"
            stroke="url(#podiumWideFade)"
            strokeWidth="0.6"
            opacity="0.25"
          />

          {/* 3. Grande onde extérieure (très large, ry=44 pour bien voir la pente du socle) */}
          <Path
            d="M 12 338 A 188 44 0 1 0 388 338"
            fill="none"
            stroke="url(#podiumWideFade)"
            strokeWidth="0.8"
            opacity="0.7"
          />
        </G>
      </Svg>
    </View>
  );
}
