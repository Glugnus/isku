export type SportType = "table_tennis" | "tennis" | "padel" | "badminton";

export type HandleType = "flared" | "straight" | "anatomic" | "penhold";
// Concave, Droit, Anatomique, Porte-plume

export type SpongeThickness = "1.5mm" | "1.8mm" | "2.0mm" | "max" | "other";

export type RubberColor =
  | "red"
  | "black"
  | "blue"
  | "green"
  | "pink"
  | "purple";

export interface RubberSetup {
  name: string; // Ex: "Dignics 09C"
  brand: string; // Ex: "Butterfly"
  thickness: SpongeThickness;
  color: RubberColor;
}

export interface BladeSetup {
  name: string; // Ex: "Viscaria"
  brand: string; // Ex: "Butterfly"
  handleType: HandleType;
}

export interface TableTennisGearSetup {
  id: string;
  userId: string;
  sport: "table_tennis";
  name: string; // Ex: "Setup Compétition", "Raquette Carbone"
  blade: BladeSetup;
  forehandRubber: RubberSetup;
  backhandRubber: RubberSetup;
  weightGrams?: number; // Poids total en grammes (ex: 185g)
  assembledAt?: string; // Date de montage (format ISO, ex: "2026-09-15")
  playTimeMinutes: number; // Temps de jeu cumulé (pour la jauge d'usure)
  isDefault: boolean; // La raquette sélectionnée par défaut pour les matchs
  createdAt: string;
  updatedAt: string;
}

export type GearSetup = TableTennisGearSetup;

// Mock data pour concevoir et prototyper la vue éclatée et le carrousel
export const MOCK_GEAR_SETUPS: TableTennisGearSetup[] = [
  {
    id: "gear-1",
    userId: "user-1",
    sport: "table_tennis",
    name: "Setup Compétition",
    blade: {
      name: "Viscaria Super ALC",
      brand: "Butterfly",
      handleType: "flared",
    },
    forehandRubber: {
      name: "Dignics 09C",
      brand: "Butterfly",
      thickness: "2.0mm",
      color: "black",
    },
    backhandRubber: {
      name: "Tenergy 05",
      brand: "Butterfly",
      thickness: "1.8mm",
      color: "red",
    },
    weightGrams: 187,
    assembledAt: "2026-09-01",
    playTimeMinutes: 750, // 12h30
    isDefault: true,
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-01T10:00:00.000Z",
  },
  {
    id: "gear-2",
    userId: "user-1",
    sport: "table_tennis",
    name: "Setup Contrôle / Backup",
    blade: {
      name: "Allround Classic",
      brand: "Stiga",
      handleType: "straight",
    },
    forehandRubber: {
      name: "Fastarc G-1",
      brand: "Nittaku",
      thickness: "2.0mm",
      color: "red",
    },
    backhandRubber: {
      name: "Rakza 7 Soft",
      brand: "Yasaka",
      thickness: "1.8mm",
      color: "black",
    },
    weightGrams: 178,
    assembledAt: "2026-10-15",
    playTimeMinutes: 240, // 4h00
    isDefault: false,
    createdAt: "2026-10-15T14:30:00.000Z",
    updatedAt: "2026-10-15T14:30:00.000Z",
  },
];
