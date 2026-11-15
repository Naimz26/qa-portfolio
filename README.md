# Portfolio QA — Naim Ziani

[![Tests Playwright](https://github.com/Naimz26/qa-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/Naimz26/qa-portfolio/actions/workflows/playwright.yml)

**QA Tester · Tests fonctionnels, API et automatisation**

Je contribue à améliorer la qualité des applications grâce aux tests fonctionnels, aux tests de régression et à l'automatisation des parcours utilisateurs avec Playwright.

- **Site du portfolio** : https://naimz26.github.io/qa-portfolio/
- **Contact** : naim.ziani26@gmail.com · [LinkedIn](https://linkedin.com/in/naim-ziani-7a70235)

## Positionnement

| Expérience professionnelle | Projets personnels (ce dépôt) |
|---|---|
| **Testeur logiciel manuel — Rhôn'Telecom**, depuis septembre 2023, sur les outils de production SFR (workflows, portail Fibre) : analyse des fonctionnalités, cas de tests dans **Xray**, campagnes de tests manuels, **non-régression**, anomalies déclarées et suivies dans **Jira**. | Automatisation de parcours avec **Playwright**, intégration continue **GitHub Actions**, démarche de test manuel documentée, projet de tests API en préparation. |

Les documents produits en entreprise sont confidentiels : ce dépôt ne contient que des projets personnels.

## Compétences réellement démontrées

| Niveau | Compétences | Preuve |
|---|---|---|
| Pratiquées en entreprise | Rédaction et exécution de cas de tests, tests fonctionnels et de non-régression, qualification et suivi des anomalies, Jira, Xray | Expérience Rhôn'Telecom (depuis 2023) |
| Pratiquées en projet | Playwright (JavaScript), GitHub Actions, Git | [`playwright-automation/`](playwright-automation), [workflow](.github/workflows/playwright.yml) |
| Connaissances | Techniques de conception de tests, Agile/Scrum | ISTQB Fondation (2023), PSPO I (2023) |
| En cours d'apprentissage | Tests API (Postman), Selenium, Cypress, Python, SQL, sécurité applicative | Formation JEDHA en cours, [`api-testing/`](api-testing) à réaliser |

## Projets

| Projet | Statut | Dossier |
|---|---|---|
| Automatisation de tests avec Playwright : suite du portfolio (CI) et parcours publics leboncoin.fr (à la demande) | Réalisé | [`playwright-automation/`](playwright-automation) |
| Tests fonctionnels et rapports d'anomalies : plan de test, 11 cas de test, modèle de rapport d'anomalie, rapport de campagne | Préparé, campagne non exécutée | [`manual-testing/`](manual-testing) |
| Tests API avec Postman | À réaliser (plan et scénarios prévus) | [`api-testing/`](api-testing) |
| Sécurité applicative (complément) | En cours de formation, aucun livrable publié | — |

## Installation et exécution des tests

```bash
git clone https://github.com/Naimz26/qa-portfolio.git
cd qa-portfolio/playwright-automation
npm ci
npx playwright install --with-deps chromium firefox
npm test                 # suite portfolio
npm run test:leboncoin   # suite leboncoin (site tiers)
```

Détails, scénarios et bonnes pratiques : [`playwright-automation/README.md`](playwright-automation/README.md).

## Accès aux rapports

- **Sur le portfolio** : l'encadré « dernière exécution » affiche les résultats de la dernière exécution CI de la suite `portfolio` (réussis, échoués, ignorés, statut), avec un lien vers le rapport HTML Playwright publié.
- **Sur GitHub** : onglet [Actions](https://github.com/Naimz26/qa-portfolio/actions). Chaque exécution affiche un résumé et propose le rapport HTML en artefact téléchargeable (30 jours).
- **En local** : `npm run report` après une exécution.

## Architecture du dépôt

```
qa-portfolio/
├── index.html                       # site du portfolio (GitHub Pages)
├── assets/                          # photo du portfolio
├── .github/workflows/playwright.yml # CI : tests, rapports, publication du site
├── playwright-automation/
│   ├── playwright.config.js         # projets portfolio-* et leboncoin-* (Chromium, Firefox, mobile)
│   ├── scripts/                     # serveur local du portfolio, résumé des résultats
│   └── tests/
│       ├── portfolio/               # cible maîtrisée, exécutée en CI
│       └── leboncoin/               # site tiers, exécution à la demande
├── manual-testing/                  # plan de test, cas de test, anomalies, rapport de campagne
└── api-testing/                     # projet Postman à réaliser (plan)
```

## Limites connues

- La suite `leboncoin` dépend d'un site tiers protégé contre l'automatisation. Un accès bloqué est signalé comme test **ignoré**, jamais comme réussi ; aucune protection n'est contournée.
- La campagne de tests manuels est préparée mais **pas encore exécutée** : aucun résultat n'est donc présenté.
- Les fiches d'anomalies sont des **exemples pédagogiques**, signalés comme tels.
- Le projet de tests API n'est pas encore réalisé.
