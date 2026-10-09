import Button from "@/src/components/ui/button";
import { colors } from "@/src/lib/colors";
import { supabase } from "@/src/lib/supabase";
import { LogOut } from "lucide-react-native";

async function onSignOutButtonPress() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
  }
}

export default function SignOutButton() {
  return (
    <Button
      title="Se déconnecter"
      variant="danger"
      leftIcon={<LogOut color={colors.danger} size={18} />}
      onPress={onSignOutButtonPress}
      size="md"
    />
  );
}
