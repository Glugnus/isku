import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { Redirect } from "expo-router";

export default function Index() {
  const { isLoggedIn } = useAuthContext();
  return <Redirect href={isLoggedIn ? "/(tabs)" : "/(auth)/login"} />;
}
