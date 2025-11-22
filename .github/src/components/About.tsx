import Container from './shared/Container';
import SectionTitle from './shared/SectionTitle';

export default function About() {
  return (
    <section id="about" className="py-4 sm:py-8 md:py-12 glass metal-surface">
      <Container>
        <SectionTitle>À propos de moi</SectionTitle>
        
        <div className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          <p className="mb-3 sm:mb-4 md:mb-6">
            Développeur passionné avec une double expertise en développement AS400 RPG et technologies web modernes.
            Mon parcours unique me permet d'apporter une perspective précieuse aux projets, combinant la robustesse
            des systèmes legacy avec l'innovation des technologies actuelles.
          </p>
          

          <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="glass metal-surface p-4 sm:p-5 md:p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-4">Formations Professionnelles</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>START ZUP (2023-2024)</li>
                <li>O'clock (2022)</li> 
              </ul>
            </div>
            
            <div className="glass metal-surface p-4 sm:p-5 md:p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-4">Certifications</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>PSC1 (2018)</li>
                <li>BAFA (2014)</li>
                <li>Bac Pro Secrétariat (2011)</li>
                <li>BEP Métiers du secrétariat (2009)</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
