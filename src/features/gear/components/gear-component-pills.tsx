import { colors } from "@/src/lib/colors";
import { GearSetup } from "@/src/features/gear/types/gear.types";
import { Flame, Layers, Shield, Waves } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface GearComponentPillsProps {
  gear: GearSetup;
  onPressComponent?: (componentKey: string) => void;
}

export function GearComponentPills({
  gear,
  onPressComponent,
}: GearComponentPillsProps) {
  const handleTypeLabel =
    gear.blade.handleType === "flared"
      ? "FL"
      : gear.blade.handleType === "straight"
      ? "ST"
      : gear.blade.handleType === "anatomic"
      ? "AN"
      : "CP";

  const handleDesc =
    gear.blade.handleType === "flared"
      ? "Concave"
      : gear.blade.handleType === "straight"
      ? "Droit"
      : gear.blade.handleType === "anatomic"
      ? "Anatomique"
      : "Porte-plume";

  return (
    <View className="flex-row justify-between gap-2 mb-3">
      {/* 1. Bois */}
      <Pressable
        onPress={() => onPressComponent?.("blade")}
        className="flex-1 bg-surface/70 border border-surface rounded-2xl p-2.5 items-center justify-between active:opacity-75 min-h-[76px]"
      >
        <Layers size={16} color={colors.primary} />
        <Text className="text-[9px] font-bold text-primary uppercase mt-1">
          BOIS
        </Text>
        <Text
          className="text-[11px] font-bold text-white text-center leading-tight"
          numberOfLines={1}
        >
          {gear.blade.name.replace("Butterfly ", "")}
        </Text>
        <Text className="text-[9px] text-muted font-medium">
          {gear.blade.category}
        </Text>
      </Pressable>

      {/* 2. CD */}
      <Pressable
        onPress={() => onPressComponent?.("forehand")}
        className="flex-1 bg-surface/70 border border-surface rounded-2xl p-2.5 items-center justify-between active:opacity-75 min-h-[76px]"
      >
        <Waves size={16} color={colors.secondary} />
        <Text className="text-[9px] font-bold text-secondary uppercase mt-1">
          CD
        </Text>
        <Text
          className="text-[11px] font-bold text-white text-center leading-tight"
          numberOfLines={1}
        >
          {gear.forehandRubber.name}
        </Text>
        <Text className="text-[9px] text-muted font-medium">
          {gear.forehandRubber.thickness}
        </Text>
      </Pressable>

      {/* 3. RV */}
      <Pressable
        onPress={() => onPressComponent?.("backhand")}
        className="flex-1 bg-surface/70 border border-surface rounded-2xl p-2.5 items-center justify-between active:opacity-75 min-h-[76px]"
      >
        <Flame size={16} color={colors.red} />
        <Text className="text-[9px] font-bold text-red uppercase mt-1">
          RV
        </Text>
        <Text
          className="text-[11px] font-bold text-white text-center leading-tight"
          numberOfLines={1}
        >
          {gear.backhandRubber.name}
        </Text>
        <Text className="text-[9px] text-muted font-medium">
          {gear.backhandRubber.thickness}
        </Text>
      </Pressable>

      {/* 4. Manche */}
      <Pressable
        onPress={() => onPressComponent?.("handle")}
        className="flex-1 bg-surface/70 border border-surface rounded-2xl p-2.5 items-center justify-between active:opacity-75 min-h-[76px]"
      >
        <Shield size={16} color={colors.primary} />
        <Text className="text-[9px] font-bold text-primary uppercase mt-1">
          MANCHE
        </Text>
        <Text
          className="text-[11px] font-bold text-white text-center leading-tight"
          numberOfLines={1}
        >
          {handleTypeLabel}
        </Text>
        <Text className="text-[9px] text-muted font-medium">
          {handleDesc}
        </Text>
      </Pressable>
    </View>
  );
}
