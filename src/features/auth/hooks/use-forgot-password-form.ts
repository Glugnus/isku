import { resetPasswordForEmail } from "@/src/features/auth/api/auth-api";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/src/features/auth/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

export const useForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await resetPasswordForEmail(data);
      router.push({
        pathname: "/(auth)/verify-otp",
        params: {
          email: data.email,
          type: "recovery",
        },
      });
    } catch (err) {
      form.setError("root", {
        type: "manual",
        message: "Erreur lors de l'envoi du code",
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
