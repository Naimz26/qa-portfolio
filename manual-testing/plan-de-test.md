# Plan de test — parcours publics de leboncoin.fr

| Élément | Valeur |
|---|---|
| Projet | Portfolio QA — exercice personnel |
| Application | https://www.leboncoin.fr (version de production à la date d'exécution) |
| Auteur | Naim Ziani |
| Version du document | 1.1 — novembre 2026 |
| Statut | Campagne préparée, **non exécutée à ce jour** |

## 1. Objectifs

- Vérifier que les parcours publics principaux (accueil, recherche, catégories, consentement) fonctionnent et donnent un retour clair à l'utilisateur.
- Vérifier le comportement en cas de saisie sans résultat ou d'URL invalide.
- Servir de base aux tests automatisés Playwright (traçabilité ci-dessous).

## 2. Périmètre

**Inclus** : page d'accueil, bandeau de consentement cookies, recherche par mot-clé (avec et sans résultat), navigation par catégories, accès au parcours « Déposer une annonce » (affichage seulement), affichage mobile.

**Exclus** :
- création de compte, connexion, publication d'annonce, messagerie, paiement : ces parcours nécessitent un compte et modifieraient des données réelles ;
- tests de charge, de sécurité intrusive et toute tentative de contournement des protections anti-robots.

Les cas CT-01 et CT-02 (connexion) sont conservés comme **exemples de conception** : ils ne seront exécutés qu'avec un compte de test dédié.

## 3. Approche

| Type | Application |
|---|---|
| Tests fonctionnels | Cas de test écrits (cas-de-tests.md) |
| Tests négatifs | Recherche sans résultat, catégorie inexistante, recherche vide |
| Tests exploratoires | Sessions de 30 min sur la recherche et les filtres, notes jointes au rapport de campagne |
| Non-régression | Rejouer CT-04 à CT-10 automatisés (Playwright) avant chaque nouvelle campagne |
| Compatibilité | Chrome et Firefox de bureau, Chrome mobile (Android) |

Techniques de conception : partitions d'équivalence (recherche avec / sans résultat), valeurs limites (recherche vide, texte très long), tests de transition d'état (bandeau cookies : affiché → accepté).

## 4. Environnements

| Environnement | Détail à consigner lors de l'exécution |
|---|---|
| Bureau | Système, navigateur et version, résolution |
| Mobile | Appareil ou émulateur, navigateur et version |
| Réseau | Connexion utilisée ; pas de VPN pendant les tests |
| Date et heure | À noter pour chaque cas (le site évolue en continu) |

## 5. Critères

- **Entrée** : site accessible, cas de test relus, navigateurs installés et versions notées.
- **Sortie** : 100 % des cas du périmètre exécutés ; toute anomalie consignée avec preuve ; rapport de campagne rédigé.
- **Suspension** : site inaccessible ou blocage anti-robots persistant.

## 6. Risques

| Risque | Impact | Mesure |
|---|---|---|
| Interface modifiée par l'éditeur | Cas ou sélecteurs obsolètes | Dater chaque exécution, maintenir les cas |
| Protection anti-robots | Tests automatisés bloqués | Ne pas contourner ; marquer « non exécuté » et documenter |
| Contenu variable (annonces) | Résultats non reproductibles | Vérifier des comportements, pas des annonces précises |

## 7. Traçabilité cas manuels ↔ tests automatisés

| Cas | Automatisé dans |
|---|---|
| CT-04 | `homepage.spec.js` — chargement de l'accueil |
| CT-05 | `homepage.spec.js` — lien « Déposer une annonce » |
| CT-06 | `search.spec.js` — recherche pertinente |
| CT-07 | `search.spec.js` — recherche sans résultat |
| CT-08 | `navigation-categories.spec.js` — Véhicules › Voitures |
| CT-09 | `navigation-categories.spec.js` — accès direct Vélos |
| CT-10 | `navigation-categories.spec.js` — catégorie inexistante |
| CT-03, CT-11 | Non automatisés (consentement vérifié indirectement par `helpers.js`) |
