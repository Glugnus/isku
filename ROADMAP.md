# 🏓 Roadmap du Projet - Isku

Ce document retrace la vision produit, les jalons de développement et les perspectives à long terme de l'application **Isku**.

---

## 🚀 Phase 1 : Cœur du Produit & Fondations (MVP Tennis de Table)

### 🥇 V1.0 — 100 % Tennis de Table (Focus Solo & Matchs)

> **Objectif** : Valider l'expérience utilisateur sur le sport de prédilection, garantir une prise en main fluide sur le terrain, favoriser le partage social et sécuriser la validation sur les Stores.

- [ ] **Arbitrage & Suivi en direct** :
  - Comptage des points intuitif (optimisé pour usage à une main / bord de table).
  - Gestion des règles officielles (changements de service, manches, avantages).
- [ ] **Historique & Fiches de matchs** :
  - Sauvegarde locale et cloud des rencontres.
  - Détail des sets, scores et durées.
- [ ] **Statistiques Essentielles** :
  - Ratios victoires/défaites, séries, sets gagnés/perdus.
- [ ] **Génération de visuels & Stories** :
  - Export d'images récapitulatives prêtes à partager sur les réseaux sociaux (Instagram Stories, WhatsApp).
- [ ] **Conformité & Lancement Stores (Ajustements de validation)** :
  - **Alerte Guideline Apple 3.1.1** : Conditionner l'affichage du bouton de soutien / pourboire (_Buy Me a Coffee_) pour éviter tout rejet (masqué sur mobile via feature flag ou activé uniquement sur le Web `Platform.OS === 'web'`).
  - **Optimisation de l'appel au soutien** : Présentation du soutien au pic d'engagement (après une victoire ou lors de l'export d'une Story).
  - Suivi de la validation des comptes Stores (gestion des testeurs Google Play / statut développeur).

---

### 🌐 V1.1 — Internationalisation, Rétention & "Mon Sac" (Quick Win Matériel)

> **Objectif** : Élargir l'audience, amorcer la collecte de données matérielles sans complexité algorithmique et enrichir la viralité des Stories.

- [ ] **Internationalisation (i18n)** :
  - Support natif de l'Anglais et du Français.
  - Architecture modulaire facilitant l'ajout ultérieur d'autres langues (Espagnol, Allemand, Italien).
- [ ] **Brique Matériel "Mon Sac / Mon Setup" (Préparation des données d'usure)** :
  - Configuration du profil matériel par joueur :
    - _Ping_ : Bois, Revêtements coup droit / revers, Épaisseurs de mousse.
  - Association automatique du setup à chaque match joué.
  - **Compteur automatique d'heures de jeu** par équipement pour accumuler la donnée d'usure dès les premiers mois.
- [ ] **Viralité & Affiliation passive** :
  - **Setup sur la Story** : Incrustation automatique du matériel utilisé au bas de la Story partagée (style Strava).
  - Premiers liens affiliés passifs ("Racheter mes revêtements / mon équipement").
- [ ] **Système de Notifications** :
  - Notifications locales programmées (rappels d'entraînements hebdomadaires, match planifié).
  - Notifications de réengagement après inactivité.
- [ ] **Site Web & Référencement (Post-validation Stores)** :
  - Intégration des liens officiels et badges de téléchargement vers l'App Store et le Google Play Store sur [isku-app.fr](https://isku-app.fr).
  - QR Code dynamique de téléchargement direct pour les visiteurs sur ordinateur.
  - Configuration SEO : génération du `sitemap.xml`, `robots.txt` et soumission dans la Google Search Console pour indexation du domaine.

---

## 🏸 Phase 2 : Expansion Multisports

### 🥈 V2.0 — Ouverture Complète aux Sports de Raquette

> **Objectif** : Adapter le moteur de score et les fiches matériel à l'ensemble des disciplines de raquette cibles.

- [ ] **Moteurs de score multi-sports** :
  - **Tennis** : Formats en jeux, sets, jeux décisifs (tie-break) et super tie-break.
  - **Padel** : Spécificités des sets, format punto de oro.
  - **Badminton** : Règles en 21 points, 2 sets gagnants.
  - **Squash** : Règles en 11 points direct.
  - **Pickleball** : Règles spécifiques de score et de service.
- [ ] **Extension du "Sac Virtuel" multi-sports** :
  - Modélisation du matériel selon le sport :
    - _Tennis / Badminton_ : Cadre, type de cordage, jauge, tension en kg (et conversion lbs).
    - _Padel / Pickleball_ : Modèle de pala/paddle, forme, type de mousse EVA / surface grit.
- [ ] Profil sportif adaptatif (sélection du sport par défaut, filtres par discipline).

---

## 🤖 Phase 3 : Intelligence Artificielle & Monétisation (SASU & Isku Pro)

### 🥉 V3.0 — Coach IA, Pass Diagnostic & Abonnement Pro

> **Objectif** : Activer le modèle de revenus (aligné avec la création de la SASU) en croisant les statistiques réelles, l'usure accumulée et les recommandations préventives.

- [ ] **Monétisation V1 & Modèle Hybride** :
  - **Pass "Diagnostic Matériel IA" (Achat unique / 5 € ou pack bilans)** :
    - Diagnostic ponctuel à la demande pour ajuster son setup (ex. changement de saison, reprise post-blessure, transition vers un nouveau matériel).
  - **Abonnement "Isku Pro" (29,99 € / an ou 3,99 € / mois)** :
    - Diagnostics et bilans IA illimités.
    - Suivi d'usure multi-raquettes et alertes proactives de perte de tension/adhérence.
    - Statistiques de match avancées corrélées au matériel utilisé ("Matériel vs Taux de victoire").
- [ ] **Alertes d'usure automatiques & Affiliation ciblée** :
  - Notification push proactive après un seuil d'heures de jeu calculé (ex. 18-20h pour un cordage tennis, 50-60h pour des plaques de ping).
  - Lien direct affilié vers le matériel recommandé ou la garniture de remplacement.
- [ ] **Coach IA Préventif & Biomécanique** :
  - Détection et prévention des douleurs articulaires (tennis elbow, tendinites d'épaule, avant-bras) avec recommandations d'assouplissement de tension ou de changement de mousse/cordage.
  - Analyse des ressentis post-match croisés avec les résultats et l'usure de l'équipement.
  - Clause de non-responsabilité médicale intégrée aux CGU.

---

## 🔮 Phase 4 : Vision Long Terme & Communauté (1 à 3 ans)

> _Fonctionnalités activées en fonction de la croissance, des retours et de la traction communautaire._

### 🎮 Gamification & Expérience "WoW"

- [ ] **Profil Gamifié (Façon RPG)** :
  - Système d'équipement virtuel, titres honorifiques, niveaux de joueur.
  - Badges de hauts faits (ex: _"Remontada"_ après avoir été mené 0-2, badge "Joueur Fondateur").
- [ ] **Système de Ranking ELO** :
  - Classement dynamique et équitable interne à Isku.
- [ ] **Matchmaking & Partenaires** :
  - Recherche de joueurs à proximité selon le niveau et les disponibilités.

### 📊 Analyse Pro, Social & Vidéo

- [ ] **Statistiques Avancées** :
  - Efficacité au service, longueur des échanges, gestion du momentum et des points clés.
- [ ] **Head-to-Head (Face-à-Face)** :
  - Historique complet et analyse des confrontations directes contre un adversaire spécifique.
- [ ] **Fonctionnalités Sociales & Clubs** :
  - Création de clubs/équipes avec classements internes (Leaderboards).
  - Fil d'actualité pour suivre et féliciter ses partenaires d'entraînement.
- [ ] **Analyse Vidéo** :
  - Synchronisation vidéo avec les points enregistrés pour revoir les balles de break, coups gagnants et fautes directes.
- [ ] **Expansion Internationale** :
  - Traduction en Espagnol, Allemand et Italien.
  - Routage géolocalisé des partenaires d'affiliation selon le pays (Tennis-Point Europe, PadelNuestro, etc.).
