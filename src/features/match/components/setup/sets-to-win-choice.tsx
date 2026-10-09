import SectionTitle from "@/src/components/ui/section-title";
import SelectableCard from "@/src/components/ui/selectable-card";
import { SPORTS_RULES } from "@/src/features/match/constants/sports-rules";
import { SetupMatchFormData } from "@/src/features/match/schema/setup-match-schema";
import { useFormContext, useWatch } from "react-hook-form";
import { View } from "react-native";

export default function SetsToWinChoice() {
  const { setValue, control } = useFormContext<SetupMatchFormData>();
  const { possibleSetsToWin } = SPORTS_RULES["table_tennis"];

  const setsToWin = useWatch({
    control,
    name: "setsToWin",
  });

  return (
    <View className="mb-6">
      <SectionTitle title="Sets Gagnants" />
      <View className="flex-row justify-between gap-x-3">
        {possibleSetsToWin.map((currentSetsToWin) => (
          <SelectableCard
            key={currentSetsToWin}
            title={currentSetsToWin.toString()}
            isSelected={setsToWin === currentSetsToWin}
            onPress={() => setValue("setsToWin", currentSetsToWin)}
          />
        ))}
      </View>
    </View>
  );
}
