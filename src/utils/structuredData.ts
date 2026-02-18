interface StructuredDataProps {
  type: 'Person' | 'WebPage' | 'Article' | 'Project' | 'Service';
  data: Record<string, any>;
}

export function generateStructuredData({ type, data }: StructuredDataProps) {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  const structures = {
    Person: {
      ...baseStructure,
      name: 'Abderrahmane El Farouah',
      url: 'https://www.abderrahmane-elfarouahfreelance.com',
      jobTitle: 'Développeur Web Fullstack',
      description: data.description || 'Développeur web fullstack spécialisé dans la création d\'applications web modernes.',
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
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'FR',
        addressRegion: 'France'
      },
      geo: {
        '@type': 'GeoCoordinates',
        addressCountry: 'FR'
      },
      ...data
    },
    WebPage: {
      ...baseStructure,
      name: data.title,
      description: data.description,
      url: data.url,
      inLanguage: 'fr',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Portfolio Abderrahmane El Farouah',
        url: 'https://www.abderrahmane-elfarouahfreelance.com'
      },
      about: {
        '@type': 'Person',
        name: 'Abderrahmane El Farouah'
      },
      ...data
    },
    Article: {
      ...baseStructure,
      headline: data.title,
      description: data.description,
      author: {
        '@type': 'Person',
        name: 'Abderrahmane El Farouah'
      },
      publisher: {
        '@type': 'Person',
        name: 'Abderrahmane El Farouah'
      },
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      mainEntityOfPage: data.url,
      ...data
    },
    Project: {
      ...baseStructure,
      name: data.name,
      description: data.description,
      url: data.url,
      author: {
        '@type': 'Person',
        name: 'Abderrahmane El Farouah'
      },
      keywords: data.technologies?.join(', '),
      programmingLanguage: data.technologies,
      applicationCategory: 'WebApplication',
      ...data
    },
    Service: {
      ...baseStructure,
      name: data.name,
      description: data.description,
      provider: {
        '@type': 'Person',
        name: 'Abderrahmane El Farouah'
      },
      serviceType: 'Développement web',
      areaServed: 'France',
      ...data
    }
  };

  return structures[type] || baseStructure;
}

export const pageStructuredData = {
  '/': generateStructuredData({
    type: 'WebPage',
    data: {
      title: 'Portfolio | Abderrahmane El Farouah – Développeur Fullstack',
      description: 'Portfolio d\'Abderrahmane El Farouah, développeur fullstack spécialisé dans la création d\'applications web modernes et performantes.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/'
    }
  }),
  '/about': generateStructuredData({
    type: 'WebPage',
    data: {
      title: 'À propos | Abderrahmane El Farouah – Développeur Fullstack',
      description: 'Découvrez le parcours d\'Abderrahmane El Farouah, développeur fullstack passionné par les technologies web modernes et les solutions innovantes.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/about'
    }
  }),
  '/projects': generateStructuredData({
    type: 'WebPage',
    data: {
      title: 'Projets | Abderrahmane El Farouah – Développeur Fullstack',
      description: 'Explorez les projets réalisés par Abderrahmane El Farouah : applications web, sites e-commerce, plateformes SaaS et solutions sur mesure.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/projects'
    }
  }),
  '/skills': generateStructuredData({
    type: 'WebPage',
    data: {
      title: 'Compétences | Abderrahmane El Farouah – Développeur Fullstack',
      description: 'Compétences techniques d\'Abderrahmane El Farouah : Angular, React, Node.js, PHP, TypeScript, et les meilleures pratiques du développement web.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/skills'
    }
  }),
  '/experience': generateStructuredData({
    type: 'WebPage',
    data: {
      title: 'Parcours professionnel | Abderrahmane El Farouah – Développeur Fullstack',
      description: 'Parcours professionnel d\'Abderrahmane El Farouah : expériences en développement web et missions freelance.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/experience'
    }
  }),
  '/services': generateStructuredData({
    type: 'WebPage',
    data: {
      title: 'Services | Abderrahmane El Farouah – Développeur Angular Laravel',
      description: 'Services de développement web proposés par Abderrahmane El Farouah : applications Angular, sites e-commerce, plateformes SaaS et maintenance. Tarifs compétitifs et accompagnement personnalisé.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/services'
    }
  }),
  '/contact': generateStructuredData({
    type: 'WebPage',
    data: {
      title: 'Contact | Abderrahmane El Farouah – Développeur Fullstack',
      description: 'Contactez Abderrahmane El Farouah, développeur fullstack, pour vos projets de développement web applications sur mesure. Formulaire de contact direct et prise de rendez-vous.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/contact'
    }
  }),
  '/mentions-legales': generateStructuredData({
    type: 'WebPage',
    data: {
      title: 'Mentions légales | Portfolio Abderrahmane El Farouah',
      description: 'Mentions légales du site portfolio d\'Abderrahmane El Farouah, développeur web fullstack.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/mentions-legales'
    }
  }),
  '/cgv': generateStructuredData({
    type: 'WebPage',
    data: {
      title: 'CGV | Conditions générales de vente | Abderrahmane El Farouah',
      description: 'Conditions générales de vente pour les services de développement web proposés par Abderrahmane El Farouah, développeur freelance.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/cgv'
    }
  })
};

// Services spécifiques pour le référencement
export const servicesStructuredData = {
  webApp: generateStructuredData({
    type: 'Service',
    data: {
      name: 'Application Web Sur Mesure',
      description: 'Développement d\'applications web complètes avec Angular et Laravel, adaptées à vos besoins spécifiques. Architecture moderne, design responsive et tests inclus.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/services#web-app',
      priceRange: '3500-6000€',
      serviceType: 'Développement web sur mesure'
    }
  }),
  ecommerce: generateStructuredData({
    type: 'Service',
    data: {
      name: 'Site E-Commerce',
      description: 'Boutique en ligne complète avec panier, paiement et gestion des produits. Intégration Stripe/PayPal et panel admin.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/services#ecommerce',
      priceRange: '2800-4500€',
      serviceType: 'Développement e-commerce'
    }
  }),
  saas: generateStructuredData({
    type: 'Service',
    data: {
      name: 'Plateforme SaaS',
      description: 'Solution Software as a Service avec abonnements, multi-utilisateurs et tableau de bord. Architecture multi-tenants et sécurité avancée.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/services#saas',
      priceRange: '8000-15000€',
      serviceType: 'Développement plateforme SaaS'
    }
  }),
  maintenance: generateStructuredData({
    type: 'Service',
    data: {
      name: 'Maintenance & Évolution',
      description: 'Suivi technique, mises à jour et évolutions de vos applications existantes. Support 24/7 et sauvegardes automatisées.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/services#maintenance',
      priceRange: '500-2000€/mois',
      serviceType: 'Maintenance applicative'
    }
  }),
  consulting: generateStructuredData({
    type: 'Service',
    data: {
      name: 'Consulting Technique',
      description: 'Expertise technique pour vos projets, audit de code et accompagnement équipe. Audit d\'architecture et formation inclus.',
      url: 'https://www.abderrahmane-elfarouahfreelance.com/services#consulting',
      priceRange: '800€/jour',
      serviceType: 'Conseil en développement web'
    }
  })
};
