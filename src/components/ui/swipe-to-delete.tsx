/* eslint-disable react-hooks/immutability */

import { colors } from "@/src/lib/colors";
import { Trash2 } from "lucide-react-native";
import { ReactNode } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

export default function SwipeToDelete({
  children,
  onDelete,
}: {
  children: ReactNode;
  onDelete: () => void;
}) {
  const dragX = useSharedValue(0);
  const cardWidth = useSharedValue(0);

  const overlayStyle = useAnimatedStyle(() => ({
    width: dragX.value,
    opacity: interpolate(
      dragX.value,
      [0, cardWidth.value * 0.8],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((e) => {
      dragX.value = Math.max(0, -e.translationX);
    })
    .onEnd(() => {
      if (dragX.value > cardWidth.value * 0.8) {
        dragX.value = withTiming(cardWidth.value, {
          duration: 200,
        });
        scheduleOnRN(onDelete);
      } else {
        dragX.value = withTiming(0);
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <View
        className="relative mb-3 overflow-hidden rounded-2xl"
        onLayout={(e) => {
          cardWidth.value = e.nativeEvent.layout.width;
        }}
      >
        {children}
        <Animated.View
          style={overlayStyle}
          className="absolute top-0 bottom-0 right-0 bg-danger flex-row items-center justify-end pr-6 overflow-hidden"
        >
          <Trash2 color={colors.white} size={24} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}
