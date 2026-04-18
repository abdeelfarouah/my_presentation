import { Github, Linkedin, Mail, Calendar, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from 'date-fns/locale/fr';
import { PROFILE_IMAGE } from '../utils/images';
import { SOCIAL_LINKS } from '../utils/constants';

const API_BASE = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:4000/api';

interface Appointment {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  date: string;
}

export default function Contact() {
  registerLocale('fr', fr);

  const [formState, setFormState] = useState<{ 
    firstName: string; 
    lastName: string; 
    email: string; 
    date: Date | null 
  }>({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    date: null 
  });
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const HOURS = Array.from({ length: 9 }).map((_, i) => 10 + i);
  const [sent, setSent] = useState(false);

  // Admin states
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [adminError, setAdminError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      setFormState({ ...formState, date });
      return;
    }
    const hour = selectedHour ?? 10;
    const newDate = new Date(date);
    newDate.setHours(hour, 0, 0, 0);
    setFormState({ ...formState, date: newDate });
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hour = parseInt(e.target.value, 10);
    setSelectedHour(hour);
    if (formState.date) {
      const newDate = new Date(formState.date);
      newDate.setHours(hour, 0, 0, 0);
      setFormState({ ...formState, date: newDate });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.firstName || !formState.lastName || !formState.email || !formState.date) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formState.firstName} ${formState.lastName}`.trim(),
          firstName: formState.firstName.trim(),
          lastName: formState.lastName.trim(),
          email: formState.email,
          date: formState.date?.toISOString(),
        }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setFormState({ firstName: '', lastName: '', email: '', date: null });
        alert('Rendez-vous enregistré !');
      }
    } catch {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        headers: { 'x-digicode': adminCode }
      });
      
      if (res.status === 200) {
        const data = await res.json();
        setAppointments(data);
        setIsAdmin(true);
        setShowAdminLogin(false);
      } else {
        setAdminError('Code incorrect');
      }
    } catch {
      setAdminError('Erreur de connexion');
    }
  };

  return (
    <main id="contact" className="min-h-screen py-16 px-4 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-5xl mx-auto">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Premier rendez-vous gratuit</span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-main mb-4">
            Prenons <span className="text-gradient">contact</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Discutons de votre projet lors d'un entretien personnalisé et sans engagement.
          </p>
        </motion.header>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Profil Card */}
          <div className="card-bento p-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src={PROFILE_IMAGE} 
                  alt="Abderrahmane El Farouah" 
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-accent/30 shadow-glow-animated"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-text-main mb-2">
              Abderrahmane El Farouah
            </h2>
            <p className="text-text-secondary text-center mb-6">
              Créateur de solutions digitaux pour commerçants et artisans
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/10">
                <Mail className="w-5 h-5 text-accent" />
                <a href="mailto:abde.elfarouah@gmail.com" className="text-text-secondary hover:text-accent transition-colors">
                  abde.elfarouah@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/10">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-text-secondary">Réponse sous 24h</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-3">
              <a href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-text-main hover:text-accent hover:border-accent/50 transition-all">
                <Github className="w-6 h-6" />
              </a>
              <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-text-main hover:text-accent hover:border-accent/50 transition-all">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:abde.elfarouah@gmail.com" className="w-12 h-12 rounded-2xl btn-primary flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Formulaire Card */}
          <div className="card-bento p-8">
            <h2 className="text-2xl font-bold text-center text-text-main mb-2">
              Prendre rendez-vous
            </h2>
            <p className="text-text-secondary text-center mb-6">
              Choisissez un créneau qui vous convient
            </p>
            
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Rendez-vous enregistré !</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-text-secondary text-sm font-medium mb-2">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    value={formState.firstName}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-border-color focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-text-secondary text-sm font-medium mb-2">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    value={formState.lastName}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-border-color focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-text-secondary text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-border-color focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-text-secondary text-sm font-medium mb-2">Date</label>
                  <DatePicker
                    id="date"
                    selected={formState.date}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    minDate={new Date()}
                    locale={fr}
                    dateFormat="Pp"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-border-color focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholderText="Choisissez une date"
                    required
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="hour" className="block text-text-secondary text-sm font-medium mb-2">Heure</label>
                  <select
                    id="hour"
                    name="hour"
                    value={selectedHour || ''}
                    onChange={handleHourChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-border-color focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  >
                    <option value="">Sélectionnez une heure</option>
                    {HOURS.map((hour) => (
                      <option key={hour} value={hour}>{hour}:00</option>
                    ))}
                  </select>
                </div>

                <motion.button
                  type="submit"
                  className="w-full btn btn-primary py-4 text-lg font-bold group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-6 h-6 mr-2" />
                  Confirmer le rendez-vous
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Admin access - hidden */}
        <div className="flex flex-col items-center mt-16">
          <p className="text-sm text-gray-400 mb-2">Accès réservé</p>
          <button
            onClick={() => setShowAdminLogin(!showAdminLogin)}
            className="opacity-20 hover:opacity-100 transition-opacity duration-300"
            title="Admin"
          >
            <img 
              src="/images/pic-icon.png" 
              alt="Accès administrateur" 
              className="w-10 h-10"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </button>
        </div>

        {/* Admin modal */}
        {showAdminLogin && !isAdmin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAdminLogin(false)}>
            <div className="card-bento p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-semibold mb-4">Accès Admin</h3>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="Code admin"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-border-color focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  required
                />
                {adminError && <p className="text-red-500 text-sm">{adminError}</p>}
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 btn btn-primary py-3">Connexion</button>
                  <button type="button" onClick={() => setShowAdminLogin(false)} className="flex-1 btn btn-secondary py-3">Annuler</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Admin panel */}
        {isAdmin && (
          <div className="card-bento mt-8 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-text-main">Rendez-vous ({appointments.length})</h3>
              <button onClick={() => setIsAdmin(false)} className="text-text-secondary hover:text-accent transition-colors">Fermer</button>
            </div>
            {appointments.map((apt) => (
              <div key={apt.id} className="p-4 bg-accent/5 rounded-xl mb-2 flex justify-between border border-accent/10">
                <div>
                  <p className="font-semibold text-text-main">{apt.name}</p>
                  <p className="text-sm text-text-secondary">{new Date(apt.date).toLocaleString('fr-FR')}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
