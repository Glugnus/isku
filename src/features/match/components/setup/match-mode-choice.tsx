import SectionTitle from "@/src/components/ui/section-title";
import SelectableCard from "@/src/components/ui/selectable-card";
import { SetupMatchFormData } from "@/src/features/match/schema/setup-match-schema";
import { useFormContext, useWatch } from "react-hook-form";
import { View } from "react-native";

export default function MatchModeChoice() {
  const { setValue, control } = useFormContext<SetupMatchFormData>();

  const matchMode = useWatch({
    control,
    name: "matchMode",
  });
  return (
    <View className="mb-6">
      <SectionTitle title="Mode de suivi" />
      <View className="flex-row gap-x-4">
        <SelectableCard
          title="Arbitre"
          subtitle="Suivi point par point"
          isSelected={matchMode === "umpire"}
          titleClassName="uppercase tracking-wider text-sm"
          onPress={() => setValue("matchMode", "umpire")}
        />
        <SelectableCard
          title="Rapide"
          subtitle="Saisie du score final"
          isSelected={matchMode === "quick"}
          titleClassName="uppercase tracking-wider text-sm"
          onPress={() => setValue("matchMode", "quick")}
        />
      </View>
    </View>
  );
}
