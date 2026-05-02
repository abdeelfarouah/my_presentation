import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Code, CheckCircle, Clock, Users, Zap, Shield, Globe, ShoppingCart, Mail, Rocket, ArrowRight } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 }
};

interface Service {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
  delay: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 'site-vitrine',
    title: 'Site Vitrine',
    description: 'Site web professionnel pour présenter votre activité : pages d\'accueil, services, présentation, contact. Design moderne, responsive et optimisé SEO. Parfait pour commerçants, artisans et professions libérales.',
    problem: 'Vous n\'avez pas de présence en ligne et les clients ne peuvent pas vous trouver facilement',
    solution: 'Une vitrine digitale professionnelle qui attire et convertit les visiteurs',
    icon: <Rocket className="w-8 h-8" />,
    features: [
      'Design moderne et responsive',
      'Pages : Accueil, Services, Présentation, Contact',
      'Formulaire de contact fonctionnel',
      'Optimisé pour Google et mobile',
      'Hébergement inclus 1 an',
      'Formation à l\'administration',
      'Support 3 mois'
    ],
    price: '300 à 400€',
    delay: '3 à 5 jours'
  },
  {
    id: 'web-app',
    title: 'Logiciel Métier sur Mesure',
    description: 'Application web personnalisée pour votre activité : gestion de clients, devis, factures, planning, stock ou tout autre besoin spécifique. Solution clé en main adaptée aux commerçants, artisans et professions libérales.',
    problem: 'Vous perdez du temps avec des tableurs Excel, des papiers et des tâches répétitives',
    solution: 'Un outil unique qui centralise tout et automatise vos tâches chronophages',
    icon: <Globe className="w-8 h-8" />,
    features: [
      'Solution 100% adaptée à votre métier',
      'Accessible de n\'importe où (ordinateur, tablette, mobile)',
      'Données sécurisées et sauvegardées',
      'Formation et accompagnement inclus',
      'Évolution possible selon vos besoins',
      'Support 3 mois inclus'
    ],
    price: 'Sur devis',
    delay: '2 à 8 semaines',
    popular: true
  },
  {
    id: 'ecommerce',
    title: 'Boutique en Ligne',
    description: 'Création de votre boutique en ligne professionnelle pour vendre vos produits ou services 24h/24. Paiement sécurisé par carte bancaire, gestion des commandes et des stocks simplifiée. Idéal pour commerçants, artisans et créateurs.',
    problem: 'Vous manquez de visibilité et vos clients ne peuvent pas acheter en dehors de vos horaires',
    solution: 'Une vitrine en ligne qui vend pour vous, même quand vous dormez',
    icon: <ShoppingCart className="w-8 h-8" />,
    features: [
      'Catalogue produits illimité avec photos',
      'Paiement sécurisé par carte bancaire',
      'Gestion simple des commandes et stocks',
      'Relances clients automatiques',
      'Visible sur Google et optimisé SEO',
      'Formation à l\'administration',
      'Support 6 mois'
    ],
    price: 'Sur devis',
    delay: '2 à 4 semaines'
  },
  {
    id: 'saas',
    title: 'Plateforme pour Pros',
    description: 'Solution multi-utilisateurs pour structures plus importantes : plusieurs collaborateurs, niveaux d\'accès différenciés, abonnements clients, statistiques de suivi. Parfait pour les entreprises en croissance.',
    problem: 'Votre activité grandit et vos outils actuels ne suivent plus',
    solution: 'Une plateforme complète qui évolue avec vous et structure votre organisation',
    icon: <Users className="w-8 h-8" />,
    features: [
      'Accès pour tous vos collaborateurs',
      'Droits différenciés selon les rôles',
      'Tableaux de bord et statistiques',
      'Facturation récurrente automatique',
      'Connexion avec vos outils existants',
      'Mises à jour comprises',
      'Support prioritaire'
    ],
    price: 'Sur devis',
    delay: 'Selon projet'
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Assistance',
    description: 'Je garde votre site ou application en parfait état de marche : mises à jour, sécurité, sauvegardes et corrections. Vous concentrez-vous sur votre métier, je m\'occupe de la technique. Service disponible pour tous les professionnels.',
    problem: 'Vous ne savez pas comment maintenir votre outil à jour et sécurisé',
    solution: 'Tranquillité d\'esprit avec une surveillance proactive et des interventions rapides',
    icon: <Shield className="w-8 h-8" />,
    features: [
      'Surveillance quotidienne de votre outil',
      'Sauvegardes automatiques régulières',
      'Mises à jour de sécurité incluses',
      'Intervention rapide en cas de problème',
      'Conseils personnalisés d\'optimisation',
      'Rapports mensuels de suivi',
      'Disponible 7j/7 en urgence'
    ],
    price: 'À partir de 150€/mois',
    delay: 'Contrat annuel'
  },
  {
    id: 'consulting',
    title: 'Conseil & Accompagnement',
    description: 'Audit de vos outils actuels, conseils sur les solutions adaptées à votre activité, accompagnement au choix de logiciels. Un regard extérieur professionnel pour vous aider à prendre les bonnes décisions digitales.',
    problem: 'Vous ne savez pas par où commencer ni quels outils choisir',
    solution: 'Un regard extérieur professionnel pour vous guider vers les bonnes solutions',
    icon: <Code className="w-8 h-8" />,
    features: [
      'Audit complet de votre système actuel',
      'Recommandations personnalisées sans jargon',
      'Comparatif des solutions du marché',
      'Accompagnement au changement',
      'Formation de vos équipes',
      'Plan de transformation digitale',
      'Suivi post-projet'
    ],
    price: 'Sur devis',
    delay: 'Selon disponibilité'
  }
];

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="services" className="min-h-screen py-8 px-4 sm:py-12 md:py-16 max-w-[1200px] mx-auto">
      <div className="h-full animate-fade-in flex flex-col w-full">
        <motion.div 
          ref={ref} 
          initial="hidden" 
          animate={inView ? 'visible' : 'hidden'} 
          className="w-full"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
              Des Solutions qui <span className="text-accent">Impactent</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Chaque projet vise un objectif concret : réduire vos coûts, accélérer vos processus,
              sécuriser vos données et améliorer votre compétitivité.
            </p>
          </div>

          {/* Services Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="card-bento h-full cursor-pointer group">
                  
                  <div className="flex items-center mb-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-primary/10 rounded-xl flex items-center justify-center text-accent mr-4 shadow-glow group-hover:shadow-glow-animated transition-all duration-500">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-main group-hover:text-accent transition-colors">{service.title}</h3>
                      <p className="text-sm text-text-secondary">{service.delay}</p>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-5 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-5">
                    {/* Infobulle Problème */}
                    <div className="relative group cursor-pointer">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-800 p-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                            <span className="text-red-500 text-sm font-bold">❌</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">Problème</div>
                            <p className="text-sm text-text-main leading-relaxed">{service.problem}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Infobulle Solution */}
                    <div className="relative group cursor-pointer">
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative bg-white dark:bg-gray-900 rounded-xl border border-green-200 dark:border-green-800 p-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <span className="text-green-500 text-sm font-bold">✅</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-green-600 dark:text-green-400 mb-1">Solution</div>
                            <p className="text-sm text-text-main leading-relaxed">{service.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xl font-bold text-gradient">{service.price}</div>
                    <div className="text-sm text-text-secondary bg-bg-secondary/50 px-3 py-1 rounded-full">{service.delay}</div>
                  </div>

                  {selectedService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border-color/50 pt-4 mt-4"
                    >
                      <h4 className="font-semibold text-text-main mb-3 text-sm">Ce qui est inclus :</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-text-secondary">
                            <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  <button className="w-full btn btn-secondary mt-4 text-sm">
                    {selectedService === service.id ? 'Masquer les détails' : 'Voir les détails'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-text-main mb-12">
              Mon <span className="text-accent">Approche</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: <Clock className="w-6 h-6" />, title: 'Écoute', desc: 'Compréhension de vos enjeux business et de vos objectifs' },
                { icon: <Code className="w-6 h-6" />, title: 'Conception', desc: 'Architecture technique alignée avec vos besoins' },
                { icon: <Zap className="w-6 h-6" />, title: 'Développement', desc: 'Réalisation agile avec livraisons régulières' },
                { icon: <CheckCircle className="w-6 h-6" />, title: 'Accompagnement', desc: 'Mise en production et support continu' }
              ].map((step, stepIndex) => (
                <motion.div
                  key={stepIndex}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-text-main mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-main mb-4">
              Prêt à <span className="text-accent">améliorer</span> vos performances ?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Discutons de vos objectifs business et identifions ensemble les leviers digitaux pour 
              augmenter votre productivité et réduire vos coûts. Premier échange gratuit et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="btn btn-primary px-10 py-5 text-lg font-bold group shadow-glow-animated"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Rocket className="w-6 h-6 mr-2" />
                Démarrer mon projet
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
              </motion.a>
              <a
                href="mailto:abde.elfarouah@gmail.com"
                className="btn btn-secondary px-8 py-4 text-base font-medium"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email direct
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
