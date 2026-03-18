import Container from './shared/Container';
import SectionTitle from './shared/SectionTitle';

export default function About() {
  return (
    <section
      id="about"
      className="py-4 sm:py-8 md:py-12"
      itemScope
      itemType="https://schema.org/Person"
    >
      <Container>

        <SectionTitle>
          À propos de <span className="text-accent" itemProp="name">Abderrahmane El Farouah</span>
        </SectionTitle>

        <div className="max-w-3xl mx-auto text-lg text-text-secondary leading-relaxed font-body">

          <p className="mb-4" itemProp="description">
            Développeur web freelance spécialisé en technologies modernes et en systèmes IBM i (AS400).
            J’accompagne les entreprises dans la modernisation d’applications métiers et le développement
            d’interfaces web performantes avec Angular, TypeScript et Laravel.
          </p>

          <p className="mb-4">
            Mon expertise combine les environnements legacy RPG et les technologies web modernes afin
            d’assurer la continuité, la performance et l’évolutivité des systèmes d’information.
          </p>

          <meta itemProp="jobTitle" content="Développeur Web Freelance"/>
          <meta itemProp="url" content="https://www.abderrahmane-elfarouahfreelance.com"/>

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
          <p>🚀 Retrouvez-moi sur toutes mes plateformes !

Suivez-moi pour du contenu autour du développement, de la tech et de mes projets 👨‍💻

📲 Rejoignez-moi ici :

* Site web : [https://www.abderrahmane-elfarouahfreelance.com/](https://www.abderrahmane-elfarouahfreelance.com/)
* Freelance : [https://www.jeveuxunfreelance.fr](https://www.jeveuxunfreelance.fr)
* Malt : [https://www.malt.fr/profile/abderrahmaneelfarouah](https://www.malt.fr/profile/abderrahmaneelfarouah)
* LinkedIn : [https://www.linkedin.com/in/abderrahmaneelfarouah/](https://www.linkedin.com/in/abderrahmaneelfarouah/)
* GitHub : [https://github.com/abdeelfarouah/](https://github.com/abdeelfarouah/)

Développeur Fullstack Angular & Laravel — disponible pour vos projets
Applications web performantes | UX/UI | API robustes ([Malt][1])

À très vite 

[1]: https://www.malt.fr/profile/abderrahmaneelfarouah?utm_source=chatgpt.com "Abderrahmane El Farouah, Développeur Angular | TypeScript | API Laravel"
</p>

          <div className="mt-6 text-center">
            <a
              href="https://www.malt.fr/profile/abderrahmaneelfarouah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
              itemProp="sameAs"
            >
              Voir le profil Malt
            </a>
          </div>

        </div>

      </Container>
    </section>
  );
}
