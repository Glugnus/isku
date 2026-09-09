import { supabase } from "@/src/lib/supabase";
import { TablesInsert } from "@/src/types/database.types";

export const createMatch = async (match: TablesInsert<"matches">) => {
  const { error, data } = await supabase
    .from("matches")
    .insert(match)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data.id;
};

export const createParticipantsMatch = async (
  participants: TablesInsert<"match_participants">[],
) => {
  const { error } = await supabase
    .from("match_participants")
    .insert(participants);

  if (error) throw new Error(error.message);
};
