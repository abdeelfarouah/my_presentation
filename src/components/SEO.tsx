import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { pageStructuredData } from '../utils/structuredData';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const baseUrl = 'https://www.abderrahmane-elfarouahfreelance.com';

const defaultSEO = {
  title:
    'Développeur Web Freelance à Mantes-la-Jolie (Yvelines 78) | Abderrahmane El Farouah',
  description:
    "Développeur web freelance basé à Mantes-la-Jolie dans les Yvelines (78), spécialisé en Angular, React et Laravel pour la création d'applications web modernes et performantes.",
  image: `${baseUrl}/og-image.png`,
  type: 'website',
};

interface PageSEO {
  title: string;
  description: string;
  noIndex?: boolean;
}

const pageSEO: Record<string, PageSEO> = {
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
    title:
      'Projets Web réalisés à Mantes-la-Jolie et en Yvelines | Portfolio',
    description:
      "Découvrez les projets web réalisés par un développeur freelance basé à Mantes-la-Jolie (78).",
  },
  '/experience': {
    title:
      'Parcours professionnel | Développeur Web Freelance Yvelines',
    description:
      "Expériences et parcours d’un développeur web freelance basé à Mantes-la-Jolie dans les Yvelines.",
  },
  '/contact': {
    title:
      'Contact Développeur Web à Mantes-la-Jolie (Yvelines 78)',
    description:
      "Contactez un développeur web freelance à Mantes-la-Jolie pour vos projets d'applications web sur mesure.",
  },
  '/mentions-legales': {
    title: 'Mentions légales | Abderrahmane El Farouah',
    description: "Mentions légales du site.",
    noIndex: true,
  },
  '/cgv': {
    title: 'Conditions Générales de Vente | Abderrahmane El Farouah',
    description: "Conditions générales de vente des services.",
    noIndex: true,
  },
};

export default function SEO({
  title,
  description,
  image,
  type,
  noIndex = false,
  structuredData,
}: SEOProps) {
  const location = useLocation();
  const currentPath = location.pathname === '/' ? '' : location.pathname;

  const pageSpecificSEO =
    pageSEO[location.pathname as keyof typeof pageSEO] || {};

  const finalTitle =
    title || pageSpecificSEO.title || defaultSEO.title;

  const finalDescription =
    description || pageSpecificSEO.description || defaultSEO.description;

  const finalImage = image || defaultSEO.image;
  const finalType = type || defaultSEO.type;

  const finalNoIndex =
    noIndex || pageSpecificSEO.noIndex || false;

  const canonicalUrl = `${baseUrl}${currentPath}`;

  // Structured Data Local Optimisé
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Abderrahmane El Farouah',
    image: finalImage,
    url: baseUrl,
    description: finalDescription,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Yvelines'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mantes-la-Jolie',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['French']
    },
    sameAs: [
      'https://www.linkedin.com/in/abderrahmaneelfarouah/',
      'https://github.com/abdeelfarouah'
    ],
    knowsAbout: [
      'Angular',
      'Laravel',
      'React',
      'TypeScript',
      'Développement web fullstack'
    ]
  };

  const finalStructuredData =
    structuredData ||
    pageStructuredData[
      location.pathname as keyof typeof pageStructuredData
    ] ||
    defaultStructuredData;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />

      <link rel="canonical" href={canonicalUrl} />

      <meta
        name="robots"
        content={finalNoIndex ? 'noindex' : 'index, follow'}
      />

      <meta property="og:type" content={finalType} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Abderrahmane El Farouah" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      <meta name="author" content="Abderrahmane El Farouah" />
      <meta name="language" content="fr" />

      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
    </Helmet>
  );
}
