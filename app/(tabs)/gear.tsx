import ScreenLayout from "@/src/components/ui/screen-layout";
import { colors } from "@/src/lib/colors";
import { GearAiInsightCard } from "@/src/features/gear/components/gear-ai-insight-card";
import { GearBlueprintCard } from "@/src/features/gear/components/gear-blueprint-card";
import { GearCarousel } from "@/src/features/gear/components/gear-carousel";
import { GearComponentPills } from "@/src/features/gear/components/gear-component-pills";
import { GearFormModal } from "@/src/features/gear/components/gear-form-modal";
import { GearSpecsCard } from "@/src/features/gear/components/gear-specs-card";
import {
  GearSetup,
  MOCK_GEAR_SETUPS,
} from "@/src/features/gear/types/gear.types";
import { Pencil, Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function GearScreen() {
  const [setups, setSetups] = useState<GearSetup[]>(MOCK_GEAR_SETUPS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGear, setEditingGear] = useState<GearSetup | null>(null);

  const activeGear = setups[selectedIndex] ?? setups[0];

  const handleOpenAddModal = () => {
    setEditingGear(null);
    setIsModalVisible(true);
  };

  const handleOpenEditModal = () => {
    setEditingGear(activeGear);
    setIsModalVisible(true);
  };

  const handleSaveGear = (data: Partial<GearSetup>) => {
    if (editingGear) {
      setSetups((prev) =>
        prev.map((item) =>
          item.id === editingGear.id ? ({ ...item, ...data } as GearSetup) : item
        )
      );
    } else {
      const newSetupNumber = setups.length + 1;
      const newGear: GearSetup = {
        id: `setup-0${newSetupNumber}`,
        userId: "user-current",
        sport: data.sport ?? "table_tennis",
        setupNumber: newSetupNumber,
        name: data.name ?? `Setup #0${newSetupNumber} — OFF`,
        category: data.category ?? "OFF",
        status: data.status ?? "backup",
        blade: data.blade ?? {
          brand: "Butterfly",
          name: "Butterfly Timo Boll ALC",
          category: "OFF",
          handleType: "flared",
        },
        forehandRubber: data.forehandRubber ?? {
          brand: "Butterfly",
          name: "Tenergy 05",
          thickness: "2.1mm",
          color: "black",
          wearPercentage: 98,
          hoursUsed: 2,
        },
        backhandRubber: data.backhandRubber ?? {
          brand: "Butterfly",
          name: "Dignics 09C",
          thickness: "2.1mm",
          color: "red",
          wearPercentage: 98,
          hoursUsed: 2,
        },
        weightGrams: data.weightGrams ?? 182,
        assembledAt: data.assembledAt ?? new Date().toISOString().split("T")[0],
        assemblyAgeMonths: 0,
        totalPlayTimeHours: 2,
        lastMaintenanceDate: "Aujourd'hui",
        nextCheckupEstimate: "dans ~6 mois",
        aiAdvice: {
          title: "CONSEIL ISKU",
          headline: "Nouveau setup prêt au combat.",
          adviceText:
            "Ce setup vient d'être monté. Profite de la réactivité maximale de tes nouvelles plaques pour peaufiner tes remises d'attaque.",
          recommendedAction: "Optimiser ce setup",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setSetups((prev) => [...prev, newGear]);
      setSelectedIndex(setups.length);
    }
  };

  return (
    <ScreenLayout scrollable edges={["left", "right"]}>
      {/* 1. Header supérieur : Titre MON SAC & CTA d'ajout */}
      <View className="flex-row items-center justify-between mb-3 px-1">
        <View>
          <Text className="font-oswald text-2xl text-white tracking-wider">
            MON SAC
          </Text>
          <Text className="text-xs text-muted font-medium">
            {setups.length} setups enregistrés
          </Text>
        </View>

        <Pressable
          onPress={handleOpenAddModal}
          hitSlop={8}
          className="flex-row items-center gap-1.5 bg-primary px-3 py-1.5 rounded-xl active:opacity-80 shadow-md shadow-primary/20"
        >
          <Plus size={15} color={colors.background} strokeWidth={2.5} />
          <Text className="text-xs font-bold text-background uppercase">
            Ajouter
          </Text>
        </Pressable>
      </View>

      {/* 2. NIVEAU 1 : Carrousel horizontal visuel de setups (cartes miniatures avec scale & snap) */}
      <GearCarousel
        setups={setups}
        selectedIndex={selectedIndex}
        onSelectIndex={setSelectedIndex}
      />

      {/* 3. NIVEAU 2 : Grande zone Exploded Blueprint pour le setup sélectionné */}
      {activeGear && <GearBlueprintCard gear={activeGear} />}

      {/* 4. Les 4 mini-fiches composants techniques (Bois, CD, RV, Manche) */}
      {activeGear && <GearComponentPills gear={activeGear} />}

      {/* 5. Diagnostic compact de l'état du setup */}
      {activeGear && <GearSpecsCard gear={activeGear} />}

      {/* 6. Carte Conseil IA Isku */}
      {activeGear && (
        <GearAiInsightCard
          gear={activeGear}
          onPress={() => {
            // Interaction tactile disponible pour ouvrir une analyse détaillée
          }}
        />
      )}

      {/* 7. Action secondaire "Modifier ce setup" */}
      <Pressable
        onPress={handleOpenEditModal}
        hitSlop={8}
        className="w-full py-2.5 rounded-2xl bg-surface/50 border border-surface flex-row items-center justify-center gap-2 mb-6 active:opacity-70"
      >
        <Pencil size={13} color={colors.neutral} />
        <Text className="text-xs font-bold text-neutral">Modifier ce setup</Text>
      </Pressable>

      {/* 8. Modale de création / édition de setup */}
      <GearFormModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        initialData={editingGear}
        onSave={handleSaveGear}
      />
    </ScreenLayout>
  );
}
