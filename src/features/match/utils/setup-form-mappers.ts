import { SetupMatchFormData } from "@/src/features/match/schema/setup-match-schema";

export const mapSetupMatchInfo = (data: SetupMatchFormData) => {
  const matchInfo = {
    format: data.setsToWin,
    mode: data.matchMode,
    location: data.location || null,
    scheduled_at: data.scheduledAt?.toISOString(),
  };

  return matchInfo;
};

export const mapCreateMatchParticipants = (
  data: SetupMatchFormData,
  profileId: string,
  matchId: string,
) => {
  const team1Participant = {
    match_id: matchId,
    profile_id: data.currentProfilePosition === "1" ? profileId : null,
    team: 1,
    guest_name: data.currentProfilePosition === "1" ? null : data.p1Name,
  };

  const team2Participant = {
    match_id: matchId,
    profile_id: data.currentProfilePosition === "2" ? profileId : null,
    team: 2,
    guest_name: data.currentProfilePosition === "2" ? null : data.p2Name,
  };

  return [team1Participant, team2Participant];
};

export const mapUpdateMatchParticipants = (
  data: SetupMatchFormData,
  profileId: string,
  matchId: string,
  participantIds: { team1Id: number; team2Id: number },
) => {
  const [team1, team2] = mapCreateMatchParticipants(data, profileId, matchId);

  return [
    { ...team1, id: participantIds.team1Id },
    { ...team2, id: participantIds.team2Id },
  ];
};
