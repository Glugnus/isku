import ControlledInput from "@/src/components/utils/controlled-input";
import SwapPlayersButton from "@/src/features/match/components/setup/swap-players-button";
import { SetupMatchFormData } from "@/src/features/match/schema/setup-match-schema";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function PlayersInputs() {
  const { t } = useTranslation("match");
  const { control, watch } = useFormContext<SetupMatchFormData>();

  const currentPosition = watch("currentProfilePosition");

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center gap-4">
        <ControlledInput
          control={control}
          name="p1Name"
          label={t("setup.players.label", { number: 1 })}
          placeholder={t("setup.players.placeholder", { number: 1 })}
          containerClassName="flex-1"
          autoCapitalize="characters"
          uppercase
          returnKeyType="next"
          editable={currentPosition !== "p1"}
        />
        <ControlledInput
          control={control}
          name="p2Name"
          label={t("setup.players.label", { number: 2 })}
          placeholder={t("setup.players.placeholder", { number: 2 })}
          variant="secondary"
          isRight
          containerClassName="flex-1"
          autoCapitalize="characters"
          uppercase
          editable={currentPosition !== "p2"}
        />
      </View>
      <SwapPlayersButton />
    </View>
  );
}
