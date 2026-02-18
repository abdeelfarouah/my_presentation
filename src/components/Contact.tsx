import { Github, Linkedin, Mail, FileText, Calendar, ExternalLink, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useCallback } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from 'date-fns/locale/fr';
import { PROFILE_IMAGE } from '../utils/images';
import { SOCIAL_LINKS } from '../utils/constants';

interface Appointment {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  date: string;
}

const API_BASE = '/api';

export default function Contact() {
  registerLocale('fr', fr);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

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
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorFirstName, setErrorFirstName] = useState<string>('');
  const [errorLastName, setErrorLastName] = useState<string>('');

  const [showBackOffice, setShowBackOffice] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [digicodeAttempts, setDigicodeAttempts] = useState(0);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_BASE}/appointments`);
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error(err);
      setAppointments([]);
    }
  };

  useEffect(() => {
    if (showBackOffice) fetchAppointments();
  }, [showBackOffice]);

  const handleDownloadCV = useCallback(async () => {
    try {
      const res = await fetch(SOCIAL_LINKS.CV_URL);
      if (!res.ok) throw new Error('Fichier introuvable');
      const blob = await res.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'abderrahmane-elfarouah_cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Erreur lors du téléchargement du CV');
      console.error(err);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length > 100) return;
    setFormState({ ...formState, [name]: value });

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) setErrorEmail("Adresse email invalide");
      else setErrorEmail('');
    } else if (name === 'firstName') {
      if (value.length > 0 && value.length < 2) setErrorFirstName("Le prénom doit contenir au moins 2 caractères.");
      else setErrorFirstName('');
    } else if (name === 'lastName') {
      if (value.length > 0 && value.length < 2) setErrorLastName("Le nom doit contenir au moins 2 caractères.");
      else setErrorLastName('');
    }
  };

  const roundToNextHour = (d: Date) => {
    const copy = new Date(d);
    if (copy.getMinutes() !== 0 || copy.getSeconds() !== 0 || copy.getMilliseconds() !== 0) {
      copy.setHours(copy.getHours() + 1);
    }
    copy.setMinutes(0, 0, 0);
    return copy;
  };

  const setDateWithHour = (date: Date, hour: number) => {
    const base = roundToNextHour(date);
    base.setHours(hour, 0, 0, 0);
    return base;
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      setFormState({ ...formState, date });
      return;
    }
    const hour = selectedHour ?? 10;
    const updatedDate = setDateWithHour(date, hour);
    setSelectedHour(hour);
    setFormState({ ...formState, date: updatedDate });
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hour = parseInt(e.target.value, 10);
    setSelectedHour(hour);
    if (!formState.date) {
      setFormState({ ...formState, date: setDateWithHour(new Date(), hour) });
      return;
    }
    const updated = setDateWithHour(formState.date, hour);
    setFormState({ ...formState, date: updated });
  };

  const validateForm = () => {
    if (!formState.firstName.trim()) return "Le prénom est obligatoire.";
    if (formState.firstName.length < 2) return "Le prénom doit contenir au moins 2 caractères.";
    if (!formState.lastName.trim()) return "Le nom est obligatoire.";
    if (formState.lastName.length < 2) return "Le nom doit contenir au moins 2 caractères.";
    if (!formState.email.trim()) return "L'email est obligatoire.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) return "Adresse email invalide";
    if (!formState.date) return 'Veuillez choisir une date et une heure.';
    if (formState.date < new Date()) return 'La date doit être dans le futur.';
    return null;
  };

  const handleImageClick = async () => {
    if (digicodeAttempts >= 3) {
      alert('Nombre maximum de tentatives atteint');
      return;
    }
    const code = prompt('Veuillez entrer le digicode pour accéder au back-office :');
    if (!code) return;
    setDigicodeAttempts(prev => prev + 1);

    try {
      console.log('Sending request to:', `${API_BASE}/check-digicode`);
      const res = await fetch(`${API_BASE}/check-digicode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      if (data.success) {
        setShowBackOffice(true);
      } else {
        alert('Digicode incorrect !');
      }
    } catch (err) {
      console.error('Error in handleImageClick:', err);
      alert('Erreur lors de la vérification du digicode');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      alert(error);
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
        const data = await res.json().catch(() => null);
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setFormState({ 
          firstName: '', 
          lastName: '', 
          email: '', 
          date: null 
        });
        if (data?.emailError) {
          alert(`Rendez-vous enregistré, mais l'email de notification a échoué : ${data.emailError}`);
        } else {
          alert('Rendez-vous enregistré !');
        }
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement du rendez-vous");
    }
  };

  const handleSendConfirmation = (appointment: Appointment) => {
    const formattedDate = new Date(appointment.date).toLocaleString('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'short',
    });
    const subject = 'Confirmation de votre rendez-vous';
    const body = `Bonjour ${appointment.name},\n\nVotre rendez-vous est confirmé pour le ${formattedDate}.\n\nLien pour la réunion : https://meet.google.com/xxx-xxxx-xxx\n\nMerci,`;
    window.location.href = `mailto:${appointment.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDeleteAppointment = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression du rendez-vous");
    }
  };

  return (
    <section id="contact" className="h-full w-full min-h-[600px] py-8 px-4 sm:py-12 md:py-16 max-w-[1200px] mx-auto">
      <div className="h-full animate-fade-in flex flex-col w-full">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="w-full">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-4">
              Abderrahmane <span className="text-accent">El Farouah</span>
            </h1>
            <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto">
              Développeur Fullstack spécialisé dans la création d'applications web modernes et performantes
            </p>
          </div>

          {/* GRID COTE A COTE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

            {/* PROFIL */}
            <motion.div variants={itemVariants} className="card flex flex-col items-center justify-center text-center">
              <div className="flex justify-center items-center mb-6">
                <img 
                  src={PROFILE_IMAGE} 
                  alt="Abderrahmane El Farouah" 
                  width="128"
                  height="128"
                  className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-accent/20"
                />
              </div>
              <p className="text-base text-text-secondary mb-6 leading-relaxed max-w-md">
                Passionné par le développement d'applications web robustes et évolutives, 
                je combine expertise technique et vision produit pour livrer des solutions de qualité.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer" className="touch-area focus-visible flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary text-text-main hover:bg-accent hover:text-white transition-all duration-200 border border-border-color hover:border-accent shadow-sm hover:shadow-md" title="GitHub">
                  <Github className="w-5 h-5" />
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="touch-area focus-visible w-12 h-12 flex items-center justify-center rounded-lg bg-accent text-white hover:bg-accent-hover transition-all duration-200 shadow-md hover:shadow-lg" title="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://share.google/0UJJ5edbJf4IkW99S" target="_blank" rel="noopener noreferrer" className="touch-area focus-visible w-12 h-12 flex items-center justify-center rounded-lg bg-bg-secondary text-text-main hover:bg-accent hover:text-white transition-all duration-200 shadow-md hover:shadow-lg border border-border-color hover:border-accent" title="Google Business">
                  <MapPin className="w-5 h-5" />
                </a>
                <button onClick={handleDownloadCV} className="touch-area focus-visible w-12 h-12 flex items-center justify-center rounded-lg bg-accent text-white hover:bg-accent-hover transition-all duration-200 shadow-md hover:shadow-lg" title="Télécharger mon CV">
                  <FileText className="w-5 h-5" />
                </button>
                <a href={`mailto:${SOCIAL_LINKS.EMAIL}`} className="touch-area focus-visible w-12 h-12 flex items-center justify-center rounded-lg bg-accent text-white hover:bg-accent-hover transition-all duration-200 shadow-md hover:shadow-lg" title="Email">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* FORMULAIRE */}
            <motion.div variants={itemVariants} className="card">
              <h2 className="text-2xl font-bold text-center text-text-main mb-6">Contactez-<span className="text-accent">moi</span></h2>
              <p className="text-text-secondary text-center mb-6">
                Discutons de votre projet ou d'une opportunité de collaboration
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* PRÉNOM */}
                <div>
                  <label htmlFor="firstName" className="block text-text-secondary text-sm font-medium mb-2">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    maxLength={50}
                    className={`touch-area appearance-none border rounded-lg w-full py-3 px-4 text-sm leading-tight focus:outline-none focus:ring-2 transition-all duration-200 ${errorFirstName ? 'border-red-500 focus:ring-red-400/20 bg-red-50/10' : 'border-border-color focus:ring-accent/20 bg-bg-secondary hover:border-accent/50'} text-text-main placeholder-text-muted`}
                    required
                  />
                  {errorFirstName && <p className="text-red-500 text-xs mt-1 font-medium">{errorFirstName}</p>}
                </div>

                {/* NOM */}
                <div>
                  <label htmlFor="lastName" className="block text-text-secondary text-sm font-medium mb-2">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    maxLength={50}
                    className={`touch-area appearance-none border rounded-lg w-full py-3 px-4 text-sm leading-tight focus:outline-none focus:ring-2 transition-all duration-200 ${errorLastName ? 'border-red-500 focus:ring-red-400/20 bg-red-50/10' : 'border-border-color focus:ring-accent/20 bg-bg-secondary hover:border-accent/50'} text-text-main placeholder-text-muted`}
                    required
                  />
                  {errorLastName && <p className="text-red-500 text-xs mt-1 font-medium">{errorLastName}</p>}
                </div>

                {/* EMAIL */}
                <div>
                  <label htmlFor="email" className="block text-text-secondary text-sm font-medium mb-2">Adresse email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="votre.email@exemple.com"
                    maxLength={100}
                    className={`touch-area appearance-none border rounded-lg w-full py-3 px-4 text-sm leading-tight focus:outline-none focus:ring-2 transition-all duration-200 ${errorEmail ? 'border-red-500 focus:ring-red-400/20 bg-red-50/10' : 'border-border-color focus:ring-accent/20 bg-bg-secondary hover:border-accent/50'} text-text-main placeholder-text-muted`}
                    required
                  />
                  {errorEmail && <p className="text-red-500 text-xs mt-1 font-medium">{errorEmail}</p>}
                </div>

                {/* DATE + HEURE */}
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">Date et heure de rendez-vous</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <label htmlFor="appointment-date" className="sr-only">Date</label>
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                        <Calendar size={16} />
                      </span>
                      <DatePicker
                        id="appointment-date"
                        name="appointment-date"
                        selected={formState.date}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        locale="fr"
                        minDate={new Date()}
                        filterDate={(d: Date) => d.getDay() !== 0 && d.getDay() !== 6}
                        placeholderText="Choisir une date"
                        className="touch-area appearance-none border rounded-lg w-full py-3 pl-10 pr-3 text-sm text-text-main focus:ring-2 focus:ring-accent/20 bg-bg-secondary border-border-color hover:border-accent/50 transition-all duration-200 placeholder-text-muted"
                        todayButton="Aujourd'hui"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="appointment-hour" className="sr-only">Heure</label>
                      <select 
                        id="appointment-hour"
                        name="appointment-hour"
                        value={selectedHour ?? (formState.date ? new Date(formState.date).getHours() : '')} 
                        onChange={handleHourChange} 
                        className="touch-area focus-visible appearance-none border rounded-lg w-full py-3 px-4 text-sm text-text-main leading-tight focus:outline-none focus:ring-2 focus:ring-accent/20 bg-bg-secondary border-border-color hover:border-accent/50 transition-all duration-200" 
                        required
                      >
                        <option value="" disabled>Heure</option>
                        {HOURS.map((h) => (
                          <option key={h} value={h}>{`${h.toString().padStart(2, '0')}:00`}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="touch-area focus-visible w-full btn mt-6">
                  <span className="flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    Prendre rendez-vous
                  </span>
                </motion.button>

                {sent && (
                  <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg text-sm text-accent font-medium text-center">
                    ✅ Votre demande de rendez-vous a été enregistrée avec succès.
                  </div>
                )}
              </form>
            </motion.div>

          </div>

          {/* IMAGE DIGICODE */}
          <div className="flex justify-center mt-4">
            <motion.img 
              src={PROFILE_IMAGE} 
              alt="Abderrahmane El Farouah" 
              width="80"
              height="80"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-accent/30 shadow-glow-orange cursor-pointer" 
              onClick={handleImageClick} 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
            />
          </div>

          {/* BACK OFFICE */}
          {showBackOffice && (
            <div className="fixed top-16 right-6 w-[380px] glass rounded-design p-5 shadow-glow-orange z-[60] border border-border-color">
              <h2 className="text-lg font-display font-semibold mb-2 text-text-main">Back-office <span className="text-accent">sécurisé</span></h2>
              <p className="text-sm text-text-secondary mb-3 font-body">Voici les demandes de rendez-vous :</p>
              <ul className="max-h-64 overflow-auto pr-1 space-y-2">
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="text-sm text-text-main bg-bg-secondary rounded-design px-3 py-2 flex items-center justify-between border border-border-color font-body">
                    <span className="truncate">
                      {appointment.firstName} {appointment.lastName} - {appointment.email} - {new Date(appointment.date).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => handleSendConfirmation(appointment)} className="touch-area focus-visible px-2 py-1 rounded-design bg-accent-gradient text-white hover:shadow-glow-orange-hover transition-all font-body">Envoyer</button>
                      <button onClick={() => handleDeleteAppointment(appointment.id)} className="touch-area focus-visible px-2 py-1 rounded-design bg-red-500 text-white hover:bg-red-600 transition-all font-body">Supprimer</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowBackOffice(false)} className="touch-area focus-visible btn btn-secondary">Fermer</button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </section>
  );
}
