import { colors } from "@/src/lib/colors";
import { GearSetup } from "@/src/features/gear/types/gear.types";
import { Check, Shield } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from "react-native";

interface GearCarouselProps {
  setups: GearSetup[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = Math.round(SCREEN_WIDTH * 0.64);
const SPACING = 12;

export function GearCarousel({
  setups,
  selectedIndex,
  onSelectIndex,
}: GearCarouselProps) {
  const flatListRef = useRef<FlatList>(null);

  // Synchronisation lors du changement d'index externe
  useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: selectedIndex * (CARD_WIDTH + SPACING),
      animated: true,
    });
  }, [selectedIndex]);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (CARD_WIDTH + SPACING));
    if (newIndex >= 0 && newIndex < setups.length && newIndex !== selectedIndex) {
      onSelectIndex(newIndex);
    }
  };

  const scrollToSetup = (index: number) => {
    onSelectIndex(index);
    flatListRef.current?.scrollToOffset({
      offset: index * (CARD_WIDTH + SPACING),
      animated: true,
    });
  };

  return (
    <View className="mb-4 -mx-6">
      <FlatList
        ref={flatListRef}
        data={setups}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{
          paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
        }}
        renderItem={({ item, index }) => {
          const isSelected = index === selectedIndex;
          const isActive = item.status === "active";

          return (
            <Pressable
              onPress={() => scrollToSetup(index)}
              style={{
                width: CARD_WIDTH,
                marginRight: index < setups.length - 1 ? SPACING : 0,
                transform: [{ scale: isSelected ? 1 : 0.86 }],
                opacity: isSelected ? 1 : 0.45,
              }}
              className={`rounded-2xl p-3 border transition-all ${
                isSelected
                  ? "bg-[#121528] border-primary shadow-lg"
                  : "bg-surface/50 border-surface"
              }`}
            >
              {/* En-tête de la carte miniature */}
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center gap-1.5">
                  <Shield
                    size={14}
                    color={isSelected ? colors.primary : colors.muted}
                  />
                  <Text
                    className={`font-oswald text-sm uppercase tracking-wide ${
                      isSelected ? "text-white" : "text-neutral"
                    }`}
                  >
                    Setup #{String(item.setupNumber).padStart(2, "0")}
                  </Text>
                </View>

                {/* Badge statut */}
                {isActive ? (
                  <View className="flex-row items-center gap-0.5 bg-primary/20 border border-primary/50 px-2 py-0.5 rounded-full">
                    <Text className="text-[9px] font-bold text-primary">ACTIF</Text>
                    <Check size={10} color={colors.primary} strokeWidth={3} />
                  </View>
                ) : (
                  <View className="bg-surface/80 border border-neutral/20 px-2 py-0.5 rounded-full">
                    <Text className="text-[9px] font-bold text-muted">
                      RÉSERVE
                    </Text>
                  </View>
                )}
              </View>

              {/* Miniature visuelle de la raquette */}
              <View className="flex-row items-center justify-between bg-background/60 rounded-xl p-2 mb-2 border border-surface/50">
                {/* Pastille CD */}
                <View className="flex-row items-center gap-1">
                  <View
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        item.forehandRubber.color === "black"
                          ? "#222"
                          : colors.red,
                    }}
                  />
                  <Text className="text-[10px] text-muted font-medium">CD</Text>
                </View>

                {/* Nom du Bois au centre */}
                <Text
                  className="text-[11px] font-bold text-white max-w-[100px] text-center"
                  numberOfLines={1}
                >
                  {item.blade.name.replace("Butterfly ", "")}
                </Text>

                {/* Pastille RV */}
                <View className="flex-row items-center gap-1">
                  <Text className="text-[10px] text-muted font-medium">RV</Text>
                  <View
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        item.backhandRubber.color === "black"
                          ? "#222"
                          : colors.red,
                    }}
                  />
                </View>
              </View>

              {/* Ligne inférieure : Catégorie de vitesse + Poids */}
              <View className="flex-row justify-between items-center">
                <View className="bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-md">
                  <Text className="text-[9px] font-bold text-primary">
                    {item.category}
                  </Text>
                </View>
                <Text className="text-[10px] text-muted">
                  {item.weightGrams}g • {item.totalPlayTimeHours}h
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
