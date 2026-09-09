import ScreenLayout from "@/src/components/ui/screen-layout";
import SignOutButton from "@/src/features/auth/components/social-auth-buttons/sign-out-button";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <ScreenLayout
      scrollable
      edges={["left", "right"]}
      className="justify-center "
    >
      <View className="flex-col items-center ">
        <Text>Profile</Text>
      </View>
      <SignOutButton />
    </ScreenLayout>
  );
}
