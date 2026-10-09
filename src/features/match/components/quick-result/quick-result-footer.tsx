import Button from "@/src/components/ui/button";
import { colors } from "@/src/lib/colors";
import { CheckCircle } from "lucide-react-native";
import { View } from "react-native";

export default function QuickResultFooter({
  winner,
  onPress,
  isLoading,
}: {
  winner: "p1" | "p2" | null;
  onPress: () => void;
  isLoading: boolean;
}) {
  return (
    <View className="my-6">
      <Button
        title="Valider le match"
        onPress={onPress}
        disabled={!winner}
        isLoading={isLoading}
        variant={
          winner === "p1" ? "primary" : winner === "p2" ? "secondary" : "ghost"
        }
        leftIcon={
          winner && (
            <CheckCircle
              size={18}
              color={winner === "p1" ? colors.background : colors.white}
            />
          )
        }
      />
    </View>
  );
}
