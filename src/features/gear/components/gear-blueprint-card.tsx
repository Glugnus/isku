import { colors } from "@/src/lib/colors";
import { GearSetup } from "@/src/features/gear/types/gear.types";
import { GearBlueprintSvg } from "@/src/features/gear/components/gear-blueprint-svg";
import { Cpu } from "lucide-react-native";
import { Text, View } from "react-native";

interface GearBlueprintCardProps {
  gear: GearSetup;
}

export function GearBlueprintCard({ gear }: GearBlueprintCardProps) {
  return (
    <View
      className="rounded-3xl border border-surface/90 bg-[#0C0E1B] p-3.5 mb-3 relative overflow-hidden"
      style={{
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      }}
    >
      {/* En-tête discret du plan technique */}
      <View className="flex-row items-center justify-between px-1 mb-1">
        <View className="flex-row items-center gap-1.5">
          <Cpu size={13} color={colors.primary} />
          <Text className="text-[10px] font-bold text-muted tracking-widest uppercase">
            Plan Technique • {gear.name}
          </Text>
        </View>

        <View className="bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-full">
          <Text className="text-[9px] font-bold text-primary">
            {gear.category}
          </Text>
        </View>
      </View>

      {/* Rendu du schéma technique vectoriel */}
      <GearBlueprintSvg gear={gear} />
    </View>
  );
}
