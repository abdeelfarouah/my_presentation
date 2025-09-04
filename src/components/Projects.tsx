import { useState } from 'react';
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
  const [current, setCurrent] = useState(0);

  // nombre d’éléments visibles selon la taille de l’écran
  const getSlidesPerView = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
  };

  const slidesPerView = getSlidesPerView();

  const nextSlide = () => {
    if (current < projects.length) setCurrent(current + 1);
  };

  const prevSlide = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Container>
        <SectionTitle>Projets</SectionTitle>

        <div className="relative mt-8 overflow-hidden">
          {/* Track */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(current * 100) / slidesPerView}%)`,
              width: `${(projects.length + 1) * (100 / slidesPerView)}%`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 shrink-0"
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
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 shrink-0">
              <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Projets à venir...
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            ▶
          </button>
        </div>
      </Container>
    </section>
  );
}
