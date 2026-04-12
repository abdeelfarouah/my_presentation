import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

export default function ContactSimple() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const containerVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };
  const itemVariants = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    // Send email
    const subject = `Nouveau contact de ${formData.name}`;
    const body = `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:a.elfarouahDEV@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main id="contact" className="h-full w-full min-h-[600px] py-8 px-4 sm:py-12 md:py-16 max-w-[1200px] mx-auto">
      <div className="h-full animate-fade-in flex flex-col w-full">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="w-full">

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-4">
              Prise de <span className="text-accent">Rendez-vous</span>
            </h1>
            <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto">
              Discutons de votre projet lors d'un entretien personnalisé. Contactez-moi pour planifier notre échange.
            </p>
          </header>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

            {/* CONTACT INFO */}
            <motion.div variants={itemVariants} className="card flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-4">Disponible pour vos projets</h2>
              <p className="text-text-secondary mb-6">
                Spécialiste en applications web modernes avec Angular et Laravel. 
                Développement de solutions robustes et performantes.
              </p>
              
              <div className="space-y-4 w-full max-w-sm">
                <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                  <Mail className="w-5 h-5 text-accent" />
                  <a href="mailto:a.elfarouahDEV@outlook.com" className="text-text-secondary hover:text-accent transition-colors">
                    a.elfarouahDEV@outlook.com
                  </a>
                </div>
                <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                  <Phone className="w-5 h-5 text-accent" />
                  <a href="tel:+33760751350" className="text-text-secondary hover:text-accent transition-colors">
                    07 60 75 13 50
                  </a>
                </div>
                <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-text-secondary">
                    Mantes-la-Jolie, Île-de-France
                  </span>
                </div>
              </div>
            </motion.div>

            {/* FORMULAIRE */}
            <motion.div variants={itemVariants} className="card p-8">
              <h2 className="text-2xl font-bold text-center text-text-main mb-6">Contactez-moi</h2>
              <p className="text-text-secondary text-center mb-6">
                Envoyez-moi votre message et je vous répondrai dans les plus brefs délais
              </p>
              
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-main mb-2">Message envoyé !</h3>
                  <p className="text-text-secondary">Je vous répondrai dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-text-secondary text-sm font-medium mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      className="w-full px-4 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-bg-primary text-text-main"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-text-secondary text-sm font-medium mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      className="w-full px-4 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-bg-primary text-text-main"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-text-secondary text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet..."
                      rows={4}
                      className="w-full px-4 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-bg-primary text-text-main resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn btn-primary"
                  >
                    Envoyer le message
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </motion.div>
      </div>
    </main>
  );
}
