import { GearSetup } from "@/src/features/gear/types/gear.types";
import { GearBlueprintSvg } from "@/src/features/gear/components/gear-blueprint-svg";
import { View } from "react-native";

interface GearBlueprintCardProps {
  gear: GearSetup;
}

// Composant purement présentationnel : il ignore tout de l'animation.
// Le titre du setup (nom, catégorie, statut) est désormais affiché par GearCarousel.
export function GearBlueprintCard({ gear }: GearBlueprintCardProps) {
  return (
    <View className="relative items-center">
      {/* Rendu du schéma technique vectoriel */}
      <GearBlueprintSvg gear={gear} />
    </View>
  );
}
