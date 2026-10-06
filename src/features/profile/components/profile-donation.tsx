import { colors } from "@/src/lib/colors";
import { Beer } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function ProfileDonation() {
  return (
    <View className="mb-4">
      <Pressable className="bg-surface p-4 rounded-2xl border border-primary/30 flex-row items-center justify-between active:opacity-70">
        <View className="flex-row items-center flex-1">
          <View className="bg-primary/10 p-3 rounded-full mr-4">
            <Beer color={colors.primary} size={24} />
          </View>
          <View className="flex-1 pr-2">
            <Text className="text-white font-oswald text-lg uppercase">
              Soutenir le projet
            </Text>
            <Text className="text-muted text-sm mt-1">
              Offrez-moi une bière pour soutenir le développement de
              l&apos;application !
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
