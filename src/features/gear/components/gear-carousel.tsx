import { colors } from "@/src/lib/colors";
import { GearSetupThumbnail } from "@/src/features/gear/components/gear-setup-thumbnail";
import { GearSetup } from "@/src/features/gear/types/gear.types";
import { Check } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

interface GearCarouselProps {
  setups: GearSetup[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  /** Contenu central du setup sélectionné (ex : <GearBlueprintCard />), injecté par l'écran */
  children: ReactNode;
}

/**
 * Scène du carrousel :
 *   [voisin précédent]   [cadre titre + contenu central animé]   [voisin suivant]
 * Le carrousel POSSÈDE l'animation ; le contenu central (children) reste présentationnel.
 */
export function GearCarousel({
  setups,
  selectedIndex,
  onSelectIndex,
  children,
}: GearCarouselProps) {
  const selected = setups[selectedIndex];

  // TODO: [Boucle infinie] Calculer les index des voisins.
  //       Indice : opérateur modulo (%) — attention au cas selectedIndex = 0 pour le précédent.
  const prevIndex = selectedIndex;
  const nextIndex = selectedIndex;

  const handleSelectPrevious = () => {
    // TODO: [Navigation] Mémoriser la direction (utile pour l'animation) puis notifier le parent.
  };

  const handleSelectNext = () => {
    // TODO: [Navigation] Idem, direction inverse.
  };

  // TODO: [Swipe] Détecter un swipe horizontal sur la scène et appeler
  //       handleSelectPrevious / handleSelectNext selon le sens.
  //       Piste : GestureDetector (react-native-gesture-handler). Point d'attention :
  //       les callbacks de geste tournent sur le thread UI (worklets) — comment appeler
  //       une fonction JS (setState) depuis là ?

  if (!selected) return null;

  const isActive = selected.status === "active";

  return (
    <View className="relative mb-4 -mx-6">
      {/* 1. Voisins estompés (rendus AVANT le centre pour passer derrière) */}
      <Pressable
        onPress={handleSelectPrevious}
        hitSlop={8}
        className="absolute -left-3 top-2 z-0 opacity-40"
        style={{ transform: [{ scale: 0.85 }, { rotate: "-8deg" }] }}
      >
        <GearSetupThumbnail setup={setups[prevIndex]} side="left" />
      </Pressable>

      <Pressable
        onPress={handleSelectNext}
        hitSlop={8}
        className="absolute -right-3 top-2 z-0 opacity-40"
        style={{ transform: [{ scale: 0.85 }, { rotate: "8deg" }] }}
      >
        <GearSetupThumbnail setup={setups[nextIndex]} side="right" />
      </Pressable>

      {/* 2. Cadre titre du setup sélectionné (unique source du titre : pas de doublon dans le blueprint) */}
      <View
        className="z-10 self-center w-[64%] rounded-3xl border border-primary bg-background/80 px-4 pt-3 pb-2.5"
        style={{ elevation: 8, shadowColor: colors.primary }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-white" numberOfLines={1}>
            {selected.name}
          </Text>

          {isActive ? (
            <View className="flex-row items-center gap-0.5 rounded-full bg-primary px-2 py-0.5">
              <Text className="text-[11px] font-bold text-background">Actif</Text>
              <Check size={11} color={colors.background} strokeWidth={3} />
            </View>
          ) : (
            <View className="rounded-full border border-neutral/30 px-2 py-0.5">
              <Text className="text-[11px] font-bold text-muted">Réserve</Text>
            </View>
          )}
        </View>

        {/* Pagination */}
        <View className="flex-row justify-center gap-2 mt-2.5">
          {setups.map((setup, index) => (
            <View
              key={setup.id}
              className={`w-1.5 h-1.5 rounded-full ${
                index === selectedIndex ? "bg-primary" : "bg-muted/50"
              }`}
            />
          ))}
        </View>
      </View>

      {/* 3. Contenu central animé */}
      <Animated.View
        key={selected.id}
        // TODO: [Animation] Ajouter une animation d'entrée (layout animation Reanimated)
        //       qui donne l'impression que la miniature grossit en venant du côté choisi.
        //       Question : pourquoi la prop `key` ci-dessus est-elle indispensable pour que
        //       l'animation se rejoue à chaque changement de setup ?
        className="z-10 -mt-2 px-6"
      >
        {children}
      </Animated.View>
    </View>
  );
}
