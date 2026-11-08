import { colors } from "@/src/lib/colors";
import { GearSetup } from "@/src/features/gear/types/gear.types";
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { View } from "react-native";

interface GearBlueprintSvgProps {
  gear: GearSetup;
}

export function GearBlueprintSvg({ gear }: GearBlueprintSvgProps) {
  const isForehandBlack = gear.forehandRubber.color === "black";
  const isBackhandRed = gear.backhandRubber.color === "red";

  // Label condensé du manche
  const handleLabel =
    gear.blade.handleType === "flared"
      ? "FL / Concave"
      : gear.blade.handleType === "straight"
      ? "ST / Droit"
      : gear.blade.handleType === "anatomic"
      ? "AN / Anatomique"
      : "CP / Porte-plume";

  // Nom simplifié gravé sur le bois
  const bladeShortName = gear.blade.name
    .toUpperCase()
    .replace("BUTTERFLY ", "")
    .replace("LAYER ", "");

  return (
    <View className="items-center justify-center w-full">
      <Svg width="330" height="235" viewBox="0 0 330 235">
        <Defs>
          {/* Dégradé Bois avec relief */}
          <LinearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#ECC28C" />
            <Stop offset="30%" stopColor="#D9A162" />
            <Stop offset="70%" stopColor="#BE823E" />
            <Stop offset="100%" stopColor="#965F24" />
          </LinearGradient>

          {/* Dégradé Plaque Noire */}
          <LinearGradient id="blackRubber" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#30323D" />
            <Stop offset="40%" stopColor="#1C1D24" />
            <Stop offset="100%" stopColor="#0B0C10" />
          </LinearGradient>

          {/* Dégradé Plaque Rouge */}
          <LinearGradient id="redRubber" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FF4646" />
            <Stop offset="45%" stopColor="#D82020" />
            <Stop offset="100%" stopColor="#8F0B0B" />
          </LinearGradient>

          {/* Mousse Coup Droit (Sponge) */}
          <LinearGradient id="spongeCd" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#FFA726" />
            <Stop offset="100%" stopColor="#E65100" />
          </LinearGradient>

          {/* Mousse Revers */}
          <LinearGradient id="spongeRv" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#FFCC80" />
            <Stop offset="100%" stopColor="#F57C00" />
          </LinearGradient>

          {/* Manche Racing (Viscaria Stripes) */}
          <LinearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#1B1C22" />
            <Stop offset="25%" stopColor="#12437F" />
            <Stop offset="50%" stopColor="#19549D" />
            <Stop offset="75%" stopColor="#12437F" />
            <Stop offset="100%" stopColor="#1B1C22" />
          </LinearGradient>
        </Defs>

        {/* 1. HUD / GRILLE BLUEPRINT EN ARRIÈRE-PLAN */}
        <G opacity={0.25}>
          <Circle cx="165" cy="115" r="105" stroke="#1769FF" strokeWidth="0.8" strokeDasharray="3 4" />
          <Circle cx="165" cy="115" r="75" stroke="#00E5FF" strokeWidth="0.8" opacity={0.3} />
          <Circle cx="165" cy="115" r="50" stroke="#FFD600" strokeWidth="0.6" strokeDasharray="2 3" opacity={0.3} />
          {/* Lignes d'axes repères */}
          <Line x1="165" y1="8" x2="165" y2="22" stroke="#00E5FF" strokeWidth="1" />
          <Line x1="165" y1="210" x2="165" y2="224" stroke="#00E5FF" strokeWidth="1" />
          <Line x1="15" y1="115" x2="30" y2="115" stroke="#00E5FF" strokeWidth="1" />
          <Line x1="300" y1="115" x2="315" y2="115" stroke="#00E5FF" strokeWidth="1" />
        </G>

        {/* 2. PIÈCE CENTRALE : LE BOIS (BLADE) - POINT FOCAL AVEC RELIEF */}
        <G>
          {/* Ombre portée douce */}
          <Path
            d="M 134 68 C 134 40, 196 40, 196 68 C 203 94, 200 120, 189 135 L 187 146 L 143 146 L 141 135 C 130 120, 127 94, 134 68 Z"
            fill="#000000"
            opacity={0.45}
            transform="translate(0, 3)"
          />

          {/* Palette en bois (Finitions fines) */}
          <Path
            d="M 134 68 C 134 40, 196 40, 196 68 C 203 94, 200 120, 189 135 L 187 146 L 143 146 L 141 135 C 130 120, 127 94, 134 68 Z"
            fill="url(#woodGrad)"
            stroke="#FFE0B2"
            strokeWidth="1.2"
          />

          {/* Nervures de bois */}
          <Path d="M 152 52 Q 151 90 153 135" stroke="#7A4714" strokeWidth="0.6" opacity={0.35} />
          <Path d="M 165 48 Q 166 90 165 138" stroke="#7A4714" strokeWidth="0.6" opacity={0.3} />
          <Path d="M 178 52 Q 179 90 177 135" stroke="#7A4714" strokeWidth="0.6" opacity={0.35} />

          {/* Logo Papillon gravé */}
          <Path
            d="M 165 82 C 163 78, 157 79, 159 84 C 160 86, 163 88, 165 91 C 167 88, 170 86, 171 84 C 173 79, 167 78, 165 82 Z"
            fill="#23170C"
            opacity={0.8}
          />

          {/* Modèle gravé */}
          <SvgText
            x="165"
            y="104"
            fill="#23170C"
            fontSize="7"
            fontWeight="bold"
            letterSpacing="1"
            textAnchor="middle"
          >
            {bladeShortName}
          </SvgText>

          {/* MANCHE CONNECTÉ MAIS IDENTIFIABLE */}
          <G>
            <Path
              d="M 154 144 L 176 144 L 180 196 C 180 200, 150 200, 150 196 Z"
              fill="url(#handleGrad)"
              stroke="#0A0B14"
              strokeWidth="1.2"
            />
            {/* Lignes Racing de manche */}
            <Line x1="161" y1="145" x2="159" y2="196" stroke="#1769FF" strokeWidth="2" />
            <Line x1="169" y1="145" x2="171" y2="196" stroke="#1769FF" strokeWidth="2" />
            {/* Badge papillon métallique bas du manche */}
            <Circle cx="165" cy="188" r="3.5" fill="#B0B6C0" stroke="#1C1E26" strokeWidth="0.8" />
          </G>
        </G>

        {/* 3. PIÈCE GAUCHE ÉCLATÉE : REVÊTEMENT CD (SÉPARÉ ET INCLINÉ) */}
        <G transform="translate(-24, 0)">
          {/* Mousse sur la tranche */}
          <Path
            d="M 112 66 C 112 44, 131 44, 131 66 C 134 90, 131 114, 124 126 L 122 134 L 107 134 L 105 126 C 99 114, 98 90, 102 66 Z"
            fill="url(#spongeCd)"
            opacity={0.9}
          />
          {/* Plaque CD */}
          <Path
            d="M 108 64 C 108 42, 128 42, 128 64 C 131 88, 128 112, 121 124 L 119 132 L 104 132 L 102 124 C 96 112, 95 88, 99 64 Z"
            fill={isForehandBlack ? "url(#blackRubber)" : "url(#redRubber)"}
            stroke="#15151A"
            strokeWidth="1.2"
          />
        </G>

        {/* 4. PIÈCE DROITE ÉCLATÉE : REVÊTEMENT RV (SÉPARÉ ET INCLINÉ) */}
        <G transform="translate(24, 0)">
          {/* Mousse sur la tranche */}
          <Path
            d="M 199 66 C 199 44, 218 44, 218 66 C 222 90, 221 114, 215 126 L 213 134 L 198 134 L 196 126 C 190 114, 189 90, 193 66 Z"
            fill="url(#spongeRv)"
            opacity={0.9}
          />
          {/* Plaque RV */}
          <Path
            d="M 201 64 C 201 42, 221 42, 221 64 C 225 88, 224 112, 218 124 L 216 132 L 201 132 L 199 124 C 193 112, 192 88, 196 64 Z"
            fill={isBackhandRed ? "url(#redRubber)" : "url(#blackRubber)"}
            stroke="#15151A"
            strokeWidth="1.2"
          />
        </G>

        {/* 5. ANNOTATIONS TECHNIQUES PRECISES (BLUEPRINT INDUSTRIAL LINES) */}

        {/* --- ANNOTATION BOIS (HAUT) --- */}
        <G>
          <Circle cx="165" cy="46" r="2" fill="#FFD600" />
          <Line x1="165" y1="46" x2="165" y2="16" stroke="#FFFFFF" strokeWidth="0.8" opacity={0.7} />
          <Line x1="165" y1="16" x2="175" y2="16" stroke="#FFD600" strokeWidth="1.5" />

          <SvgText x="180" y="14" fill="#FFD600" fontSize="8" fontWeight="bold">
            BOIS
          </SvgText>
          <SvgText x="180" y="24" fill="#FFFFFF" fontSize="9.5" fontWeight="700">
            {gear.blade.name}
          </SvgText>
          <SvgText x="180" y="33" fill="#9CA3AF" fontSize="8" fontWeight="600">
            {gear.category}
          </SvgText>
        </G>

        {/* --- ANNOTATION COUP DROIT (GAUCHE) --- */}
        <G>
          <Circle cx="84" cy="94" r="2" fill="#FFD600" />
          <Line x1="84" y1="94" x2="55" y2="94" stroke="#FFFFFF" strokeWidth="0.8" opacity={0.7} />

          <SvgText x="50" y="90" fill="#FFD600" fontSize="8" fontWeight="bold" textAnchor="end">
            CD
          </SvgText>
          <SvgText x="50" y="100" fill="#FFFFFF" fontSize="9.5" fontWeight="700" textAnchor="end">
            {gear.forehandRubber.name}
          </SvgText>
          <SvgText x="50" y="109" fill="#9CA3AF" fontSize="8" fontWeight="600" textAnchor="end">
            {gear.forehandRubber.thickness}
          </SvgText>
        </G>

        {/* --- ANNOTATION REVERS (DROITE) --- */}
        <G>
          <Circle cx="246" cy="94" r="2" fill="#FFD600" />
          <Line x1="246" y1="94" x2="275" y2="94" stroke="#FFFFFF" strokeWidth="0.8" opacity={0.7} />

          <SvgText x="280" y="90" fill="#FFD600" fontSize="8" fontWeight="bold">
            RV
          </SvgText>
          <SvgText x="280" y="100" fill="#FFFFFF" fontSize="9.5" fontWeight="700">
            {gear.backhandRubber.name}
          </SvgText>
          <SvgText x="280" y="109" fill="#9CA3AF" fontSize="8" fontWeight="600">
            {gear.backhandRubber.thickness}
          </SvgText>
        </G>

        {/* --- ANNOTATION MANCHE (BAS DROITE) --- */}
        <G>
          <Circle cx="178" cy="172" r="2" fill="#FFD600" />
          <Line x1="178" y1="172" x2="210" y2="172" stroke="#FFFFFF" strokeWidth="0.8" opacity={0.7} />

          <SvgText x="215" y="169" fill="#FFD600" fontSize="8" fontWeight="bold">
            MANCHE
          </SvgText>
          <SvgText x="215" y="179" fill="#FFFFFF" fontSize="9" fontWeight="700">
            {handleLabel}
          </SvgText>
        </G>
      </Svg>
    </View>
  );
}
