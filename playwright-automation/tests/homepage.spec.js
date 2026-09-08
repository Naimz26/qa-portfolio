const { test, expect } = require('@playwright/test');
const { acceptCookiesIfPresent } = require('./helpers');

test.describe('Page d\'accueil', () => {
  test('se charge et affiche les éléments clés', async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);

    await expect(page).toHaveTitle(/leboncoin/i);

    // Le menu de catégories principal doit être présent et visible.
    await expect(page.getByRole('link', { name: 'Véhicules', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Immobilier', exact: true })).toBeVisible();
  });

  test('le bouton "Déposer une annonce" est visible et pointe vers le bon parcours', async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);

    const depotLink = page.getByRole('link', { name: /déposer une annonce/i }).first();
    await expect(depotLink).toBeVisible();
    await expect(depotLink).toHaveAttribute('href', /deposer-une-annonce/);
  });
});
