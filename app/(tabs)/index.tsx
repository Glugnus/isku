import ScreenLayout from "@/src/components/ui/screen-layout";
import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import SetupForm from "@/src/features/match/components/setup/setup-form";
import SetupHeader from "@/src/features/match/components/setup/setup-header";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  const { profile } = useAuthContext();

  return (
    <ScreenLayout scrollable edges={["left", "right"]}>
      <ScrollView>
        <SetupHeader />
        <SetupForm />
      </ScrollView>
    </ScreenLayout>
  );
}
