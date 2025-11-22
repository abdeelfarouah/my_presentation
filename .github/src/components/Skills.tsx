const skills = {
  technical: [
    'HTML5',
    'CSS3',
    'JavaScript',
    'PHP',
    'React.js',
    'Angular',
    'AS400',
    'RPG',
  ],
  professional: [
    'Git',
    'Linux',
    'Windows',
    'Pack Office',
    'EBP Comptabilité',
    'EBP Gestion commerciale',
  ],
  soft: [
    'Résilience',
    'Esprit d\'équipe',
    'Créativité',
    'Empathie',
    'Management inclusif',
    'Assertivité',
  ],
};

export default function Skills() {
  return (
    <section className="h-full flex items-center bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-3 sm:py-5 md:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-10">
          Compétences
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Technical Skills */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 md:mb-6 text-gray-900 dark:text-white">
              Compétences techniques
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Professional Skills */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 md:mb-6 text-gray-900 dark:text-white">
              Compétences professionnelles
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.professional.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl md:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 md:mb-6 text-gray-900 dark:text-white">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
