export type SportType = "table_tennis" | "tennis" | "padel" | "badminton" | "squash";

export type SetupStatus = "active" | "backup" | "archived";

export type SpeedCategory = "DEF" | "ALL-" | "ALL" | "ALL+" | "OFF-" | "OFF" | "OFF+";

export type HandleType = "flared" | "straight" | "anatomic" | "penhold";
// FL / Concave, ST / Droit, AN / Anatomique, CP / Porte-plume

export type SpongeThickness = "1.5mm" | "1.7mm" | "1.8mm" | "1.9mm" | "2.0mm" | "2.1mm" | "max" | "other";

export type RubberColor = "red" | "black" | "blue" | "green" | "pink" | "purple";

export interface RubberSetup {
  brand: string;
  name: string;
  thickness: SpongeThickness;
  color: RubberColor;
  wearPercentage: number; // 0 - 100%
  hoursUsed: number;
}

export interface BladeSetup {
  brand: string;
  name: string;
  category: SpeedCategory;
  handleType: HandleType;
  composition?: string;
}

export interface GearAiAdvice {
  title: string;
  headline: string;
  adviceText: string;
  recommendedAction: string;
}

export interface GearSetup {
  id: string;
  userId: string;
  sport: SportType;
  setupNumber: number;
  name: string; // Ex: "Setup #01 — OFF+"
  category: SpeedCategory;
  status: SetupStatus;
  blade: BladeSetup;
  forehandRubber: RubberSetup;
  backhandRubber: RubberSetup;
  weightGrams: number;
  assembledAt: string;
  assemblyAgeMonths: number;
  totalPlayTimeHours: number;
  lastMaintenanceDate: string;
  nextCheckupEstimate: string;
  aiAdvice: GearAiAdvice;
  createdAt: string;
  updatedAt: string;
}

// 3 mock setups réalistes et vivants pour le carrousel visuel
export const MOCK_GEAR_SETUPS: GearSetup[] = [
  {
    id: "setup-01",
    userId: "user-current",
    sport: "table_tennis",
    setupNumber: 1,
    name: "Setup #01 — OFF+",
    category: "OFF+",
    status: "active",
    blade: {
      brand: "Butterfly",
      name: "Butterfly Viscaria",
      category: "OFF+",
      handleType: "flared",
      composition: "5 plis bois + 2 ALC",
    },
    forehandRubber: {
      brand: "Butterfly",
      name: "Tenergy 05",
      thickness: "2.1mm",
      color: "black",
      wearPercentage: 82,
      hoursUsed: 126,
    },
    backhandRubber: {
      brand: "Butterfly",
      name: "Dignics 09C",
      thickness: "2.1mm",
      color: "red",
      wearPercentage: 64,
      hoursUsed: 98,
    },
    weightGrams: 184,
    assembledAt: "2025-07-15",
    assemblyAgeMonths: 8,
    totalPlayTimeHours: 126,
    lastMaintenanceDate: "12/03/2026",
    nextCheckupEstimate: "dans ~2 mois",
    aiAdvice: {
      title: "CONSEIL ISKU",
      headline: "Ton setup est très offensif.",
      adviceText:
        "Ton profil semble favoriser le topspin et la vitesse près de la table. Ton revers pourrait cependant gagner en contrôle sur les blocs passifs.",
      recommendedAction: "Optimiser ce setup",
    },
    createdAt: "2025-07-15T10:00:00.000Z",
    updatedAt: "2026-03-12T14:30:00.000Z",
  },
  {
    id: "setup-02",
    userId: "user-current",
    sport: "table_tennis",
    setupNumber: 2,
    name: "Setup #02 — OFF",
    category: "OFF",
    status: "backup",
    blade: {
      brand: "Butterfly",
      name: "Innerforce Layer ALC",
      category: "OFF",
      handleType: "straight",
      composition: "5 plis bois + 2 Inner ALC",
    },
    forehandRubber: {
      brand: "Butterfly",
      name: "Rozena",
      thickness: "1.9mm",
      color: "red",
      wearPercentage: 90,
      hoursUsed: 45,
    },
    backhandRubber: {
      brand: "Butterfly",
      name: "Dignics 05",
      thickness: "2.1mm",
      color: "black",
      wearPercentage: 85,
      hoursUsed: 45,
    },
    weightGrams: 179,
    assembledAt: "2025-11-20",
    assemblyAgeMonths: 4,
    totalPlayTimeHours: 45,
    lastMaintenanceDate: "20/11/2025",
    nextCheckupEstimate: "dans ~4 mois",
    aiAdvice: {
      title: "CONSEIL ISKU",
      headline: "Setup réserve polyvalent & sécurisant.",
      adviceText:
        "Positionnement carbone interne offrant un temps de contact prolongé. Excellent choix de secours pour les matchs contre des joueurs à balle coupée lourde.",
      recommendedAction: "Adhérence et tension optimales",
    },
    createdAt: "2025-11-20T08:00:00.000Z",
    updatedAt: "2025-11-20T08:00:00.000Z",
  },
  {
    id: "setup-03",
    userId: "user-current",
    sport: "table_tennis",
    setupNumber: 3,
    name: "Setup #03 — CONTROL",
    category: "ALL+",
    status: "backup",
    blade: {
      brand: "Butterfly",
      name: "Butterfly Primorac",
      category: "ALL+",
      handleType: "anatomic",
      composition: "5 plis 100% bois naturel",
    },
    forehandRubber: {
      brand: "Butterfly",
      name: "Rozena",
      thickness: "1.7mm",
      color: "black",
      wearPercentage: 72,
      hoursUsed: 80,
    },
    backhandRubber: {
      brand: "Butterfly",
      name: "Rozena",
      thickness: "1.7mm",
      color: "red",
      wearPercentage: 75,
      hoursUsed: 80,
    },
    weightGrams: 175,
    assembledAt: "2025-06-10",
    assemblyAgeMonths: 9,
    totalPlayTimeHours: 80,
    lastMaintenanceDate: "10/06/2025",
    nextCheckupEstimate: "dans ~1 mois",
    aiAdvice: {
      title: "CONSEIL ISKU",
      headline: "Configuration d'entraînement au toucher pur.",
      adviceText:
        "Bois 100% naturel sans fibre synthétique. Parfait pour travailler le relâchement du poignet et la précision du premier démarrage.",
      recommendedAction: "Contrôler l'usure de la tranche",
    },
    createdAt: "2025-06-10T11:00:00.000Z",
    updatedAt: "2025-06-10T11:00:00.000Z",
  },
];
