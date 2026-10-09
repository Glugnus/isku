import { colors } from "@/src/lib/colors";
import { Undo2 } from "lucide-react-native";
import { Text, TouchableOpacity } from "react-native";

interface UndoButtonProps {
  onPress: () => void;
  label?: string;
}

export default function UndoButton({
  onPress,
  label = "Annuler",
}: UndoButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center justify-center gap-x-2 self-end mt-3 px-4 py-2 rounded-xl bg-surface border border-muted/20"
    >
      <Undo2 size={16} color={colors.neutral} />
      <Text className="font-oswald text-sm text-neutral uppercase tracking-wider">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
