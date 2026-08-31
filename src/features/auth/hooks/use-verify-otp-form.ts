import { signOut, verifyOtp } from "@/src/features/auth/api/auth-api";
import {
  OtpFormValues,
  otpSchema,
} from "@/src/features/auth/schemas/otp-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailOtpType } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

export const useVerifyOtpForm = ({
  email,
  type,
}: {
  email: string;
  type: EmailOtpType;
}) => {
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (data: OtpFormValues) => {
    try {
      await verifyOtp({ email, token: data.code, type });
      if (type === "recovery") {
        router.push({ pathname: "/(auth)/reset-password", params: { email } });
      } else {
        await signOut();
        router.replace("/(auth)/login");
      }
    } catch (err) {
      form.setError("root", {
        type: "manual",
        message: "Code incorrect",
      });
      console.log(err);
    }
  };

  return {
    control: form.control,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    handleSubmit: form.handleSubmit,
    onSubmit,
  };
};
