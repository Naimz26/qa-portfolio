/**
 * Produit un résumé lisible (results/summary.json) à partir du rapport JSON de Playwright.
 * Ce résumé est publié avec le site : la section « Résultats des tests » l'affiche tel quel.
 * Aucune valeur n'est inventée : sans rapport JSON, le script échoue et le site affiche « Résultats non disponibles ».
 *
 * Usage : node scripts/summarize-results.js [suite] [chemin-sortie]
 */
const fs = require('node:fs');
const path = require('node:path');

const suiteName = process.argv[2] || 'portfolio';
const output = process.argv[3] || path.join(__dirname, '..', 'results', 'summary.json');
const input = path.join(__dirname, '..', 'reports', 'results.json');

if (!fs.existsSync(input)) {
  console.error(`Rapport JSON introuvable (${input}) : les tests n'ont pas été exécutés.`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(input, 'utf8'));
const empty = () => ({ passed: 0, failed: 0, flaky: 0, skipped: 0 });
const totals = empty();
const projects = {};

function walk(suite) {
  for (const spec of suite.specs || []) {
    for (const t of spec.tests || []) {
      const p = (projects[t.projectName] ||= empty());
      const key = { expected: 'passed', unexpected: 'failed', flaky: 'flaky', skipped: 'skipped' }[t.status];
      if (!key) continue;
      p[key] += 1;
      totals[key] += 1;
    }
  }
  for (const child of suite.suites || []) walk(child);
}
for (const s of report.suites || []) walk(s);

const executed = totals.passed + totals.failed + totals.flaky;
const summary = {
  suite: suiteName,
  startedAt: report.stats?.startTime ?? null,
  durationMs: Math.round(report.stats?.duration ?? 0),
  status: executed === 0 ? 'not_run' : totals.failed > 0 ? 'failed' : 'passed',
  totals,
  projects,
  playwrightVersion: report.config?.version ?? null,
  commit: process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(0, 7) : null,
  runUrl:
    process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
      ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : null,
  source: process.env.CI ? 'github-actions' : 'local',
};

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(summary, null, 2)}\n`);
console.log(`Résumé « ${suiteName} » : ${totals.passed} réussis, ${totals.failed} échoués, ${totals.flaky} instables, ${totals.skipped} ignorés → ${output}`);
