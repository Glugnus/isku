import { colors } from "@/src/lib/colors";
import { GearSetup } from "@/src/features/gear/types/gear.types";
import { Layers, Shield, Waves } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface GearComponentPillsProps {
  gear: GearSetup;
  onPressComponent?: (componentKey: string) => void;
}

// Style partagé des 4 tuiles (fond surface translucide + liseré discret)
const PILL_CLASSNAME =
  "flex-1 min-h-[96px] items-center rounded-2xl border border-white/10 bg-surface/60 px-1.5 pt-3 pb-2.5 active:opacity-75";

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
    <View className="flex-row gap-2 mb-4">
      {/* 1. Bois */}
      <Pressable onPress={() => onPressComponent?.("blade")} className={PILL_CLASSNAME}>
        <Layers size={20} color={colors.primary} strokeWidth={1.6} />
        <Text className="text-xs font-bold text-primary mt-2">Bois</Text>
        <Text
          className="text-[12px] text-neutral text-center leading-4 mt-0.5"
          numberOfLines={2}
        >
          {gear.blade.name}
        </Text>
      </Pressable>

      {/* 2. CD */}
      <Pressable onPress={() => onPressComponent?.("forehand")} className={PILL_CLASSNAME}>
        <Waves size={20} color={colors.secondary} strokeWidth={1.6} />
        <Text className="text-xs font-bold text-secondary mt-2">CD</Text>
        <Text
          className="text-[12px] text-neutral text-center leading-4 mt-0.5"
          numberOfLines={2}
        >
          {gear.forehandRubber.name}
        </Text>
      </Pressable>

      {/* 3. RV */}
      <Pressable onPress={() => onPressComponent?.("backhand")} className={PILL_CLASSNAME}>
        <Waves size={20} color={colors.red} strokeWidth={1.6} />
        <Text className="text-xs font-bold text-red mt-2">RV</Text>
        <Text
          className="text-[12px] text-neutral text-center leading-4 mt-0.5"
          numberOfLines={2}
        >
          {gear.backhandRubber.name}
        </Text>
      </Pressable>

      {/* 4. Manche */}
      <Pressable onPress={() => onPressComponent?.("handle")} className={PILL_CLASSNAME}>
        <Shield size={20} color={colors.neutral} strokeWidth={1.6} />
        <Text className="text-xs font-bold text-primary mt-2">Manche</Text>
        <Text
          className="text-[12px] text-neutral text-center leading-4 mt-0.5"
          numberOfLines={2}
        >
          {handleTypeLabel} / {handleDesc}
        </Text>
      </Pressable>
    </View>
  );
}
