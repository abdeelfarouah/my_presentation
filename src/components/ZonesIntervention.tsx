import { motion } from 'framer-motion';
import { MapPin, Building2, Home, Train } from 'lucide-react';

interface Zone {
  city: string;
  code: string;
  description: string;
  services: string[];
  distance: string;
}

const zonesIntervention: Zone[] = [
  {
    city: "Toute la France",
    code: "",
    description: "100% télétravail. Je travaille avec des clients partout en France sans contrainte géographique. Aucun déplacement nécessaire.",
    services: ["Développement Angular", "Applications métier", "Sites vitrines", "100% remote"],
    distance: "∞"
  },
  {
    city: "Mantes-la-Jolie",
    code: "78200",
    description: "Mon domicile professionnel. Je travaille à distance pour tous mes clients, sans accueil physique.",
    services: ["Télétravail", "Visioconférence", "Collaboration à distance"],
    distance: "0 km"
  },
  {
    city: "Versailles",
    code: "78000",
    description: "Clients à Versailles accompagnés en full remote. Réunions par visioconférence, livraison digitale.",
    services: ["Applications SaaS", "Dashboard métier", "API REST"],
    distance: "25 km"
  },
  {
    city: "Saint-Germain-en-Laye",
    code: "78100",
    description: "Développement web 100% à distance pour les entreprises de Saint-Germain. Aucun déplacement requis.",
    services: ["E-commerce", "Applications web", "SEO technique"],
    distance: "20 km"
  },
  {
    city: "Le Vésinet",
    code: "78110",
    description: "Freelance Angular disponible en télétravail pour les commerces et professions libérales du Vésinet.",
    services: ["Sites vitrines", "Applications métier", "Responsive design"],
    distance: "22 km"
  },
  {
    city: "Chatou",
    code: "78400",
    description: "Développeur web fullstack en remote pour les entreprises de Chatou et des bords de Seine.",
    services: ["Angular & Laravel", "Applications mobiles", "PWA"],
    distance: "18 km"
  },
  {
    city: "Rueil-Malmaison",
    code: "92500",
    description: "Développeur Angular en télétravail pour les entreprises du quartier d'affaires de Rueil-Malmaison.",
    services: ["Applications d'entreprise", "Intranet", "API GraphQL"],
    distance: "28 km"
  },
  {
    city: "Paris",
    code: "75000",
    description: "Collaboration 100% à distance avec les startups et grands comptes parisiens. Visioconférence privilégiée.",
    services: ["Consulting Angular", "Architecture technique", "Code review"],
    distance: "55 km"
  }
];

const modesCollaboration = [
  {
    icon: Home,
    title: "100% Télétravail",
    description: "Tous les projets sont réalisés à distance depuis mon poste de travail professionnel. Aucun déplacement nécessaire."
  },
  {
    icon: Building2,
    title: "Visioconférence",
    description: "Réunions régulières par Teams, Zoom ou Google Meet. Partage d'écran, démonstrations live, échanges fluides."
  },
  {
    icon: Train,
    title: "France entière",
    description: "Pas de limite géographique. Je travaille avec des clients à Paris, Lyon, Marseille, Bordeaux, ou en région."
  },
  {
    icon: MapPin,
    title: "Pas d'accueil physique",
    description: "Je n'ai pas de bureau ouvert au public. Toute la collaboration se fait numériquement, de manière sécurisée."
  }
];

export default function ZonesIntervention() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* SEO Structured Data - LocalBusiness pour chaque zone */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": zonesIntervention.map((zone, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "LocalBusiness",
              "name": `Développeur Web Angular - ${zone.city}`,
              "description": zone.description,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": zone.city,
                "postalCode": zone.code,
                "addressRegion": "Île-de-France",
                "addressCountry": "FR"
              },
              "serviceType": zone.services,
              "areaServed": zone.city
            }
          }))
        })}
      </script>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
          <MapPin size={20} className="text-accent" />
          <span className="text-sm font-medium text-accent">Zones d'intervention</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-main mb-4">
          Développeur Web Angular & solutions IA<span className="text-accent">Mantes-la-Jolie</span> & Île-de-France
        </h1>
        <h2 className="text-xl text-text-secondary font-body mb-4">
          Freelance Angular & Laravel en télétravail - Disponible à Versailles, Saint-Germain-en-Laye, Le Vésinet, Chatou
        </h2>
        <p className="text-text-secondary font-body max-w-3xl mx-auto">
          Besoin d'un <strong>développeur web & solutions IA freelance à Mantes-la-Jolie (78)</strong> ? Je travaille à distance 
          avec des entreprises de toute l'Île-de-France. 
          Aucun déplacement nécessaire - collaboration 100% remote par visioconférence. 
        </p>
      </motion.div>

      {/* Modes de collaboration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-xl font-display font-semibold text-text-main mb-6 text-center">
          Comment travaillons-nous ensemble ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modesCollaboration.map((mode, index) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-design p-6 text-center"
            >
              <mode.icon className="mx-auto mb-3 text-accent" size={32} />
              <h3 className="font-display font-semibold text-text-main mb-2">{mode.title}</h3>
              <p className="text-sm text-text-secondary font-body">{mode.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Zones d'intervention grid */}
      <div className="mb-12">
        <h2 className="text-xl font-display font-semibold text-text-main mb-6 text-center">
          Où trouver un développeur freelance Angular près de chez vous ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zonesIntervention.map((zone, index) => (
            <motion.article
              key={zone.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-design p-6 hover:shadow-glow-orange transition-shadow"
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <meta itemProp="name" content={`Développeur Web Angular ${zone.city}`} />
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-display font-semibold text-text-main" itemProp="areaServed">
                    {zone.city}
                  </h3>
                  <span className="text-sm text-accent">{zone.code}</span>
                </div>
                <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                  {zone.distance}
                </span>
              </div>
              
              <div className="text-text-secondary font-body text-sm mb-4" itemProp="description">
                <p className="mb-2">{zone.description}</p>
                <p className="text-xs text-accent/80">
                  Développeur web {zone.city} - {zone.services.slice(0, 2).join(', ')}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2" itemProp="serviceType">
                {zone.services.map((service, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-2 py-1 bg-white/5 text-text-secondary rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="hidden">
                <span itemProp="addressLocality">{zone.city}</span>
                <span itemProp="postalCode">{zone.code}</span>
                <span itemProp="addressRegion">Île-de-France</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-design p-8 text-center bg-gradient-to-r from-accent/5 to-accent/10"
      >
        <h2 className="text-xl font-display font-semibold text-text-main mb-2">
          Votre ville n'est pas dans la liste ?
        </h2>
        <p className="text-text-secondary font-body mb-4">
          Je travaille avec des clients partout en France. Le télétravail permet de collaborer 
          efficacement quelle que soit votre localisation.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-design font-medium hover:bg-accent-hover transition-colors shadow-glow-orange"
        >
          <MapPin size={20} />
          Discuter de votre projet
        </a>
      </motion.div>

      {/* SEO Local Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-design p-6">
          <h3 className="font-display font-semibold text-text-main mb-3">
            Développeur Angular Mantes-la-Jolie (78)
          </h3>
          <p className="text-sm text-text-secondary font-body mb-3">
            Basé à Mantes-la-Jolie dans les Yvelines, je propose mes services de développement web 
            aux entreprises locales : Mantes-la-Ville, Magnanville, Buchelay, Limay, Rosny-sur-Seine.
          </p>
          <ul className="text-sm text-text-secondary font-body space-y-1">
            <li>✓ Création application web Angular</li>
            <li>✓ Développement API Laravel</li>
            <li>✓ Site e-commerce responsive</li>
            <li>✓ 100% télétravail -aucun déplacement</li>
          </ul>
        </div>
        <div className="glass rounded-design p-6">
          <h3 className="font-display font-semibold text-text-main mb-3">
            Freelance Web Versailles & Ouest Parisien
          </h3>
          <p className="text-sm text-text-secondary font-body mb-3">
            Intervention en télétravail pour Versailles (78000), Saint-Germain-en-Laye (78100), 
            Le Vésinet (78110), Chatou (78400), Rueil-Malmaison (92500).
          </p>
          <ul className="text-sm text-text-secondary font-body space-y-1">
            <li>✓ Développeur Angular expérimenté</li>
            <li>✓ Applications métier sur mesure</li>
            <li>✓ Réunions visio hebdomadaires</li>
            <li>✓ Livraison digitale sécurisée</li>
          </ul>
        </div>
      </div>

      {/* SEO Footer Text */}
      <div className="mt-12 text-center text-sm text-text-secondary font-body max-w-3xl mx-auto">
        <h3 className="font-display font-semibold text-text-main mb-3">
          Cherchez-vous un développeur web freelance en Île-de-France ?
        </h3>
        <p className="mb-4">
          Je suis <strong>développeur Angular freelance basé à Mantes-la-Jolie (78)</strong> et je travaille 
          à distance avec des clients de toute l'Île-de-France : Paris, Versailles, Saint-Germain-en-Laye, 
          Le Vésinet, Chatou, Rueil-Malmaison, et au-delà. Aucun déplacement nécessaire, 
          pas de bureau physique - uniquement du télétravail professionnel avec visioconférence.
        </p>
        <p>
          <strong>Mots-clés :</strong> développeur web Mantes-la-Jolie, freelance Angular Versailles, 
          création site web Yvelines, développeur Laravel Île-de-France, télétravail développeur web France.
        </p>
      </div>
    </section>
  );
}
