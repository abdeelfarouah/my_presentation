import { Helmet } from 'react-helmet-async';
import { useRouterState } from '@tanstack/react-router';
import { useMemo } from 'react';
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

// ─── SEO par route ────────────────────────────

const pageSEO: Record<string, PageSEOMeta> = {
  '/': {
    title:
      'Développeur Angular Freelance Île-de-France | Expert Laravel & Fullstack',
    description:
      "Développeur web freelance expert à Mantes-la-Jolie. Spécialisé Angular, Laravel, TypeScript. Création d'applications sur mesure pour PME et startups.",
  },
  '/about': {
    title:
      'À Propos | Développeur Freelance Angular Laravel Mantes-la-Jolie (78)',
    description:
      "Développeur web freelance Angular & Laravel basé à Mantes-la-Jolie, Yvelines (78). Expertise fullstack, interopérabilité AS400, transformation digitale en Île-de-France.",
  },
  '/services': {
    title:
      'Services Développement Web Angular Laravel Freelance France',
    description:
      "Services de développement web : Angular, Laravel, API REST, SaaS sur mesure pour entreprises en Île-de-France.",
  },
  '/projects': {
    title: 'Portfolio Développeur Angular Laravel Freelance',
    description:
      "Découvrez des projets web Angular et Laravel réalisés pour entreprises et startups.",
  },
  '/experience': {
    title: 'Expérience Développeur Fullstack Freelance Angular Laravel',
    description:
      "Parcours et expertise en développement web fullstack pour projets complexes.",
  },
  '/contact': {
    title: 'Contact Développeur Freelance Angular Laravel',
    description:
      "Contactez un développeur web freelance disponible pour vos projets sur mesure.",
  },
  '/mentions-legales': {
    title: 'Mentions Légales | Abderrahmane El Farouah',
    description:
      "Mentions légales du site portfolio d'Abderrahmane El Farouah, développeur web freelance.",
    noIndex: true,
  },
  '/cgv': {
    title: 'Conditions Générales de Vente | Développeur Web Freelance',
    description:
      "Conditions générales de vente pour les prestations de développement web freelance d'Abderrahmane El Farouah.",
    noIndex: true,
  },
};

// ─── Helpers ──────────────────────────────────

function buildCanonical(pathname: string): string {
  const clean = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
  return `${BASE_URL}${clean}`;
}

function buildBreadcrumbStructuredData(finalTitle: string, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: BASE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: finalTitle,
        item: canonicalUrl
      }
    ]
  };
}

function toAbsoluteImageUrl(image: string): string {
  if (image.startsWith('http')) return image;
  return `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
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
  const { location } = useRouterState();
  const pathname = location.pathname;

  const pageSpecific = pageSEO[pathname] ?? {};

  const finalTitle       = title       || pageSpecific.title;
  const finalDescription = description || pageSpecific.description;
  const finalImage       = toAbsoluteImageUrl(image || DEFAULT_IMAGE);
  const finalType        = type || 'website';
  const finalNoIndex     = noIndex || pageSpecific.noIndex || false;

  const canonicalUrl = buildCanonical(pathname);
  const robotsContent = finalNoIndex ? 'noindex, nofollow' : 'index, follow';

  // ─── Structured Data ─────────────────────────

  const structuredDataList = useMemo(() => {
    const professionalService = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Abderrahmane El Farouah - Développeur Web Fullstack Freelance Angular Laravel",
      "alternateName": [
        "Développeur Angular freelance Yvelines",
        "Développeur Laravel freelance Île-de-France",
        "Freelance développeur web Mantes-la-Jolie"
      ],
      "description": "Développeur web fullstack freelance spécialisé Angular, React, Laravel et Node.js, basé à Mantes-la-Jolie dans les Yvelines. Création d'applications web sur mesure, sites e-commerce performants et solutions digitales pour entreprises en Île-de-France et partout en France.",
      
      "url": BASE_URL,
      "telephone": "+33760751350",
      "email": "abde.elfarouah@gmail.com",

      "address": {
        "@type": "PostalAddress",
        "streetAddress": "30 Rue du Commandant Bouchet",
        "addressLocality": "Mantes-la-Jolie",
        "postalCode": "78200",
        "addressRegion": "Île-de-France",
        "addressCountry": "FR"
      },

      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.9900,
        "longitude": 1.7170
      },

      "areaServed": [
        { "@type": "City", "name": "Mantes-la-Jolie" },
        { "@type": "City", "name": "Versailles" },
        { "@type": "City", "name": "Saint-Germain-en-Laye" },
        { "@type": "AdministrativeArea", "name": "Yvelines" },
        { "@type": "AdministrativeArea", "name": "Île-de-France" },
        { "@type": "Country", "name": "France" }
      ],

      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },

      "sameAs": [
        "https://www.linkedin.com/in/abderrahmaneelfarouah/",
        "https://github.com/abderrahmaneelfarouah",
        "https://www.malt.fr/profile/abderrahmaneelfarouah"
      ],

      "knowsAbout": [
        "Angular",
        "React",
        "Laravel",
        "PHP",
        "Node.js",
        "TypeScript",
        "SEO technique",
        "Progressive Web Apps (PWA)",
        "API REST",
        "Développement fullstack",
        "Optimisation performance web",
        "Accessibilité web"
      ],

      "serviceType": [
        "Développement web fullstack freelance",
        "Création application web Angular sur mesure",
        "Développement Laravel backend API",
        "Création site e-commerce performant",
        "Développeur React freelance Île-de-France",
        "Développement PWA mobile web",
        "Optimisation SEO technique site web",
        "Maintenance et refonte site web"
      ],

      "availableLanguage": ["fr","en"],

      "currenciesAccepted": "EUR",
      "paymentAccepted": ["Bank Transfer"],

      "priceRange": "€€€",

      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services développement web freelance Yvelines",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Développement application web Angular sur mesure Yvelines",
            "itemOffered": {
              "@type": "Service",
              "name": "Création application web Angular",
              "description": "Développement d'applications web modernes Angular pour entreprises en Île-de-France, performantes, sécurisées et évolutives."
            }
          },
          {
            "@type": "Offer",
            "name": "Développement backend Laravel API REST",
            "itemOffered": {
              "@type": "Service",
              "name": "Développement Laravel",
              "description": "Création d'API REST sécurisées avec Laravel pour applications web et mobiles."
            }
          },
          {
            "@type": "Offer",
            "name": "Création site e-commerce SEO optimisé",
            "itemOffered": {
              "@type": "Service",
              "name": "Développement e-commerce",
              "description": "Création de boutiques en ligne performantes avec optimisation SEO, conversion et sécurité."
            }
          },
          {
            "@type": "Offer",
            "name": "Développement Progressive Web App (PWA)",
            "itemOffered": {
              "@type": "Service",
              "name": "Création PWA",
              "description": "Applications web mobiles rapides installables, adaptées aux usages mobiles modernes."
            }
          },
          {
            "@type": "Offer",
            "name": "Optimisation SEO technique développeur web",
            "itemOffered": {
              "@type": "Service",
              "name": "Audit SEO technique",
              "description": "Amélioration des performances, du Core Web Vitals et du référencement naturel."
            }
          }
        ]
      }
    };

    const person = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE_NAME,
      url: BASE_URL,
      jobTitle: "Développeur web fullstack freelance",
      sameAs: professionalService.sameAs
    };

    const website = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: BASE_URL,
      name: SITE_NAME
    };

    const breadcrumb = buildBreadcrumbStructuredData(finalTitle, canonicalUrl);

    return [
      structuredData ?? professionalService,
      person,
      website,
      breadcrumb,
      pageStructuredData[pathname as keyof typeof pageStructuredData]
    ].filter(Boolean);

  }, [finalDescription, finalImage, finalTitle, canonicalUrl, pathname, structuredData]);

  // ─── Render ─────────────────────────────────

  return (
    <Helmet>

      <html lang="fr" />

      {/* META */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content={robotsContent} />

      {/* CANONICAL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* OPEN GRAPH */}
      <meta property="og:type" content={finalType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* JSON-LD */}
      {structuredDataList.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}

    </Helmet>
  );
}