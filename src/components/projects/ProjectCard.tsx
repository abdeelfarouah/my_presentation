import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  github: string;
  image: string;
}

export default function ProjectCard({ title, description, link, github, image }: ProjectCardProps) {
  return (
    <div className="group card overflow-hidden transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 w-full p-4 sm:p-6">
      <div className="relative overflow-hidden aspect-video rounded-design">
        <img
          src={image}
          alt={title}
          width="800"
          height="450"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-area focus-visible p-2 bg-accent rounded-full text-white hover:bg-accent-hover transition-all shadow-glow-orange"
            aria-label={`Voir la démo de ${title}`}
          >
            <ExternalLink size={20} />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-area focus-visible p-2 bg-accent rounded-full text-white hover:bg-accent-hover transition-all shadow-glow-orange"
            aria-label={`Voir le code de ${title}`}
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      <div className="flex-1 p-6">
        <h3 className="text-xl font-display font-semibold text-text-main mb-2">{title}</h3>
        <p className="text-text-secondary font-body">{description}</p>
      </div>

      <div className="px-6 pb-6 mt-auto flex justify-between items-center">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-area focus-visible text-accent hover:text-accent-hover flex items-center font-body transition-all"
        >
          <span className="mr-2">Demo</span>
          <ExternalLink size={16} />
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-area focus-visible text-text-secondary hover:text-accent flex items-center font-body transition-all"
        >
          <span className="mr-2">Code</span>
          <Github size={16} />
        </a>
      </div>
    </div>
  );
}
