import { getProfileMatchData } from "@/src/features/profile/api/profile-api";

export type ProfileMatchData = Awaited<ReturnType<typeof getProfileMatchData>>;
