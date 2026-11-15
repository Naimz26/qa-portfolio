// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuration Playwright — deux suites distinctes :
 *
 *  1. portfolio-*  : tests du site portfolio (index.html à la racine du dépôt), servi en local.
 *                    Cible maîtrisée et stable → exécutée en CI à chaque push et pull request.
 *  2. leboncoin-*  : tests de parcours publics sur www.leboncoin.fr (site tiers en production).
 *                    Dépend d'un site externe protégé contre l'automatisation → exécution à la demande,
 *                    non bloquante. Voir README.md, section « Limites connues ».
 */

const PORTFOLIO_PORT = Number(process.env.PORTFOLIO_PORT || 4173);
const PORTFOLIO_URL = `http://127.0.0.1:${PORTFOLIO_PORT}`;
const LEBONCOIN_URL = 'https://www.leboncoin.fr';

const browsers = [
  { suffix: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { suffix: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { suffix: 'mobile', use: { ...devices['Pixel 7'] } },
];

module.exports = defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Les nouvelles tentatives sont signalées comme « flaky » dans le rapport : elles ne masquent pas un échec.
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 10_000 },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
  ],

  use: {
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    ...browsers.map((b) => ({
      name: `portfolio-${b.suffix}`,
      testDir: './tests/portfolio',
      use: { ...b.use, baseURL: PORTFOLIO_URL },
    })),
    ...browsers.map((b) => ({
      name: `leboncoin-${b.suffix}`,
      testDir: './tests/leboncoin',
      // Site tiers : délais plus longs, une seule tentative supplémentaire pour limiter la charge.
      retries: process.env.CI ? 1 : 0,
      timeout: 60_000,
      use: { ...b.use, baseURL: LEBONCOIN_URL },
    })),
  ],

  // Serveur statique local pour le portfolio (aucune dépendance supplémentaire).
  webServer: {
    command: 'node scripts/serve-portfolio.js',
    url: `${PORTFOLIO_URL}/index.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
    env: { PORTFOLIO_PORT: String(PORTFOLIO_PORT) },
  },
});
