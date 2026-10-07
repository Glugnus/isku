import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { useUploadAvatar } from "@/src/features/profile/hooks/use-upload-avatar";
import { colors } from "@/src/lib/colors";
import { Image } from "expo-image";
import { Camera, Pencil } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import EditUsernameModal from "./edit-username-modal";

export default function ProfileHeader() {
  const { profile, claims } = useAuthContext();
  const [isEditUsernameModalVisible, setIsEditUsernameModalVisible] =
    useState<boolean>(false);
  const { image, uploading, pickImage, error } = useUploadAvatar();
  return (
    <View className="items-center mb-6 mt-2">
      <Pressable
        className="relative mb-2 active:opacity-80"
        onPress={pickImage}
        disabled={uploading}
      >
        <View className="size-24 rounded-full bg-primary/20 border-2 border-primary items-center justify-center overflow-hidden">
          {uploading ? (
            <ActivityIndicator color={colors.primary} />
          ) : image || profile?.avatar_url ? (
            <Image
              source={{ uri: image ?? profile.avatar_url }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <Text className="text-4xl font-oswald text-primary">
              {profile?.username
                ? profile.username.slice(0, 2).toUpperCase()
                : ""}
            </Text>
          )}
        </View>
        <View className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-background">
          <Camera color={colors.white} size={14} />
        </View>
      </Pressable>
      {error && (
        <Text className="text-danger text-xs text-center">{error}</Text>
      )}
      <View className="flex-row items-center">
        <Text className="text-2xl font-oswald text-white uppercase tracking-widest mr-2">
          {profile?.username ?? "Mon profil"}
        </Text>
        <Pressable
          className="p-1"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => setIsEditUsernameModalVisible(true)}
        >
          <Pencil color={colors.primary} size={18} />
        </Pressable>
      </View>
      <Text className="text-muted mt-1">{claims?.email ?? ""}</Text>
      <EditUsernameModal
        visible={isEditUsernameModalVisible}
        onClose={() => setIsEditUsernameModalVisible(false)}
      />
    </View>
  );
}
