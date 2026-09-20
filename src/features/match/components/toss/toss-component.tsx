import SelectableCard from "@/src/components/ui/selectable-card";
import { colors } from "@/src/lib/colors";
import { Dices, Lock } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function TossComponent() {
  return (
    <View className="mb-12">
      <View className="flex-row items-center justify-between mb-12">
        <View className="flex-row items-center gap-x-2">
          <Text className="text-white text-xs font-bold uppercase tracking-widest">
            Premier Serveur
          </Text>
          <View className="bg-primary/20 border border-primary px-2 py-0.5 rounded-full flex-row items-center ml-2">
            <Lock size={10} color={colors.primary} />
          </View>
        </View>
        <Pressable className="active:opacity-70 flex-row items-center px-3 py-2 rounded-lg border bg-surface/80 border-primary/30">
          <Dices size={16} color={colors.primary} />
          <Text className="text-primary ml-2 text-xs font-bold uppercase tracking-wider">
            Toss Officiel
          </Text>
        </Pressable>
      </View>
      <View className="flex-row gap-x-4">
        <SelectableCard title="Joueur 1" isSelected={true} />
        <SelectableCard title="Joueur 2" isSelected={false} />
      </View>
    </View>
  );
}
