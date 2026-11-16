// @ts-check
const { test, expect } = require('@playwright/test');
const { openPage, searchInput } = require('./helpers');

test.describe('Leboncoin — page d\'accueil', () => {
  test('se charge avec le titre du site, le champ de recherche et les catégories principales', async ({ page }) => {
    await openPage(page, '/');

    await expect(page, 'Le titre de la page doit mentionner leboncoin').toHaveTitle(/leboncoin/i);
    await expect(searchInput(page), 'Champ de recherche introuvable').toBeVisible();
    await expect(page.getByRole('link', { name: 'Véhicules', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Immobilier', exact: true }).first()).toBeVisible();
  });

  test('le lien « Déposer une annonce » mène au parcours de dépôt (sans le démarrer)', async ({ page }) => {
    await openPage(page, '/');

    const depot = page.getByRole('link', { name: /déposer une annonce/i }).first();
    await expect(depot).toBeVisible();
    await expect(depot, 'Le lien doit pointer vers le parcours de dépôt').toHaveAttribute('href', /deposer-une-annonce/);
  });
});
