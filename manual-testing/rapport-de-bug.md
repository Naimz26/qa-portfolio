# Rapports d'anomalies

> **Aucune anomalie réelle n'a été constatée à ce jour** : la campagne n'a pas encore été exécutée (voir rapport-de-campagne.md).
> Les fiches ci-dessous sont des **exemples pédagogiques** qui illustrent le format de rapport. Elles ne décrivent pas des défauts observés sur leboncoin.fr.

Échelles utilisées :
- **Sévérité** (impact sur l'utilisateur) : Bloquante · Majeure · Mineure · Cosmétique.
- **Priorité** (urgence de correction) : P1 · P2 · P3.

---

## Modèle

| Champ | Contenu attendu |
|---|---|
| Identifiant | BUG-XX |
| Titre | Comportement observé + contexte, en une phrase |
| Description | Ce qui se passe, et pourquoi c'est un problème |
| Étapes de reproduction | Étapes numérotées, depuis un état de départ connu |
| Résultat attendu | Référence : spécification, cas de test ou comportement standard |
| Résultat obtenu | Ce qui a été réellement observé |
| Sévérité / Priorité | Selon les échelles ci-dessus, justifiées |
| Environnement | Système, navigateur et version, appareil, date et heure |
| Fréquence | Systématique, intermittente (x/y essais) |
| Preuve | Capture, vidéo, extrait de console ou de réseau (sans donnée personnelle) |
| Cas de test lié | CT-XX |

---

## BUG-01 — Le bouton « Se connecter » ne déclenche aucune action — `EXEMPLE PÉDAGOGIQUE`

| Champ | Valeur |
|---|---|
| Description | Après saisie d'identifiants, le clic sur « Se connecter » n'a aucun effet visible : pas de connexion, pas de message d'erreur. L'utilisateur ne sait pas si sa demande a été prise en compte. |
| Étapes de reproduction | 1. Ouvrir la page de connexion · 2. Saisir un email et un mot de passe · 3. Cliquer sur « Se connecter » |
| Résultat attendu | Connexion réussie (CT-01) ou message d'erreur explicite (CT-02) |
| Résultat obtenu | *Exemple* : aucune réaction de l'interface ; aucune requête visible dans l'onglet Réseau |
| Sévérité / Priorité | Bloquante / P1 — empêche l'accès au compte |
| Environnement | *Exemple* : Windows 11, Chrome (version à noter) |
| Fréquence | *Exemple* : systématique (5/5) |
| Preuve | À joindre : capture de l'écran et de l'onglet Réseau |
| Cas de test lié | CT-01 |

## BUG-02 — Recherche sans résultat : aucun message affiché — `EXEMPLE PÉDAGOGIQUE`

| Champ | Valeur |
|---|---|
| Description | Une recherche qui ne correspond à aucune annonce affiche une liste vide sans explication. L'utilisateur peut croire à une panne. |
| Étapes de reproduction | 1. Ouvrir `/recherche?text=zzqxwqaportfolioaucunresultat` |
| Résultat attendu | Message explicite de type « Aucune annonce ne correspond à votre recherche », avec une suggestion (CT-07) |
| Résultat obtenu | *Exemple* : zone de résultats vide, sans message |
| Sévérité / Priorité | Mineure / P2 — gêne l'utilisateur sans bloquer le parcours |
| Environnement | *Exemple* : Android 14, Chrome mobile (version à noter) |
| Fréquence | *Exemple* : systématique (3/3) |
| Preuve | À joindre : capture d'écran |
| Cas de test lié | CT-07 |
