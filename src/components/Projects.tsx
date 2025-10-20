import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECT_IMAGES } from '../utils/images';
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
	const carouselRef = useRef<HTMLDivElement>(null);
	const [scrollIndex, setScrollIndex] = useState(0);
	const [visibleCards, setVisibleCards] = useState(1);

	// Détermine le nombre de cartes visibles selon la largeur de l'écran
	const computeVisibleCards = () => {
		if (window.innerWidth >= 1024) return 3;
		if (window.innerWidth >= 640) return 2;
		return 1;
	};

	// Met à jour le nombre de cartes visibles lors du resize
	useEffect(() => {
		const handleResize = () => {
			const visible = computeVisibleCards();
			setVisibleCards(visible);
			// Ajuste l'index si besoin
			const maxIndex = Math.max(0, projects.length - visible);
			setScrollIndex(idx => Math.min(idx, maxIndex));
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const scrollToIndex = (idx: number) => {
		const maxIndex = Math.max(0, projects.length - visibleCards);
		const newIndex = Math.max(0, Math.min(idx, maxIndex));
		setScrollIndex(newIndex);
		if (carouselRef.current) {
			const card = carouselRef.current.querySelectorAll<HTMLDivElement>('.carousel-card')[0];
			if (card) {
				const gap = 24; // gap-6
				const scrollAmount = card.offsetWidth + gap;
				carouselRef.current.scrollTo({
					left: newIndex * scrollAmount,
					behavior: 'smooth',
				});
			}
		}
	};

	// Swipe tactile
	const touch = useRef({ startX: 0, scrollLeft: 0 });
	const onTouchStart = (e: React.TouchEvent) => {
		if (!carouselRef.current) return;
		touch.current.startX = e.touches[0].pageX;
		touch.current.scrollLeft = carouselRef.current.scrollLeft;
	};
	const onTouchMove = (e: React.TouchEvent) => {
		if (!carouselRef.current) return;
		const x = e.touches[0].pageX;
		const walk = touch.current.startX - x;
		carouselRef.current.scrollLeft = touch.current.scrollLeft + walk;
	};

	return (
		<section
			className="
				w-full
				py-10 px-2 sm:py-16 bg-white dark:bg-gray-900
				max-w-[768px] max-h-[1024px]
				sm:max-w-[800px] sm:max-h-[1280px]
				md:max-w-[1280px] md:max-h-[800px]
				mx-auto rounded-lg
				flex flex-col items-center
			"
		>
			<h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
				Mes Projets
			</h2>
			<div className="relative w-full">
				<button
					className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow hover:bg-red-100 dark:hover:bg-red-900 transition disabled:opacity-30"
					onClick={() => scrollToIndex(scrollIndex - 1)}
					disabled={scrollIndex === 0}
					aria-label="Projet précédent"
				>
					<ChevronLeft size={28} className="text-red-600" />
				</button>
				<div
					ref={carouselRef}
					className="
						flex gap-6 overflow-hidden snap-x snap-mandatory pb-4 w-full
					"
					style={{ WebkitOverflowScrolling: 'touch' }}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
				>
					{projects.map((project) => (
						<div
							key={project.title}
							className="
								carousel-card
								min-w-[90%] sm:min-w-[340px] md:min-w-[350px] max-w-[350px]
								flex-shrink-0 snap-center
							"
						>
							<ProjectCard {...project} />
						</div>
					))}
				</div>
				<button
					className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow hover:bg-red-100 dark:hover:bg-red-900 transition disabled:opacity-30"
					onClick={() => scrollToIndex(scrollIndex + 1)}
					disabled={scrollIndex >= projects.length - visibleCards}
					aria-label="Projet suivant"
				>
					<ChevronRight size={28} className="text-red-600" />
				</button>
			</div>
			<div className="flex justify-center gap-2 mt-4">
				{Array.from({ length: projects.length - visibleCards + 1 }).map((_, idx) => (
					<span
						key={idx}
						className={`w-2 h-2 rounded-full${idx === scrollIndex ? ' bg-blue-600' : ' bg-gray-300 dark:bg-gray-700'}`}
					/>
				))}
			</div>
		</section>
	);
}
