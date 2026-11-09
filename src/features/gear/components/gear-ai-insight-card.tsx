import { colors } from "@/src/lib/colors";
import { GearSetup } from "@/src/features/gear/types/gear.types";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRight, Sparkles } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface GearAiInsightCardProps {
  gear: GearSetup;
  onPress?: () => void;
}

export function GearAiInsightCard({ gear, onPress }: GearAiInsightCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-2xl border border-primary/70 active:opacity-90"
      style={{ elevation: 6, shadowColor: colors.primary }}
    >
      {/* Fond : dégradé nuit ➜ bleu électrique (NativeWind ne gère pas bg-gradient-* en natif) */}
      <LinearGradient
        colors={[colors.background, colors.surface, `${colors.secondary}66`]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Reflet diagonal or / bleu (remplace le halo blur, non supporté sur Android) */}
      <LinearGradient
        colors={["transparent", `${colors.primary}33`, "transparent"]}
        start={{ x: 0.55, y: 1 }}
        end={{ x: 0.95, y: 0 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Contenu : icône ✦ | titre + action recommandée | chevron */}
      <View className="flex-row items-center gap-4 px-5 py-4">
        <Sparkles size={26} color={colors.primary} strokeWidth={1.6} />

        <View className="flex-1">
          <Text className="text-base font-bold text-primary">Conseil IA</Text>
          <Text className="text-sm text-neutral mt-0.5" numberOfLines={1}>
            {gear.aiAdvice.recommendedAction}
          </Text>
        </View>

        <ChevronRight size={20} color={colors.neutral} />
      </View>
    </Pressable>
  );
}
