import ControlledInput from "@/src/components/utils/controlled-input";
import SwapPlayersButton from "@/src/features/match/components/setup/swap-players-button";
import { SetupMatchFormData } from "@/src/features/match/schema/setup-match-schema";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";

export default function PlayersInputs() {
  const { control, watch } = useFormContext<SetupMatchFormData>();

  const currentPosition = watch("currentProfilePosition");

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center gap-4">
        <ControlledInput
          control={control}
          name="p1Name"
          label="Joueur 1"
          placeholder="NOM J1"
          containerClassName="flex-1"
          autoCapitalize="characters"
          uppercase
          returnKeyType="next"
          editable={currentPosition !== "p1"}
        />
        <ControlledInput
          control={control}
          name="p2Name"
          label="Joueur 2"
          placeholder="NOM J2"
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
