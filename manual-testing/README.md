# Tests manuels — leboncoin.fr (projet personnel)

Ce dossier présente une démarche de test manuel complète sur des parcours **publics** de [leboncoin.fr](https://www.leboncoin.fr) : planification, conception des cas de test, rapports d'anomalies et rapport de campagne.

> **Projet personnel, sans lien avec l'éditeur du site.** Il s'agit d'un exercice : aucun de ces documents n'a été produit pour un client.
> Mon expérience professionnelle de test (Rhôn'Telecom, depuis septembre 2023, Jira et Xray) est décrite sur le portfolio ; ses documents sont confidentiels et ne sont pas reproduits ici.

## Documents

| Document | Contenu |
|---|---|
| [plan-de-test.md](plan-de-test.md) | Objectifs, périmètre, approche, environnements, critères d'entrée et de sortie, risques |
| [cas-de-tests.md](cas-de-tests.md) | Cas de test détaillés (identifiant, objectif, préconditions, étapes, résultats attendu et obtenu, statut, environnement) |
| [rapport-de-bug.md](rapport-de-bug.md) | Modèle de rapport d'anomalie et exemples |
| [rapport-de-campagne.md](rapport-de-campagne.md) | Synthèse d'exécution de la campagne |

## Règles d'honnêteté appliquées

- **Statut d'exécution réel** : un cas qui n'a pas été joué est marqué « Non exécuté », sans résultat obtenu.
- **Exemples pédagogiques signalés** : toute anomalie qui n'a pas été constatée sur le site réel porte la mention `EXEMPLE PÉDAGOGIQUE`.
- **Parcours non intrusifs** : pas de création de compte, pas de publication d'annonce, pas de contournement des protections du site.

## Lien avec l'automatisation

Les cas CT-04 à CT-10 sont automatisés dans [`playwright-automation/tests/leboncoin`](../playwright-automation/tests/leboncoin). Le tableau de traçabilité figure dans le plan de test.
