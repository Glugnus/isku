import { expo } from "@/app.json";
import {
  LoginFormValues,
  RegisterFormValues,
} from "@/src/features/auth/schemas/auth-schema";
import { supabase } from "@/src/lib/supabase";
import { AuthChangeEvent, EmailOtpType, Provider } from "@supabase/supabase-js";

export const signUp = async ({
  username,
  email,
  password,
}: RegisterFormValues) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
};

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
    return null;
  }
  return data?.claims ?? null;
};

export const onAuthStateChange = (
  callback: (event: AuthChangeEvent) => void,
) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (_event, _session) => {
    callback(_event);
  });
  return () => {
    subscription.unsubscribe();
  };
};

export const signInWithOAuth = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${expo.scheme}://${provider}-auth`,
      queryParams: { prompt: "consent" },
      skipBrowserRedirect: true,
    },
  });
  if (error || !data.url)
    throw new Error(error?.message || "Impossible de récupérer l'URL OAuth");
  return data.url;
};

export const setSession = async (
  access_token: string,
  refresh_token: string,
) => {
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const verifyOtp = async ({
  email,
  token,
  type,
}: {
  email: string;
  token: string;
  type: EmailOtpType;
}) => {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type,
  });
  if (error) throw new Error(error.message);
};

export const resendOtp = async ({ type, email }: ResendOtpParams) => {
  const { error } = await supabase.auth.resend({ type, email });
  if (error) throw new Error(error.message);
};
export type ResendOtpParams = {
  type: "signup" | "email_change";
  email: string;
};

export const resetPasswordForEmail = async ({ email }: { email: string }) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
};

export const updateUserPassword = async ({
  newPassword,
}: {
  newPassword: string;
}) => {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw new Error(error.message);
};
