import ScreenLayout from "@/src/components/ui/screen-layout";
import { colors } from "@/src/lib/colors";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function GearDraftScreen() {
  // Mock data local pour tester le rendu du compteur
  const [setupCount, setSetupCount] = useState(3);

  return (
    <ScreenLayout scrollable edges={["left", "right"]}>
      {/* ──────────────────────────────────────────────────────────── */}
      {/* CONTENEUR PARENT #1 : Header de l'écran (Titre + Action)    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <View className="flex-row items-center justify-between mb-4 px-1">
        {/* Titre & Compteur */}
        <View>
          <Text className="font-oswald text-2xl text-white tracking-wider">
            MON SAC
          </Text>
          <Text className="text-xs text-muted font-medium">
            {setupCount} {setupCount > 1 ? "setups enregistrés" : "setup enregistré"}
          </Text>
        </View>

        {/* Bouton d'action principal */}
        <Pressable
          onPress={() => {
            // TODO: [Étape Modale] Déclencher l'ouverture du formulaire d'ajout
            console.log("Action : Ajouter un setup");
          }}
          hitSlop={8}
          className="flex-row items-center gap-1.5 bg-primary px-3 py-1.5 rounded-xl active:opacity-80 shadow-md shadow-primary/20"
        >
          <Plus size={15} color={colors.background} strokeWidth={2.5} />
          <Text className="text-xs font-bold text-background uppercase">
            Ajouter
          </Text>
        </Pressable>
      </View>

      {/* Emplacement du Conteneur Parent #2 à venir */}
    </ScreenLayout>
  );
}

