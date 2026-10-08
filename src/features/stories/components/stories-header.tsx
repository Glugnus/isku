import { colors } from "@/src/lib/colors";
import { router } from "expo-router";
import { Camera, ChevronLeft, Share2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function StoriesHeader({
  shareStory,
}: {
  shareStory: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-1 flex-row items-center justify-start pr-4">
        <Pressable
          className="p-2 -ml-2 mr-1 rounded-full active:bg-surface"
          onPress={() => router.back()}
        >
          <ChevronLeft color={colors.white} size={28} />
        </Pressable>
        <View className="mr-2">
          <Camera size={22} color={colors.primary} />
        </View>
        <Text
          numberOfLines={1}
          className="text-white text-xl font-oswald uppercase tracking-widest text-left flex-1"
        >
          Story Studio
        </Text>
      </View>
      <View className="flex-row items-center justify-end">
        <Pressable
          className="flex-row items-center gap-2 bg-primary px-3 py-1.5 rounded-full"
          onPress={shareStory}
        >
          <Share2 color={colors.background} size={16} />
        </Pressable>
      </View>
    </View>
  );
}
