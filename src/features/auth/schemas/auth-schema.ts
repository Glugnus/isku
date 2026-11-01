import { TFunction } from "i18next";
import { z } from "zod";

const getEmailValidation = (t: TFunction) =>
  z
    .string()
    .trim()
    .min(1, t("validation.emailRequired"))
    .email(t("validation.emailInvalid"));

const getPasswordValidation = (t: TFunction) =>
  z
    .string()
    .min(8, t("validation.passwordMin", { count: 8 }))
    .regex(/[a-zA-Z]/, t("validation.passwordLetter"))
    .regex(/[0-9]/, t("validation.passwordNumber"));

const getConfirmPasswordValidation = (t: TFunction) =>
  z.string().min(1, t("validation.confirmPasswordRequired"));

const getUsernameValidation = (t: TFunction) =>
  z
    .string()
    .min(3, t("validation.usernameMin", { count: 3 }))
    .max(20, t("validation.usernameMax", { count: 20 }));

export const getLoginSchema = (t: TFunction) =>
  z.object({
    email: getEmailValidation(t),
    password: z.string().min(1, t("validation.passwordRequired")),
  });

export const getRegisterSchema = (t: TFunction) =>
  z
    .object({
      username: getUsernameValidation(t),
      email: getEmailValidation(t),
      password: getPasswordValidation(t),
      confirmPassword: getConfirmPasswordValidation(t),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordMismatch"),
      path: ["confirmPassword"],
    });

export const getResetPasswordFormSchema = (t: TFunction) =>
  z
    .object({
      password: getPasswordValidation(t),
      confirmPassword: getConfirmPasswordValidation(t),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordMismatch"),
      path: ["confirmPassword"],
    });

export const getForgotPasswordSchema = (t: TFunction) =>
  z.object({
    email: getEmailValidation(t),
  });

export type RegisterFormValues = z.infer<ReturnType<typeof getRegisterSchema>>;

export type LoginFormValues = z.infer<ReturnType<typeof getLoginSchema>>;

export type ResetPasswordFormValues = z.infer<
  ReturnType<typeof getResetPasswordFormSchema>
>;

export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof getForgotPasswordSchema>
>;
