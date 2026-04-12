import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from './shared/Container';
import { SOCIAL_LINKS } from '../utils/constants';

export default function MentionsLegales() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="mentions-legales"
      className="h-full w-full min-h-[480px] py-3 px-2 sm:py-4 md:py-6 chrome-surface bg-radial-faint max-w-[1000px] mx-auto rounded-xl ring-chrome"
    >
      <div className="h-full animate-fade-in flex flex-col w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="w-full"
        >
          <Container>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-center text-text-main mb-6">
              Mentions Légales
            </h1>

            <motion.div
              variants={itemVariants}
              className="glass ring-chrome rounded-xl p-4 sm:p-6 space-y-6"
            >
              {/* Éditeur du site */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  1. Éditeur du site
                </h2>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>Nom :</strong> Abderrahmane El Farouah
                  </p>

                  <p>
                    <strong>Activité :</strong> Développeur Web Freelance
                  </p>

                  <p>
                    <strong>Numéro SIREN :</strong> 990 550 212
                  </p>

                  <p>
                    30 rue du commandant Bouchet<br />
                    78200 Mantes-la-Jolie
                  </p>

                  <p>
                    <strong>Email :</strong>{' '}
                    <a
                      href={`mailto:${SOCIAL_LINKS.EMAIL}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {SOCIAL_LINKS.EMAIL}
                    </a>
                  </p>

                  <p>
                    <strong>Site web :</strong>{' '}
                    <a
                      href="https://www.abderrahmane-elfarouahfreelance.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      www.abderrahmane-elfarouahfreelance.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Hébergement */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  2. Hébergement
                </h2>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>Hébergeur :</strong> Vercel Inc.
                  </p>

                  <p>
                    <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
                  </p>

                  <p>
                    <strong>Site web :</strong>{' '}
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      https://vercel.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Propriété intellectuelle */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  3. Propriété intellectuelle
                </h2>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                  </p>

                  <p>
                    Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite, sauf autorisation écrite préalable.
                  </p>

                  <p>
                    Les marques, logos et contenus sont protégés par le Code de la propriété intellectuelle.
                  </p>
                </div>
              </div>

              {/* Données personnelles */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  4. Protection des données personnelles
                </h2>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Conformément à la loi « Informatique et Libertés » et au RGPD (Règlement UE 2016/679), vous disposez de droits d'accès, de rectification, de suppression et d'opposition.
                  </p>

                  <p>
                    Les données collectées sont utilisées uniquement pour répondre aux demandes de contact.
                  </p>

                  <p>
                    Pour exercer vos droits :
                    <a
                      href={`mailto:${SOCIAL_LINKS.EMAIL}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                    >
                      {SOCIAL_LINKS.EMAIL}
                    </a>
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  5. Cookies
                </h2>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Ce site peut utiliser des cookies pour améliorer l'expérience utilisateur et mesurer l’audience.
                  </p>

                  <p>
                    Vous pouvez configurer votre navigateur pour refuser les cookies.
                  </p>
                </div>
              </div>

              {/* Responsabilité */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  6. Responsabilité
                </h2>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Les informations du site sont fournies à titre indicatif et peuvent contenir des inexactitudes.
                  </p>

                  <p>
                    L'éditeur ne peut être tenu responsable des dommages directs ou indirects liés à l'utilisation du site.
                  </p>
                </div>
              </div>

              {/* Liens */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  7. Liens hypertextes
                </h2>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Le site peut contenir des liens vers des sites externes. L'éditeur n'est pas responsable de leur contenu.
                  </p>

                  <p>
                    Les liens vers ce site sont autorisés sans demande préalable.
                  </p>
                </div>
              </div>

              {/* Droit applicable */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  8. Droit applicable
                </h2>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Le présent site est soumis au droit français.
                  </p>

                  <p>
                    En cas de litige, compétence est attribuée aux tribunaux français.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  9. Contact
                </h2>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <strong>Email :</strong>{' '}
                      <a
                        href={`mailto:${SOCIAL_LINKS.EMAIL}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {SOCIAL_LINKS.EMAIL}
                      </a>
                    </li>

                    <li>
                      <strong>LinkedIn :</strong>{' '}
                      <a
                        href={SOCIAL_LINKS.LINKEDIN}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {SOCIAL_LINKS.LINKEDIN}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Date */}
              <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic">
                  Dernière mise à jour :{' '}
                  {new Date().toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </motion.div>
          </Container>
        </motion.div>
      </div>
    </section>
  );
              }
