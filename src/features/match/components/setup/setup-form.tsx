import MatchInfoInputs from "@/src/features/match/components/setup/match-info-inputs";
import MatchModeChoice from "@/src/features/match/components/setup/match-mode-choice";
import PlayersInputs from "@/src/features/match/components/setup/players-inputs";
import SetsToWinChoice from "@/src/features/match/components/setup/sets-to-win-choice";
import SetupActions from "@/src/features/match/components/setup/setup-actions";
import { useSetupForm } from "@/src/features/match/hooks/use-setup-form";
import { FormProvider } from "react-hook-form";

export default function SetupForm() {
  const { form, onSubmit } = useSetupForm();

  return (
    <FormProvider {...form}>
      <PlayersInputs />
      <MatchInfoInputs />
      <SetsToWinChoice />
      <MatchModeChoice />
      <SetupActions onSubmit={onSubmit} />
    </FormProvider>
  );
}
