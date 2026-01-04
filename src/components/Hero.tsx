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
        py-3 sm:py-6 md:py-12
        px-2 sm:px-4 md:px-8
        w-full
        max-w-full
        mx-auto
      "
    >
      <Container className="flex flex-col justify-between text-center space-y-4 sm:space-y-6 md:space-y-8">
        <div className="flex justify-center items-center">
          <img
            src={PROFILE_IMAGE}
            alt="Abderrahmane El Farouah"
            width="144"
            height="144"
            className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover ring-2 ring-accent/30 shadow-glow-orange animate-float"
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-main">
            Abderrahmane <span className="text-accent">El Farouah</span>
          </h1>

          <p className="text-md sm:text-lg text-text-secondary font-body">
            Développeur Web & AS 400
          </p>
        </div>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto font-body">
          Passionné par le développement web et les systèmes legacy,
          je crée des solutions innovantes qui allient technologie moderne et fiabilité.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={SOCIAL_LINKS.GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-area focus-visible w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-bg-secondary text-text-main hover:bg-accent/20 transition-all ring-1 ring-border-color hover:ring-accent"
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
            className="touch-area focus-visible w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-accent-gradient text-white hover:shadow-glow-orange-hover transition-all"
            title="Télécharger mon CV"
          >
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <a
            href={`mailto:${SOCIAL_LINKS.EMAIL}`}
            className="touch-area focus-visible w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-accent-gradient text-white hover:shadow-glow-orange-hover transition-all"
            title="Email"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </Container>
    </section>
  );
}