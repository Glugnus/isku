import SignOutButton from "@/src/features/auth/components/social-auth-buttons/sign-out-button";
import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const { profile } = useAuthContext();

  return (
    <ScrollView>
      <View>
        <Text>Welcome!</Text>
      </View>
      <View>
        <Text>Username</Text>
        <Text>{profile?.username}</Text>
        <Text>Full name</Text>
        <Text>{profile?.full_name}</Text>
      </View>
      <SignOutButton />
    </ScrollView>
  );
}
