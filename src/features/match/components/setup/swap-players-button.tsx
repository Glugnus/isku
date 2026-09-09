import { SetupMatchFormData } from "@/src/features/match/schema/setup-match-schema";
import { colors } from "@/src/lib/colors";
import { ArrowLeftRight } from "lucide-react-native";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

export default function SwapPlayersButton() {
  const { setValue, getValues, control } = useFormContext<SetupMatchFormData>();

  const currentPosition = useWatch({ control, name: "currentProfilePosition" });

  const handleSwap = () => {
    const p1Name = getValues("p1Name");
    const p2Name = getValues("p2Name");

    setValue("p1Name", p2Name);
    setValue("p2Name", p1Name);
    setValue("currentProfilePosition", currentPosition === "1" ? "2" : "1");
  };

  return (
    <View className="items-center mt-2">
      <Pressable
        className="active:opacity-70 flex-row items-center bg-surface border border-background px-4 py-2 rounded-xl shadow-lg shadow-background/30"
        onPress={handleSwap}
      >
        <ArrowLeftRight size={16} color={colors.primary} />
        <Text className="text-white text-sm font-medium ml-2">
          Changer ma position (Je suis Joueur {currentPosition})
        </Text>
      </Pressable>
    </View>
  );
}
