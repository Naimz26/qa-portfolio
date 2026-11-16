# Cas de test — parcours publics de leboncoin.fr

Statuts possibles : **Non exécuté** · Réussi · Échoué · Bloqué.
Tant qu'un cas n'a pas été joué, « Résultat obtenu » reste vide et le statut est « Non exécuté ».
Environnement à renseigner à l'exécution : système, navigateur et version, date et heure.

---

## CT-01 — Connexion avec des identifiants valides *(exemple de conception — hors périmètre d'exécution)*

| Champ | Valeur |
|---|---|
| Fonctionnalité | Authentification |
| Objectif | Vérifier qu'un utilisateur inscrit peut se connecter |
| Préconditions | Compte de test dédié existant ; utilisateur déconnecté |
| Étapes | 1. Ouvrir la page d'accueil · 2. Cliquer sur « Se connecter » · 3. Saisir l'email et le mot de passe du compte de test · 4. Valider |
| Résultat attendu | L'utilisateur est connecté ; son prénom ou l'accès « Mon compte » apparaît dans l'en-tête |
| Résultat obtenu | — |
| Statut | Non exécuté (nécessite un compte de test : exclu du périmètre) |
| Environnement | — |

## CT-02 — Connexion avec un mot de passe erroné *(exemple de conception — hors périmètre d'exécution)*

| Champ | Valeur |
|---|---|
| Fonctionnalité | Authentification |
| Objectif | Vérifier le message d'erreur en cas de mot de passe incorrect |
| Préconditions | Compte de test dédié existant ; utilisateur déconnecté |
| Étapes | 1. Ouvrir « Se connecter » · 2. Saisir l'email du compte de test et un mot de passe erroné · 3. Valider |
| Résultat attendu | Message d'erreur explicite, sans indiquer lequel des deux champs est faux ; l'utilisateur reste déconnecté |
| Résultat obtenu | — |
| Statut | Non exécuté (nécessite un compte de test : exclu du périmètre) |
| Environnement | — |

## CT-03 — Acceptation du bandeau de consentement cookies

| Champ | Valeur |
|---|---|
| Fonctionnalité | Consentement (RGPD) |
| Objectif | Vérifier que le bandeau s'affiche à la première visite et disparaît après acceptation |
| Préconditions | Navigation privée (aucun cookie existant) |
| Étapes | 1. Ouvrir la page d'accueil · 2. Observer le bandeau · 3. Cliquer sur « Accepter » · 4. Recharger la page |
| Résultat attendu | Bandeau visible à l'étape 2 ; masqué après l'étape 3 ; absent après rechargement |
| Résultat obtenu | — |
| Statut | Non exécuté |
| Environnement | — |

## CT-04 — Chargement de la page d'accueil

| Champ | Valeur |
|---|---|
| Fonctionnalité | Accueil |
| Objectif | Vérifier les éléments essentiels de la page d'accueil |
| Préconditions | Consentement cookies traité (CT-03) |
| Étapes | 1. Ouvrir https://www.leboncoin.fr · 2. Vérifier le titre de l'onglet, le champ de recherche et les liens de catégories |
| Résultat attendu | Titre contenant « leboncoin » ; champ de recherche visible ; liens « Véhicules » et « Immobilier » visibles |
| Résultat obtenu | — |
| Statut | Non exécuté |
| Environnement | — |

## CT-05 — Accès au parcours « Déposer une annonce »

| Champ | Valeur |
|---|---|
| Fonctionnalité | Dépôt d'annonce (accès uniquement) |
| Objectif | Vérifier que le lien mène au bon parcours, sans déposer d'annonce |
| Préconditions | Page d'accueil ouverte |
| Étapes | 1. Repérer « Déposer une annonce » · 2. Survoler ou inspecter le lien · 3. Cliquer, puis s'arrêter à la première page |
| Résultat attendu | URL contenant « deposer-une-annonce » ; si non connecté, invitation à se connecter |
| Résultat obtenu | — |
| Statut | Non exécuté |
| Environnement | — |

## CT-06 — Recherche avec un terme courant

| Champ | Valeur |
|---|---|
| Fonctionnalité | Recherche |
| Objectif | Vérifier qu'une recherche pertinente renvoie des annonces |
| Préconditions | Page d'accueil ouverte |
| Étapes | 1. Saisir « vélo » dans le champ de recherche · 2. Appuyer sur Entrée |
| Résultat attendu | Page de résultats ; URL contenant le terme ; au moins 5 annonces affichées ; pas de message « aucun résultat » |
| Résultat obtenu | — |
| Statut | Non exécuté |
| Environnement | — |

## CT-07 — Recherche sans résultat (scénario négatif)

| Champ | Valeur |
|---|---|
| Fonctionnalité | Recherche |
| Objectif | Vérifier l'état vide quand aucune annonce ne correspond |
| Préconditions | — |
| Étapes | 1. Ouvrir `/recherche?text=zzqxwqaportfolioaucunresultat` |
| Résultat attendu | Message explicite de type « aucune annonce » ; aucune annonce dans la liste principale ; pas de page d'erreur |
| Résultat obtenu | — |
| Statut | Non exécuté |
| Environnement | — |

## CT-08 — Navigation Véhicules › Voitures

| Champ | Valeur |
|---|---|
| Fonctionnalité | Catégories |
| Objectif | Vérifier la navigation par le menu des catégories (bureau) |
| Préconditions | Page d'accueil ouverte, affichage bureau |
| Étapes | 1. Cliquer sur « Véhicules » · 2. Cliquer sur « Voitures » |
| Résultat attendu | URL `/c/voitures` ; titre principal lié aux voitures |
| Résultat obtenu | — |
| Statut | Non exécuté |
| Environnement | — |

## CT-09 — Accès direct à la catégorie Vélos

| Champ | Valeur |
|---|---|
| Fonctionnalité | Catégories |
| Objectif | Vérifier qu'une catégorie est accessible par son URL |
| Préconditions | — |
| Étapes | 1. Ouvrir `/c/velos` |
| Résultat attendu | Titre principal lié aux vélos ; annonces affichées |
| Résultat obtenu | — |
| Statut | Non exécuté |
| Environnement | — |

## CT-10 — Catégorie inexistante (scénario négatif)

| Champ | Valeur |
|---|---|
| Fonctionnalité | Catégories / gestion des erreurs |
| Objectif | Vérifier le comportement sur une URL de catégorie invalide |
| Préconditions | — |
| Étapes | 1. Ouvrir `/c/categorie-inexistante-qa-portfolio` |
| Résultat attendu | Page 404 explicite ou redirection vers une page valide ; jamais une page de catégorie vide présentée comme valide |
| Résultat obtenu | — |
| Statut | Non exécuté |
| Environnement | — |

## CT-11 — Recherche vide

| Champ | Valeur |
|---|---|
| Fonctionnalité | Recherche (valeur limite) |
| Objectif | Vérifier le comportement quand on valide une recherche sans texte |
| Préconditions | Page d'accueil ouverte |
| Étapes | 1. Laisser le champ de recherche vide · 2. Appuyer sur Entrée |
| Résultat attendu | Aucune erreur ; soit rien ne se passe, soit une liste générale d'annonces s'affiche |
| Résultat obtenu | — |
| Statut | Non exécuté |
| Environnement | — |
