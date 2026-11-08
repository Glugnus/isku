import ScreenLayout from "@/src/components/ui/screen-layout";
import { colors } from "@/src/lib/colors";
import { GearBlueprintCard } from "@/src/features/gear/components/gear-blueprint-card";
import { MOCK_GEAR_SETUPS } from "@/src/features/gear/types/gear.types";
import { Plus, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function GearScreen() {
  // TODO: [State] Remplacer les mock data par le hook useUserGear() branché sur Supabase
  const [setups] = useState(MOCK_GEAR_SETUPS);
  const [selectedGearId, setSelectedGearId] = useState<string>(
    setups[0]?.id ?? ""
  );

  const activeGear = setups.find((g) => g.id === selectedGearId) ?? setups[0];

  return (
    <ScreenLayout scrollable edges={["left", "right"]}>
      {/* En-tête de l'écran avec bouton d'ajout */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="font-oswald text-2xl text-white">MON SAC</Text>
          <Text className="text-xs text-muted">
            {setups.length} configuration{setups.length > 1 ? "s" : ""} enregistrée{setups.length > 1 ? "s" : ""}
          </Text>
        </View>

        <Pressable
          onPress={() => {
            // TODO: [Action] Ouvrir la modale d'ajout d'une nouvelle raquette
          }}
          className="flex-row items-center gap-1.5 bg-primary px-3 py-2 rounded-xl active:opacity-80"
        >
          <Plus size={16} color={colors.background} />
          <Text className="text-xs font-bold text-background uppercase">
            Ajouter
          </Text>
        </Pressable>
      </View>

      {/* Rendu du prototype de la vue éclatée / Blueprint */}
      {activeGear && (
        <GearBlueprintCard
          gear={activeGear}
          onEdit={(id) => {
            // TODO: [Action] Gérer l'édition du setup id
          }}
          onSetDefault={(id) => {
            // TODO: [Action] Marquer ce setup comme raquette par défaut
          }}
        />
      )}

      {/* TODO: [Prochaine Étape - Étape 4] Carrousel horizontal animé pour switcher entre les configurations */}
      <View className="p-4 rounded-xl border border-dashed border-muted/30 bg-surface/30 items-center justify-center my-2">
        <View className="flex-row items-center gap-2 mb-1">
          <Sparkles size={16} color={colors.primary} />
          <Text className="text-xs font-bold text-neutral">
            Zone Carrousel & Sélecteur multi-setups
          </Text>
        </View>
        <Text className="text-[11px] text-muted text-center">
          Prochaine sous-étape : défilement horizontal avec zoom sur la raquette active.
        </Text>
      </View>
    </ScreenLayout>
  );
}

