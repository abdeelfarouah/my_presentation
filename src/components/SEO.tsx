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
      'Développeur Angular Laravel Freelance Île-de-France | Expert Fullstack',
    description:
      "Développeur web freelance expert à Mantes-la-Jolie. Spécialisé Angular, Laravel, TypeScript. Création d'applications sur mesure pour PME et startups en Île-de-France.",
  },
  '/services': {
    title:
      'Services Développement Web Angular Laravel Freelance France',
    description:
      "Services de développement web freelance à Mantes-la-Jolie : applications Angular, APIs Laravel, SaaS sur mesure. Tarifs compétitifs pour entreprises Île-de-France.",
  },
  '/projects': {
    title: 'Projets Web Freelance Angular Laravel | Portfolio France',
    description:
      "Portfolio de projets web réalisés par un développeur freelance expert à Mantes-la-Jolie. Applications Angular, Laravel, SaaS pour clients en Île-de-France.",
  },
  '/experience': {
    title: 'Parcours Développeur Angular Laravel Expert Freelance',
    description:
      "Expérience développeur web freelance spécialisé Angular/Laravel. 5+ ans d'expertise pour entreprises et startups en Île-de-France.",
  },
  '/contact': {
    title: 'Contact Développeur Angular Laravel Freelance Disponible',
    description:
      "Contactez un développeur web freelance expert à Mantes-la-Jolie. Disponible immédiatement pour vos projets Angular, Laravel, applications sur mesure.",
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
    'Développeur Angular Laravel Freelance Île-de-France | Expert Fullstack',
  description:
    "Développeur web freelance expert à Mantes-la-Jolie. Spécialisé Angular, Laravel, TypeScript. Création d'applications sur mesure pour PME et startups en Île-de-France.",
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
      {
        '@type': 'City',
        name: 'Mantes-la-Jolie',
        addressCountry: 'FR'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Yvelines',
        addressCountry: 'FR'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Île-de-France',
        addressCountry: 'FR'
      },
      {
        '@type': 'Country',
        name: 'France'
      }
    ],

    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.9900,
      longitude: 1.7170,
      addressCountry: 'FR',
      addressRegion: 'Île-de-France'
    },

    address: {
      '@type': 'PostalAddress',
      streetAddress: '30 Rue du Commandant Bouchet',
      addressLocality: 'Mantes-la-Jolie',
      postalCode: '78200',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
      addressCountryName: 'France'
    },

    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['French'],
      areaServed: 'FR'
    },

    sameAs: [
      'https://www.linkedin.com/in/abderrahmaneelfarouah/',
      'https://github.com/abdeelfarouah',
      'https://plateforme.freelance.com/freelance/Abderrahmane-1136aeb2-b20d-437a-9a78-fccd54de2f81',
      'https://www.malt.fr/profile/abderrahmaneelfarouah',
      'https://www.pagesjaunes.fr/pros/64207852',
      'https://www.jeveuxunfreelance.fr',
    ],

    knowsAbout: [
      'Angular',
      'React',
      'Node.js',
      'PHP',
      'TypeScript',
      'Développement web fullstack',
      'Applications web performantes',
      'Développement web Mantes-la-Jolie',
      'Développement web Yvelines',
      'Applications web Île-de-France',
      'Développeur freelance Angular Île-de-France',
      'Développeur freelance Laravel France',
      'Développeur fullstack Angular Laravel freelance',
      'Développeur web freelance Angular Paris',
      'Développeur application web Laravel freelance',
      'Freelance Angular TypeScript expert France',
      'Développeur API Laravel freelance',
      'Développeur web sur mesure Angular Laravel',
      'Freelance création application métier Angular',
      'Développeur web indépendant Angular Laravel',
      'Développeur SaaS Angular Laravel freelance',
      'Freelance développement logiciel web sur mesure',
      'Développeur web backend Laravel freelance France',
      'Développeur frontend Angular freelance Paris',
      'Développeur fullstack TypeScript Laravel freelance',
      'Développeur web freelance Mantes-la-Jolie',
      'Développeur Angular freelance Yvelines',
      'Développeur Laravel freelance Île-de-France',
      'Développeur web freelance proche Pontoise',
      'Développeur application web Val-d\'Oise',
      'Développeur freelance Île-de-France PME',
      'Développeur web indépendant Paris entreprise',
      'Freelance Angular Hauts-de-Seine',
      'Développeur Laravel freelance Seine-et-Marne',
      'Développeur web freelance Versailles',
      'Développeur fullstack Île-de-France startup',
      'Développeur Angular freelance Cergy',
      'Développeur web freelance Nanterre',
      'Freelance Laravel Val-d\'Oise',
      'Développeur web freelance Île-de-France TPE',
      'Tarif développeur Angular freelance France',
      'Prix développeur Laravel freelance',
      'Devis création application web Angular Laravel',
      'Coût développement application web sur mesure',
      'Combien coûte développeur freelance Angular',
      'Tarif développeur fullstack freelance France',
      'Prix API Laravel sur mesure',
      'Devis développeur web freelance Île-de-France',
      'Coût création SaaS Angular Laravel',
      'Tarif journalier développeur Angular freelance',
      'TJM développeur Laravel freelance France',
      'Prix développement backend Laravel',
      'Devis application métier Angular',
      'Coût refonte site Angular',
      'Tarif freelance développeur web sur mesure',
      'Créer application web sur mesure entreprise',
      'Moderniser application web Angular',
      'Refonte site web Angular Laravel',
      'Améliorer performance application Angular',
      'Sécuriser API Laravel entreprise',
      'Développer logiciel interne entreprise web',
      'Créer outil métier sur mesure Angular',
      'Automatiser processus entreprise application web',
      'Développer dashboard web entreprise Laravel',
      'Créer back office Angular Laravel',
      'Corriger bug application Angular freelance',
      'Optimiser application web lente Angular',
      'Audit code Laravel freelance',
      'Maintenance application web Angular',
      'Migration application vers Angular',
      'Créer SaaS avec Angular et Laravel',
      'Développer CRM sur mesure Angular',
      'Créer plateforme web Laravel Angular',
      'Application de gestion entreprise Angular',
      'Développer intranet Laravel Angular',
      'Créer outil de gestion client web',
      'Développer application RH Angular',
      'Créer logiciel de facturation Laravel',
      'Application de réservation Angular Laravel',
      'Plateforme marketplace Angular Laravel',
      'Créer application fintech Angular',
      'Développer API REST Laravel sécurisée',
      'Créer dashboard analytics Angular',
      'Application de gestion stock Laravel',
      'Développer application B2B web sur mesure',
      'Expert Angular freelance France',
      'Expert Laravel freelance Île-de-France',
      'Développeur Angular senior freelance',
      'Développeur Laravel expert backend',
      'Freelance TypeScript expert Angular',
      'Développeur web spécialisé Angular Laravel',
      'Expert développement application web sur mesure',
      'Consultant Angular freelance France',
      'Consultant Laravel backend freelance',
      'Développeur fullstack senior freelance France',
      'Freelance vs agence développement web',
      'Pourquoi choisir développeur freelance Angular',
      'Agence ou freelance Laravel',
      'Avantage développeur web indépendant',
      'Freelance Angular ou React lequel choisir',
      'Laravel ou Node.js pour projet web',
      'Angular ou React pour application entreprise',
      'Développeur freelance ou ESN',
      'Choisir développeur web freelance France',
      'Meilleur développeur Angular freelance',
      'Contacter développeur Angular freelance',
      'Trouver développeur Laravel freelance rapidement',
      'Embaucher développeur web freelance France',
      'Mission développeur Angular freelance disponible',
      'Développeur freelance disponible immédiatement Angular Laravel'
    ],

    availableLanguage: ['French'],
    currenciesAccepted: 'EUR',
    paymentAccepted: ['Bank Transfer', 'Check'],
    priceRange: '€€€',
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
      <meta name="author" content={SITE_NAME} />
      <meta name="language" content="fr" />
      <meta name="robots" content={robotsContent} />
      <meta name="theme-color" content="#000000" />

      {/* ── Canonical + hreflang ── */}

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="fr" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* ── Open Graph ── */}

      <meta property="og:type" content={finalType} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />

      {/* ── Twitter Card ── */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

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
