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
    <section className="h-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-3 sm:py-5 md:py-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-center text-text-main mb-4 sm:mb-6 md:mb-10">
          Compétences
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Technical Skills */}
          <div className="card">
            <h3 className="text-lg sm:text-xl font-display font-semibold mb-3 sm:mb-4 md:mb-6 text-text-main">
              Compétences <span className="text-accent">techniques</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-bg-secondary border border-border-color rounded-full text-sm text-text-secondary hover:text-accent hover:border-accent transition-all font-body"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Professional Skills */}
          <div className="card">
            <h3 className="text-lg sm:text-xl font-display font-semibold mb-3 sm:mb-4 md:mb-6 text-text-main">
              Compétences <span className="text-accent">professionnelles</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.professional.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-bg-secondary border border-border-color rounded-full text-sm text-text-secondary hover:text-accent hover:border-accent transition-all font-body"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="card md:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-display font-semibold mb-3 sm:mb-4 md:mb-6 text-text-main">
              <span className="text-accent">Soft</span> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-bg-secondary border border-border-color rounded-full text-sm text-text-secondary hover:text-accent hover:border-accent transition-all font-body"
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
