import ScreenLayout from "@/src/components/ui/screen-layout";
import AuthHeader from "@/src/features/auth/components/auth-header";
import VerifyOtpForm from "@/src/features/auth/components/form/verify-otp-form";
import { EmailOtpType } from "@supabase/supabase-js";
import { useLocalSearchParams } from "expo-router";

export default function VerifyOtpScreen() {
  const { email, type } = useLocalSearchParams<{
    email: string;
    type: EmailOtpType;
  }>();
  return (
    <ScreenLayout>
      <VerifyOtpForm email={email} type={type} />
    </ScreenLayout>
  );
}
