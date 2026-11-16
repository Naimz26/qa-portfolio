# Rapport de campagne — parcours publics de leboncoin.fr

| Élément | Valeur |
|---|---|
| Campagne | C1 — parcours publics (accueil, recherche, catégories, consentement) |
| Référence | plan-de-test.md v1.1, cas-de-tests.md (CT-01 à CT-11) |
| Statut | **Préparée — non exécutée à ce jour** |
| Date d'exécution | — |
| Testeur | Naim Ziani |

> Ce rapport sera complété avec les résultats réellement observés lors de l'exécution. Aucune valeur ci-dessous n'est simulée.

## Synthèse

| Indicateur | Valeur |
|---|---|
| Cas prévus dans le périmètre | 9 (CT-03 à CT-11) |
| Cas hors périmètre (compte requis) | 2 (CT-01, CT-02) |
| Exécutés | 0 |
| Réussis | 0 |
| Échoués | 0 |
| Bloqués | 0 |
| Anomalies ouvertes | 0 |

## Détail par cas

| Cas | Titre | Statut | Anomalie |
|---|---|---|---|
| CT-01 | Connexion valide | Hors périmètre | — |
| CT-02 | Mot de passe erroné | Hors périmètre | — |
| CT-03 | Bandeau cookies | Non exécuté | — |
| CT-04 | Chargement de l'accueil | Non exécuté | — |
| CT-05 | Accès « Déposer une annonce » | Non exécuté | — |
| CT-06 | Recherche avec terme courant | Non exécuté | — |
| CT-07 | Recherche sans résultat | Non exécuté | — |
| CT-08 | Véhicules › Voitures | Non exécuté | — |
| CT-09 | Accès direct Vélos | Non exécuté | — |
| CT-10 | Catégorie inexistante | Non exécuté | — |
| CT-11 | Recherche vide | Non exécuté | — |

## Exécution automatisée correspondante

Les cas CT-04 à CT-10 ont un équivalent Playwright (suite `leboncoin`). Cette suite est lancée **à la demande** depuis l'onglet Actions du dépôt ; ses résultats (réussis, échoués, ignorés pour cause de blocage anti-robots) figurent dans le résumé de chaque exécution. À ce jour, **elle n'a pas encore été exécutée**.

## À compléter après exécution

- Environnements réellement utilisés (navigateurs et versions, appareil mobile, date).
- Résultats obtenus et statut de chaque cas.
- Anomalies constatées (fiches au format de rapport-de-bug.md, avec preuves).
- Notes des sessions exploratoires.
- Conclusion : niveau de qualité observé, risques résiduels, recommandations.
