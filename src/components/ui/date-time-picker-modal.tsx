import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";

interface DateTimePickerModalProps {
  isVisible: boolean;
  value: Date;
  mode?: "date" | "time";
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

export default function DateTimePickerModal({
  isVisible,
  value,
  mode = "date",
  onConfirm,
  onCancel,
}: DateTimePickerModalProps) {
  useEffect(() => {
    if (Platform.OS === "android" && isVisible) {
      DateTimePickerAndroid.open({
        is24Hour: true,
        value: value,
        mode: mode,
        onValueChange: (_, date) => onConfirm(date),
        onDismiss: () => onCancel(),
      });
    }
  }, [isVisible, value, mode, onConfirm, onCancel]);

  if (Platform.OS === "android" || !isVisible) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <Modal visible={isVisible} animationType="fade" transparent>
          <View className="flex-1 justify-end bg-black/60">
            <IOSPickerContent
              value={value}
              mode={mode}
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
          </View>
        </Modal>
      )}
    </>
  );
}

function IOSPickerContent({
  value,
  mode,
  onConfirm,
  onCancel,
}: Omit<DateTimePickerModalProps, "isVisible">) {
  const [tempDate, setTempDate] = useState(value);

  return (
    <View className="bg-surface p-4 rounded-t-3xl border-t border-border">
      <View className="flex-row justify-between items-center pb-4 border-b border-border/40">
        <Pressable onPress={onCancel}>
          <Text className="text-muted font-medium">Annuler</Text>
        </Pressable>
        <Pressable onPress={() => onConfirm(tempDate)}>
          <Text className="text-primary font-semibold">Confirmer</Text>
        </Pressable>
      </View>
      <RNDateTimePicker
        value={tempDate}
        mode={mode}
        display="spinner"
        themeVariant="dark"
        onValueChange={(_, date) => date && setTempDate(date)}
        onDismiss={onCancel}
      />
    </View>
  );
}
