// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Utilitaires de la suite « leboncoin » (site tiers en production).
 *
 * Principes :
 *  - aucune protection n'est contournée (pas de résolution de CAPTCHA, pas d'en-têtes falsifiés) ;
 *  - si le site bloque l'automatisation, le test est marqué « ignoré » avec la raison exacte,
 *    il n'est jamais compté comme réussi ;
 *  - toute autre erreur (sélecteur introuvable, comportement inattendu) fait échouer le test.
 */

/** Page de blocage anti-robots (DataDome) ou réponse HTTP de refus. */
async function isBlockedByAntiBot(page, response) {
  const status = response?.status() ?? 0;
  if (status === 403 || status === 429) return `réponse HTTP ${status}`;
  const captcha = page.locator('iframe[src*="captcha-delivery.com"], iframe[title*="DataDome" i]');
  if ((await captcha.count()) > 0) return 'page de vérification anti-robots (DataDome)';
  return null;
}

/**
 * Ouvre une page du site. Si l'accès est bloqué par la protection anti-robots,
 * le test en cours est ignoré (statut « skipped ») avec une annotation explicite.
 */
async function openPage(page, url) {
  const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
  const blocked = await isBlockedByAntiBot(page, response);
  if (blocked) {
    test.info().annotations.push({ type: 'site-externe', description: `Accès bloqué : ${blocked}. Test non exécuté (aucun contournement).` });
    test.skip(true, `Site tiers : accès bloqué (${blocked}) — test non exécuté`);
  }
  expect(response?.status(), `Réponse HTTP inattendue pour ${url}`).toBeLessThan(400);
  await acceptCookies(page);
  return response;
}

/**
 * Accepte le bandeau de consentement (Didomi) s'il apparaît.
 * Seule l'absence du bandeau est tolérée ; un bandeau présent mais impossible à fermer fait échouer le test.
 */
async function acceptCookies(page) {
  const accept = page.locator('#didomi-notice-agree-button').or(page.getByRole('button', { name: /^(tout )?accepter/i })).first();
  try {
    await accept.waitFor({ state: 'visible', timeout: 7_000 });
  } catch (e) {
    if (e instanceof Error && e.name === 'TimeoutError') return; // bandeau absent : situation normale (déjà accepté, variante de page)
    throw e;
  }
  await accept.click();
  await expect(accept, 'Le bandeau de consentement ne s\'est pas fermé après le clic').toBeHidden();
}

/** Champ de recherche principal (rôle accessible en priorité, puis placeholder). */
function searchInput(page) {
  return page.getByRole('searchbox').or(page.getByPlaceholder(/rechercher/i)).first();
}

/** Liens vers des annonces dans la liste de résultats. */
function adLinks(page) {
  return page.locator('main a[href*="/ad/"]');
}

module.exports = { openPage, acceptCookies, searchInput, adLinks };
