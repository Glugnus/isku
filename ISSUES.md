# 🐛 Suivi des Anomalies et Retours (Issues & Bugs Tracker)

Ce document centralise les bugs, anomalies de parcours et retours de tests constatés sur l'application **Isku** afin d'assurer leur suivi et résolution méthodique.

---

## 📌 En attente / À traiter

### 4. [iOS / Typographie] Chiffre de score tronqué en haut sur iOS
* **Date de signalement** : 08/11/2026
* **Fichier concerné** : `src/features/match/components/tracker/tracker-court-side.tsx` (lignes 73-77)
* **Environnement** : Spécifique iOS
* **Symptômes** : Le haut du chiffre du score (`font-oswald text-7xl md:text-8xl`) est légèrement rogné / coupé en haut sur les appareils Apple.
* **Cause identifiée** : 
  * Métriques verticales de la police custom Oswald sur iOS : l'ascendante des glyphes dépasse la boîte de ligne native calculée par CoreText sans `lineHeight` adapté.
* **Piste de résolution** :
  * Ajouter une hauteur de ligne explicite (`leading-none` ou `leading-tight`), ou un léger padding supérieur (`pt-1` / `pt-2`) pour éviter le découpage vertical.
* **Priorité** : 🟡 Moyenne (Finition visuelle iOS)

---

### 5. [Expo Router] Warning sur l'export par défaut de `login.tsx`
* **Date de signalement** : 08/11/2026
* **Message de log** : `WARN Route "./(auth)/login.tsx" is missing the required default export.`
* **Symptômes** : Warning affiché dans la console Metro lors du bundling de la route `(auth)/login`.
* **Piste de résolution** : Vérifier que le composant de page dans `app/(auth)/login.tsx` possède bien une déclaration `export default`.
* **Priorité** : 🟡 Moyenne (Avertissement console / Robustesse)

---

### 6. [Dette Technique] Dépréciation du composant `ImageBackground`
* **Date de signalement** : 08/11/2026
* **Message de log** : `WARN ImageBackground is deprecated and will be removed in a future release.`
* **Piste de résolution** : Remplacer l'usage de `ImageBackground` par une `<View>` contenant une `<Image>` positionnée en absolu (`absolute inset-0`).
* **Priorité** : 🟢 Basse (Dette technique future)

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
* **Commit** : `55ae42c`
