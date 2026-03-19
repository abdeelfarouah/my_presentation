import Container from './shared/Container';
import SectionTitle from './shared/SectionTitle';

export default function About() {
  return (
    <section
      id="about"
      className="py-6 sm:py-10 md:py-14"
      itemScope
      itemType="https://schema.org/Person"
    >
      <Container>

        <SectionTitle>
          À propos de <span className="text-accent" itemProp="name">Abderrahmane El Farouah</span>
        </SectionTitle>

        <div className="max-w-3xl mx-auto text-lg text-text-secondary leading-relaxed font-body">

          {/* INTRO */}
          <p className="mb-4" itemProp="description">
            Développeur web freelance, je conçois des applications modernes, rapides et robustes en combinant 
            <strong> Angular, TypeScript et Laravel </strong> avec une expertise avancée des systèmes 
            <strong> IBM i (AS400)</strong>.
          </p>

          <p className="mb-4">
            J’aide les entreprises à <strong>moderniser leurs applications métiers</strong>, améliorer leurs performances
            et garantir la pérennité de leur système d’information.
          </p>

          <p className="mb-6">
            Mon approche : <strong>allier legacy et modernité</strong> pour créer des solutions fiables, évolutives 
            et parfaitement adaptées à vos enjeux techniques et business.
          </p>

          <meta itemProp="jobTitle" content="Développeur Web Freelance" />
          <meta itemProp="url" content="https://www.abderrahmane-elfarouahfreelance.com" />

          {/* POINTS FORTS */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">

            <div className="card">
              <p className="font-semibold text-text-main">⚡ Performance</p>
              <p className="text-sm">Applications rapides et optimisées</p>
            </div>

            <div className="card">
              <p className="font-semibold text-text-main">🔗 Interopérabilité</p>
              <p className="text-sm">Legacy AS400 ↔ Web moderne</p>
            </div>

            <div className="card">
              <p className="font-semibold text-text-main">🧩 Sur-mesure</p>
              <p className="text-sm">Solutions adaptées à vos besoins</p>
            </div>

          </div>

          {/* FORMATIONS */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="card">
              <h2 className="text-xl font-display font-semibold text-text-main mb-4">
                Formations professionnelles
              </h2>

              <ul className="space-y-2 text-text-secondary font-body">
                <li itemProp="alumniOf">START ZUP (2023-2024)</li>
                <li itemProp="alumniOf">O'clock (2022)</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-xl font-display font-semibold text-text-main mb-4">
                Certifications
              </h2>

              <ul className="space-y-2 text-text-secondary font-body">
                <li>PSC1 (2018)</li>
                <li>BAFA (2014)</li>
                <li>Bac Pro Secrétariat (2011)</li>
                <li>BEP Métiers du secrétariat (2009)</li>
              </ul>
            </div>

          </div>

          {/* LIENS */}
          <div className="mt-10">
            <h2 className="text-xl font-display font-semibold text-text-main mb-4">
              Me retrouver en ligne
            </h2>

            <p className="mb-4">
              Consultez mes profils pour découvrir mes projets, mon parcours et me contacter directement.
            </p>

            <ul className="space-y-2">

              <li>
                Plateforme freelance :
                <a
                  href="https://www.jeveuxunfreelance.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="sameAs"
                  className="ml-2 text-accent underline hover:opacity-80"
                >
                  Voir mon profil
                </a>
              </li>

              <li>
                Malt :
                <a
                  href="https://www.malt.fr/profile/abderrahmaneelfarouah"
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="sameAs"
                  className="ml-2 text-accent underline hover:opacity-80"
                >
                  Voir mon profil Malt
                </a>
              </li>

              <li>
                LinkedIn :
                <a
                  href="https://www.linkedin.com/in/abderrahmaneelfarouah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="sameAs"
                  className="ml-2 text-accent underline hover:opacity-80"
                >
                  Me contacter
                </a>
              </li>

              <li>
                GitHub :
                <a
                  href="https://github.com/abdeelfarouah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="sameAs"
                  className="ml-2 text-accent underline hover:opacity-80"
                >
                  Voir mes projets
                </a>
              </li>

            </ul>

            <p className="mt-6 text-text-main font-medium">
              Développeur Fullstack Angular & Laravel — disponible pour vos projets
            </p>

            <p className="text-sm text-text-secondary">
              Applications web performantes • UX/UI • API robustes
            </p>

          </div>

        </div>

      </Container>
    </section>
  );
}
