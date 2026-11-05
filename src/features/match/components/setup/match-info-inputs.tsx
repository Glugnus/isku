import DateTimePickerModal from "@/src/components/ui/date-time-picker-modal";
import Input from "@/src/components/ui/input";
import SectionTitle from "@/src/components/ui/section-title";
import ControlledInput from "@/src/components/utils/controlled-input";
import useMatchDateTime from "@/src/features/match/hooks/use-match-date-time";
import { SetupMatchFormData } from "@/src/features/match/schema/setup-match-schema";
import { colors } from "@/src/lib/colors";
import { Calendar, Clock } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function MatchInfoInputs() {
  const { t } = useTranslation("match");
  const { control } = useFormContext<SetupMatchFormData>();

  const {
    formatedDate,
    formatedTime,
    pickerMode,
    handleConfirm,
    scheduledAt,
    openDatePicker,
    openTimePicker,
    closePicker,
  } = useMatchDateTime();

  return (
    <View className="mb-6">
      <SectionTitle title={t("setup.info.title")} />
      <View className="flex-row gap-x-2">
        <ControlledInput
          control={control}
          name="location"
          size="sm"
          variant="neutral"
          label={t("setup.info.location.label")}
          placeholder={t("setup.info.location.placeholder")}
          containerClassName="flex-[1.2]"
        />
        <Input
          size="sm"
          value={formatedDate}
          editable={false}
          variant="neutral"
          label={t("setup.info.date")}
          placeholder={t("setup.info.date")}
          containerClassName="flex-1"
          uppercase
          rightIcon={<Calendar size={14} color={colors.placeholder} />}
          onPress={openDatePicker}
        />
        <Input
          size="sm"
          value={formatedTime}
          editable={false}
          variant="neutral"
          label={t("setup.info.time")}
          placeholder={t("setup.info.time")}
          uppercase
          containerClassName="flex-1"
          rightIcon={<Clock size={14} color={colors.placeholder} />}
          onPress={openTimePicker}
        />
      </View>

      <DateTimePickerModal
        isVisible={pickerMode !== null}
        value={scheduledAt ?? new Date()}
        mode={pickerMode || "date"}
        onConfirm={handleConfirm}
        onCancel={closePicker}
      />
    </View>
  );
}
