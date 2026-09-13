import Button from "@/src/components/ui/button";
import { Modal, Text, View } from "react-native";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  isLoading?: boolean;
  error?: string | null;
}

export default function ConfirmModal({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  cancelText = "Annuler",
  confirmText = "Confirmer",
  isLoading,
  error = null,
}: ModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent
    >
      <View className="flex-1 justify-center items-center px-6 bg-black/75">
        <View className="w-full max-w-sm rounded-3xl bg-surface border border-background/40 p-6">
          <Text className="text-white text-2xl font-oswald uppercase mb-6 text-center tracking-widest">
            {title}
          </Text>
          <Text className="text-muted text-md text-center mb-6">{message}</Text>
          <View className="flex-row gap-3 justify-between">
            <View className="flex-1">
              <Button
                onPress={onClose}
                variant="surface"
                title={cancelText}
                disabled={isLoading}
              />
            </View>
            <View className="flex-1">
              <Button
                onPress={onConfirm}
                isLoading={isLoading}
                variant="danger"
                title={confirmText}
              />
            </View>
          </View>
          {error && (
            <Text className="text-danger text-center text-xs mt-4">
              {error}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
}
