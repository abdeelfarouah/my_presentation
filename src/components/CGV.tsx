import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from './shared/Container';
import SectionTitle from './shared/SectionTitle';
import { SOCIAL_LINKS } from '../utils/constants';

export default function CGV() {
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
    <section id="cgv" className="h-full w-full min-h-[480px] py-3 px-2 sm:py-4 md:py-6 chrome-surface bg-radial-faint max-w-[1000px] mx-auto rounded-xl ring-chrome">
      <div className="h-full animate-fade-in flex flex-col w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="w-full"
        >
          <Container>
            <SectionTitle>Conditions Générales de Vente</SectionTitle>

            <motion.div variants={itemVariants} className="glass ring-chrome rounded-xl p-4 sm:p-6 space-y-6">
              {/* Préambule */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Préambule</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre :
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <strong>Le Prestataire :</strong> Abderrahmane El Farouah, Développeur Web Freelance, micro-entrepreneur
                    </li>
                    <li>
                      <strong>Le Client :</strong> Toute personne physique ou morale souhaitant bénéficier des services de développement web
                    </li>
                  </ul>
                  <p className="mt-3">
                    Toute commande de prestation implique l'acceptation sans réserve des présentes CGV par le Client.
                  </p>
                </div>
              </div>

              {/* Statut et identification */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Statut et identification</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>Prestataire :</strong> Abderrahmane El Farouah
                  </p>
                  <p>
                    <strong>Activité :</strong> Développement Web Freelance
                  </p>
                  <p>
                    <strong>Statut :</strong> Micro-entrepreneur (auto-entrepreneur)
                  </p>
                  <p>
                    <strong>Régime fiscal :</strong> Micro-entreprise (BIC - Bénéfices Industriels et Commerciaux)
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
                  <p className="mt-2 text-xs italic">
                    <strong>Note :</strong> En tant que micro-entrepreneur, je bénéficie du régime simplifié de déclaration et de paiement des cotisations sociales et de l'impôt sur le revenu.
                  </p>
                </div>
              </div>

              {/* Services proposés */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Services proposés</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>Les services de développement web proposés incluent notamment :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Développement d'applications web (frontend et backend)</li>
                    <li>Développement de sites web responsive</li>
                    <li>Intégration de systèmes et APIs</li>
                    <li>Maintenance et évolution de sites existants</li>
                    <li>Conseil en développement web</li>
                    <li>Optimisation de performances</li>
                    <li>Développement Angular, React, Laravel, Node.js</li>
                    <li>Développement sur systèmes AS 400</li>
                  </ul>
                  <p className="mt-2">
                    Les prestations sont détaillées dans chaque devis ou bon de commande spécifique.
                  </p>
                </div>
              </div>

              {/* Devis et commande */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Devis et commande</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>3.1. Devis :</strong> Tout devis est établi gratuitement et reste valable 30 jours à compter de sa date d'émission, sauf mention contraire.
                  </p>
                  <p>
                    <strong>3.2. Commande :</strong> La commande devient ferme et définitive après acceptation écrite du devis par le Client (signature, email de confirmation, ou validation électronique).
                  </p>
                  <p>
                    <strong>3.3. Modifications :</strong> Toute modification demandée par le Client après acceptation du devis pourra faire l'objet d'un avenant tarifaire et de délai.
                  </p>
                  <p>
                    <strong>3.4. Rétractation :</strong> Conformément à l'article L. 221-18 du Code de la consommation, le Client dispose d'un délai de rétractation de 14 jours à compter de la conclusion du contrat pour les prestations de services, sauf si le service a été entièrement exécuté avec l'accord exprès du Client avant la fin du délai de rétractation.
                  </p>
                </div>
              </div>

              {/* Prix et facturation */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Prix et facturation</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>4.1. Prix :</strong> Les prix sont indiqués en euros, hors taxes (HT) pour les clients assujettis à la TVA, et toutes taxes comprises (TTC) pour les particuliers. En tant que micro-entrepreneur, je ne suis pas assujetti à la TVA (franchise en base de TVA).
                  </p>
                  <p>
                    <strong>4.2. Facturation :</strong> La facturation s'effectue selon les modalités convenues dans le devis :
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Facturation à l'achèvement de la prestation</li>
                    <li>Facturation par acomptes (30% à la commande, 70% à la livraison)</li>
                    <li>Facturation au forfait ou à la journée selon le type de prestation</li>
                  </ul>
                  <p>
                    <strong>4.3. Paiement :</strong> Le paiement s'effectue par virement bancaire, chèque, ou tout autre moyen convenu. Les factures sont payables selon les conditions indiquées (généralement 30 jours pour les professionnels, paiement immédiat pour les particuliers).
                  </p>
                  <p>
                    <strong>4.4. Retard de paiement :</strong> En cas de retard de paiement, des pénalités de retard au taux de 3 fois le taux d'intérêt légal peuvent être appliquées, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 euros (article L. 441-6 du Code de commerce).
                  </p>
                </div>
              </div>

              {/* Délais et livraison */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Délais et livraison</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>5.1. Délais :</strong> Les délais de réalisation sont indiqués dans le devis. Ils courent à compter de la réception de l'acompte ou de la confirmation de commande, et de la fourniture de tous les éléments nécessaires par le Client.
                  </p>
                  <p>
                    <strong>5.2. Retard :</strong> En cas de retard imputable au Prestataire, une pénalité de 0,05% par jour de retard peut être appliquée, dans la limite de 5% du montant HT de la prestation, sauf cas de force majeure.
                  </p>
                  <p>
                    <strong>5.3. Livraison :</strong> La livraison s'effectue par remise des fichiers sources, accès à un dépôt (GitHub, GitLab, etc.), ou mise en ligne selon les modalités convenues.
                  </p>
                  <p>
                    <strong>5.4. Réception :</strong> Le Client dispose de 8 jours à compter de la livraison pour formuler des réserves écrites. Passé ce délai, la prestation est réputée conforme.
                  </p>
                </div>
              </div>

              {/* Obligations du client */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Obligations du Client</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>Le Client s'engage à :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Fournir tous les éléments nécessaires à la réalisation de la prestation (textes, images, logos, accès, etc.)</li>
                    <li>Respecter les délais convenus pour la fourniture des éléments</li>
                    <li>Effectuer les paiements aux échéances convenues</li>
                    <li>Vérifier la conformité de la prestation dans les délais impartis</li>
                    <li>Informer le Prestataire de toute modification souhaitée en temps utile</li>
                    <li>Respecter les droits de propriété intellectuelle du Prestataire</li>
                  </ul>
                </div>
              </div>

              {/* Obligations du prestataire */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Obligations du Prestataire</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>Le Prestataire s'engage à :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Réaliser la prestation conformément au devis accepté</li>
                    <li>Respecter les délais convenus</li>
                    <li>Respecter la confidentialité des informations communiquées par le Client</li>
                    <li>Livrer une prestation conforme aux spécifications convenues</li>
                    <li>Apporter son assistance technique dans le cadre de la garantie</li>
                  </ul>
                </div>
              </div>

              {/* Propriété intellectuelle */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Propriété intellectuelle</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>8.1. Code source :</strong> Le code source développé spécifiquement pour le Client est cédé au Client après paiement intégral de la facture, sauf mention contraire dans le devis.
                  </p>
                  <p>
                    <strong>8.2. Bibliothèques et frameworks :</strong> Les bibliothèques, frameworks et outils tiers utilisés restent soumis à leurs licences respectives (open source, MIT, etc.).
                  </p>
                  <p>
                    <strong>8.3. Droits d'auteur :</strong> Le Prestataire conserve le droit d'utiliser les réalisations à des fins de démonstration dans son portfolio, sauf mention contraire expresse du Client.
                  </p>
                  <p>
                    <strong>8.4. Contenus fournis par le Client :</strong> Le Client garantit qu'il dispose de tous les droits nécessaires sur les contenus fournis (textes, images, logos, etc.).
                  </p>
                </div>
              </div>

              {/* Garantie et maintenance */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">9. Garantie et maintenance</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>9.1. Garantie de conformité :</strong> Le Prestataire garantit la conformité de la prestation aux spécifications du devis pendant une période de 3 mois à compter de la livraison, pour les défauts non apparents.
                  </p>
                  <p>
                    <strong>9.2. Corrections :</strong> Les corrections de bugs et défauts de conformité sont effectuées gratuitement pendant la période de garantie, dans la limite des fonctionnalités initialement prévues.
                  </p>
                  <p>
                    <strong>9.3. Maintenance :</strong> La maintenance évolutive, les mises à jour, et les modifications non prévues initialement font l'objet d'un devis séparé.
                  </p>
                  <p>
                    <strong>9.4. Exclusion :</strong> La garantie ne couvre pas les dommages résultant d'une utilisation non conforme, de modifications non autorisées, ou de l'utilisation de versions obsolètes de navigateurs ou systèmes.
                  </p>
                </div>
              </div>

              {/* Responsabilité */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">10. Responsabilité</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>10.1. Limitation :</strong> La responsabilité du Prestataire est limitée au montant HT de la prestation concernée. Le Prestataire ne pourra être tenu responsable des dommages indirects (perte de données, perte d'exploitation, préjudice commercial, etc.).
                  </p>
                  <p>
                    <strong>10.2. Assurance :</strong> Le Prestataire dispose d'une assurance responsabilité civile professionnelle couvrant ses activités.
                  </p>
                  <p>
                    <strong>10.3. Force majeure :</strong> Le Prestataire ne pourra être tenu responsable en cas de force majeure ou d'événements indépendants de sa volonté.
                  </p>
                </div>
              </div>

              {/* Confidentialité */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">11. Confidentialité</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Le Prestataire s'engage à respecter la confidentialité de toutes les informations communiquées par le Client dans le cadre de la prestation. Cette obligation perdure après la fin de la mission.
                  </p>
                </div>
              </div>

              {/* Résiliation */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">12. Résiliation</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>12.1. Par le Client :</strong> Le Client peut résilier la commande à tout moment, moyennant le paiement des prestations déjà réalisées et des frais engagés.
                  </p>
                  <p>
                    <strong>12.2. Par le Prestataire :</strong> Le Prestataire peut résilier en cas de non-paiement, de manquement grave du Client, ou d'impossibilité d'exécution.
                  </p>
                </div>
              </div>

              {/* Litiges et médiation */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">13. Litiges et médiation</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>13.1. Médiation :</strong> Conformément aux articles L. 611-1 et R. 612-1 et suivants du Code de la consommation, le Client a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable du litige qui l'oppose au Prestataire.
                  </p>
                  <p>
                    <strong>13.2. Juridiction compétente :</strong> En cas de litige et à défaut d'accord amiable, le litige sera porté devant le Tribunal de commerce de Versailles, conformément aux règles de compétence en vigueur.
                  </p>
                  <p>
                    <strong>13.3. Droit applicable :</strong> Les présentes CGV sont soumises au droit français.
                  </p>
                </div>
              </div>

              {/* Dispositions diverses */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">14. Dispositions diverses</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>14.1. Modification :</strong> Les présentes CGV peuvent être modifiées à tout moment. Les CGV applicables sont celles en vigueur au moment de la commande.
                  </p>
                  <p>
                    <strong>14.2. Nullité partielle :</strong> Si une clause des présentes CGV était déclarée nulle, les autres clauses conserveraient leur validité.
                  </p>
                  <p>
                    <strong>14.3. Acceptation :</strong> L'acceptation des présentes CGV se fait par la signature ou l'acceptation du devis.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">15. Contact</h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm sm:text-base">
                  <p>
                    Pour toute question concernant ces CGV, vous pouvez me contacter :
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

