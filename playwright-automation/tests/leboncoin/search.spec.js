// @ts-check
const { test, expect } = require('@playwright/test');
const { openPage, searchInput, adLinks } = require('./helpers');

const EMPTY_STATE = /aucune? (annonce|résultat)|pas de résultat|0 annonce/i;

test.describe('Leboncoin — recherche', () => {
  test('une recherche pertinente renvoie des annonces identifiables', async ({ page }) => {
    await openPage(page, '/');

    const search = searchInput(page);
    await search.fill('vélo');
    await search.press('Enter');

    await expect(page, 'La recherche doit mener à une page de résultats contenant le terme').toHaveURL(/recherche.*text=v(%C3%A9|é)lo/i);
    const ads = adLinks(page);
    await expect(ads.first(), 'Aucune annonce dans les résultats').toBeVisible();
    expect(await ads.count(), 'Nombre d\'annonces insuffisant pour une recherche courante').toBeGreaterThanOrEqual(5);
    await expect(page.getByText(EMPTY_STATE), 'Un état « aucun résultat » ne doit pas apparaître').toHaveCount(0);
  });

  test('une recherche sans résultat affiche un état vide identifiable et aucune annonce', async ({ page }) => {
    await openPage(page, '/recherche?text=zzqxwqaportfolioaucunresultat');

    await expect(page.getByText(EMPTY_STATE).first(), 'Message « aucun résultat » attendu').toBeVisible();
    // Aucune annonce ne doit être présentée comme résultat. Si le site affiche des « suggestions »
    // d'annonces sous l'état vide, ce test échouera : à analyser lors de la première exécution réelle.
    await expect(adLinks(page), 'Des annonces sont affichées malgré l\'absence de résultat').toHaveCount(0);
  });

  test('une recherche limitée à une catégorie reste dans cette catégorie sans erreur', async ({ page }) => {
    await openPage(page, '/c/velos');

    const search = searchInput(page);
    await search.fill('électrique');
    await search.press('Enter');

    await expect(page, 'Le terme doit apparaître dans l\'URL de recherche').toHaveURL(/text=(%C3%A9|é)lectrique/i);
    await expect(page.getByRole('heading', { name: /erreur|oups/i }), 'Une page d\'erreur ne doit pas s\'afficher').toHaveCount(0);
    // Soit des annonces, soit un état vide explicite : jamais une page sans retour pour l'utilisateur.
    await expect(adLinks(page).first().or(page.getByText(EMPTY_STATE).first())).toBeVisible();
  });
});
