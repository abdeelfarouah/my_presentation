import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

const faqData: FAQItem[] = [
  {
    question: "Quel est le tarif d'un développeur Angular freelance ?",
    answer: "Mes tarifs varient selon la complexité du projet. En tant que développeur Angular freelance basé à Mantes-la-Jolie, je propose des taux compétitifs : 400€ à 600€/jour pour du développement front-end Angular, et 500€ à 700€/jour pour des missions fullstack Angular/Laravel. Chaque devis est personnalisé selon vos besoins spécifiques.",
    keywords: ["tarif développeur angular", "prix freelance angular", "coût développement web"]
  },
  {
    question: "Combien de temps faut-il pour créer une application web ?",
    answer: "Le délai de création d'une application web dépend de sa complexité. Un site vitrine professionnel prend 2 à 3 semaines, une application métier Angular/Laravel nécessite 1 à 3 mois, et une plateforme SaaS complète peut demander 3 à 6 mois. Je travaille en méthodologie agile avec des livraisons régulières pour vous permettre de suivre l'avancement.",
    keywords: ["délai création application web", "temps développement angular", "durée projet web"]
  },
  {
    question: "Pourquoi choisir Angular pour votre application web ?",
    answer: "Angular est le framework idéal pour les applications métier et les plateformes SaaS. Développé par Google, il offre une architecture robuste, une performance optimale, et une maintenance simplifiée. En tant que développeur Angular spécialisé, je crée des applications évolutives, sécurisées et parfaitement adaptées aux besoins des entreprises en Île-de-France.",
    keywords: ["avantages angular", "pourquoi angular", "framework angular entreprise"]
  },
  {
    question: "Intervenez-vous uniquement à Mantes-la-Jolie ou dans toute l'Île-de-France ?",
    answer: "Je suis basé à Mantes-la-Jolie dans les Yvelines (78) et interviens dans toute l'Île-de-France : Paris, Versailles, Saint-Germain-en-Laye, Le Vésinet, Chatou, Rueil-Malmaison, et les départements voisins. Je peux aussi travailler à distance pour des clients partout en France avec des réunions vidéo régulières.",
    keywords: ["développeur web Mantes-la-Jolie", "freelance angular Île-de-France", "développeur Yvelines"]
  },
  {
    question: "Quelle est la différence entre Angular et React ?",
    answer: "Angular et React sont deux excellents frameworks, mais adaptés à des usages différents. Angular est plus structuré, idéal pour les applications métier complexes avec de nombreuses fonctionnalités. React est plus léger et flexible. Pour les projets d'entreprise nécessitant maintenabilité et évolutivité, je recommande Angular. Pour des interfaces simples et rapides, React peut suffire.",
    keywords: ["angular vs react", "comparaison framework", "choisir angular react"]
  },
  {
    question: "Proposez-vous la maintenance après livraison du projet ?",
    answer: "Oui, j'offre des contrats de maintenance et d'évolution pour tous les projets livrés. Cela inclut les correctifs de bugs, les mises à jour de sécurité Angular et Laravel, l'optimisation des performances, et l'ajout de nouvelles fonctionnalités. La maintenance préventive assure la pérennité de votre application web.",
    keywords: ["maintenance application angular", "support développeur freelance", "évolution site web"]
  },
  {
    question: "Comment se déroule un projet avec un développeur freelance ?",
    answer: "Mon processus de développement suit 5 étapes : 1) Analyse de vos besoins et définition du cahier des charges, 2) Conception technique et maquettage, 3) Développement itératif avec livraisons régulières, 4) Tests qualité et recette, 5) Mise en production et formation. Vous êtes impliqué à chaque étape via un suivi transparent.",
    keywords: ["processus développement web", "étapes projet angular", "méthodologie agile freelance"]
  },
  {
    question: "Laravel ou Node.js : quel backend choisir avec Angular ?",
    answer: "Le choix dépend de vos besoins. Laravel (PHP) est excellent pour les applications métier avec gestion complexe de données, authentification avancée, et admin panels. Node.js brille pour les applications temps réel (chat, notifications) et les microservices. Je maîtrise les deux technologies et vous conseille selon votre projet spécifique.",
    keywords: ["laravel vs nodejs", "backend angular", "choisir backend application web"]
  }
];

function FAQItemComponent({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-design overflow-hidden mb-4"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 
          className="text-lg font-display font-semibold text-text-main pr-4"
          itemProp="name"
        >
          {item.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-accent flex-shrink-0" size={24} />
        </motion.div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div 
          className="p-6 pt-0 text-text-secondary font-body leading-relaxed"
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
        >
          <div itemProp="text">
            {item.answer}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.keywords.map((keyword, idx) => (
              <span 
                key={idx}
                className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* SEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
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
          <HelpCircle size={20} className="text-accent" />
          <span className="text-sm font-medium text-accent">Questions fréquentes</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-main mb-4">
          FAQ Développeur Web <span className="text-accent">Angular & Laravel</span>
        </h1>
        <p className="text-text-secondary font-body max-w-2xl mx-auto">
          Retrouvez les réponses aux questions les plus fréquentes sur mes services de développement web, 
          mes tarifs, et mon expérience Angular freelance en Île-de-France.
        </p>
      </motion.div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <FAQItemComponent key={index} item={item} index={index} />
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-8 glass rounded-design text-center"
      >
        <h2 className="text-xl font-display font-semibold text-text-main mb-2">
          Une question spécifique ?
        </h2>
        <p className="text-text-secondary font-body mb-4">
          N'hésitez pas à me contacter directement pour discuter de votre projet.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-design font-medium hover:bg-accent-hover transition-colors shadow-glow-orange"
        >
          Me contacter
        </a>
      </motion.div>
    </section>
  );
}
