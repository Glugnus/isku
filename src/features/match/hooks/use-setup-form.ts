import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import {
  createMatch,
  createParticipantsMatch,
  getMatch,
} from "@/src/features/match/api/matches-api";
import {
  SetupMatchFormData,
  setupMatchSchema,
} from "@/src/features/match/schema/setup-match-schema";
import { getMatchParticipantsTeams } from "@/src/features/match/utils/match-participants-teams";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useSetupForm = () => {
  const { profile } = useAuthContext();
  const { matchId } = useLocalSearchParams<{ matchId?: string }>();
  const isEditing = Boolean(matchId);

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

  useEffect(() => {
    if (!matchId) return;
    const fetchMatch = async () => {
      try {
        const match = await getMatch(matchId);
        const { team1Name, team2Name, currentProfilePosition } =
          getMatchParticipantsTeams(match.match_participants, profile.id);
        form.reset({
          p1Name: team1Name ?? "",
          p2Name: team2Name ?? "",
          currentProfilePosition: currentProfilePosition,
          location: match.location ?? "",
          scheduledAt: match.scheduled_at
            ? new Date(match.scheduled_at)
            : undefined,
          setsToWin: match.format,
          matchMode: match.mode,
        });
      } catch (err) {
        form.setError("root", {
          type: "manual",
          message: "Erreur lors de la récupération du match",
        });
        console.log(err);
      }
    };
    fetchMatch();
  }, [matchId, profile?.id, form]);

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
