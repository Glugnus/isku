import Button from "@/src/components/ui/button";
import { colors } from "@/src/lib/colors";
import { BarChart2, Flag, Undo2 } from "lucide-react-native";
import { View } from "react-native";

export default function TrackerFooter({
  onUndo,
  canUndo,
}: {
  onUndo: () => void;
  canUndo: boolean;
}) {
  return (
    <View className="px-6 py-3 bg-surface flex-row items-center justify-between border-t border-muted/20 -mx-6">
      <Button
        title="Annuler"
        leftIcon={<Undo2 size={18} color={colors.muted} />}
        variant="ghost"
        size="sm"
        onPress={onUndo}
        disabled={!canUndo}
      />
      <Button
        title="Stats"
        leftIcon={<BarChart2 size={18} color={colors.muted} />}
        variant="ghost"
        size="sm"
      />
      <Button
        title="Abandonner"
        leftIcon={<Flag size={18} color={colors.muted} />}
        variant="ghost"
        size="sm"
      />
    </View>
  );
}
