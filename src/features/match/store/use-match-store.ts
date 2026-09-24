import {
  Match,
  MatchTeams,
  PlayerKey,
} from "@/src/features/match/types/match.types";
import { create } from "zustand";

interface MatchStore {
  match: Match | null;
  teams: MatchTeams | null;
  firstServer: PlayerKey;
  initMatch: (match: Match, teams: MatchTeams) => void;
  resetMatch: () => void;
  setFirstServer: (firstServer: MatchStore["firstServer"]) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
  match: null,
  teams: null,
  firstServer: "p1",

  initMatch: (match, teams) => set({ match, teams }),
  resetMatch: () => set({ match: null, teams: null, firstServer: "p1" }),
  setFirstServer: (firstServer) => set({ firstServer }),
}));
