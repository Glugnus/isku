import ScreenLayout from "@/src/components/ui/screen-layout";
import SetupForm from "@/src/features/match/components/setup/setup-form";
import SetupHeader from "@/src/features/match/components/setup/setup-header";

export default function EditMatchScreen() {
  return (
    <ScreenLayout scrollable>
      <SetupHeader />
      <SetupForm />
    </ScreenLayout>
  );
}
