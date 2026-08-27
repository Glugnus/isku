import { LoginFormValues } from "@/src/features/auth/schemas/auth-schema";
import { supabase } from "@/src/lib/supabase";

export const signIn = async ({ email, password }: LoginFormValues) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const getClaims = async () => {
  const { data, error } = await supabase.auth.getClaims();
  if (error) {
    console.error("Error fetching claims:", error);
    return null;
  }
  return data?.claims ?? null;
};

export const onAuthStateChange = (callback: () => void) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (_event, _session) => {
    console.log("Auth state changed:", { event: _event });
    callback();
  });
  return () => {
    subscription.unsubscribe();
  };
};
