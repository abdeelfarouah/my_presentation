import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Code, CheckCircle, Clock, Users, Zap, Shield, Globe, ShoppingCart, Mail } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
  delay: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 'web-app',
    title: 'Application Web Sur Mesure',
    description: 'Développement d\'applications web complètes avec Angular et Laravel, adaptées à vos besoins spécifiques.',
    icon: <Globe className="w-8 h-8" />,
    features: [
      'Architecture moderne Angular 17+',
      'API RESTful avec Laravel 11',
      'Design responsive et accessible',
      'Tests unitaires et intégration',
      'Documentation technique',
      'Support 3 mois inclus'
    ],
    price: 'À partir de 3 500€',
    delay: '4-8 semaines',
    popular: true
  },
  {
    id: 'ecommerce',
    title: 'Site E-Commerce',
    description: 'Boutique en ligne complète avec panier, paiement et gestion des produits.',
    icon: <ShoppingCart className="w-8 h-8" />,
    features: [
      'Catalogue produits illimité',
      'Panier et checkout',
      'Intégration Stripe/PayPal',
      'Panel admin',
      'Gestion des stocks',
      'Optimisation SEO',
      'Support 6 mois'
    ],
    price: 'À partir de 2 800€',
    delay: '3-6 semaines'
  },
  {
    id: 'saas',
    title: 'Plateforme SaaS',
    description: 'Solution Software as a Service avec abonnements, multi-utilisateurs et tableau de bord.',
    icon: <Users className="w-8 h-8" />,
    features: [
      'Architecture multi-tenants',
      'Système d\'abonnements',
      'Tableaux de bord analytics',
      'API pour intégrations',
      'Sécurité avancée',
      'Mises à jour automatiques',
      'Support prioritaire 24/7'
    ],
    price: 'À partir de 8 000€',
    delay: '8-16 semaines'
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Évolution',
    description: 'Suivi technique, mises à jour et évolutions de vos applications existantes.',
    icon: <Shield className="w-8 h-8" />,
    features: [
      'Veille sécurité',
      'Mises à jour régulières',
      'Sauvegardes automatisées',
      'Monitoring performance',
      'Support technique',
      'Rapports mensuels',
      'Interventions prioritaires'
    ],
    price: 'À partir de 350€/mois',
    delay: 'Continu'
  },
  {
    id: 'consulting',
    title: 'Consulting Technique',
    description: 'Expertise technique pour vos projets, audit de code et accompagnement équipe.',
    icon: <Code className="w-8 h-8" />,
    features: [
      'Audit de architecture',
      'Revue de code',
      'Formation équipe',
      'Bonnes pratiques',
      'Plan de migration',
      'Documentation',
      'Suivi projet'
    ],
    price: '450€/jour',
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
              Mes <span className="text-accent">Services</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Développeur spécialisé Angular et Laravel, je propose des solutions web complètes et adaptées à vos besoins.
              Chaque projet est unique et bénéficie d'un accompagnement personnalisé.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`relative card p-6 hover:shadow-xl transition-all duration-300 ${
                  service.popular ? 'ring-2 ring-accent/20 border-accent/30' : 'border-border-color'
                }`}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                {service.popular && (
                  <div className="absolute -top-3 -right-3 bg-accent text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Populaire
                  </div>
                )}
                
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center text-accent mr-4">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-main">{service.title}</h3>
                    <p className="text-sm text-text-secondary">{service.delay}</p>
                  </div>
                </div>

                <p className="text-text-secondary mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-accent mb-2">{service.price}</div>
                </div>

                {selectedService === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-border-color pt-4 mt-4"
                  >
                    <h4 className="font-semibold text-text-main mb-3">Ce qui est inclus :</h4>
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

                <button className="w-full btn mt-4">
                  {selectedService === service.id ? 'Masquer les détails' : 'Voir les détails'}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-text-main mb-12">
              Mon <span className="text-accent">Processus</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: <Clock className="w-6 h-6" />, title: 'Analyse', desc: 'Écoute de vos besoins et définition des objectifs' },
                { icon: <Code className="w-6 h-6" />, title: 'Développement', desc: 'Codage agile avec livraisons régulières' },
                { icon: <Zap className="w-6 h-6" />, title: 'Tests', desc: 'Validation qualité et tests utilisateur' },
                { icon: <CheckCircle className="w-6 h-6" />, title: 'Livraison', desc: 'Mise en production et formation' }
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
              Prêt à <span className="text-accent">démarrer</span> votre projet ?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Contactez-moi pour discuter de vos besoins et obtenir un devis personnalisé. 
              Chaque projet commence par un échange gratuit pour définir parfaitement vos attentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="btn px-8 py-3 text-lg"
              >
                Demander un devis
              </a>
              <a 
                href="mailto:contact@abderrahmane-elfarouahfreelance.com" 
                className="btn btn-secondary px-8 py-3 text-lg"
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
