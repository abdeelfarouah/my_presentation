import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 dark:text-white">À propos</h1>
          <div className="prose dark:prose-invert max-w-3xl">
            <p>Page À propos - Contenu à ajouter</p>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
