import { getMatch } from "@/src/features/match/api/matches-api";

type Participant = NonNullable<
  Awaited<ReturnType<typeof getMatch>>
>["match_participants"][number];

export const getMatchParticipantsTeams = (
  participants: Participant[],
  profileId?: string,
) => {
  const team1 = participants.find((p) => p.team === 1);
  const team2 = participants.find((p) => p.team === 2);

  const team1Name = team1?.profiles?.username ?? team1?.guest_name;
  const team2Name = team2?.profiles?.username ?? team2?.guest_name;

  const currentProfilePosition: "1" | "2" =
    team1?.profile_id === profileId ? "1" : "2";

  return {
    team1,
    team2,
    team1Name,
    team2Name,
    currentProfilePosition,
  };
};
