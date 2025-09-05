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
        bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800
        py-8 sm:py-12 md:py-16
        px-2 sm:px-6 md:px-12
        overflow-y-auto
        w-full
        max-w-full
        mx-auto
        rounded-lg
      "
    >
      <Container className="flex flex-col justify-between text-center space-y-8">
        <div className="flex justify-center items-center">
          <img
            src={PROFILE_IMAGE}
            alt="Abderrahmane El Farouah"
            className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
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
            className="p-2 sm:p-3 rounded-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            title="GitHub"
          >
            <Github className="w-5 sm:w-[22px]" />
          </a>
          <a
            href={SOCIAL_LINKS.LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-5 sm:w-[22px]" />
          </a>
          <button
            onClick={handleDownloadCV}
            className="p-2 sm:p-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
            title="Télécharger mon CV"
          >
            <FileText className="w-5 sm:w-[22px]" />
          </button>
          <a
            href={`mailto:${SOCIAL_LINKS.EMAIL}`}
            className="p-2 sm:p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
            title="Email"
          >
            <Mail className="w-5 sm:w-[22px]" />
          </a>
        </div>
      </Container>
    </section>
  );
}