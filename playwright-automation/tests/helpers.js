/**
 * Ferme le bandeau de consentement cookies (Didomi) si présent,
 * pour ne pas bloquer les interactions dans les tests qui suivent.
 * Écrit de façon défensive : n'échoue pas si le bandeau n'apparaît pas
 * (utilisateur déjà consentant, A/B test, etc.) — situation fréquente
 * sur les sites en production, à documenter plutôt qu'à ignorer.
 */
async function acceptCookiesIfPresent(page) {
  const consentButton = page.getByRole('button', { name: /tout accepter|accepter/i });
  try {
    await consentButton.first().waitFor({ state: 'visible', timeout: 5000 });
    await consentButton.first().click();
  } catch {
    // Bandeau absent ou déjà traité : on continue sans bloquer le test.
  }
}

module.exports = { acceptCookiesIfPresent };
