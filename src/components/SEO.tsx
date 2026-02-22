import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { pageStructuredData } from '../utils/structuredData';

// ─── Config ───────────────────────────────────

const BASE_URL = 'https://www.abderrahmane-elfarouahfreelance.com';
const SITE_NAME = 'Abderrahmane El Farouah';
const TWITTER_HANDLE = '@abdeelfarouah';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

// ─── Types ────────────────────────────────────

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  noIndex?: boolean;
  structuredData?: object;
}

interface PageSEOMeta {
  title: string;
  description: string;
  noIndex?: boolean;
}

// ─── Métadonnées par route ────────────────────

const pageSEO: Record<string, PageSEOMeta> = {
  '/': {
    title:
      'Développeur Web Freelance à Mantes-la-Jolie (Yvelines 78) | Abderrahmane El Farouah',
    description:
      "Développeur web freelance basé à Mantes-la-Jolie dans les Yvelines, spécialisé dans les applications Angular, React et Laravel.",
  },
  '/services': {
    title:
      'Développeur Angular & Laravel Freelance à Mantes-la-Jolie (Yvelines 78)',
    description:
      "Services de développement web à Mantes-la-Jolie et dans les Yvelines : applications Angular, Laravel, plateformes SaaS et solutions sur mesure.",
  },
  '/projects': {
    title: 'Projets Web réalisés à Mantes-la-Jolie et en Yvelines | Portfolio',
    description:
      "Découvrez les projets web réalisés par un développeur freelance basé à Mantes-la-Jolie (78).",
  },
  '/experience': {
    title: 'Parcours professionnel | Développeur Web Freelance Yvelines',
    description:
      "Expériences et parcours d'un développeur web freelance basé à Mantes-la-Jolie dans les Yvelines.",
  },
  '/contact': {
    title: 'Contact Développeur Web à Mantes-la-Jolie (Yvelines 78)',
    description:
      "Contactez un développeur web freelance à Mantes-la-Jolie pour vos projets d'applications web sur mesure.",
  },
  '/mentions-legales': {
    title: 'Mentions légales | Abderrahmane El Farouah',
    description: 'Mentions légales du site.',
  },
  '/cgv': {
    title: 'Conditions Générales de Vente | Abderrahmane El Farouah',
    description: 'Conditions générales de vente des services.',
  },
};

// ─── SEO par défaut ───────────────────────────

const defaultSEO = {
  title:
    'Développeur Web Freelance à Mantes-la-Jolie (Yvelines 78) | Abderrahmane El Farouah',
  description:
    "Développeur web freelance basé à Mantes-la-Jolie dans les Yvelines (78), spécialisé en Angular, React et Laravel pour la création d'applications web modernes et performantes.",
  type: 'website',
};

// ─── Helpers ──────────────────────────────────

/** Supprime le trailing slash et retourne une URL canonique absolue */
function buildCanonical(pathname: string): string {
  const clean = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
  return `${BASE_URL}${clean}`;
}

/** Garantit une URL absolue pour l'image OG */
function toAbsoluteImageUrl(image: string): string {
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
}

/** Avertit en dev si title/description dépassent les longueurs optimales */
function validateSEOLengths(title: string, description: string): void {
  if (process.env.NODE_ENV !== 'development') return;
  if (title.length > 60)
    console.warn(`[SEO] Title trop long : ${title.length}/60 chars → "${title}"`);
  if (title.length < 30)
    console.warn(`[SEO] Title trop court : ${title.length}/30 min → "${title}"`);
  if (description.length > 155)
    console.warn(`[SEO] Description trop longue : ${description.length}/155 chars`);
  if (description.length < 70)
    console.warn(`[SEO] Description trop courte : ${description.length}/70 min`);
}

// ─── Composant ────────────────────────────────

export default function SEO({
  title,
  description,
  image,
  type,
  noIndex = false,
  structuredData,
}: SEOProps) {
  const { pathname } = useLocation();

  const pageSpecific = pageSEO[pathname] ?? {};

  const finalTitle       = title       || pageSpecific.title       || defaultSEO.title;
  const finalDescription = description || pageSpecific.description || defaultSEO.description;
  const finalImage       = toAbsoluteImageUrl(image || DEFAULT_IMAGE);
  const finalType        = type        || defaultSEO.type;
  const finalNoIndex     = noIndex     || pageSpecific.noIndex     || false;
  const robotsContent    = finalNoIndex ? 'noindex, nofollow' : 'index, follow';
  const canonicalUrl     = buildCanonical(pathname);

  validateSEOLengths(finalTitle, finalDescription);

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    image: finalImage,
    url: BASE_URL,
    description: finalDescription,
    areaServed: [
      { '@type': 'City', name: 'Mantes-la-Jolie' },
      { '@type': 'AdministrativeArea', name: 'Yvelines' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mantes-la-Jolie',
      postalCode: '78200',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['French'],
    },
    sameAs: [
      'https://www.linkedin.com/in/abderrahmaneelfarouah/',
      'https://github.com/abdeelfarouah',
    ],
    knowsAbout: ['Angular', 'site web', 'Laravel', 'React', 'TypeScript', 'Développement web fullstack'],
  };

  const finalStructuredData =
    structuredData ??
    pageStructuredData[pathname as keyof typeof pageStructuredData] ??
    defaultStructuredData;

  return (
    <Helmet>
      {/* ── Fondamentaux ── */}
      <html lang="fr" />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="author"      content={SITE_NAME} />
      <meta name="language"    content="fr" />
      <meta name="robots"      content={robotsContent} />

      {/* ── Canonical + hreflang ── */}
      <link rel="canonical"              href={canonicalUrl} />
      <link rel="alternate" hrefLang="fr"        href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* ── Open Graph ── */}
      <meta property="og:type"         content={finalType} />
      <meta property="og:locale"       content="fr_FR" />
      <meta property="og:site_name"    content={SITE_NAME} />
      <meta property="og:url"          content={canonicalUrl} />
      <meta property="og:title"        content={finalTitle} />
      <meta property="og:description"  content={finalDescription} />
      <meta property="og:image"        content={finalImage} />
      <meta property="og:image:type"   content="image/png" />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"    content={finalTitle} />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER_HANDLE} />
      <meta name="twitter:title"       content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image"       content={finalImage} />

      {/* ── JSON-LD ── */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>

      {/* ── Performance ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </Helmet>
  );
    }
