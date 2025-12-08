import { motion } from 'framer-motion';

export default function CGV() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 dark:text-white">Conditions Générales de Vente</h1>
          <div className="prose dark:prose-invert max-w-3xl">
            <p>Contenu des conditions générales de vente à compléter...</p>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
