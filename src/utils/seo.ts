const baseUrl = 'https://www.abderrahmane-elfarouahfreelance.com';

// Routes avec priorités SEO ajustées selon la navigation principale
// Accueil (1.0) > Services, Réalisations, Contact (0.9) > About (0.6) > Légales (0.3)
const routes = [
  { path: '/', priority: '1.0', changeFreq: 'weekly' },
  { path: '/services', priority: '0.9', changeFreq: 'weekly' },
  { path: '/projects', priority: '0.9', changeFreq: 'weekly' },
  { path: '/contact', priority: '0.9', changeFreq: 'weekly' },
  { path: '/faq', priority: '0.8', changeFreq: 'monthly' }, // Featured snippets
  { path: '/zones-intervention', priority: '0.8', changeFreq: 'monthly' }, // SEO local
  { path: '/about', priority: '0.6', changeFreq: 'monthly' },
  { path: '/experience', priority: '0.5', changeFreq: 'monthly' },
  { path: '/mentions-legales', priority: '0.3', changeFreq: 'yearly' },
  { path: '/cgv', priority: '0.3', changeFreq: 'yearly' },
];

export function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changeFreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

export function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Priorité pour les moteurs de recherche importants
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Bloquer les bots non désirés
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Fichiers à ne pas indexer
Disallow: /admin/
Disallow: /*.json$
Disallow: /*.xml$
Disallow: /api/

# Fichiers spéciaux
Sitemap: ${baseUrl}/sitemap.xml

# Délai de crawl (crawl-delay)
Crawl-delay: 1`;
}
