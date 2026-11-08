import { colors } from "@/src/lib/colors";
import { TableTennisGearSetup } from "@/src/features/gear/types/gear.types";
import { Clock, Layers, Shield, Wrench } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

interface GearBlueprintCardProps {
  gear: TableTennisGearSetup;
  onEdit?: (gearId: string) => void;
  onSetDefault?: (gearId: string) => void;
}

export function GearBlueprintCard({
  gear,
  onEdit,
  onSetDefault,
}: GearBlueprintCardProps) {
  // TODO: [Logique Métier] Formater le temps de jeu cumulé (playTimeMinutes) en heures et minutes (ex: 12h 30m)
  const formattedHours = Math.floor(gear.playTimeMinutes / 60);
  const formattedMinutes = gear.playTimeMinutes % 60;

  // TODO: [Logique Métier] Calculer le ratio d'usure estimé (ex: seuil max de 60 heures pour des plaques de ping)
  const maxHoursThreshold = 60;
  const wearPercentage = Math.min(
    Math.round((formattedHours / maxHoursThreshold) * 100),
    100
  );

  return (
    <View className="rounded-2xl border border-surface bg-surface/60 p-5 mb-4 shadow-lg">
      {/* 1. Header Technique de la Raquette */}
      <View className="flex-row items-center justify-between border-b border-surface/80 pb-3 mb-4">
        <View className="flex-1 mr-2">
          <View className="flex-row items-center gap-2">
            <Text className="font-oswald text-xl text-white tracking-wide">
              {gear.name.toUpperCase()}
            </Text>
            {gear.isDefault && (
              <View className="bg-primary/20 border border-primary/50 px-2 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-primary uppercase">
                  Défaut
                </Text>
              </View>
            )}
          </View>
          <Text className="text-xs text-muted font-medium mt-0.5">
            {gear.blade.brand} • {gear.weightGrams ? `${gear.weightGrams}g` : "Poids n/c"}
            {gear.assembledAt ? ` • Montée le ${gear.assembledAt}` : ""}
          </Text>
        </View>

        <Pressable
          hitSlop={8}
          onPress={() => {
            // TODO: [Interaction] Déclencher l'ouverture de la modale d'édition
            onEdit?.(gear.id);
          }}
          className="p-2 rounded-xl bg-surface border border-muted/20 active:opacity-70"
        >
          <Wrench size={16} color={colors.neutral} />
        </Pressable>
      </View>

      {/* 2. Zone Blueprint : Vue Éclatée Technique */}
      <View className="relative py-4 items-center justify-center bg-background/50 rounded-xl border border-surface/50 overflow-hidden min-h-[220px]">
        {/* Grille SVG en filigrane (effet plan d'ingénieur) */}
        <View className="absolute inset-0 opacity-10">
          <Svg width="100%" height="100%">
            <Line x1="0" y1="50%" x2="100%" y2="50%" stroke={colors.muted} strokeDasharray="4, 4" />
            <Line x1="50%" y1="0" x2="50%" y2="100%" stroke={colors.muted} strokeDasharray="4, 4" />
          </Svg>
        </View>

        {/* Lignes d'annotations et pièces éclatées */}
        <View className="w-full flex-row items-center justify-between px-3 z-10">
          {/* Pièce Éclatée GAUCHE : Revêtement Coup Droit */}
          <View className="w-[30%] items-start">
            <View className="rounded-lg bg-surface/90 border border-surface p-2.5 w-full shadow-sm">
              <View className="flex-row items-center gap-1.5 mb-1">
                <View
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      gear.forehandRubber.color === "black" ? "#222222" : colors.red,
                  }}
                />
                <Text className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  Coup Droit
                </Text>
              </View>
              <Text className="text-xs font-bold text-white numberOfLines={1}">
                {gear.forehandRubber.name}
              </Text>
              <Text className="text-[10px] text-primary font-medium mt-0.5">
                {gear.forehandRubber.thickness}
              </Text>
            </View>
          </View>

          {/* Pièce CENTRALE : Le Bois (Blade) */}
          <View className="w-[34%] items-center px-1">
            <View className="w-16 h-20 rounded-full border-2 border-primary/40 bg-surface items-center justify-center relative shadow-md">
              <Shield size={24} color={colors.primary} />
              {/* Manche stylisé en bas du bois */}
              <View className="absolute -bottom-5 w-5 h-7 rounded-b-md bg-neutral/30 border border-neutral/50" />
            </View>
            <View className="mt-7 items-center">
              <Text className="text-xs font-bold text-white text-center">
                {gear.blade.name}
              </Text>
              <Text className="text-[10px] text-muted capitalize text-center">
                Manche {gear.blade.handleType}
              </Text>
            </View>
          </View>

          {/* Pièce Éclatée DROITE : Revêtement Revers */}
          <View className="w-[30%] items-end">
            <View className="rounded-lg bg-surface/90 border border-surface p-2.5 w-full shadow-sm">
              <View className="flex-row items-center justify-end gap-1.5 mb-1">
                <Text className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  Revers
                </Text>
                <View
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      gear.backhandRubber.color === "black" ? "#222222" : colors.red,
                  }}
                />
              </View>
              <Text className="text-xs font-bold text-white text-right numberOfLines={1}">
                {gear.backhandRubber.name}
              </Text>
              <Text className="text-[10px] text-primary font-medium mt-0.5 text-right">
                {gear.backhandRubber.thickness}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 3. Footer : Usure & Cumul Temps de Jeu */}
      <View className="mt-4 pt-3 border-t border-surface/60">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-1.5">
            <Clock size={14} color={colors.muted} />
            <Text className="text-xs text-muted">Temps de jeu effectif :</Text>
          </View>
          <Text className="text-xs font-bold text-white">
            {formattedHours}h {formattedMinutes > 0 ? `${formattedMinutes}m` : ""}
          </Text>
        </View>

        {/* Barre de progression / Usure du matériel */}
        <View className="h-1.5 w-full bg-surface rounded-full overflow-hidden mb-1">
          <View
            className="h-full bg-primary rounded-full"
            style={{ width: `${wearPercentage}%` }}
          />
        </View>

        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-[10px] text-muted">
            Usure estimée des plaques
          </Text>
          <Text className="text-[10px] font-bold text-neutral">
            {wearPercentage}% / {maxHoursThreshold}h
          </Text>
        </View>
      </View>
    </View>
  );
}

