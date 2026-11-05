import Button from "@/src/components/ui/button";
import { SetupMatchFormData } from "@/src/features/match/schema/setup-match-schema";
import { colors } from "@/src/lib/colors";
import { CheckCircle } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function SetupActions({ onSubmit }: { onSubmit: () => void }) {
  const { t } = useTranslation();
  const {
    formState: { isSubmitting },
  } = useFormContext<SetupMatchFormData>();

  return (
    <View className="mb-6 gap-y-4">
      <Button
        leftIcon={<CheckCircle size={24} color={colors.background} />}
        title={t("actions.save")}
        onPress={onSubmit}
        isLoading={isSubmitting}
      />
    </View>
  );
}
