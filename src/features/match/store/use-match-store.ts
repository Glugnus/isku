import {
  Match,
  MatchPoint,
  MatchSet,
  MatchTeams,
  PlayerKey,
} from "@/src/features/match/types/match.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MatchStore {
  match: Match | null;
  teams: MatchTeams | null;
  firstServer: PlayerKey;
  initMatch: (match: Match, teams: MatchTeams) => void;
  resetMatch: () => void;
  setFirstServer: (firstServer: MatchStore["firstServer"]) => void;
  sets: MatchSet[];
  points: MatchPoint[];
  addPoint: (point: MatchPoint) => void;
  addSet: (set: MatchSet) => void;
  undoLastPoint: () => void;
  undoLastSet: () => void;
  updateMatchStatus: (status: "planned" | "ongoing" | "completed") => void;
}

export const useMatchStore = create<MatchStore>()(
  persist(
    (set) => ({
      match: null,
      teams: null,
      firstServer: "p1",

      initMatch: (match, teams) => set({ match, teams }),

      resetMatch: () =>
        set({
          match: null,
          teams: null,
          firstServer: "p1",
          sets: [],
          points: [],
        }),

      setFirstServer: (firstServer) => set({ firstServer }),

      sets: [],
      points: [],

      addPoint: (point) =>
        set((state) => ({
          points: [...state.points, point],
        })),

      addSet: (newSet) =>
        set((state) => ({
          sets: [...state.sets, newSet],
        })),

      undoLastPoint: () =>
        set((state) => ({
          points: state.points.slice(0, -1),
        })),

      undoLastSet: () =>
        set((state) => ({
          sets: state.sets.slice(0, -1),
        })),
      updateMatchStatus: (status) =>
        set((state) => ({
          match: state.match ? { ...state.match, status } : null,
        })),
    }),
    {
      name: "isku-match-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        match: state.match,
        teams: state.teams,
        firstServer: state.firstServer,
        sets: state.sets,
        points: state.points,
      }),
    },
  ),
);

/**
 * ARCHITECTURE DES HOOKS DU TRACKER (src/features/match/hooks/)

A traiter : quand un match est terminé, il faut afficher automatiquement l'écran summary et sauvegarder le amtch et réinitialiser.
Pareil avec l'abandon en repassant en planned

 *
 * 4. use-match-stats.ts (useMatchStats)
 *    - Rôle : Agrégation des métriques de jeu à partir de points[].
 *    - Données calculées :
 *        • coups gagnants (winners) par joueur (global / par set)
 *        • fautes directes (unforced errors) par joueur
 *        • total des points joués et pourcentages
 *
 * 5. use-tracker-modals.ts (useTrackerModals)
 *    - Rôle : Gestion de l'affichage et de la navigation locale.
 *    - États : modale de stats ouverte/fermée, confirmation d'abandon, fin de match.
 */
