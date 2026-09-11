import { supabase } from "@/src/lib/supabase";
import { TablesInsert, TablesUpdate } from "@/src/types/database.types";

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

export const updateMatch = async (
  matchId: string,
  match: TablesUpdate<"matches">,
) => {
  const { error } = await supabase
    .from("matches")
    .update(match)
    .eq("id", matchId);
  if (error) throw new Error(error.message);
};

export const updateParticipantsMatch = async (
  matchId: string,
  participants: TablesUpdate<"match_participants">[],
) => {
  for (const p of participants) {
    const { error } = await supabase
      .from("match_participants")
      .update(p)
      .eq("match_id", matchId)
      .eq("team", p.team as number);
    if (error) throw new Error(error.message);
  }
};

export const getAllMatches = async () => {
  const { data, error } = await supabase
    .from("matches")
    .select(
      `
      id, 
      mode, 
      status,
      match_participants(
        *,
        profiles(
          username
        )
      )`,
    )
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

export const getMatch = async (matchId: string) => {
  const { data, error } = await supabase
    .from("matches")
    .select(
      `
      *,
      match_participants(
        *, 
        profiles(
          username
        )
      )`,
    )
    .eq("id", matchId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};
