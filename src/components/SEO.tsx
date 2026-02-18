import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { pageStructuredData } from '../utils/structuredData';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  keywords?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const baseUrl = 'https://www.abderrahmane-elfarouahfreelance.com';

const defaultSEO = {
  title: 'Portfolio | Abderrahmane El Farouah – Développeur Fullstack',
  description: 'Portfolio d\'Abderrahmane El Farouah, développeur fullstack spécialisé dans la création d\'applications web modernes avec Angular, React, Node.js et PHP.',
  image: `${baseUrl}/og-image.png`,
  type: 'website',
  keywords: 'développeur web, fullstack, angular, react, node.js, php, typescript, portfolio, freelance, abderrahmane el farouah',
};

interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  noIndex?: boolean;
}

const pageSEO: Record<string, PageSEO> = {
  '/': {
    title: 'Portfolio | Abderrahmane El Farouah – Développeur Fullstack',
    description: 'Portfolio d\'Abderrahmane El Farouah, développeur fullstack spécialisé dans la création d\'applications web modernes et performantes.',
    keywords: 'portfolio, développeur fullstack, angular, react, node.js, php, typescript, web applications',
  },
  '/about': {
    title: 'À propos | Abderrahmane El Farouah – Développeur Fullstack',
    description: 'Découvrez le parcours d\'Abderrahmane El Farouah, développeur fullstack passionné par les technologies web modernes et les solutions innovantes.',
    keywords: 'à propos, parcours, biographie, développeur web, compétences, expérience',
  },
  '/projects': {
    title: 'Projets | Abderrahmane El Farouah – Développeur Fullstack',
    description: 'Explorez les projets réalisés par Abderrahmane El Farouah : applications web, sites e-commerce, plateformes SaaS et solutions sur mesure.',
    keywords: 'projets, réalisations, applications web, e-commerce, saas, développement, portfolio',
  },
  '/experience': {
    title: 'Parcours professionnel | Abderrahmane El Farouah – Développeur Fullstack',
    description: 'Parcours professionnel d\'Abderrahmane El Farouah : expériences en développement web, missions freelance et réalisations significatives.',
    keywords: 'expérience, parcours professionnel, cv, carrière, freelance, missions, développement web',
  },
  '/services': {
    title: 'Services | Abderrahmane El Farouah – Développeur Angular Laravel',
    description: 'Services de développement web proposés par Abderrahmane El Farouah : applications Angular, sites e-commerce, plateformes SaaS et maintenance. Tarifs compétitifs et accompagnement personnalisé.',
    keywords: 'services, développement web, angular, laravel, tarifs, prestations, freelance, applications sur mesure, e-commerce, saas',
  },
  '/contact': {
    title: 'Contact | Abderrahmane El Farouah – Développeur Fullstack',
    description: 'Contactez Abderrahmane El Farouah, développeur fullstack, pour vos projets de développement web applications sur mesure. Formulaire de contact direct et prise de rendez-vous.',
    keywords: 'contact, devis, projet, développement web, freelance, collaboration, rendez-vous, formulaire',
  },
  '/mentions-legales': {
    title: 'Mentions légales | Portfolio Abderrahmane El Farouah',
    description: 'Mentions légales du site portfolio d\'Abderrahmane El Farouah, développeur web fullstack.',
    keywords: 'mentions légales, juridique, confidentialité, rgpd, portfolio',
    noIndex: true,
  },
  '/cgv': {
    title: 'CGV | Conditions générales de vente | Abderrahmane El Farouah',
    description: 'Conditions générales de vente pour les services de développement web proposés par Abderrahmane El Farouah, développeur freelance.',
    keywords: 'cgv, conditions générales, vente, services, développement web, freelance',
    noIndex: true,
  },
};

export default function SEO({ 
  title, 
  description, 
  image, 
  type, 
  keywords, 
  noIndex = false,
  structuredData 
}: SEOProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Get page-specific SEO or use defaults
  const pageSpecificSEO = pageSEO[currentPath as keyof typeof pageSEO] || {};
  
  // Merge props with page-specific and default SEO
  const finalTitle = title || pageSpecificSEO.title || defaultSEO.title;
  const finalDescription = description || pageSpecificSEO.description || defaultSEO.description;
  const finalImage = image || defaultSEO.image;
  const finalType = type || defaultSEO.type;
  const finalKeywords = keywords || pageSpecificSEO.keywords || defaultSEO.keywords;
  const finalNoIndex = noIndex || pageSpecificSEO.noIndex || false;
  
  const canonicalUrl = `${baseUrl}${currentPath}`;
  
  // Default structured data
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abderrahmane El Farouah',
    url: baseUrl,
    jobTitle: 'Développeur Web Fullstack',
    description: finalDescription,
    sameAs: [
      'https://www.linkedin.com/in/abderrahmaneelfarouah/',
      'https://github.com/abdeelfarouah',
      'https://share.google/0UJJ5edbJf4IkW99S'
    ],
    knowsAbout: [
      'Angular',
      'React',
      'Node.js',
      'PHP',
      'TypeScript',
      'Développement web fullstack',
      'Applications web performantes'
    ]
  };

  const finalStructuredData = structuredData || pageStructuredData[currentPath as keyof typeof pageStructuredData] || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content={finalNoIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Open Graph */}
      <meta property="og:type" content={finalType} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Portfolio Abderrahmane El Farouah" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@abdeelfarouah" />
      <meta name="twitter:creator" content="@abdeelfarouah" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Additional SEO */}
      <meta name="author" content="Abderrahmane El Farouah" />
      <meta name="language" content="fr" />
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="France" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href={baseUrl} />
    </Helmet>
  );
}
