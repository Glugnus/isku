import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import { colors } from "@/src/lib/colors";
import {
  GearSetup,
  HandleType,
  RubberColor,
  SetupStatus,
  SpeedCategory,
  SpongeThickness,
  SportType,
} from "@/src/features/gear/types/gear.types";
import { X } from "lucide-react-native";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

interface GearFormModalProps {
  visible: boolean;
  onClose: () => void;
  initialData?: GearSetup | null;
  onSave?: (data: Partial<GearSetup>) => void;
}

const SPORTS: { label: string; value: SportType }[] = [
  { label: "Tennis de table", value: "table_tennis" },
  { label: "Tennis", value: "tennis" },
  { label: "Padel", value: "padel" },
  { label: "Badminton", value: "badminton" },
];

const SPEED_CATEGORIES: SpeedCategory[] = ["DEF", "ALL-", "ALL", "ALL+", "OFF-", "OFF", "OFF+"];

const HANDLE_TYPES: { label: string; value: HandleType }[] = [
  { label: "FL / Concave", value: "flared" },
  { label: "ST / Droit", value: "straight" },
  { label: "AN / Anatomique", value: "anatomic" },
  { label: "CP / Porte-plume", value: "penhold" },
];

const THICKNESS_OPTIONS: SpongeThickness[] = [
  "1.5mm",
  "1.7mm",
  "1.8mm",
  "1.9mm",
  "2.0mm",
  "2.1mm",
  "max",
];

const STATUS_OPTIONS: { label: string; value: SetupStatus }[] = [
  { label: "Actif", value: "active" },
  { label: "Réserve", value: "backup" },
  { label: "Archivé", value: "archived" },
];

export function GearFormModal({
  visible,
  onClose,
  initialData,
  onSave,
}: GearFormModalProps) {
  // Squelette de données pour prototypage
  const [name, setName] = useState(initialData?.name ?? "Setup #04 — OFF");
  const [sport, setSport] = useState<SportType>(initialData?.sport ?? "table_tennis");
  const [category, setCategory] = useState<SpeedCategory>(
    initialData?.category ?? "OFF"
  );
  const [status, setStatus] = useState<SetupStatus>(
    initialData?.status ?? "active"
  );
  const [bladeBrand, setBladeBrand] = useState(initialData?.blade.brand ?? "");
  const [bladeName, setBladeName] = useState(
    initialData?.blade.name ?? "Butterfly Viscaria"
  );
  const [handleType, setHandleType] = useState<HandleType>(
    initialData?.blade.handleType ?? "flared"
  );
  const [forehandName, setForehandName] = useState(
    initialData?.forehandRubber.name ?? "Tenergy 05"
  );
  const [forehandThickness, setForehandThickness] = useState<SpongeThickness>(
    initialData?.forehandRubber.thickness ?? "2.1mm"
  );
  const [forehandColor, setForehandColor] = useState<RubberColor>(
    initialData?.forehandRubber.color ?? "black"
  );
  const [backhandName, setBackhandName] = useState(
    initialData?.backhandRubber.name ?? "Dignics 09C"
  );
  const [backhandThickness, setBackhandThickness] = useState<SpongeThickness>(
    initialData?.backhandRubber.thickness ?? "2.1mm"
  );
  const [backhandColor, setBackhandColor] = useState<RubberColor>(
    initialData?.backhandRubber.color ?? "red"
  );
  const [weight, setWeight] = useState(
    initialData?.weightGrams ? String(initialData.weightGrams) : "184"
  );
  const [assembledAt, setAssembledAt] = useState(
    initialData?.assembledAt ?? "2026-03-12"
  );

  const handleSubmit = () => {
    // TODO: [Validation Zod & Mutation Supabase] Remplacer le mock handler par le hook métier
    onSave?.({
      name,
      sport,
      category,
      status,
      blade: {
        brand: bladeBrand || "Butterfly",
        name: bladeName,
        category,
        handleType,
      },
      forehandRubber: {
        brand: "Butterfly",
        name: forehandName,
        thickness: forehandThickness,
        color: forehandColor,
        wearPercentage: 95,
        hoursUsed: 5,
      },
      backhandRubber: {
        brand: "Butterfly",
        name: backhandName,
        thickness: backhandThickness,
        color: backhandColor,
        wearPercentage: 95,
        hoursUsed: 5,
      },
      weightGrams: weight ? parseInt(weight, 10) : 180,
      assembledAt,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/80">
        <View className="bg-[#121422] rounded-t-3xl border-t border-surface p-5 max-h-[90%]">
          {/* Header */}
          <View className="flex-row items-center justify-between pb-3 mb-3 border-b border-surface">
            <Text className="font-oswald text-xl text-white uppercase tracking-wider">
              {initialData ? "Modifier le setup" : "Ajouter un setup"}
            </Text>
            <Pressable
              hitSlop={8}
              onPress={onClose}
              className="p-1 rounded-full bg-surface"
            >
              <X size={18} color={colors.neutral} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="space-y-4">
            {/* Statut du Setup */}
            <View className="mb-2">
              <Text className="text-[10px] text-muted font-bold uppercase mb-1.5">
                Statut du setup
              </Text>
              <View className="flex-row gap-2">
                {STATUS_OPTIONS.map((opt) => (
                  <Pressable
                    key={opt.value}
                    onPress={() => setStatus(opt.value)}
                    className={`flex-1 py-2 rounded-xl items-center border ${
                      status === opt.value
                        ? "bg-primary border-primary"
                        : "bg-surface border-surface"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        status === opt.value ? "text-background" : "text-neutral"
                      }`}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Sport (Multi-sport preparation) */}
            <View className="mb-2">
              <Text className="text-[10px] text-muted font-bold uppercase mb-1.5">
                Discipline sportive
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                {SPORTS.map((sp) => (
                  <Pressable
                    key={sp.value}
                    onPress={() => setSport(sp.value)}
                    className={`py-1.5 px-3 rounded-lg border mr-2 ${
                      sport === sp.value
                        ? "bg-secondary border-secondary"
                        : "bg-surface border-surface"
                    }`}
                  >
                    <Text
                      className={`text-[11px] font-bold ${
                        sport === sp.value ? "text-white" : "text-muted"
                      }`}
                    >
                      {sp.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Nom du Setup */}
            <Input
              label="NOM DU SETUP"
              value={name}
              onChangeText={setName}
              placeholder="Ex: Setup #01 — OFF+"
              size="sm"
            />

            {/* Catégorie de vitesse */}
            <View className="mt-2 mb-2">
              <Text className="text-[10px] text-muted font-bold uppercase mb-1.5">
                Catégorie de vitesse
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-1.5">
                {SPEED_CATEGORIES.map((cat) => (
                  <Pressable
                    key={cat}
                    onPress={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg border mr-1.5 ${
                      category === cat
                        ? "bg-primary border-primary"
                        : "bg-surface border-surface"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        category === cat ? "text-background" : "text-neutral"
                      }`}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Section Bois */}
            <View className="border-t border-surface pt-3 mt-2">
              <Text className="text-xs font-bold text-primary uppercase mb-2">
                1. Le Bois (Blade)
              </Text>
              <Input
                label="MARQUE ET MODÈLE DU BOIS"
                value={bladeName}
                onChangeText={setBladeName}
                placeholder="Ex: Butterfly Viscaria"
                size="sm"
              />

              <Text className="text-[10px] text-muted font-bold uppercase mt-2 mb-1.5">
                Type de manche
              </Text>
              <View className="flex-row gap-1.5">
                {HANDLE_TYPES.map((h) => (
                  <Pressable
                    key={h.value}
                    onPress={() => setHandleType(h.value)}
                    className={`flex-1 py-1.5 px-1 rounded-lg items-center border ${
                      handleType === h.value
                        ? "bg-primary border-primary"
                        : "bg-surface border-surface"
                    }`}
                  >
                    <Text
                      className={`text-[10px] font-bold ${
                        handleType === h.value ? "text-background" : "text-neutral"
                      }`}
                      numberOfLines={1}
                    >
                      {h.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Section Coup Droit */}
            <View className="border-t border-surface pt-3 mt-2">
              <Text className="text-xs font-bold text-secondary uppercase mb-2">
                2. Revêtement Coup Droit (CD)
              </Text>
              <Input
                label="MODÈLE DE PLAQUE"
                value={forehandName}
                onChangeText={setForehandName}
                placeholder="Ex: Tenergy 05"
                size="sm"
              />

              <Text className="text-[10px] text-muted font-bold uppercase mt-2 mb-1.5">
                Épaisseur de mousse
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-1.5">
                {THICKNESS_OPTIONS.map((th) => (
                  <Pressable
                    key={th}
                    onPress={() => setForehandThickness(th)}
                    className={`px-3 py-1.5 rounded-lg border mr-1.5 ${
                      forehandThickness === th
                        ? "bg-secondary border-secondary"
                        : "bg-surface border-surface"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        forehandThickness === th ? "text-white" : "text-neutral"
                      }`}
                    >
                      {th}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Section Revers */}
            <View className="border-t border-surface pt-3 mt-2">
              <Text className="text-xs font-bold text-red uppercase mb-2">
                3. Revêtement Revers (RV)
              </Text>
              <Input
                label="MODÈLE DE PLAQUE"
                value={backhandName}
                onChangeText={setBackhandName}
                placeholder="Ex: Dignics 09C"
                size="sm"
              />

              <Text className="text-[10px] text-muted font-bold uppercase mt-2 mb-1.5">
                Épaisseur de mousse
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-1.5">
                {THICKNESS_OPTIONS.map((th) => (
                  <Pressable
                    key={th}
                    onPress={() => setBackhandThickness(th)}
                    className={`px-3 py-1.5 rounded-lg border mr-1.5 ${
                      backhandThickness === th
                        ? "bg-red border-red"
                        : "bg-surface border-surface"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        backhandThickness === th ? "text-white" : "text-neutral"
                      }`}
                    >
                      {th}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Poids & Montage */}
            <View className="border-t border-surface pt-3 mt-2 gap-2">
              <Input
                label="POIDS TOTAL ESTIMÉ (EN GRAMMES)"
                value={weight}
                onChangeText={setWeight}
                placeholder="184"
                keyboardType="numeric"
                size="sm"
              />
              <Input
                label="DATE DE MONTAGE (AAAA-MM-JJ)"
                value={assembledAt}
                onChangeText={setAssembledAt}
                placeholder="2026-03-12"
                size="sm"
              />
            </View>

            {/* Boutons d'action */}
            <View className="pt-4 pb-8 gap-2">
              <Button
                title={initialData ? "Enregistrer les modifications" : "Créer ce setup"}
                onPress={handleSubmit}
                variant="primary"
              />
              <Button title="Annuler" onPress={onClose} variant="ghost" />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
