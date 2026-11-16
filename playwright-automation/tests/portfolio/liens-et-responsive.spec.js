// @ts-check
const fs = require('node:fs');
const path = require('node:path');
const { test, expect } = require('@playwright/test');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const REPO_URL = 'https://github.com/Naimz26/qa-portfolio';

test.describe('Portfolio — liens et contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('les moyens de contact sont présents et correctement formés', async ({ page }) => {
    const contact = page.locator('footer');
    await expect(contact.getByRole('link', { name: 'naim.ziani26@gmail.com' })).toHaveAttribute('href', 'mailto:naim.ziani26@gmail.com');
    await expect(contact.getByRole('link', { name: '06 12 08 28 42' })).toHaveAttribute('href', 'tel:+33612082842');
    await expect(contact.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', /^https:\/\/(www\.)?linkedin\.com\/in\//);
  });

  test('les liens externes s\'ouvrent dans un nouvel onglet de façon sécurisée', async ({ page }) => {
    const external = page.locator('a[target="_blank"]');
    const count = await external.count();
    expect(count, 'Aucun lien externe trouvé').toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const link = external.nth(i);
      await expect(link, `Lien ${await link.getAttribute('href')} sans rel="noopener"`).toHaveAttribute('rel', /noopener/);
    }
  });

  test('les liens vers le dépôt GitHub pointent vers des fichiers ou dossiers qui existent', async ({ page }) => {
    const hrefs = await page.locator(`a[href^="${REPO_URL}/"]`).evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    const repoPaths = hrefs
      .map((h) => h.match(/\/(?:tree|blob)\/main\/(.+)$/))
      .filter(Boolean)
      .map((m) => decodeURIComponent(m[1]));
    expect(repoPaths.length, 'Aucun lien vers un fichier du dépôt').toBeGreaterThan(0);
    for (const p of repoPaths) {
      expect(fs.existsSync(path.join(REPO_ROOT, p)), `Lien cassé vers le dépôt : ${p}`).toBe(true);
    }
  });

  test('la photo de profil se charge et possède un texte alternatif', async ({ page }) => {
    const photo = page.getByRole('img', { name: 'Photo de Naim Ziani' });
    await expect(photo).toBeVisible();
    const loaded = await photo.evaluate((img) => /** @type {HTMLImageElement} */ (img).complete && /** @type {HTMLImageElement} */ (img).naturalWidth > 0);
    expect(loaded, 'La photo ne s\'est pas chargée').toBe(true);
  });
});

test.describe('Portfolio — affichage et accessibilité de base', () => {
  test('la page ne provoque aucune erreur JavaScript', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.route('**/results/summary.json', (route) => route.fulfill({ status: 404, body: '' }));
    await page.goto('/');
    await expect(page.locator('[data-state="unavailable"]')).toBeVisible();
    expect(errors, `Erreurs JavaScript : ${errors.join(' | ')}`).toEqual([]);
  });

  test('pas de défilement horizontal (affichage adapté à la largeur de l\'écran)', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `La page déborde de ${overflow}px horizontalement`).toBeLessThanOrEqual(0);
  });

  test('la langue de la page est déclarée en français', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  });

  test('une URL inexistante renvoie une erreur 404 (scénario négatif du serveur de test)', async ({ page }) => {
    const response = await page.goto('/page-inexistante.html');
    expect(response?.status()).toBe(404);
  });
});
