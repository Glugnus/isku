import { supabase } from "@/src/lib/supabase";

export const incrementStoriesShared = async (profileId: string) => {
  const { error } = await supabase.rpc("increment_stories_shared", {
    user_id: profileId,
  });
  if (error) throw new Error(error.message);
};
