# Automatisation des tests — reproduction leboncoin.fr

Ce repository présente un projet personnel d'automatisation de tests avec **Playwright**, en complément du projet de test manuel (`manual-testing`). L'objectif : reproduire, sur les mêmes parcours critiques, une suite de tests automatisés maintenable et exécutable en intégration continue.

## Objectifs du projet

- Convertir des cas de test manuels en scripts automatisés fiables
- Couvrir les parcours de navigation et de recherche sans dépendre de comptes utilisateurs
- Mettre en place une exécution automatique via GitHub Actions (CI)
- Produire un rapport de test HTML exploitable après chaque exécution

## Application testée

[www.leboncoin.fr](https://www.leboncoin.fr)

## Périmètre couvert

| Fichier | Parcours testé |
|---|---|
| `tests/homepage.spec.js` | Chargement de la page d'accueil, présence des éléments clés |
| `tests/navigation-categories.spec.js` | Navigation dans les catégories (menu et URL directe) |
| `tests/search.spec.js` | Recherche par mot-clé, gestion des résultats et des cas sans résultat |

> Le périmètre est volontairement limité aux parcours **publics et non-authentifiés** (pas de création de compte, pas de dépôt d'annonce réel), pour rester non-intrusif sur un site en production.

## Stack technique

- [Playwright](https://playwright.dev/) (Node.js)
- Exécution multi-navigateurs : Chromium, Firefox, Chrome mobile émulé
- Rapport HTML natif Playwright
- CI : GitHub Actions

## Structure du projet

```
playwright-automation/
├── tests/
│   ├── helpers.js                 # utilitaires partagés (gestion des cookies)
│   ├── homepage.spec.js
│   ├── navigation-categories.spec.js
│   └── search.spec.js
├── .github/workflows/playwright.yml
├── playwright.config.js
└── package.json
```

## Lancer les tests en local

```bash
npm install
npx playwright install
npm test
```

Autres commandes utiles :

```bash
npm run test:headed   # exécution avec navigateur visible
npm run test:ui       # mode interactif Playwright UI
npm run report        # ouvrir le dernier rapport HTML
```

## Intégration continue

Chaque push sur `main` déclenche automatiquement la suite de tests via GitHub Actions (voir l'onglet **Actions** du repository). Le rapport HTML est disponible en artefact téléchargeable à la fin de chaque exécution.

## Limites connues

Les sélecteurs s'appuient sur les rôles et libellés visibles (bonne pratique Playwright, plus résiliente qu'un sélecteur CSS/XPath), mais restent dépendants de la structure actuelle du site. Une maintenance périodique des tests est nécessaire si l'interface évolue — c'est un point volontairement mis en avant ici, la maintenabilité d'une suite de tests faisant partie intégrante du travail QA.

## Livrables

- Suite de tests automatisés (`tests/`)
- Pipeline CI (`.github/workflows/playwright.yml`)
- Rapport d'exécution HTML (généré à chaque run)
