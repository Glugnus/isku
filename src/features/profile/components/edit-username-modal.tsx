import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import BaseModal from "@/src/components/ui/modal";
import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { usernameValidation } from "@/src/features/auth/schemas/auth-schema";
import { useUpdateUsername } from "@/src/features/profile/hooks/use-update-username";
import { useState } from "react";
import { Text, View } from "react-native";

export default function EditUsernameModal({
  onClose,
  visible,
}: {
  onClose: () => void;
  visible: boolean;
}) {
  const { profile } = useAuthContext();
  const [newUsername, setNewUsername] = useState<string>(
    profile?.username ?? "",
  );
  const [clientError, setClientError] = useState<string | null>(null);
  const { updateUsername, error, isLoading } = useUpdateUsername();

  const handleSubmit = async () => {
    const result = usernameValidation.safeParse(newUsername);
    if (!result.success) {
      setClientError(result.error.issues[0]?.message ?? null);
      return;
    } else {
      setClientError(null);
      const success = await updateUsername(newUsername);
      if (success) onClose();
    }
  };

  const handleCloseModal = () => {
    onClose();
    setClientError(null);
    setNewUsername(profile?.username ?? "");
  };

  return (
    <BaseModal visible={visible} onClose={handleCloseModal}>
      <View className="gap-4">
        <Text className="text-white text-2xl font-oswald uppercase mb-6 text-center tracking-widest">
          Modifier le pseudo
        </Text>
        <Input
          value={newUsername}
          onChangeText={setNewUsername}
          placeholder="Nouveau nom d'utilisateur"
          errorMessage={clientError}
        />
        <View className="gap-3">
          <Button
            onPress={handleCloseModal}
            variant="surface"
            title="Annuler"
            disabled={isLoading}
          />
          <Button
            onPress={handleSubmit}
            isLoading={isLoading}
            variant="primary"
            title="Confirmer"
          />
        </View>
        {error && (
          <Text className="text-danger text-center text-xs mt-4">{error}</Text>
        )}
      </View>
    </BaseModal>
  );
}
