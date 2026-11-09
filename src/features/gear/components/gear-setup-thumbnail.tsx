import { colors } from "@/src/lib/colors";
import { GearSetup } from "@/src/features/gear/types/gear.types";
import { View } from "react-native";

interface GearSetupThumbnailProps {
  setup: GearSetup;
  side: "left" | "right";
}

// Miniature « raquette » estompée affichée de part et d'autre de la scène.
// Wireframe en Views : plaque visible (couleur du revêtement côté spectateur) + manche.
export function GearSetupThumbnail({ setup, side }: GearSetupThumbnailProps) {
  // Côté gauche on montre le CD, côté droit le RV (effet « raquette vue de profil »)
  const rubber = side === "left" ? setup.forehandRubber : setup.backhandRubber;
  const rubberColor = rubber.color === "red" ? colors.red : "#1C1D24";

  return (
    <View className="items-center rounded-2xl border border-white/10 bg-surface/40 px-3 pt-3 pb-2">
      {/* Palette */}
      <View
        className="w-12 h-14 rounded-[24px] border border-white/10"
        style={{ backgroundColor: rubberColor }}
      />
      {/* Manche */}
      <View className="w-3 h-6 -mt-0.5 rounded-b-md bg-secondary/60" />
    </View>
  );
}

