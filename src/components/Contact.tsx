import { Github, Linkedin, Mail, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section
      id="contact"
      className="
        flex items-center justify-center
        h-full w-full min-h-[400px]
        py-10 px-2 sm:py-16
        bg-white dark:bg-gray-900
        max-w-[768px] max-h-[1024px]
        sm:max-w-[800px] sm:max-h-[1280px]
        md:max-w-[1280px] md:max-h-[800px]
        mx-auto
        rounded-lg
      "
    >
      <div className="h-full animate-fade-in flex items-center justify-center">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-full"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Contactez-moi
          </h2>

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <motion.div variants={itemVariants} className="flex-1 space-y-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Informations
              </h3>
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">France</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-600 dark:text-blue-400" />
                <a
                  href="mailto:A.elfarouahDEV@outlook.fr"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 underline"
                >
                  A.elfarouahDEV@outlook.fr
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex-1 space-y-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Réseaux
              </h3>
              <a
                href="https://github.com/Abdeelfarouah/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Github className="text-gray-900 dark:text-white" />
                <span className="text-gray-700 dark:text-gray-300">@Abdeelfarouah</span>
              </a>
              <a
                href="https://fr.linkedin.com/in/abderrahmaneelfarouah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Linkedin className="text-blue-600" />
                <span className="text-gray-700 dark:text-gray-300">Abderrahmane El Farouah</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="text-center text-gray-600 dark:text-gray-400 text-base sm:text-lg"
          >
            <p>
              N'hésitez pas à me contacter pour discuter de vos projets ou opportunités de collaboration.
            </p>
            <a
              href="https://outlook.live.com/calendar/0/deeplink/compose?subject=Rendez-vous%20avec%20Abderrahmane%20El%20Farouah&body=Merci%20de%20me%20contacter%20pour%20planifier%20un%20rendez-vous.&to=A.elfarouahDEV@outlook.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
              title="Prendre rendez-vous (Outlook)"
            >
              <Calendar className="w-5 h-5" />
              Prendre rendez-vous
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}