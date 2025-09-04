import { PROJECT_IMAGES } from '../utils/images';
import Container from './shared/Container';
import SectionTitle from './shared/SectionTitle';
import ProjectCard from './projects/ProjectCard';

const projects = [
  {
    title: 'Snake game legacy',
    description: 'jeu regressif du serpent.',
    link: 'https://snakegamelegacy.netlify.app',
    github: 'https://github.com/abdeelfarouah/retro-snake-game',
    image: PROJECT_IMAGES.SNAKE,
  },
  {
    title: 'Chi Fu Mi',
    description: 'Un jeu classique de pierre-papier-ciseaux développé avec JavaScript.',
    link: 'https://abdeelfarouah.github.io/chifoumi/',
    github: 'https://github.com/abdeelfarouah/chifoumi',
    image: PROJECT_IMAGES.CHIFOUMI,
  },
  {
    title: 'Neo Puzzle',
    description: 'Un jeu simple revisité du puzzle.',
    link: 'https://abdeelfarouah.github.io/puzzle/',
    github: 'https://github.com/abdeelfarouah/puzzle',
    image: PROJECT_IMAGES.PUZZLE,
  },
  {
    title: 'Pokédex',
    description: 'Une application web présentant les 151 premiers Pokémon avec leurs caractéristiques.',
    link: 'https://abdeelfarouah.github.io/pokemon-discovery/',
    github: 'https://github.com/Abdeelf902/pokemon-discovery',
    image: PROJECT_IMAGES.POKEDEX,
  },
];

export default function Projects() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Container>
        <SectionTitle>Projets</SectionTitle>

        {/* Carrousel responsive avec scroll horizontal */}
        <div className="mt-8 overflow-x-auto">
          <div className="flex gap-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[90%] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  link={project.link}
                  github={project.github}
                  image={project.image}
                />
              </div>
            ))}

            {/* Placeholder */}
            <div className="flex-shrink-0 w-[90%] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
              <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Projets à venir...
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
