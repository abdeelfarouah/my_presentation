const baseUrl = 'https://www.abderrahmane-elfarouahfreelance.com';

const routes = [
  { path: '/', priority: '1.0', changeFreq: 'weekly' },
  { path: '/about', priority: '0.8', changeFreq: 'monthly' },
  { path: '/projects', priority: '0.9', changeFreq: 'weekly' },
  { path: '/experience', priority: '0.8', changeFreq: 'monthly' },
  { path: '/services', priority: '0.8', changeFreq: 'monthly' },
  { path: '/contact', priority: '0.7', changeFreq: 'monthly' },
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
