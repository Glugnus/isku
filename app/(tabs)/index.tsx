import ScreenLayout from "@/src/components/ui/screen-layout";
import SignOutButton from "@/src/features/auth/components/social-auth-buttons/sign-out-button";
import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const { profile } = useAuthContext();

  return (
    <ScreenLayout>
      <ScrollView>
        <View>
          <Text className="text-white">Welcome!</Text>
        </View>
        <View>
          <Text className="text-white">Username</Text>
          <Text className="text-white">{profile?.username}</Text>
          <Text className="text-white">Full name</Text>
          <Text className="text-white">{profile?.full_name}</Text>
        </View>
        <SignOutButton />
      </ScrollView>
    </ScreenLayout>
  );
}
