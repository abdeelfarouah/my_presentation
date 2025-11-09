import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { PROFILE_IMAGE } from '../utils/images';
import { SOCIAL_LINKS } from '../utils/constants';
import Container from './shared/Container';
import { useCallback } from 'react';

export default function Hero() {
  const handleDownloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = SOCIAL_LINKS.CV_URL;
    link.download = 'abderrahmane-elfarouah_cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <section
      className="
        h-full
        chrome-surface bg-radial-faint
        py-3 sm:py-6 md:py-12
        px-2 sm:px-4 md:px-8
        w-full
        max-w-full
        mx-auto
        rounded-xl ring-chrome
      "
    >
      <Container className="flex flex-col justify-between text-center space-y-4 sm:space-y-6 md:space-y-8">
        <div className="flex justify-center items-center">
          <img
            src={PROFILE_IMAGE}
            alt="Abderrahmane El Farouah"
            className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover ring-2 ring-white/70 dark:ring-white/10 shadow-lg animate-float"
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Abderrahmane El Farouah
          </h1>

          <p className="text-md sm:text-lg text-gray-600 dark:text-gray-300">
            Développeur Web & AS 400
          </p>
        </div>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Passionné par le développement web et les systèmes legacy,
          je crée des solutions innovantes qui allient technologie moderne et fiabilité.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={SOCIAL_LINKS.GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-area focus-visible w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors ring-1 ring-white/20"
            title="GitHub"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href={SOCIAL_LINKS.LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-area focus-visible w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full btn-shiny"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <button
            onClick={handleDownloadCV}
            className="touch-area focus-visible w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 text-white hover:from-emerald-500/95 hover:to-emerald-600/95 transition-colors shadow-md"
            title="Télécharger mon CV"
          >
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <a
            href={`mailto:${SOCIAL_LINKS.EMAIL}`}
            className="touch-area focus-visible w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-b from-rose-500 to-rose-600 text-white hover:from-rose-500/95 hover:to-rose-600/95 transition-colors shadow-md"
            title="Email"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </Container>
    </section>
  );
}