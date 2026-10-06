import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import {
  updateProfile,
  uploadAvatarToStorage,
} from "@/src/features/profile/api/profile-api";
import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

export const useUploadAvatar = () => {
  const { profile, refreshProfile } = useAuthContext();
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    setError(null);
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission requise",
        "Nous avons besoin de votre autorisation pour accéder à vos photos.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });
    if (result.canceled || !result.assets[0]) return;

    const selectedImage = result.assets[0];
    setImage(selectedImage.uri);

    if (!selectedImage.base64 || !profile?.id) return;
    const buffer = decode(selectedImage.base64);

    try {
      setUploading(true);
      const publicUrl = await uploadAvatarToStorage(profile?.id, buffer);
      await updateProfile(profile?.id, { avatar_url: publicUrl });
      await refreshProfile();
    } catch (err) {
      setError("Erreur lors de l'upload de l'avatar.");
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  return { image, uploading, pickImage, error };
};
