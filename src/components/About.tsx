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

          {/* INTRO - Accessible aux commerçants et artisans */}
          <p className="mb-4" itemProp="description">
            <strong>Créateur de solutions digitaux basé à Mantes-la-Jolie dans les Yvelines (78)</strong>, j'aide 
            les <strong>commerçants, artisans, professions libérales et administrations</strong> de l'<strong>Île-de-France</strong> 
            à gagner du temps et à améliorer leur efficacité avec des outils simples et performants.
          </p>

          <p className="mb-4">
            Que vous ayez une <strong>boutique, un atelier, un cabinet ou un bureau</strong> à 
            <strong>Mantes-la-Jolie, Versailles, Saint-Germain-en-Laye</strong> ou ailleurs en Île-de-France, 
            je conçois des <strong>logiciels sur mesure</strong> qui répondent exactement à vos besoins : 
            gestion clients, stocks, devis, factures, ou tout autre outil qui vous fait gagner du temps au quotidien.
          </p>

          <p className="mb-6">
            Mon approche : <strong>pas de jargon technique</strong>, juste des solutions concrètes qui fonctionnent. 
            Je m'adapte à votre façon de travailler et vous accompagne de A à Z, de la première idée jusqu'à ce que 
            vous soyez parfaitement autonome avec votre nouvel outil.
          </p>

          <meta itemProp="jobTitle" content="Créateur de Solutions Digitaux pour Commerçants et Artisans - Mantes-la-Jolie (78)" />
          <meta itemProp="url" content="https://www.abderrahmane-elfarouahfreelance.com" />

          {/* POINTS FORTS - Langage simple */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">

            <div className="card-bento">
              <p className="font-semibold text-text-main text-lg mb-2">⚡ Gain de Temps Immédiat</p>
              <p className="text-sm text-text-secondary">Finis les tâches répétitives : votre nouvel outil travaille pour vous</p>
            </div>

            <div className="card-bento">
              <p className="font-semibold text-text-main text-lg mb-2">� Sur Mesure</p>
              <p className="text-sm text-text-secondary">Un outil adapté à VOTRE métier, pas un logiciel générique imposé</p>
            </div>

            <div className="card-bento">
              <p className="font-semibold text-text-main text-lg mb-2">🤝 Accompagnement Humain</p>
              <p className="text-sm text-text-secondary">Je vous forme et reste disponible, pas de hotline robotisée</p>
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
                <a href="https://www.jeveuxunfreelance.fr" target="_blank" rel="noopener">
  Annuaire freelance
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
                  href="https://github.com/abderrahmaneelfarouah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="sameAs"
                  className="ml-2 text-accent underline hover:opacity-80"
                >
                  Voir mes projets
                </a>
              </li>

            </ul>

            <p className="mt-6 text-text-main font-medium text-lg">
              Votre partenaire digital de proximité — disponible dans les Yvelines et l'Île-de-France
            </p>

            <p className="text-sm text-text-secondary">
              Commerçants • Artisans • Professions libérales • Administrations • Associations
            </p>

          </div>

        </div>

      </Container>
    </section>
  );
}
