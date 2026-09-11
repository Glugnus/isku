import MatchInfoInputs from "@/src/features/match/components/setup/match-info-inputs";
import MatchModeChoice from "@/src/features/match/components/setup/match-mode-choice";
import PlayersInputs from "@/src/features/match/components/setup/players-inputs";
import SetsToWinChoice from "@/src/features/match/components/setup/sets-to-win-choice";
import SetupActions from "@/src/features/match/components/setup/setup-actions";
import { useSetupForm } from "@/src/features/match/hooks/use-setup-form";
import { colors } from "@/src/lib/colors";
import { FormProvider } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";

export default function SetupForm() {
  const { form, onSubmit, isLoading } = useSetupForm();

  return (
    <FormProvider {...form}>
      {isLoading ? (
        <View className="flex-1 items-center justify-center py-20">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <PlayersInputs />
          <MatchInfoInputs />
          <SetsToWinChoice />
          <MatchModeChoice />
          <SetupActions onSubmit={onSubmit} />
        </>
      )}
    </FormProvider>
  );
}
