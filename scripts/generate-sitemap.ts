import fs from 'fs';
import path from 'path';

/**
 * Générateur simple de sitemap.xml
 *
 * Usage:
 *  - NODE_ENV=production BASE_URL="https://www.example.com" npx ts-node scripts/generate-sitemap.ts
 *  - Ou compiler/transpiler et exécuter avec node
 *
 * Modifie la liste `routes` ci-dessous ou connecte-la à ton système de routage / CMS.
 */

const BASE_URL = process.env.BASE_URL || 'https://www.abderrahmane-elfarouahfreelance.com';

// Liste des routes à inclure dans le sitemap (ajoute tes pages ici)
const routes: Array<{ url: string; priority?: number; lastmod?: string }> = [
  { url: '/', priority: 1.0 },
  { url: '/projets', priority: 0.8 },
  { url: '/contact', priority: 0.8 },
  { url: '/services', priority: 0.8 }, // exemple : page Services recommandée dans ton audit
];

// Format date YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

function buildUrlEntry(route: { url: string; priority?: number; lastmod?: string }) {
  const loc = `${BASE_URL.replace(/\/$/, '')}${route.url}`;
  const lastmod = route.lastmod || today;
  const priority = (typeof route.priority === 'number') ? route.priority.toFixed(1) : '0.5';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
}

function buildSitemap(routesList: typeof routes) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const footer = '\n</urlset>\n';
  const body = routesList.map(buildUrlEntry).join('\n');
  return header + body + footer;
}

function writeSitemap(sitemapXml: string) {
  const outDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'sitemap.xml');
  fs.writeFileSync(outPath, sitemapXml, { encoding: 'utf8' });
  console.log(`✅ sitemap.xml généré dans ${outPath}`);
}

function main() {
  const sitemap = buildSitemap(routes);
  writeSitemap(sitemap);
}

main();
