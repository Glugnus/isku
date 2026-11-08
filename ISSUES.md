# 🐛 Suivi des Anomalies et Retours (Issues & Bugs Tracker)

Ce document centralise les bugs, anomalies de parcours et retours de tests constatés sur l'application **Isku** afin d'assurer leur suivi et résolution méthodique.

---

## 📌 En attente / À traiter

### 6. [Dette Technique] Dépréciation du composant `ImageBackground`
* **Date de signalement** : 08/11/2026
* **Message de log** : `WARN ImageBackground is deprecated and will be removed in a future release.`
* **Observation** : Aucun usage direct dans `app/` ou `src/`. L'avertissement provient d'une dépendance externe dans `node_modules`.
* **Piste de résolution** : Suivre les mises à jour des dépendances tierces au fil des montées de version Expo.
* **Priorité** : 🟢 Basse (Dette technique externe)

---

## ✅ Résolus

### 1. [Routage & Auth] Écran 404 / "Unmatched Route" au lancement et à la déconnexion
* **Date de résolution** : 08/11/2026
* **Solution apportée** : 
  * Création de la route racine pivot `app/index.tsx` avec redirection déclarative via `<Redirect href={isLoggedIn ? "/(tabs)" : "/(auth)/login"} />`.
  * Déclaration de `<Stack.Screen name="index" />` à la racine de `<Stack>` dans `app/_layout.tsx` pour servir d'ancre universelle de navigation et de fallback lors de la déconnexion.
* **Commit** : `141c81f`

---

### 2. [UI / UX] Flash blanc au démarrage sur Android
* **Date de résolution** : 08/11/2026
* **Solution apportée** : 
  * Configuration de `"backgroundColor": "#0A0B14"` dans `app.json` (global, android et splash-screen).
  * Ajout de `contentStyle: { backgroundColor: colors.background }` dans les `screenOptions` des stacks (`app/_layout.tsx` et `app/(auth)/_layout.tsx`) pour supprimer tout scintillement natif blanc lors des transitions.
* **Commit** : `f957850`

---

### 3. [UX / Ergonomie] Zone tactile trop petite pour le bouton Menu / Réglages
* **Date de résolution** : 08/11/2026
* **Solution apportée** : 
  * Ajout de la prop `hitSlop={12}` sur le composant `<Pressable>` de l'icône paramètres dans `app/(tabs)/_layout.tsx` pour étendre la zone tactile à plus de 44dp sans modifier l'alignement visuel du header.
* **Commit** : `75aaf76`

---

### 4. [iOS / Typographie] Chiffre de score tronqué en haut sur iOS
* **Date de résolution** : 08/11/2026
* **Solution apportée** : 
  * Ajout de la classe NativeWind `pt-1` sur le `<Text>` affichant le score (`tracker-court-side.tsx`) pour accorder le dégagement vertical nécessaire à CoreText sans perturber le line-height ni l'alignement cross-platform.
* **Commit** : `2acc720`
