// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Suite « portfolio » — contenu et structure de la page.
 * Cible maîtrisée : index.html à la racine du dépôt, servi en local (voir playwright.config.js).
 */

test.describe('Portfolio — en-tête et positionnement', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('le titre de page et le titre principal identifient la personne et le métier', async ({ page }) => {
    await expect(page, 'Le <title> doit mentionner le nom et le métier QA').toHaveTitle(/Naim Ziani.*QA/);
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1, 'La page doit avoir un seul titre principal').toHaveCount(1);
    await expect(h1).toHaveText('Naim Ziani');
    const role = page.locator('.hero .role');
    await expect(role).toContainText('QA Tester');
    await expect(role).toContainText('Tests fonctionnels, API et automatisation');
  });

  test('toutes les sections attendues sont présentes', async ({ page }) => {
    for (const name of ['Profil', 'Compétences clés', 'Expérience professionnelle', 'Projets', 'Outils & technologies', 'Formations & certifications', 'Langues']) {
      await expect(page.getByRole('heading', { level: 2, name, exact: true }), `Section « ${name} » absente`).toBeVisible();
    }
  });

  test('l\'expérience actuelle affiche l\'intitulé réel du poste', async ({ page }) => {
    const experience = page.locator('#experience');
    await expect(experience.getByRole('heading', { level: 3, name: /Testeur logiciel manuel/ })).toBeVisible();
    await expect(experience).toContainText("Septembre 2023 – aujourd'hui");
    await expect(experience).toContainText("Rhôn'Telecom");
    await expect(experience).toContainText('Xray');
    await expect(experience).toContainText('Jira');
  });

  test('aucune statistique figée de type « BUILD PASSED 5/5 » n\'est affichée', async ({ page }) => {
    const body = page.locator('body');
    await expect(body).not.toContainText('BUILD PASSED');
    await expect(body).not.toContainText('5/5');
    await expect(body).not.toContainText('outils d\'automatisation & test maîtrisés');
  });
});

test.describe('Portfolio — projets et compétences', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('les quatre projets sont présentés avec leur statut réel', async ({ page }) => {
    const projets = page.locator('#projets');
    await expect(projets.locator('.ticket')).toHaveCount(4);
    await expect(page.locator('#proj-playwright')).toContainText('Réalisé, projet personnel');
    await expect(page.locator('#proj-api'), 'Le projet API n\'existe pas encore : il doit être marqué « À réaliser »').toContainText('À réaliser');
    await expect(page.locator('#proj-api')).toContainText('Aucun pour l\'instant');
    await expect(page.locator('#proj-securite')).toContainText('En cours de formation');
  });

  test('chaque projet décrit au minimum son objectif, son contexte et ses outils', async ({ page }) => {
    for (const id of ['proj-playwright', 'proj-api', 'proj-manuel', 'proj-securite']) {
      const fields = page.locator(`#${id} .proj-fields dt`);
      const labels = await fields.allTextContents();
      expect(labels, `Projet ${id} : champs attendus manquants`).toEqual(expect.arrayContaining(['Objectif', 'Contexte']));
      expect(labels.some((l) => l.startsWith('Outils')), `Projet ${id} : champ « Outils » manquant`).toBe(true);
    }
  });

  test('les compétences sont classées par niveau, sans présenter les outils non prouvés comme pratiqués', async ({ page }) => {
    const competences = page.locator('#competences');
    for (const cat of ['Pratiquées en entreprise', 'Pratiquées dans des projets personnels', 'Connaissances', "En cours d'apprentissage"]) {
      await expect(competences.getByRole('heading', { level: 3, name: new RegExp(`^${cat}`) })).toBeVisible();
    }
    const apprentissage = competences.locator('.skill-item.learning');
    await expect(apprentissage.filter({ hasText: 'Selenium' })).toHaveCount(1);
    await expect(apprentissage.filter({ hasText: 'Postman' })).toHaveCount(1);
    // Aucune mention de Selenium, Cypress ou Postman parmi les compétences « pratiquées ».
    const pratiquees = competences.locator('.skill-item:not(.known):not(.learning)');
    await expect(pratiquees.filter({ hasText: /Selenium|Cypress|Postman/ })).toHaveCount(0);
  });

  test('les certifications obtenues et la formation en cours sont distinguées', async ({ page }) => {
    const formations = page.locator('#formations');
    await expect(formations.locator('.tl-item').filter({ hasText: 'ISTQB' })).toContainText('certification obtenue');
    await expect(formations.locator('.tl-item').filter({ hasText: 'PSPO I' })).toContainText('certification obtenue');
    await expect(formations.locator('.tl-item').filter({ hasText: 'JEDHA' })).toContainText('en cours');
  });
});
