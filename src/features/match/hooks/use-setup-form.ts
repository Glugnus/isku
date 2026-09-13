import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import {
  createMatch,
  createParticipantsMatch,
  updateMatch,
  updateParticipantsMatch,
} from "@/src/features/match/api/matches-api";
import { useMatch } from "@/src/features/match/hooks/use-match";
import {
  getSetupMatchDefaultValues,
  SetupMatchFormData,
  setupMatchSchema,
} from "@/src/features/match/schema/setup-match-schema";
import {
  mapCreateMatchParticipants,
  mapSetupMatchInfo,
  mapUpdateMatchParticipants,
} from "@/src/features/match/utils/setup-form-mappers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

export const useSetupForm = () => {
  const navigation = useNavigation();
  const { profile } = useAuthContext();
  const { matchId } = useLocalSearchParams<{ matchId?: string }>();
  const isEditing = Boolean(matchId);
  const { match, refetch, isLoading, error, teams } = useMatch(matchId);

  const participantIds =
    teams?.team1 && teams?.team2
      ? { team1Id: teams.team1.id, team2Id: teams.team2.id }
      : null;

  const defaultValues = useMemo<SetupMatchFormData>(() => {
    return getSetupMatchDefaultValues(profile?.username);
  }, [profile?.username]);

  const form = useForm<SetupMatchFormData>({
    resolver: zodResolver(setupMatchSchema),
    defaultValues,
  });

  useEffect(() => {
    if (match) {
      form.reset({
        p1Name: teams?.team1Name ?? "",
        p2Name: teams?.team2Name ?? "",
        currentProfilePosition: teams?.currentProfilePosition,
        location: match?.location ?? "",
        scheduledAt: match?.scheduled_at
          ? new Date(match.scheduled_at)
          : undefined,
        setsToWin: match?.format,
        matchMode: match?.mode,
      });
    }
    if (error) {
      form.setError("root", {
        type: "manual",
        message: "Erreur lors de la récupération du match",
      });
    }
  }, [match, teams, form, error]);

  useFocusEffect(
    useCallback(() => {
      if (matchId) {
        refetch();
      }
      return () => {
        form.reset(defaultValues);
        navigation.setParams({ matchId: undefined } as any);
      };
    }, [form, defaultValues, navigation, refetch, matchId]),
  );

  const handleCreateMatch = async (data: SetupMatchFormData) => {
    const matchInfo = mapSetupMatchInfo(data);
    const matchId = await createMatch({
      ...matchInfo,
      created_by: profile.id,
      sport: "table_tennis",
      status: "planned",
    });
    const participantsInfo = mapCreateMatchParticipants(
      data,
      profile.id,
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
      profile.id,
      matchId,
      participantIds,
    );
    await updateParticipantsMatch(matchId, participantsInfo);
  };

  const onSubmit = async (data: SetupMatchFormData) => {
    try {
      if (isEditing) {
        await handleUpdateMatch(data);
      } else {
        await handleCreateMatch(data);
      }
      form.reset();
      router.push(`/(tabs)/matches`);
    } catch (err) {
      form.setError("root", {
        type: "manual",
        message: isEditing
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
