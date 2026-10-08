import { TextLogo } from "@/src/components/ui/text-logo";
import { View } from "react-native";

interface StoryCanvasProps {
  children: React.ReactNode;
}

export default function StoryCanvas({ children }: StoryCanvasProps) {
  return (
    <View className="relative w-full aspect-[9/16] max-h-[82vh] bg-background rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      <View className="absolute -top-32 -left-20 -rotate-[22deg]">
        <View className="w-80 h-44 bg-primary" />
        <View className="w-80 h-1.5 bg-primary/40 mt-2" />
      </View>

      <View className="absolute -bottom-32 -right-20 -rotate-[25deg]">
        <View className="w-80 h-1.5 bg-secondary/40 mb-2" />
        <View className="w-80 h-44 bg-secondary" />
      </View>

      <View className="absolute bottom-6 left-0 right-0 items-center z-20 opacity-80 pointer-events-none">
        <TextLogo width={180} height={48} />
      </View>
      <View className="flex-1 z-10 p-6 justify-between">{children}</View>
    </View>
  );
}
