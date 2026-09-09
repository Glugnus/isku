import Button from "@/src/components/ui/button";
import { SetupMatchFormData } from "@/src/features/match/schema/setup-match-schema";
import { colors } from "@/src/lib/colors";
import { CheckCircle, Share2 } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";

export default function SetupActions({ onSubmit }: { onSubmit: () => void }) {
  const {
    formState: { isSubmitting },
  } = useFormContext<SetupMatchFormData>();

  return (
    <View className="mb-6 gap-y-4">
      <Button
        leftIcon={<CheckCircle size={24} color={colors.background} />}
        title="Enregistrer"
        onPress={onSubmit}
        isLoading={isSubmitting}
      />
      <Button
        leftIcon={<Share2 size={24} color={colors.muted} />}
        title="Annoncer le match"
        variant="surface"
      />
    </View>
  );
}
