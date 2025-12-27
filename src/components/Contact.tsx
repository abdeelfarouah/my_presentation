import { Github, Linkedin, Mail, FileText, Calendar } from 'lucide-react';
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
  email: string;
  date: string;
}

const API_BASE = '/api';

export default function Contact() {
  registerLocale('fr', fr);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleDownloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = SOCIAL_LINKS.CV_URL;
    link.download = 'abderrahmane-elfarouah_cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const [formState, setFormState] = useState<{ email: string; date: Date | null }>({ email: '', date: null });
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const HOURS = Array.from({ length: 9 }).map((_, i) => 10 + i);
  const [sent, setSent] = useState(false);
  const [errorEmail, setErrorEmail] = useState<string>('');

  const [showBackOffice, setShowBackOffice] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 100) return;
    setFormState({ ...formState, email: value });

    if (!value.includes('@') || !value.includes('.')) setErrorEmail("L'adresse email doit contenir '@' et '.'");
    else setErrorEmail('');
  };

  const roundToNextHour = (d: Date) => {
    const copy = new Date(d);
    if (copy.getMinutes() !== 0 || copy.getSeconds() !== 0 || copy.getMilliseconds() !== 0) {
      copy.setHours(copy.getHours() + 1);
    }
    copy.setMinutes(0, 0, 0);
    return copy;
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      setFormState({ ...formState, date });
      return;
    }
    const isMidnight = date.getHours() === 0 && date.getMinutes() === 0;
    const base = isMidnight ? roundToNextHour(new Date()) : roundToNextHour(date);
    const hour = selectedHour ?? 10;
    const withHour = new Date(base);
    withHour.setHours(hour, 0, 0, 0);
    setSelectedHour(hour);
    setFormState({ ...formState, date: withHour });
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hour = parseInt(e.target.value, 10);
    setSelectedHour(hour);
    if (!formState.date) {
      const base = roundToNextHour(new Date());
      base.setHours(hour, 0, 0, 0);
      setFormState({ ...formState, date: base });
      return;
    }
    const updated = new Date(formState.date);
    updated.setHours(hour, 0, 0, 0);
    setFormState({ ...formState, date: updated });
  };

  const validateForm = () => {
    if (!formState.email.trim()) return "L'email est obligatoire.";
    if (!formState.email.includes('@') || !formState.email.includes('.')) return "L'adresse email doit contenir '@' et '.'";
    if (!formState.date) return 'Veuillez choisir une date et une heure.';
    if (formState.date < new Date()) return 'La date doit être dans le futur.';
    return null;
  };

 const handleImageClick = async () => {
  const code = prompt('Veuillez entrer le digicode pour accéder au back-office :');
  if (!code) return;
  try {
    console.log('Sending request to:', `${API_BASE}/check-digicode`); // Debug log
    const res = await fetch(`${API_BASE}/check-digicode`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    console.log('Response status:', res.status); // Debug log
    const data = await res.json();
    console.log('Response data:', data); // Debug log
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
          name: formState.email.split('@')[0] || 'Utilisateur',
          email: formState.email,
          date: formState.date?.toISOString(),
        }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setFormState({ email: '', date: null });
        alert('Rendez-vous enregistré !');
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement du rendez-vous");
    }
  };

  const meetingLink = 'https://meet.google.com/xxx-xxxx-xxx';
  const handleSendConfirmation = (appointment: Appointment) => {
    const formattedDate = new Date(appointment.date).toLocaleString('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'short',
    });
    const subject = 'Confirmation de votre rendez-vous';
    const body = `Bonjour ${appointment.name},

Votre rendez-vous est confirmé pour le ${formattedDate}.

Lien pour la réunion : ${meetingLink}

Merci,`;
    window.location.href = `mailto:${appointment.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="h-full w-full min-h-[480px] py-3 px-2 sm:py-4 md:py-6 chrome-surface bg-radial-faint max-w-[1000px] mx-auto rounded-xl ring-chrome">
      <div className="h-full animate-fade-in flex flex-col w-full">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="w-full">

          {/* GRID COTE A COTE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-3 sm:mb-4">

            {/* PROFIL */}
            <motion.div variants={itemVariants} className="glass ring-chrome rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={PROFILE_IMAGE}
                  alt="Abderrahmane El Farouah"
                  width="128"
                  height="128"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-2 ring-white/70 dark:ring-white/10 shadow-lg animate-float"
                />
              </div>
              <div className="space-y-3 mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Abderrahmane El Farouah</h1>
                <p className="text-md sm:text-lg text-gray-600 dark:text-gray-300">Développeur Web & AS 400</p>
              </div>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">
                Passionné par le développement web et les systèmes legacy,
                je crée des solutions innovantes qui allient technologie moderne et fiabilité.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <a href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer" className="touch-area focus-visible w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors ring-1 ring-white/20" title="GitHub">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="touch-area focus-visible w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full btn-shiny" title="LinkedIn">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <button onClick={handleDownloadCV} className="touch-area focus-visible w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 text-white hover:from-emerald-500/95 hover:to-emerald-600/95 transition-colors shadow-md" title="Télécharger mon CV">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <a href={`mailto:${SOCIAL_LINKS.EMAIL}`} className="touch-area focus-visible w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-b from-rose-500 to-rose-600 text-white hover:from-rose-500/95 hover:to-rose-600/95 transition-colors shadow-md" title="Email">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </motion.div>

            {/* FORMULAIRE */}
            <motion.div variants={itemVariants} className="glass ring-chrome rounded-xl p-3 sm:p-4">
              <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Contactez-moi</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-1.5">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="exemple@domaine.com"
                    maxLength={100}
                    className={`touch-area appearance-none border rounded-md w-full py-2 px-3 text-sm leading-tight focus:outline-none focus:ring-2 ${errorEmail ? 'border-red-500 focus:ring-red-400/30' : 'border-gray-300 focus:ring-blue-400/30'} text-gray-800 dark:text-gray-100 dark:bg-gray-800/80 bg-white/70`}
                    required
                  />
                  {errorEmail && <p className="text-red-500 text-xs mt-1">{errorEmail}</p>}
                </div>

                <div>
                  <div className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-1.5">Date et heure</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <label htmlFor="appointment-date" className="sr-only">Date</label>
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-blue-600 dark:text-blue-400">
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
                        placeholderText="Date"
                        className="appearance-none border rounded-md w-full py-2 pl-8 pr-2 text-sm text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400/30 dark:bg-gray-800/80 bg-white/70"
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
                        className="touch-area focus-visible appearance-none border rounded-md w-full py-2 px-2 text-sm text-gray-800 dark:text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400/30 dark:bg-gray-800/80 bg-white/70" 
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

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="touch-area focus-visible w-full btn-shiny mt-2">Envoyer</motion.button>

                {sent && <p className="mt-3 text-sm text-green-600 dark:text-green-400 font-medium">✅ Votre rendez-vous a été enregistré.</p>}
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
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-white/60 dark:ring-white/10 shadow-lg cursor-pointer" 
              onClick={handleImageClick} 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
            />
          </div>

          {/* BACK OFFICE */}
          {showBackOffice && (
            <div className="fixed top-16 right-6 w-[380px] glass ring-chrome rounded-xl p-5 shadow-lg z-[60]">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Back-office sécurisé</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Voici les demandes de rendez-vous :</p>
              <ul className="max-h-64 overflow-auto pr-1 space-y-2">
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="text-sm text-gray-800 dark:text-gray-200 bg-white/60 dark:bg-gray-800/70 rounded-md px-3 py-2 flex items-center justify-between">
                    <span className="truncate">{appointment.name} - {appointment.email} - {new Date(appointment.date).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    <button onClick={() => handleSendConfirmation(appointment)} className="touch-area focus-visible ml-2 px-2 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Envoyer</button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowBackOffice(false)} className="touch-area focus-visible px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700">Fermer</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
