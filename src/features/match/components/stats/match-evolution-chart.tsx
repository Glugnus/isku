import { colors } from "@/src/lib/colors";
import { TrendingUp } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function MatchEvolutionChart({
  p1Name,
  p2Name,
  dataP1,
  dataP2,
}: {
  p1Name: string;
  p2Name: string;
  dataP1: { value: number }[];
  dataP2: { value: number }[];
}) {
  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <View
      className="bg-surface p-4 rounded-3xl border border-muted/30 mt-2 mb-8 w-full"
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-x-2">
          <TrendingUp size={16} color={colors.muted} />
          <Text className="text-muted text-xs font-bold uppercase tracking-wider">
            Evolution du score
          </Text>
        </View>
        <View className="flex-row items-center justify-end">
          <View className="flex-row items-center mr-4">
            <View className="size-3 rounded-full bg-primary" />
            <Text
              numberOfLines={1}
              className="text-primary text-[10px] font-bold ml-2"
            >
              {p1Name.toUpperCase()}
            </Text>
          </View>
          <View className="flex-row items-center justify-end">
            <View className="size-3 rounded-full bg-secondary" />
            <Text
              numberOfLines={1}
              className="text-secondary text-[10px] font-bold ml-2"
            >
              {p2Name.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      {!!containerWidth && (
        <LineChart
          data={dataP1}
          data2={dataP2}
          color1={colors.primary}
          color2={colors.secondary}
          thickness1={2}
          thickness2={2}
          dataPointsColor1={colors.primary}
          dataPointsColor2={colors.secondary}
          dataPointsRadius={3}
          rulesColor="rgba(156, 163, 175, 0.15)"
          yAxisTextStyle={{ color: colors.muted, fontSize: 10 }}
          curved={false}
          xAxisColor="rgba(156, 163, 175, 0.3)"
          yAxisColor="rgba(156, 163, 175, 0.3)"
          xAxisLabelTextStyle={{ color: colors.muted, fontSize: 10 }}
          backgroundColor="transparent"
          initialSpacing={5}
          endSpacing={5}
          adjustToWidth
          parentWidth={containerWidth - 40}
          disableScroll
        />
      )}
    </View>
  );
}
