import { motion } from "framer-motion";

export default function Projects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Mes Projets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            Projet à venir
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Description du projet à venir...
          </p>
        </div>
      </div>
    </motion.section>
  );
}
