import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from './shared/Container';
import SectionTitle from './shared/SectionTitle';
import { SOCIAL_LINKS } from '../utils/constants';

export default function MentionsLegales() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="mentions-legales" className="h-full w-full min-h-[480px] py-3 px-2 sm:py-4 md:py-6 chrome-surface bg-radial-faint max-w-[1000px] mx-auto rounded-xl ring-chrome">
      <div className="h-full animate-fade-in flex flex-col w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="w-full"
        >
          <Container>
            <SectionTitle>Mentions Légales</SectionTitle>

            <motion.div variants={itemVariants} className="glass ring-chrome rounded-xl p-4 sm:p-6 space-y-6">
              {/* Éditeur du site */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Éditeur du site</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>Nom :</strong> Abderrahmane El Farouah
                  </p>
                  <p>
                    <strong>Activité :</strong> Développeur Web Freelance
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Hébergement</h3>
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Propriété intellectuelle</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                  </p>
                  <p>
                    La reproduction de tout ou partie de ce site sur un support électronique ou autre est formellement interdite sauf autorisation expresse de l'éditeur.
                  </p>
                  <p>
                    Les marques, logos, signes et tout autre contenu du site font l'objet d'une protection par le Code de la propriété intellectuelle et plus précisément par le droit d'auteur.
                  </p>
                </div>
              </div>

              {/* Protection des données personnelles */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Protection des données personnelles</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD) du 27 avril 2016, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                  </p>
                  <p>
                    Les données personnelles collectées sur ce site sont utilisées uniquement pour répondre à vos demandes de contact et de rendez-vous. Elles ne sont en aucun cas transmises à des tiers à des fins commerciales.
                  </p>
                  <p>
                    Pour exercer vos droits, vous pouvez me contacter à l'adresse suivante :{' '}
                    <a
                      href={`mailto:${SOCIAL_LINKS.EMAIL}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {SOCIAL_LINKS.EMAIL}
                    </a>
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Cookies</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies.
                  </p>
                  <p>
                    Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
                  </p>
                </div>
              </div>

              {/* Responsabilité */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Responsabilité</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
                  </p>
                  <p>
                    L'éditeur ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications, soit de l'apparition d'un bug ou d'une incompatibilité.
                  </p>
                  <p>
                    L'éditeur ne pourra également être tenu responsable des dommages indirects consécutifs à l'utilisation du site.
                  </p>
                </div>
              </div>

              {/* Liens hypertextes */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Liens hypertextes</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Ce site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site.
                  </p>
                  <p>
                    Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l'éditeur. Aucune autorisation ni demande d'information préalable ne peut être exigée par l'éditeur à l'égard d'un site qui souhaite établir un lien vers le site de l'éditeur.
                  </p>
                </div>
              </div>

              {/* Droit applicable */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Droit applicable</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Tout litige en relation avec l'utilisation du site{' '}
                    <a
                      href="https://www.abderrahmane-elfarouahfreelance.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      www.abderrahmane-elfarouahfreelance.com
                    </a>{' '}
                    est soumis au droit français.
                  </p>
                  <p>
                    En cas de litige et à défaut d'accord amiable, le litige sera porté devant le Tribunal de commerce de Versailles, conformément aux règles de compétence en vigueur.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">9. Contact</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Pour toute question concernant ces mentions légales, vous pouvez me contacter :
                  </p>
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

              {/* Date de mise à jour */}
              <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic">
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </motion.div>
          </Container>
        </motion.div>
      </div>
    </section>
  );
}

