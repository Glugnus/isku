import { signUp } from "@/src/features/auth/api/auth-api";
import {
  getRegisterSchema,
  RegisterFormValues,
} from "@/src/features/auth/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const useRegisterForm = () => {
  const { t } = useTranslation("auth");
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(getRegisterSchema(t)),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await signUp(data);
      router.push({
        pathname: "/(auth)/verify-otp",
        params: {
          email: data.email,
          type: "email",
        },
      });
    } catch (err) {
      form.setError("root", {
        type: "manual",
        message: t("register.errorSignUp"),
      });
      console.log(err);
    }
  };

  return {
    control: form.control,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: () => form.handleSubmit(onSubmit)(),
  };
};
