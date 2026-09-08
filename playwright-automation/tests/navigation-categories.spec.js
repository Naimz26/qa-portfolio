const { test, expect } = require('@playwright/test');
const { acceptCookiesIfPresent } = require('./helpers');

test.describe('Navigation par catégories', () => {
  test('accéder à Véhicules > Voitures depuis la page d\'accueil', async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);

    await page.getByRole('link', { name: 'Véhicules', exact: true }).click();
    await page.getByRole('link', { name: 'Voitures', exact: true }).first().click();

    await expect(page).toHaveURL(/\/c\/voitures/);
  });

  test('accéder directement à une sous-catégorie via URL et vérifier le contenu', async ({ page }) => {
    await page.goto('/c/velos');
    await acceptCookiesIfPresent(page);

    await expect(page).toHaveURL(/\/c\/velos/);
    // La page catégorie doit exposer un titre ou une accroche liée à la thématique.
    await expect(page.locator('body')).toContainText(/vélo/i);
  });
});
