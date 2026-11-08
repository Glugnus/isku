import { colors } from "@/src/lib/colors";
import { GearSetup } from "@/src/features/gear/types/gear.types";
import { ChevronRight, Sparkles } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface GearAiInsightCardProps {
  gear: GearSetup;
  onPress?: () => void;
}

export function GearAiInsightCard({ gear, onPress }: GearAiInsightCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-3xl border border-primary/40 bg-gradient-to-r from-[#121526] via-[#10142B] to-[#141C35] p-4 mb-3 relative overflow-hidden active:opacity-90"
      style={{
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 14,
      }}
    >
      {/* Halo subtil or / bleu en fond */}
      <View className="absolute -top-10 -right-10 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      {/* Titre avec symbole ✦ */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-1.5">
          <Sparkles size={14} color={colors.primary} />
          <Text className="text-[11px] font-bold text-primary tracking-widest uppercase">
            ✦ CONSEIL ISKU
          </Text>
        </View>

        <ChevronRight size={16} color={colors.neutral} />
      </View>

      {/* Accroche */}
      <Text className="text-sm font-bold text-white mb-1">
        {gear.aiAdvice.headline}
      </Text>

      {/* Texte de l'analyse */}
      <Text className="text-xs text-neutral leading-relaxed">
        {gear.aiAdvice.adviceText}
      </Text>
    </Pressable>
  );
}
