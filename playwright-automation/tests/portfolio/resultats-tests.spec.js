// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * L'encadré « dernière exécution » doit refléter un fichier de résultats réel (results/summary.json),
 * publié par la CI. On simule ici les différentes réponses possibles pour vérifier l'affichage,
 * y compris les cas d'erreur : jamais de chiffres inventés.
 */

const SUMMARY_URL = '**/results/summary.json';

function summary(overrides = {}) {
  return {
    suite: 'portfolio',
    startedAt: '2026-11-15T21:10:00.000Z',
    durationMs: 12345,
    status: 'passed',
    totals: { passed: 30, failed: 0, flaky: 0, skipped: 3 },
    commit: 'abc1234',
    runUrl: 'https://github.com/Naimz26/qa-portfolio/actions/runs/1',
    source: 'github-actions',
    ...overrides,
  };
}

async function openWith(page, fulfill) {
  await page.route(SUMMARY_URL, fulfill);
  await page.goto('/');
  return page.locator('#termResults');
}

test.describe('Portfolio — affichage des résultats de tests', () => {
  test('affiche les compteurs réels d\'une exécution réussie', async ({ page }) => {
    const results = await openWith(page, (route) => route.fulfill({ json: summary() }));
    await expect(results.locator('[data-field="passed"]')).toHaveText('30');
    await expect(results.locator('[data-field="failed"]')).toHaveText('0');
    await expect(results.locator('[data-field="skipped"]')).toHaveText('3');
    await expect(results.locator('[data-field="date"]')).toContainText('15/11/2026 22:10');
    await expect(results.locator('[data-field="date"]')).toContainText('commit abc1234');
    await expect(results.locator('[data-field="status"]')).toHaveText('Pipeline réussi : 30/30 tests réussis');
    await expect(page.locator('#run-status')).toHaveText('Réussi');
    await expect(page.locator('#run-status')).toHaveAttribute('data-status', 'passed');
    await expect(results.getByRole('link', { name: 'Ouvrir le rapport Playwright' })).toHaveAttribute('href', 'report/index.html');
    await expect(results.getByRole('link', { name: /Voir l.exécution sur GitHub/ })).toHaveAttribute('href', /actions\/runs\/1$/);
    await expect(page.locator('#stat-tests')).toHaveText('33');
  });

  test('affiche un échec de pipeline sans le masquer', async ({ page }) => {
    const results = await openWith(page, (route) =>
      route.fulfill({ json: summary({ status: 'failed', totals: { passed: 27, failed: 2, flaky: 1, skipped: 0 } }) }),
    );
    await expect(results.locator('[data-field="status"]')).toHaveText('Pipeline en échec : 2 échec(s) sur 30 tests');
    await expect(results.locator('[data-field="status"]')).toHaveAttribute('data-status', 'failed');
    await expect(results.locator('[data-field="failed"]')).toHaveText('2');
    await expect(results.locator('[data-field="flaky"]')).toContainText('1 test(s) réussi(s) seulement après relance');
    await expect(page.locator('#run-status')).toHaveText('En échec');
  });

  test('affiche « Résultats non disponibles » si aucun résultat n\'est publié', async ({ page }) => {
    const results = await openWith(page, (route) => route.fulfill({ status: 404, body: 'Introuvable' }));
    await expect(results.locator('[data-state="unavailable"]')).toHaveText(/^Résultats non disponibles : tests non exécutés/);
    await expect(results.locator('[data-field]')).toHaveCount(0);
    await expect(page.locator('#stat-tests')).toHaveText('—');
    await expect(page.locator('#run-status')).toHaveText('Non disponible');
  });

  test('refuse un fichier de résultats invalide plutôt que d\'afficher des valeurs douteuses', async ({ page }) => {
    const results = await openWith(page, (route) => route.fulfill({ json: summary({ totals: { passed: '30', failed: -1, skipped: 0 } }) }));
    await expect(results.locator('[data-state="unavailable"]')).toContainText('fichier de résultats invalide');
    await expect(results.locator('[data-field]')).toHaveCount(0);
  });

  test('gère un contenu qui n\'est pas du JSON', async ({ page }) => {
    const results = await openWith(page, (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '<html>erreur</html>' }));
    await expect(results.locator('[data-state="unavailable"]')).toBeVisible();
  });

  test('signale une exécution sans aucun test exécuté', async ({ page }) => {
    const results = await openWith(page, (route) =>
      route.fulfill({ json: summary({ status: 'not_run', totals: { passed: 0, failed: 0, flaky: 0, skipped: 5 } }) }),
    );
    await expect(results.locator('[data-state="unavailable"]')).toContainText('aucun test exécuté');
  });
});
