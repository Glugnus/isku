import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenLayoutProps extends ViewProps {
  children: React.ReactNode;
  withKeyboard?: boolean;
  edges?: readonly ("top" | "right" | "bottom" | "left")[];
  keyboardVerticalOffset?: number;
  scrollable?: boolean;
  contentContainerClassName?: string;
}

export default function ScreenLayout({
  children,
  className,
  withKeyboard = true,
  edges,
  keyboardVerticalOffset = 0,
  scrollable = false,
  contentContainerClassName,
  ...props
}: ScreenLayoutProps) {
  const scrollView = scrollable ? (
    <ScrollView
      contentContainerClassName={contentContainerClassName || "flex-grow p-6"}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      className="flex-1"
    >
      {children}
    </ScrollView>
  ) : (
    <View className="flex-1 p-6">{children}</View>
  );

  return (
    <SafeAreaView
      className={`flex-1 bg-background ${className ?? ""}`}
      edges={edges}
    >
      {withKeyboard ? (
        <KeyboardAvoidingView
          behavior={"padding"}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? keyboardVerticalOffset : 0
          }
          className="flex-1"
          {...props}
        >
          {scrollView}
        </KeyboardAvoidingView>
      ) : (
        <View className="flex-1" {...props}>
          {scrollView}
        </View>
      )}
    </SafeAreaView>
  );
}
