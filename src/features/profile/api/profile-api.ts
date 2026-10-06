import { supabase } from "@/src/lib/supabase";
import { Database } from "@/src/types/database.types";

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) {
    console.error("Error fetching profile :", error);
    return null;
  }
  return data;
};

export const uploadAvatarToStorage = async (
  userId: string,
  buffer: ArrayBuffer,
) => {
  const { error } = await supabase.storage
    .from("avatars")
    .upload(`${userId}/avatar`, buffer, {
      contentType: "image/jpeg",
      upsert: true,
    });
  if (error) {
    throw new Error("Erreur lors de l'upload de l'avatar.");
  }
  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(`${userId}/avatar`);

  return `${data.publicUrl}?t=${Date.now()}`;
};

export const updateProfile = async (
  userId: string,
  updates: Database["public"]["Tables"]["profiles"]["Update"],
) => {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);
  if (error) {
    throw new Error("Erreur lors de la mise à jour du profil.");
  }
};
