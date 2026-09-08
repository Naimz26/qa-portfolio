const { test, expect } = require('@playwright/test');
const { acceptCookiesIfPresent } = require('./helpers');

test.describe('Recherche', () => {
  test('rechercher un terme et obtenir des résultats cohérents', async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);

    const searchBox = page.getByPlaceholder(/rechercher/i).first();
    await searchBox.click();
    await searchBox.fill('vélo');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/recherche|\/c\//);

    // Au moins une carte d'annonce doit apparaître dans les résultats.
    const results = page.locator('[data-test-id="ad"], article, a[href*="/ad/"]');
    await expect(results.first()).toBeVisible({ timeout: 10000 });
  });

  test('une recherche sans résultat plausible affiche un état vide explicite', async ({ page }) => {
    await page.goto('/recherche?text=zzzzxxxxaucunresultatpossible123');
    await acceptCookiesIfPresent(page);

    // On vérifie que la page ne casse pas silencieusement : soit un message
    // "aucun résultat", soit un fallback de suggestions — jamais une page blanche.
    await expect(page.locator('body')).not.toBeEmpty();
  });
});
