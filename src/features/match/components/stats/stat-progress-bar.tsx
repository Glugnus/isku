import { Text, View } from "react-native";

export default function StatProgressBar({
  icon,
  title,
  valueP1,
  valueP2,
  isFullWidth = false,
}: {
  icon?: React.ReactNode;
  title: string;
  valueP1: number;
  valueP2: number;
  isFullWidth?: boolean;
}) {
  const total = valueP1 + valueP2;
  const flex1 = total > 0 ? valueP1 : 1;
  const flex2 = total > 0 ? valueP2 : 1;
  return (
    <View
      className={`mb-3 bg-surface p-3 rounded-2xl border border-muted/20 ${isFullWidth ? "w-full" : "w-[48%]"}`}
    >
      <View
        className={`flex-row justify-center items-center gap-x-1 ${icon ? "mb-1.5" : "mb-2"}`}
      >
        {icon}
        <Text
          numberOfLines={1}
          className="text-muted text-[10px] font-bold uppercase tracking-wider text-center"
        >
          {title}
        </Text>
      </View>
      <View className="flex-row items-center justify-center">
        <Text className="text-primary text-xl font-oswald w-8 text-center">
          {valueP1}
        </Text>
        <View className="h-2 flex-1 mx-2 bg-background rounded-full overflow-hidden flex-row justify-center items-center">
          <View style={{ flex: flex1 }} className="bg-primary h-full" />
          <View style={{ flex: flex2 }} className="bg-secondary h-full" />
        </View>
        <Text className="text-secondary text-xl font-oswald w-8 text-center">
          {valueP2}
        </Text>
      </View>
    </View>
  );
}
