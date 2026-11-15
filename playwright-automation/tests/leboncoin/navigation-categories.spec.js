// @ts-check
const { test, expect } = require('@playwright/test');
const { openPage, adLinks } = require('./helpers');

test.describe('Leboncoin — navigation par catégories', () => {
  test('Véhicules › Voitures depuis la page d\'accueil ouvre la catégorie Voitures', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Le menu des catégories est différent sur mobile : couvert par le test d\'accès direct.');
    await openPage(page, '/');

    await page.getByRole('link', { name: 'Véhicules', exact: true }).first().click();
    await page.getByRole('link', { name: 'Voitures', exact: true }).first().click();

    await expect(page, 'L\'URL doit correspondre à la catégorie Voitures').toHaveURL(/\/c\/voitures/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/voiture/i);
  });

  test('l\'accès direct à la catégorie Vélos affiche un titre et des annonces de la catégorie', async ({ page }) => {
    await openPage(page, '/c/velos');

    await expect(page).toHaveURL(/\/c\/velos/);
    await expect(page.getByRole('heading', { level: 1 }), 'Le titre principal doit concerner les vélos').toContainText(/vélo/i);
    await expect(adLinks(page).first(), 'Aucune annonce affichée dans la catégorie').toBeVisible();
  });

  test('une catégorie inexistante ne renvoie pas une page de catégorie valide (scénario négatif)', async ({ page }) => {
    const response = await page.goto('/c/categorie-inexistante-qa-portfolio', { waitUntil: 'domcontentloaded' });
    const status = response?.status() ?? 0;
    test.skip(status === 403 || status === 429, `Site tiers : accès bloqué (HTTP ${status}) — test non exécuté`);

    // Attendu : erreur 404, ou redirection hors de l'URL demandée. Une page 200 sur cette URL serait une anomalie.
    const stillOnUrl = /categorie-inexistante-qa-portfolio/.test(page.url());
    expect(status === 404 || !stillOnUrl, `Réponse ${status} sur une catégorie inexistante`).toBe(true);
  });
});
