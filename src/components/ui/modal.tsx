import { Modal, Pressable, View } from "react-native";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BaseModal({ visible, onClose, children }: ModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent
    >
      <View className="flex-1 justify-center items-center px-6">
        <Pressable className="bg-black/75 absolute inset-0" onPress={onClose} />
        <View className="w-full max-w-sm rounded-3xl bg-surface border border-background/40 p-6">
          {children}
        </View>
      </View>
    </Modal>
  );
}
