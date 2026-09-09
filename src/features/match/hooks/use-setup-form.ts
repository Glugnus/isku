import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import {
  createMatch,
  createParticipantsMatch,
} from "@/src/features/match/api/matches-api";
import {
  SetupMatchFormData,
  setupMatchSchema,
} from "@/src/features/match/schema/setup-match-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

export const useSetupForm = () => {
  const { profile } = useAuthContext();

  const form = useForm<SetupMatchFormData>({
    resolver: zodResolver(setupMatchSchema),
    defaultValues: {
      p1Name: profile?.username,
      p2Name: "",
      currentProfilePosition: "1",
      location: "",
      scheduledAt: undefined,
      setsToWin: 3,
      matchMode: "umpire",
    },
  });

  const onSubmit = async (data: SetupMatchFormData) => {
    try {
      const matchId = await createMatch({
        created_by: profile.id,
        sport: "table_tennis",
        format: data.setsToWin,
        mode: data.matchMode,
        status: "planned",
        location: data.location || null,
        scheduled_at: data.scheduledAt?.toISOString(),
      });
      const isP1Profile = data.currentProfilePosition === "1";
      await createParticipantsMatch([
        {
          match_id: matchId,
          profile_id: isP1Profile ? profile.id : null,
          team: 1,
          guest_name: isP1Profile ? null : data.p1Name,
        },
        {
          match_id: matchId,
          profile_id: !isP1Profile ? profile.id : null,
          team: 2,
          guest_name: !isP1Profile ? null : data.p2Name,
        },
      ]);
      form.reset();
      router.push(`/(tabs)/matches`);
    } catch (err) {
      form.setError("root", {
        type: "manual",
        message: "Erreur lors de la création du match",
      });
      console.log(err);
    }
  };
  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
  };
};
