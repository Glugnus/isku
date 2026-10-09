import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import {
  createMatch,
  createParticipantsMatch,
  getMatch,
  updateMatch,
  updateParticipantsMatch,
} from "@/src/features/match/api/matches-api";
import {
  SetupMatchFormData,
  setupMatchSchema,
} from "@/src/features/match/schema/setup-match-schema";
import { getMatchParticipantsTeams } from "@/src/features/match/utils/match-participants-teams";
import {
  mapCreateMatchParticipants,
  mapSetupMatchInfo,
  mapUpdateMatchParticipants,
} from "@/src/features/match/utils/setup-form-mappers";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useSetupForm = () => {
  const { id: matchId } = useLocalSearchParams<{ id?: string }>();
  const { profile } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [participantIds, setParticipantIds] = useState<{
    team1Id: number;
    team2Id: number;
  } | null>(null);

  const form = useForm<SetupMatchFormData>({
    resolver: zodResolver(setupMatchSchema),
    defaultValues: {
      p1Name: profile?.username,
      p2Name: "",
      currentProfilePosition: "p1",
      location: "",
      scheduledAt: undefined,
      setsToWin: 3,
      matchMode: "umpire",
    },
  });

  useEffect(() => {
    if (matchId) {
      const fetchMatch = async () => {
        setIsLoading(true);
        try {
          const match = await getMatch(matchId.toString());
          const { teams } = getMatchParticipantsTeams(
            match.match_participants,
            profile?.id,
          );
          form.reset({
            p1Name: teams.team1Name ?? "",
            p2Name: teams.team2Name ?? "",
            currentProfilePosition: teams.currentProfilePosition,
            location: match.location ?? "",
            scheduledAt: match.scheduled_at
              ? new Date(match.scheduled_at)
              : undefined,
            setsToWin: match.format,
            matchMode: match.mode,
          });
          if (teams.team1 && teams.team2) {
            setParticipantIds({
              team1Id: teams.team1.id,
              team2Id: teams.team2.id,
            });
          }
        } catch (err) {
          form.setError("root", {
            type: "manual",
            message: "Erreur lors de la récupération du match",
          });
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMatch();
    }
  }, [matchId, profile?.id, form]);

  const handleCreateMatch = async (data: SetupMatchFormData) => {
    const matchInfo = mapSetupMatchInfo(data);

    const matchId = await createMatch({
      ...matchInfo,
      created_by: profile?.id,
      sport: "table_tennis",
      status: "planned",
    });
    const participantsInfo = mapCreateMatchParticipants(
      data,
      profile?.id,
      matchId,
    );
    await createParticipantsMatch(participantsInfo);
  };

  const handleUpdateMatch = async (data: SetupMatchFormData) => {
    if (!matchId || !participantIds) return;
    const matchInfo = mapSetupMatchInfo(data);
    await updateMatch(matchId, matchInfo);

    const participantsInfo = mapUpdateMatchParticipants(
      data,
      profile?.id,
      matchId,
      participantIds,
    );
    await updateParticipantsMatch(matchId, participantsInfo);
  };

  const onSubmit = async (data: SetupMatchFormData) => {
    if (!profile?.id) throw new Error("Profile not found");
    try {
      if (matchId) {
        await handleUpdateMatch(data);
        router.back();
      } else {
        await handleCreateMatch(data);
        router.push(`/(tabs)/matches`);
      }
      form.reset();
    } catch (err) {
      form.setError("root", {
        type: "manual",
        message: matchId
          ? "Erreur lors de la mise à jour du match"
          : "Erreur lors de la création du match",
      });
      console.log(err);
    }
  };

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
  };
};
