# 🎒 Feature "Mon Sac / Équipement" — Spécifications & Roadmap Dédiée

> **Statut** : Document de référence feature (PRD & Architecture)  
> **Auteur / Référent** : Équipe Isku  
> **Dernière mise à jour** : Novembre 2026  
> **Version cible initiale** : V1.1 (Tennis de table) ➔ Évolution V2.0 (Multi-sports) & V3.0 (Coach IA)

---

## 🎯 1. Vision Produit & Philosophie

La feature **"Mon Sac / Équipement"** a pour ambition de devenir le véritable **carnet de bord matériel du joueur**.

Elle dépasse la simple fiche technique statique : Isku doit savoir **quel matériel le joueur possède, lequel il utilise réellement, depuis quand, pendant combien d'heures de jeu, sur quels matchs et dans quel état d'usure il se trouve**.

```text
                    ISKU
                      │
        ┌─────────────┼─────────────┐
        │             │             │
      MATCHS       JOUEUR       MATÉRIEL
        │             │             │
        └─────────────┼─────────────┘
                      │
                  ANALYSE
                      │
                   COACH IA
                      │
              RECOMMANDATIONS
```

À terme, la valeur unique d'Isku ne sera pas seulement de _« compter des points »_, mais d'être **l'écosystème qui comprend intimement le jeu, les résultats et le matériel du joueur**.

---

## 📐 2. Architecture Technique & Modèle de Données

### 2.1. Principes Directeurs

1. **Extensibilité Multi-Sports sans refonte** : La structure doit accueillir le tennis de table en V1.1 sans bloquer l'arrivée du tennis, padel ou badminton en V2.0.
2. **Immuabilité de l'Historique (Traçabilité)** : Un setup modifié ou archivé ne doit **jamais** casser l'historique des matchs passés. On privilégie le _soft delete_ (`status: 'archived'`) et le versioning.
3. **Vérité Terrain (Data fiabilisée)** : Le cumul d'heures d'utilisation est dérivé des matchs réels (temps d'arbitrage ou saisie rapide) additionné à un éventuel offset initial déclaré par le joueur.

### 2.2. Schéma Conceptuel

```text
Sport (table_tennis, tennis, padel, etc.)
  └── Setup (id, user_id, sport, name, status, is_default, total_play_time_seconds, weight_g, ...)
        └── Components (Blade / Frame, Rubber / String, Handle, etc.)
```

### 2.3. Entités Cibles (Spécification TypeScript & Schéma DB)

```typescript
// Statuts de cycle de vie
export type SetupStatus = "active" | "backup" | "archived";

// Rôles de composants modulaires
export type ComponentType =
  | "blade" // Tennis de table (bois)
  | "rubber_forehand" // Tennis de table (revêtement CD)
  | "rubber_backhand" // Tennis de table (revêtement RV)
  | "frame" // Tennis / Squash / Badminton (cadre)
  | "string" // Cordage
  | "pala" // Padel
  | "grip"; // Tous sports
```

> [!TIP]
> **Conseil d'Architecture Base de Données (PostgreSQL / Supabase)** :  
> En V1.1, pour allier performance, simplicité de requête et extensibilité sans multiplier les jointures complexes, nous recommandons une table `gear_setups` contenant les métadonnées universelles (titre, statut, sport, heures cumulées) associée soit à une table `gear_components`, soit à une structure JSONB typée pour les spécificités de chaque composant (bois, revêtements, épaisseurs).

---

## 🗺️ 3. Feuille de Route Détaillée (Roadmap)

---

### 🥇 V1.1 — Socle "Mon Sac" (Tennis de Table)

> **Objectif** : Permettre au pongiste de configurer ses raquettes, d'adopter la signature visuelle Isku, d'associer son matériel à chaque match et d'amorcer le cumul automatique des heures de jeu.

#### 1. Gestion des Setups

- [ ] Création, modification et duplication d'un setup.
- [ ] Statut du setup :
  - `Actif` (setup principal ou en rotation active).
  - `Réserve` (raquette de secours dans le sac).
  - `Archivé` (ancien setup retiré de la rotation, historique préservé).
- [ ] Sélection d'un setup par défaut (pré-sélectionné pour les matchs).
- [ ] Suppression définitive avec boîte de dialogue d'avertissement (uniquement si aucun match n'y est rattaché ; sinon archivage forcé).

#### 2. Fiche Matériel Tennis de Table

Pour chaque raquette :

- **Bois (Blade)** : Marque, modèle, référence, catégorie de vitesse (`DEF` à `OFF+`), forme du manche (`flared`, `straight`, `anatomic`, `penhold`).
- **Revêtement Coup Droit (Forehand Rubber)** : Marque, modèle, couleur, épaisseur de mousse, date de collage/montage.
- **Revêtement Revers (Backhand Rubber)** : Marque, modèle, couleur, épaisseur de mousse, date de collage/montage.
- **Métadonnées complémentaires** : Poids total assemblé (en grammes), notes personnelles, date d'assemblage initiale.

#### 3. Écran "Mon Sac" & Signature Visuelle "Blueprint"

- [ ] Carrousel horizontal fluide entre les différents setups du sac.
- [ ] Mise en valeur du setup actif avec vue en arrière-plan des raquettes de réserve.
- [ ] **Signature Visuelle Isku (Exploded View / Plan Technique Blueprint)** :
  - Représentation vectorielle (SVG) éclatée : Bois central, revêtement CD, revêtement RV, manche.
  - Lignes de cotes techniques, annotations (épaisseurs, vitesse, poids).
  - Grille millimétrée / Blueprint aux couleurs Isku (Bleu technique / Jaune vif).
- [ ] Carte de diagnostic rapide synthétique :
  - _Exemple : `184 g · Monté il y a 8 mois · 126 h de jeu · CD estimé 82% · RV estimé 64%`_.

#### 4. Diagnostic d'Usure (Phase Déclarative V1.1)

- [ ] Saisie ou ajustement estimé de l'usure des revêtements (jauge déclarative 0 - 100%).
- [ ] Date du dernier changement / collage.
- [ ] Âge calculé du setup (en mois depuis la date de montage).

#### 5. Association Match ↔ Matériel & Compteur d'Heures

- [ ] Sélecteur de setup lors de la préparation d'un match (pré-rempli avec le setup actif).
- [ ] Enregistrement du `setup_id` dans la table / l'objet du match.
- [ ] **Alimentation du compteur d'heures** :
  - **Mode Arbitre** : Récupération du temps effectif chronométré de la rencontre.
  - **Mode Rapide** : Prise en compte de la durée saisie manuellement par l'utilisateur.
  - Incrément automatique du compteur `total_play_time_hours` du setup concerné.

#### 6. Viralité & Partage Social

- [ ] Affichage discret du setup utilisé sur les Stories générées (ex: _« Setup : Butterfly Viscaria / Tenergy 05 / Dignics 09C »_).

---

### 🥈 V1.2 — Réseau, Profils & Statistiques Matériel

> **Objectif** : Rendre le matériel visible sur les profils communautaires et délivrer les premières métriques de performance par setup.

#### 1. Dimension Sociale & Profils Connectés

- [ ] Affichage du setup principal et de la raquette active sur le profil public du joueur.
- [ ] Consultation du matériel des adversaires / partenaires d'entraînement depuis leur fiche profil.
- [ ] Paramètre de confidentialité : masquer ou afficher son sac aux amis.

#### 2. Statistiques de Performance par Setup

- [ ] Nombre de matchs officiels et amicaux disputés par setup.
- [ ] Taux de victoire (% win rate) corrélé à chaque raquette.
- [ ] Ratio de sets gagnés/perdus selon le matériel.
- [ ] Temps total passé sur la table par setup.

#### 3. Comparateur de Setups (A vs B)

- [ ] Vue comparative côte à côte : _Setup #01 (OFF+) vs Setup #02 (Contrôle)_.
- [ ] Comparaison des rendements : victoires, durées moyennes de match, adversaires battus.

#### 4. Timeline du Matériel (Journal de bord)

- [ ] Historique chronologique des changements : montage d'une nouvelle plaque, changement de bois, ajustement de poids.
- [ ] Archivage automatique des configurations successives pour retracer la progression du joueur.

---

### 🏸 V2.0 — Extension Multi-Sports ("Le Garage Multisports")

> **Objectif** : Déployer le concept de "Setup" sur l'ensemble des sports de raquette supportés par Isku.

#### 1. Tennis

- [ ] Cadre : Marque, modèle, poids non cordé, équilibre, plan de cordage (ex: 16x19, 18x20).
- [ ] Cordage : Marque, référence (monofilament, multifilament, boyau), jauge (ex: 1.25mm), tension (montants / travers en kg et lbs).
- [ ] Date de pose du cordage et compteur d'heures dédié au cordage (suivi de la perte d'élasticité).

#### 2. Padel

- [ ] Pala : Marque, modèle, forme (ronde, goutte d'eau, diamant), équilibre, poids.
- [ ] Spécificités du noyau : Mousse (Black EVA, FOAM, etc.), surface (carbone 3K/12K, fibre de verre, rugosité/grit).
- [ ] Nombre d'heures d'impact et protection de cadre.

#### 3. Badminton & Squash

- [ ] Spécifications raquette, cordage, tension, type de grip / surgrip.

#### 4. Expérience Multi-Sac

- [ ] Sélecteur de discipline au niveau de "Mon Sac" (onglets ou filtres par sport).
- [ ] Modèle de données unifié sous l'abstraction `Sport -> Setup -> Component`.

---

### 🤖 V3.0 — Coach IA, Usure Prédictive & Monétisation

> **Objectif** : Exploiter la boucle de données complète (_Matchs + Durée + Style de jeu + Matériel_) pour générer des recommandations à haute valeur ajoutée et monétiser via Isku Pro et l'affiliation.

#### 1. Diagnostic d'Usure Algorithmique (Smart Wear Detection)

- [ ] Modèle prédictif estimant l'usure réelle basé sur :
  - Le cumul d'heures réelles jouées.
  - La fréquence des séances et l'intensité des matchs.
  - La typologie du matériel (ex: revêtements tensors vs chinois, cordage mono vs multi).
- [ ] Alertes proactives de maintenance :
  - _« ⚠️ Votre revêtement CD totalise 65 h de jeu effectif : baisse d'adhérence estimée. »_
  - _« 🎾 Votre cordage approche les 20 h : perte de tension estimée à ~15 %. »_

#### 2. Coach IA Matériel & Recommandations Personnalisées

- [ ] Analyse croisée style de jeu / matériel :
  - _« Votre taux de victoire en contre-initiative est plus élevé avec le Setup OFF qu'avec le Setup OFF+. »_
- [ ] Requêtes conversationnelles contextualisées :
  - _« Je manque de contrôle sur les retours courts, quelle alternative pour mon revers ? »_
  - Réponse de l'IA ancrée sur les données réelles du sac et les résultats passés du joueur.

#### 3. Monétisation & Modèle Économique (SASU Isku)

- [ ] **Pass Diagnostic Matériel (À l'acte)** : Bilan complet du setup et plan de préconisations personnalisé.
- [ ] **Abonnement Isku Pro** :
  - Alertes prédictives d'usure illimitées.
  - Suivi multi-setups et analyses avancées de corrélation matériel / performance.
- [ ] **Affiliation Contextuelle & Éthique** :
  - Liens marchands qualifiés au moment exact où le matériel nécessite un remplacement (_« Voir les revêtements compatibles »_).

---

## 🏗️ 4. Méthodologie d'Implémentation V1.1 (Du Pixel à la Data)

Pour garantir une expérience utilisateur irréprochable sur Android (Google Pixel 10) et une architecture maintenable, le développement suit un cycle rigoureux en 5 phases : **Screen-First (UI & Mock Data) ➔ Découpage Atomique ➔ Schéma Supabase ➔ API & Hooks ➔ Intégration Matchs**.

```text
┌────────────────────────────────────────────────────────────────────────┐
│  PHASE 1 : UI "Screen-First" dans app/(tabs)/gear.tsx                  │
│  (Structure visuelle brute, NativeWind v4, Spacings, Mock Data locale)│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  PHASE 2 : Extraction progressive en composants atomiques              │
│  (src/features/gear/components/ : Carrousel, Blueprint, Specs, Form)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  PHASE 3 : Modélisation & Migration Supabase (PostgreSQL + RLS)        │
│  (Tables gear_setups & gear_components, contraintes, liaison matchs)  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  PHASE 4 : Couche Réseau & State (API & Custom Hooks)                  │
│  (src/features/gear/api/gear-api.ts & hooks/use-gear-setups.ts)        │
│  (Bascule transparente des Mock Data vers les données réelles)         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  PHASE 5 : Interconnexion Match ↔ Setup & Compteur d'Heures           │
│  (Sélecteur de raquette avant-match, cumul du temps de jeu effectif)   │
└────────────────────────────────────────────────────────────────────────┘
```

---
### 🎨 Phase 1 : Prototypage Visuel "Screen-First" (`gear.tsx`)
*Objectif : Valider 100% du rendu visuel, de la hiérarchie d'information et de l'ergonomie tactile directement sur l'écran avant toute dispersion.*

- [ ] **Développement direct dans l'écran hôte** (`app/(tabs)/gear.tsx`) :
  - Centralisation temporaire de la vue, des sous-sections et des styles inline NativeWind v4 (`tailwind.config.js`).
  - Validation du rendu sur Google Pixel 10 (gestion des safe areas, padding de défilement, contraste sombre / bleu nuit / accents Isku).
- [ ] **Jeu de données simulées riche (`MOCK_GEAR_SETUPS`)** :
  - Simuler des configurations complètes et variées (setup offensif neuf, setup allround usé, raquette secondaire de réserve).
  - Vérifier les cas limites d'affichage (textes longs, noms de revêtements à rallonge, jauges d'usure extrêmes à 10% et 95%).
- [ ] **Validation des interactions locales** :
  - Changement de raquette active au swipe / tap.
  - Déclenchement de la modale d'édition / création avec état local `useState`.

---

### 🧩 Phase 2 : Extraction Progressive en Composants Atomiques
*Objectif : Désengorger `gear.tsx` en isolant des composants réutilisables, typés et testables unitairement.*

Chaque bloc validé est extrait vers `src/features/gear/components/` selon la convention kebab-case / PascalCase :
1. **`gear-carousel.tsx` & `gear-setup-thumbnail.tsx`** :
   - Carrousel horizontal fluide avec indicateur visuel du setup actif (`active` vs `backup`).
2. **`gear-blueprint-card.tsx` & `gear-blueprint-svg.tsx`** :
   - Vue éclatée vectorielle (SVG) matérialisant le bois et les deux revêtements, lignes de cotes et annotations techniques.
3. **`gear-component-pills.tsx`** :
   - 4 tuiles compactes résumant les pièces maîtresses (Bois, Coup Droit, Revers, Manche).
4. **`gear-specs-card.tsx`** :
   - Fiche diagnostic : poids assemblé, date de montage, heures jouées cumulées, jauges d'usure estimée.
5. **`gear-ai-insight-card.tsx`** :
   - Carte de recommandation proactive du Coach Isku (alertes d'usure, optimisations de jeu).
6. **`gear-form-modal.tsx`** :
   - Modale de saisie / modification d'un setup (sélection des marques, mousses, formes de manches).

---

### 🗄️ Phase 3 : Modélisation & Conception Base de Données Supabase
*Objectif : Concevoir un schéma relationnel PostgreSQL robuste, normalisé et sécurisé par RLS (Row Level Security).*

#### 1. Schéma Relationnel Cible

```text
       auth.users / profiles
                 │ 1
                 │
                 │ N
            gear_setups
          (raquette globale)
                 │ 1
                 │
         ┌───────┴───────┐
         │ N             │ 1 (optionnel)
         ▼               ▼
  gear_components     matches / match_participants
(bois, revêtements)    (suivi des heures de jeu)
```

#### 2. Définition des Tables PostgreSQL

##### Table `gear_setups` (Le Setup / La Raquette)
```sql
CREATE TABLE public.gear_setups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sport TEXT NOT NULL DEFAULT 'table_tennis' CHECK (sport IN ('table_tennis', 'tennis', 'padel', 'badminton', 'squash')),
  name TEXT NOT NULL,                         -- Ex: "Setup Principal — OFF+"
  category TEXT NOT NULL DEFAULT 'OFF',       -- 'DEF', 'ALL-', 'ALL', 'ALL+', 'OFF-', 'OFF', 'OFF+'
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'backup', 'archived')),
  is_default BOOLEAN NOT NULL DEFAULT FALSE,  -- Setup favori pré-sélectionné en match
  weight_grams INTEGER NULL,                  -- Poids total assemblé (ex: 184g)
  total_play_time_seconds INTEGER NOT NULL DEFAULT 0, -- Cumul temps de jeu réel
  assembled_at DATE NULL,                     -- Date d'assemblage initial
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

##### Table `gear_components` (Les Pièces Détachées du Setup)
```sql
CREATE TABLE public.gear_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setup_id UUID NOT NULL REFERENCES public.gear_setups(id) ON DELETE CASCADE,
  component_type TEXT NOT NULL CHECK (component_type IN ('blade', 'rubber_forehand', 'rubber_backhand')),
  brand TEXT NOT NULL,                        -- Ex: "Butterfly", "Tibhar"
  name TEXT NOT NULL,                         -- Ex: "Viscaria", "Tenergy 05"
  thickness TEXT NULL,                        -- Ex: "2.1mm", "max" (pour revêtements)
  color TEXT NULL,                            -- Ex: "red", "black", "blue", "green"
  handle_type TEXT NULL,                      -- Ex: "flared", "straight", "anatomic", "penhold" (pour bois)
  wear_percentage INTEGER NOT NULL DEFAULT 100 CHECK (wear_percentage BETWEEN 0 AND 100),
  hours_used INTEGER NOT NULL DEFAULT 0,
  installed_at DATE NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

##### Liaison avec les Matchs (`match_participants`)
```sql
-- Ajout de la clé étrangère vers le setup utilisé par le participant
ALTER TABLE public.match_participants
ADD COLUMN gear_setup_id UUID REFERENCES public.gear_setups(id) ON DELETE SET NULL;
```

#### 3. Politiques de Sécurité (RLS - Row Level Security)
- Isolation stricte par utilisateur : `auth.uid() = user_id`.
- Lecture publique autorisée uniquement pour les setups des profils consultés en V1.2.
- Cascade automatique : la suppression d'un utilisateur supprime ses setups et ses composants.

---

### ⚡ Phase 4 : Couche Réseau & State (API & Custom Hooks)
*Objectif : Remplacer l'état local `useState(MOCK_GEAR_SETUPS)` par une consommation fluide de Supabase.*

1. **Typage dérivé (`src/types/database.types.ts` & `src/features/gear/types/gear.types.ts`)** :
   - Mise à jour des types TypeScript pour refléter exactement les retours Supabase (`Tables<'gear_setups'>`, etc.).
   - Fonctions d'adaptation (mappers) pour transformer les lignes de base de données en modèles riches consommés par l'UI.
2. **Module API (`src/features/gear/api/gear-api.ts`)** :
   - `fetchUserGearSetups(userId: string)` : Récupère les setups de l'utilisateur avec jointure sur leurs `gear_components`.
   - `createGearSetup(payload)` : Insertion transactionnelle du setup et de ses 3 composants.
   - `updateGearSetup(setupId, payload)` : Mise à jour du setup ou de ses composants.
   - `archiveGearSetup(setupId)` : Soft delete (`status: 'archived'`) pour préserver l'historique des matchs.
3. **Custom Hooks Métier (`src/features/gear/hooks/`)** :
   - `use-gear-setups.ts` : Encapsule la récupération, les états `isFetching`, `error` et la fonction `refetch()`.
   - `use-gear-mutation.ts` : Gère les actions asynchrones (créer, modifier, archiver) avec retour d'état optimiste et gestion d'erreurs.
4. **Transition dans `app/(tabs)/gear.tsx`** :
   - Remplacement de la constante de mock par l'appel `useGearSetups()`.
   - Affichage des états de chargement (skeletons) et d'erreur / sac vide.

---

### ⏱️ Phase 5 : Interconnexion Match ↔ Matériel & Compteur d'Heures
*Objectif : Donner vie au carnet de bord en automatisant le suivi des heures de jeu lors des rencontres réelles.*

1. **Sélection du setup lors de la préparation de match (`src/features/match/components/setup/`)** :
   - Injection d'un sélecteur rapide de raquette (pré-sélectionné sur le setup marqué `is_default = true`).
   - Enregistrement du `gear_setup_id` sélectionné dans le `match_participant` correspondant au joueur connecté.
2. **Alimentation automatique du compteur d'heures** :
   - À la finalisation d'un match (en mode *Arbitre* avec chrono effectif ou en *Saisie Rapide* avec durée estimée) :
   - Exécution d'un incrément SQL (`total_play_time_seconds = total_play_time_seconds + match_duration`) sur le setup concerné.
   - Recalcul dynamique de l'usure estimée et mise à jour des statistiques de la carte Specs.


