import { TFunction } from "i18next";
import { z } from "zod";

export const getSetupMatchSchema = (t: TFunction<"match">) =>
  z.object({
    p1Name: z.string().min(1, t("validation.nameRequired")),
    p2Name: z.string().min(1, t("validation.nameRequired")),
    currentProfilePosition: z.enum(["p1", "p2"]),
    location: z.string().optional(),
    scheduledAt: z.date().optional(),
    setsToWin: z.number().int().positive().min(1),
    matchMode: z.enum(["umpire", "quick"]),
  });

export type SetupMatchFormData = z.infer<
  ReturnType<typeof getSetupMatchSchema>
>;
