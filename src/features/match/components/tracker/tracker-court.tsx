import { colors } from "@/src/lib/colors";
import { AlertCircle, Plus, Zap } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function TrackerCourt() {
  return (
    <View className="flex-1 py-3 my-1">
      <View className="flex-1 rounded-3xl border-x-2 border-y-4 border-white/20 p-2 flex-row overflow-hidden relative bg-background">
        <View className="flex-1 pr-2 justify-between items-center py-4 bg-primary/5 rounded-l-2xl border-r border-white/20">
          <View className="h-7 justify-center">
            <View className="flex-row items-center border px-3 py-1 rounded-full gap-x-1.5 bg-primary/20 border-primary/60">
              <Text className="text-primary text-[10px] font-bold uppercase tracking-wider mr-1">
                Service
              </Text>
              <View className="size-3.5 rounded-full bg-white border-white" />
              <View className="size-3.5 rounded-full bg-white border-white" />
            </View>
          </View>
          <Pressable className="items-center justify-center my-2 w-full py-2 rounded-2xl active:opacity-80">
            <Text className="text-primary font-oswald text-7xl md:text-8xl tracking-tighter">
              5
            </Text>
            <View className="px-8 py-3 rounded-full flex-row items-center mt-2 border-2 border-white/20 bg-primary">
              <Plus size={20} color={colors.white} strokeWidth={3} />
              <Text className="text-white text-sm font-oswald tracking-widest uppercase ml-2">
                Point +1
              </Text>
            </View>
          </Pressable>
          <View className="w-full px-1">
            <Pressable className="bg-primary/20 border-2 border-primary py-3.5 px-3 rounded-2xl flex-row justify-center items-center active:bg-primary/30">
              <Zap size={20} color={colors.primary} />
              <Text
                className="text-primary text-sm font-oswald uppercase tracking-wider ml-2 text-center"
                numberOfLines={1}
              >
                Coup Gagnant
              </Text>
            </Pressable>
            <View className="h-4" />
            <Pressable className="bg-danger/15 border-2 border-danger py-3.5 px-3 rounded-2xl flex-row justify-center items-center active:bg-danger/30">
              <AlertCircle size={20} color={colors.danger} />
              <Text
                className="text-danger text-sm font-oswald uppercase tracking-wider ml-2 text-center"
                numberOfLines={1}
              >
                Faute Directe
              </Text>
            </Pressable>
          </View>
        </View>
        <View className="flex-1 pl-2 justify-between items-center py-4 bg-secondary/5 rounded-r-2xl border-l border-white/20">
          <View className="h-7 justify-center">
            <View className="flex-row items-center border px-3 py-1 rounded-full gap-x-1.5 bg-secondary/20 border-secondary/60">
              <Text className="text-secondary text-[10px] font-bold uppercase tracking-wider mr-1">
                Service
              </Text>
              <View className="size-3.5 rounded-full bg-white border-white" />
              <View className="size-3.5 rounded-full bg-white border-white" />
            </View>
          </View>
          <Pressable className="items-center justify-center my-2 w-full py-2 rounded-2xl active:opacity-80">
            <Text className="text-secondary font-oswald text-7xl md:text-8xl tracking-tighter">
              5
            </Text>
            <View className="px-8 py-3 rounded-full flex-row items-center mt-2 border-2 border-white/20 bg-secondary">
              <Plus size={20} color={colors.white} strokeWidth={3} />
              <Text className="text-white text-sm font-oswald tracking-widest uppercase ml-2">
                Point +1
              </Text>
            </View>
          </Pressable>
          <View className="w-full px-1">
            <Pressable className="bg-secondary/20 border-2 border-secondary py-3.5 px-3 rounded-2xl flex-row justify-center items-center active:bg-secondary/30">
              <Zap size={20} color={colors.secondary} />
              <Text
                className="text-secondary text-sm font-oswald uppercase tracking-wider ml-2 text-center"
                numberOfLines={1}
              >
                Coup Gagnant
              </Text>
            </Pressable>
            <View className="h-4" />
            <Pressable className="bg-danger/15 border-2 border-danger py-3.5 px-3 rounded-2xl flex-row justify-center items-center active:bg-danger/30">
              <AlertCircle size={20} color={colors.danger} />
              <Text
                className="text-danger text-sm font-oswald uppercase tracking-wider ml-2 text-center"
                numberOfLines={1}
              >
                Faute Directe
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
