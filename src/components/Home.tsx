import { Code, Database, Globe, Zap, MapPin, Phone, Mail } from 'lucide-react';
import { PROFILE_IMAGE } from '../utils/images';

const Home = () => {

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)' }}>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl">
          <div className="mb-8">
            <img 
              src={PROFILE_IMAGE} 
              alt="Abderrahmane El Farouah" 
              className="w-32 h-32 rounded-full object-cover shadow-lg mx-auto mb-6"
              style={{ border: '4px solid rgba(0,102,170,0.2)' }}
            />
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: 'rgba(0,102,170,0.15)', color: 'var(--cyan)' }}>
              Développeur Fullstack • Angular & Laravel
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>
            Votre Partenaire Digital
          </h1>
          <h2 className="text-xl md:text-2xl mb-8" style={{ color: 'var(--text-secondary)' }}>
            Abderrahmane El Farouah • Expert Fullstack
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Je transforme vos défis business en solutions digitales performantes pour les entreprises en Île-de-France.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 rounded-lg font-medium transition-colors" style={{ background: 'var(--blue)', color: '#fff' }}>
              Prendre rendez-vous
            </a>
            <a 
              href="/services"
              className="px-8 py-3 rounded-lg font-medium transition-colors" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-main)' }}>
              Voir mes services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
              Mes Services
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Des solutions sur mesure pour votre transformation digitale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Code className="w-8 h-8" />, title: "Applications Web", desc: "Développement sur mesure avec Angular et React" },
              { icon: <Database className="w-8 h-8" />, title: "APIs & Backend", desc: "APIs robustes avec Laravel et Node.js" },
              { icon: <Globe className="w-8 h-8" />, title: "Sites Vitrines", desc: "Présence web professionnelle et responsive" },
              { icon: <Zap className="w-8 h-8" />, title: "Optimisation", desc: "Performance et SEO pour votre existant" }
            ].map((service, index) => (
              <div key={index} className="p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" style={{ background: 'var(--bg-glass)' }}>
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-main)' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--text-main)' }}>
            Une Approche Orientée Résultats
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl" style={{ background: 'rgba(0,102,170,0.15)', color: 'var(--cyan)' }}>
                1
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-main)' }}>Analyse</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Compréhension de vos besoins et objectifs business</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl" style={{ background: 'rgba(0,102,170,0.15)', color: 'var(--cyan)' }}>
                2
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-main)' }}>Conception</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Architecture technique adaptée à vos contraintes</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl" style={{ background: 'rgba(0,102,170,0.15)', color: 'var(--cyan)' }}>
                3
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-main)' }}>Livraison</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Déploiement et accompagnement post-projet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="local" className="py-20 px-4" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
              Intervention en Île-de-France
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Basé à Mantes-la-Jolie, disponible pour vos projets dans toute la région
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: 'var(--bg-glass)' }}>
              <MapPin className="w-5 h-5" style={{ color: 'var(--cyan)' }} />
              <span style={{ color: 'var(--text-main)' }}>Mantes-la-Jolie</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: 'var(--bg-glass)' }}>
              <Phone className="w-5 h-5" style={{ color: 'var(--cyan)' }} />
              <span style={{ color: 'var(--text-main)' }}>07 60 75 13 50</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: 'var(--bg-glass)' }}>
              <Mail className="w-5 h-5" style={{ color: 'var(--cyan)' }} />
              <span style={{ color: 'var(--text-main)' }}>a.elfarouahDEV@outlook.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-4" style={{ background: 'var(--blue)' }}>
        <div className="max-w-4xl mx-auto text-center" style={{ color: '#fff' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Discutons de vos besoins lors d'un premier rendez-vous gratuit
          </p>
          <a 
            href="/contact"
            className="inline-block px-8 py-3 rounded-lg font-medium transition-colors"
            style={{ background: '#fff', color: 'var(--blue)' }}
          >
            Me contacter
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
