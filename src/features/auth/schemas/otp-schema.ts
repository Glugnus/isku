import { TFunction } from "i18next";
import { z } from "zod";

export const getOtpSchema = (t: TFunction) =>
  z.object({
    code: z
      .string()
      .length(6, t("validation.otpLength"))
      .regex(/^\d+$/, t("validation.otpDigitsOnly")),
  });

export type OtpFormValues = z.infer<ReturnType<typeof getOtpSchema>>;
