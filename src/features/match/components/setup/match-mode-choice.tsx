import SectionTitle from "@/src/components/ui/section-title";
import SelectableCard from "@/src/components/ui/selectable-card";
import { SetupMatchFormData } from "@/src/features/match/schema/setup-match-schema";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function MatchModeChoice() {
  const { t } = useTranslation("match");
  const { setValue, control } = useFormContext<SetupMatchFormData>();

  const matchMode = useWatch({
    control,
    name: "matchMode",
  });
  return (
    <View className="mb-6">
      <SectionTitle title={t("setup.mode.title")} />
      <View className="flex-row gap-x-4">
        <SelectableCard
          title={t("setup.mode.umpire.title")}
          subtitle={t("setup.mode.umpire.subtitle")}
          isSelected={matchMode === "umpire"}
          titleClassName="uppercase tracking-wider text-sm"
          onPress={() => setValue("matchMode", "umpire")}
        />
        <SelectableCard
          title={t("setup.mode.quick.title")}
          subtitle={t("setup.mode.quick.subtitle")}
          isSelected={matchMode === "quick"}
          titleClassName="uppercase tracking-wider text-sm"
          onPress={() => setValue("matchMode", "quick")}
        />
      </View>
    </View>
  );
}
