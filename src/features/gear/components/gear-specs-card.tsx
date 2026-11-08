import { colors } from "@/src/lib/colors";
import { GearSetup } from "@/src/features/gear/types/gear.types";
import { Activity, Calendar, Clock, Scale } from "lucide-react-native";
import { Text, View } from "react-native";

interface GearSpecsCardProps {
  gear: GearSetup;
}

export function GearSpecsCard({ gear }: GearSpecsCardProps) {
  return (
    <View className="rounded-3xl border border-surface bg-[#101323] p-4 mb-3">
      {/* En-tête compact */}
      <View className="flex-row items-center justify-between mb-3 pb-2 border-b border-surface/70">
        <View className="flex-row items-center gap-1.5">
          <Activity size={15} color={colors.primary} />
          <Text className="font-oswald text-sm text-white uppercase tracking-wider">
            ÉTAT DU SETUP
          </Text>
        </View>
        <Text className="text-[10px] text-muted font-bold">
          {gear.totalPlayTimeHours} h d'utilisation
        </Text>
      </View>

      {/* Ligne métriques : Poids / Âge / Dernier changement */}
      <View className="flex-row justify-between mb-3 bg-background/50 rounded-2xl p-2.5 border border-surface/40">
        <View className="items-center flex-1">
          <View className="flex-row items-center gap-1 mb-0.5">
            <Scale size={12} color={colors.primary} />
            <Text className="text-[10px] text-muted uppercase font-bold">Poids</Text>
          </View>
          <Text className="text-xs font-bold text-white">{gear.weightGrams} g</Text>
        </View>

        <View className="w-[1px] bg-surface h-full" />

        <View className="items-center flex-1">
          <View className="flex-row items-center gap-1 mb-0.5">
            <Calendar size={12} color={colors.secondary} />
            <Text className="text-[10px] text-muted uppercase font-bold">Âge</Text>
          </View>
          <Text className="text-xs font-bold text-white">{gear.assemblyAgeMonths} mois</Text>
        </View>

        <View className="w-[1px] bg-surface h-full" />

        <View className="items-center flex-1">
          <View className="flex-row items-center gap-1 mb-0.5">
            <Clock size={12} color={colors.muted} />
            <Text className="text-[10px] text-muted uppercase font-bold">Changement</Text>
          </View>
          <Text className="text-[11px] font-bold text-neutral">
            {gear.lastMaintenanceDate}
          </Text>
        </View>
      </View>

      {/* Barres d'usure CD et RV */}
      <View className="space-y-2">
        {/* CD */}
        <View className="mb-2">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-[11px] text-neutral font-medium">
              CD • {gear.forehandRubber.name}
            </Text>
            <Text className="text-[11px] font-bold text-secondary">
              {gear.forehandRubber.wearPercentage}%
            </Text>
          </View>
          <View className="h-1.5 bg-background rounded-full overflow-hidden">
            <View
              className="h-full bg-secondary rounded-full"
              style={{ width: `${gear.forehandRubber.wearPercentage}%` }}
            />
          </View>
        </View>

        {/* RV */}
        <View>
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-[11px] text-neutral font-medium">
              RV • {gear.backhandRubber.name}
            </Text>
            <Text className="text-[11px] font-bold text-red">
              {gear.backhandRubber.wearPercentage}%
            </Text>
          </View>
          <View className="h-1.5 bg-background rounded-full overflow-hidden">
            <View
              className="h-full bg-red rounded-full"
              style={{ width: `${gear.backhandRubber.wearPercentage}%` }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
