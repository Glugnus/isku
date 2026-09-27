import {
  Match,
  MatchPoint,
  MatchSet,
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
  sets: MatchSet[];
  points: MatchPoint[];
  addPoint: (point: MatchPoint) => void;
  addSet: (set: MatchSet) => void;
  undoLastPoint: () => void;
  undoLastSet: () => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
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
}));

/**
 * ARCHITECTURE DES HOOKS DU TRACKER (src/features/match/hooks/)

// création d'un hook useMatchTracker, qui va faire le chef d'orchestre de tous les autres hooks, voir s'il faut pas les mettre dans des utils du coup
// il va contenir le state global du match et la logique de validation de set et de match, il va appeler les autres hooks pour récupérer les données dont il a besoin, et il va appeler les autres hooks pour effectuer les actions qu'il a besoin d'effectuer
// tous les autres hooks doivent être des hooks purs et ne contenir que de la logique

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
