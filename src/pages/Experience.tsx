import { motion } from 'framer-motion';

export default function Experience() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 dark:text-white">Expérience Professionnelle</h1>
          <div className="prose dark:prose-invert max-w-3xl">
            <p>Détails de l'expérience professionnelle à venir...</p>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
