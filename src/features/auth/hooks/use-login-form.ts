import { resendOtp, signIn } from "@/src/features/auth/api/auth-api";
import {
  getLoginSchema,
  LoginFormValues,
} from "@/src/features/auth/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const useLoginForm = () => {
  const { t } = useTranslation("auth");
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(getLoginSchema(t)),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await signIn(data);
    } catch (err) {
      if (err instanceof Error && err.message === "Email not confirmed") {
        try {
          await resendOtp({
            email: data.email,
            type: "signup",
          });
        } catch (resendError) {
          console.log("Erreur lors du renvoi automatique:", resendError);
        }
        router.push({
          pathname: "/(auth)/verify-otp",
          params: {
            email: data.email,
            type: "signup",
          },
        });
        return;
      }
      form.setError("root", {
        type: "manual",
        message: t("login.errorInvalidCredentials"),
      });
      console.log(err);
    }
  };

  return {
    control: form.control,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
