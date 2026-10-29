import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import { getAllMatches } from "@/src/features/match/api/matches-api";
import { TFunction } from "i18next";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface Section {
  title: string;
  data: MatchListItem[];
  isPrepared: boolean;
}

export type MatchListItem = NonNullable<
  Awaited<ReturnType<typeof getAllMatches>>
>[number];

export const useMatchesList = () => {
  const { profile } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const { t } = useTranslation("matches");

  const profileId = profile?.id;

  const getMatches = useCallback(async () => {
    if (profileId) {
      setError(null);
      try {
        setIsLoading(true);
        const matches = await getAllMatches(profileId);
        const groupedMatches = groupMatchesByStatus(matches, t);
        setSections(groupedMatches);
      } catch (err) {
        if (typeof err === "string") setError(err);
        else if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [profileId, t]);
  return { sections, getMatches, isLoading, error };
};

function groupMatchesByStatus(
  matches: MatchListItem[],
  t: TFunction<"matches">,
) {
  const preparedMatches = matches.filter((m) => m.status === "planned");
  const completedMatches = matches.filter((m) => m.status !== "planned");
  const groupedMatches = [];
  preparedMatches.length > 0 &&
    groupedMatches.push({
      title: t("preparedTitle"),
      data: preparedMatches,
      isPrepared: true,
    });
  completedMatches.length > 0 &&
    groupedMatches.push({
      title: t("completedTitle"),
      data: completedMatches,
      isPrepared: false,
    });

  return groupedMatches;
}

// Oui, tu décris exactement le pattern appelé Feature Colocation (co-localisation par domaine métier, issu de la Vertical Slice Architecture). C'est très cohérent avec ton découpage dans src/features/ : chaque domaine embarque ses composants, ses hooks, son API… et ses traductions !

// Petite remarque d'architecte sur l'emplacement de common : dans ton architecture actuelle, src/ ne contient que 5 dossiers racines bien définis (types/, lib/, hooks/, components/, features/). Plutôt que de créer un 6e dossier src/locales/, garder les traductions transversales dans src/lib/i18n/locales/ (juste à côté de config.ts) évite d'éparpiller la configuration globale.

// Exemple concret pour visualiser : common + match

// Prenons un composant réel de ton projet : MatchesEmptyState. Regarde sa ligne 15 : {error ? "Erreur" : t("emptyTitle")}. On y voit deux natures de textes différentes : "Erreur" (générique à toute l'app) et "Aucun historique" (propre à la liste des matchs).

// 1. Le rangement des fichiers (Schéma d'arborescence)
// text
// src/
// ├── lib/i18n/
// │   ├── config.ts                  # Initialise i18next avec l'objet resources assemblé
// │   └── locales/                   # Namespace transversal "common" (defaultNS)
// │       ├── en.json
// │       └── fr.json
// └── features/
//     ├── auth/
//     │   └── locales/               # Namespace "auth" (en.json, fr.json)
//     └── match/
//         └── locales/               # Namespace "match"
//             ├── en.json
//             └── fr.json
// 2. Ce que contient chaque JSON (Pseudo-structure)

// Contrairement à ton fr.json actuel, on n'écrit plus le nom du namespace à la racine du fichier, car le fichier représente déjà ce namespace :

// Dans src/lib/i18n/locales/fr.json (Namespace common) -> actions, états globaux, navigation :
// json
// { "actions": { "save": "Enregistrer", "cancel": "Annuler" }, "states": { "error": "Erreur" } }
// Dans src/features/match/locales/fr.json (Namespace match) -> sous-découpé par contexte du domaine (list, setup, tracker...) :
// json
// { "list": { "emptyTitle": "Aucun historique", "preparedTitle": "Matchs préparés" } }
// 3. Le point de vigilance : l'assemblage (Resource Bundle)

// Dans config.ts, i18next attend toujours un objet resources structuré sous la forme langue -> namespace -> contenu :

// ts
// // Pseudo-structure attendue par i18next
// resources = { fr: { common: commonFr, match: matchFr }, en: { ... } }
// Deux petites questions pour valider ce design ensemble
// Les textes hors features/ : Dans TabsLayout, tu as les libellés d'onglets "Nouveau", "Mes Matchs", "Profil" qui vivent dans app/ et non dans une feature précise. Avec cette organisation, dans quel fichier et sous quelle sous-clé les rangerais-tu ?
// Impact sur TypeScript : Regarde ton fichier i18next.d.ts actuel (resources: typeof fr). Maintenant que fr n'est plus un seul fichier JSON mais un assemblage de plusieurs fichiers, que vas-tu devoir exporter et importer dans i18next.d.ts pour conserver l'autocomplétion sur tous tes namespaces ?
