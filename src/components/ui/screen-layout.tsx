import { KeyboardAvoidingView, Platform, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenLayoutProps extends ViewProps {
  children: React.ReactNode;
  withKeyboard?: boolean;
  edges?: readonly ("top" | "right" | "bottom" | "left")[];
  keyboardVerticalOffset?: number;
}

export default function ScreenLayout({
  children,
  className,
  withKeyboard = true,
  edges,
  keyboardVerticalOffset = 0,
  ...props
}: ScreenLayoutProps) {
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
          {children}
        </KeyboardAvoidingView>
      ) : (
        <View className="flex-1" {...props}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}
