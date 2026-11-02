import { SetupMatchFormData } from "@/src/features/match/schema/setup-match-schema";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function useMatchDateTime() {
  const { i18n } = useTranslation();
  const { control, setValue } = useFormContext<SetupMatchFormData>();
  const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);

  const scheduledAt = useWatch({
    name: "scheduledAt",
    control,
  });

  const formatedDate = scheduledAt
    ? scheduledAt.toLocaleDateString(i18n.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  const formatedTime = scheduledAt
    ? scheduledAt.toLocaleTimeString(i18n.language, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";

  const handleConfirm = (selectedDate: Date) => {
    const updated = new Date(scheduledAt ?? new Date());

    if (pickerMode === "date") {
      updated.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      );
    } else if (pickerMode === "time") {
      updated.setHours(selectedDate.getHours(), selectedDate.getMinutes());
    }

    setValue("scheduledAt", updated);
    setPickerMode(null);
  };

  return {
    formatedDate,
    formatedTime,
    pickerMode,
    handleConfirm,
    scheduledAt,
    openDatePicker: () => setPickerMode("date"),
    openTimePicker: () => setPickerMode("time"),
    closePicker: () => setPickerMode(null),
  };
}
