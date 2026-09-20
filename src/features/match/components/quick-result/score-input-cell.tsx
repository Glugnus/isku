import { colors } from "@/src/lib/colors";
import { TextInput } from "react-native";

export const getCellClassNames = (
  isActive: boolean,
  hasError: boolean,
  isWinner: boolean,
  playerKey: "p1" | "p2",
) => {
  const winnerColor = playerKey === "p1" ? "text-primary" : "text-secondary";
  const winnerBgBorder =
    playerKey === "p1"
      ? "border-primary/50 bg-primary/10"
      : "border-secondary/50 bg-secondary/10";
  if (hasError) return "border-danger bg-danger/10 text-danger";
  if (isActive)
    return isWinner
      ? `${winnerBgBorder} ${winnerColor}`
      : `text-white border-muted/20 bg-background`;
  if (isWinner) return `border-muted/20 bg-background ${winnerColor}`;
  return "border-muted/20 bg-background text-white";
};

interface ScoreInputCellProps {
  isActive?: boolean;
  hasError?: boolean;
  isWinner?: boolean;
  playerKey?: "p1" | "p2";
  value: string;
  onChangeText: (value: string) => void;
}

export default function ScoreInputCell({
  isActive = false,
  hasError = false,
  isWinner = false,
  playerKey = "p1",
  value,
  onChangeText,
}: ScoreInputCellProps) {
  const inputClassNames = getCellClassNames(
    isActive,
    hasError,
    isWinner,
    playerKey,
  );
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      textAlign="center"
      cursorColor={colors.placeholder}
      placeholder="-"
      placeholderTextColor={colors.placeholder}
      maxLength={2}
      keyboardType="number-pad"
      editable={isActive}
      pointerEvents={isActive ? "auto" : "none"}
      className={`w-12 h-12 rounded-xl text-center font-oswald text-xl border ${inputClassNames}`}
    />
  );
}
