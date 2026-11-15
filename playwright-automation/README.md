# Automatisation des tests avec Playwright

Projet personnel d'automatisation de tests de bout en bout avec [Playwright](https://playwright.dev/) (JavaScript), exécuté en intégration continue avec GitHub Actions.

## Deux suites, deux objectifs

| Suite | Cible | Exécution | Pourquoi |
|---|---|---|---|
| `portfolio` | Le site portfolio de ce dépôt (`index.html`), servi en local | **Automatique** : chaque push sur `main` et chaque pull request | Cible maîtrisée et stable : les résultats reflètent la qualité du code, pas l'état d'un site externe |
| `leboncoin` | Parcours publics de www.leboncoin.fr | **À la demande** (onglet Actions → *Run workflow* → suite `leboncoin`), non bloquante | Démontrer des tests sur un vrai site en production, sans compte ni action intrusive |

Chaque suite tourne sur **Chromium, Firefox et un mobile émulé (Pixel 7)**.

## Ce qui est testé

**Suite `portfolio`** (`tests/portfolio/`)
- Structure : titre, sections attendues, intitulé du poste actuel, statut réel des projets.
- Contenu honnête : absence de statistiques figées, compétences classées par niveau, certifications obtenues et formation en cours distinguées.
- Encadré « dernière exécution » : affichage des vrais compteurs, d'un échec, et des cas d'erreur (fichier absent, invalide, non JSON, aucun test exécuté).
- Liens : contact (`mailto:`, `tel:`, LinkedIn), `rel="noopener"` sur les liens externes, liens vers le dépôt qui pointent vers des fichiers existants.
- Affichage : photo chargée avec texte alternatif, pas d'erreur JavaScript, pas de débordement horizontal (mobile compris), langue déclarée, URL inexistante → 404.

**Suite `leboncoin`** (`tests/leboncoin/`)
- Accueil : titre, champ de recherche, catégories principales, lien « Déposer une annonce ».
- Catégories : navigation Véhicules › Voitures, accès direct à Vélos, catégorie inexistante (scénario négatif).
- Recherche : terme courant (au moins 5 annonces, pas d'état vide), recherche sans résultat (message explicite, aucune annonce), recherche dans une catégorie.
- Consentement cookies : bandeau accepté s'il apparaît. Un bandeau présent mais impossible à fermer fait échouer le test ; seul son absence est tolérée.

## Bonnes pratiques appliquées

- Sélecteurs accessibles en priorité (`getByRole`, `getByPlaceholder`, `getByText`), sélecteurs CSS seulement en dernier recours.
- Attentes conditionnelles (`expect(...).toBeVisible()`, `waitFor`) : aucun `waitForTimeout`.
- Messages d'erreur explicites dans les assertions.
- Scénarios négatifs dans chaque suite.
- Nouvelles tentatives en CI signalées comme « instables » (*flaky*), jamais comptées comme réussies du premier coup.
- Captures d'écran, vidéos et traces conservées en cas d'échec.

## Installation et exécution

Prérequis : Node.js 20 ou plus.

```bash
cd playwright-automation
npm ci
npx playwright install --with-deps chromium firefox

npm test                  # suite portfolio (Chromium, Firefox, mobile)
npm run test:leboncoin    # suite leboncoin (accès Internet requis)
npm run test:headed       # portfolio, navigateur visible
npm run test:ui           # mode interactif
npm run summary           # résumé JSON du dernier rapport → results/summary.json
npm run report            # ouvre le dernier rapport HTML
```

Le serveur local du portfolio (`scripts/serve-portfolio.js`, sans dépendance) démarre automatiquement sur `http://127.0.0.1:4173`.

## Rapports

| Sortie | Emplacement |
|---|---|
| Rapport HTML | `reports/html/` (artefact `rapport-playwright-*` en CI) |
| Rapport JSON brut | `reports/results.json` |
| Résumé (réussis / échoués / instables / ignorés) | `results/summary.json`, affiché sur le portfolio et dans la page de l'exécution GitHub Actions |
| Traces et captures des échecs | `test-results/` (artefact `traces-echecs-*` en CI) |

Après chaque push sur `main`, le workflow publie le site avec le résumé et le rapport HTML de la suite `portfolio` : l'encadré « dernière exécution » du portfolio affiche donc des résultats réels, ou « Résultats non disponibles » s'ils manquent.

## Limites connues

- **leboncoin.fr est un site tiers protégé contre l'automatisation (DataDome).** Depuis les serveurs GitHub Actions, l'accès peut être bloqué. Dans ce cas, le test est marqué **ignoré** avec la raison (« accès bloqué »). Il n'est jamais compté comme réussi, et la protection n'est jamais contournée.
- L'interface de leboncoin évolue sans préavis : un échec peut venir d'un changement du site plutôt que du code de test. Chaque échec doit être analysé avec la capture et la trace avant d'être classé :
  - erreur dans le test ;
  - changement du site ;
  - problème d'environnement ;
  - non exécuté.
- Certains sélecteurs leboncoin (texte de l'état vide, liens d'annonces `/ad/`) n'ont pas encore pu être validés lors d'une exécution réelle. Ils sont à confirmer à la première exécution.
- Les annonces changent en permanence : les tests vérifient des comportements (présence de résultats, état vide), jamais des annonces précises.
