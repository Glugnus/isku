import { LargeSecureStore } from "@/src/lib/large-secure-store";
import { Database } from "@/src/types/database.types";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  {
    auth: {
      storage: new LargeSecureStore(),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
