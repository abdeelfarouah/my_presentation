import { Github, Linkedin, Mail, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from 'date-fns/locale/fr';
import { PROFILE_IMAGE } from '../utils/images';

interface Appointment {
  id: number;
  name: string;
  email: string;
  date: string;
}

// Base URL pour l'API: en dev, proxy Vite renvoie vers 4000; en prod, même origin
const API_BASE = '/api';

export default function Contact() {
  registerLocale('fr', fr);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const [formState, setFormState] = useState<{ name: string; email: string; date: Date | null }>({
    name: '',
    email: '',
    date: null,
  });
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const HOURS = Array.from({ length: 9 }).map((_, i) => 10 + i); // 10..18 inclus
  const [sent, setSent] = useState(false);

  const [showBackOffice, setShowBackOffice] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // --- Fetch appointments si back-office visible
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
    setFormState({ ...formState, [e.target.name]: e.target.value });
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
    if (!date) { setFormState({ ...formState, date }); return; }
    // Si l'utilisateur choisit uniquement la date (00:00), fixer une heure par défaut (prochaine heure pleine)
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
    if (!formState.name.trim()) return "Le nom est obligatoire.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) return "Email invalide.";
    if (!formState.date) return "Veuillez choisir une date et une heure.";
    if (formState.date < new Date()) return "La date doit être dans le futur.";
    return null;
  };

  // --- Digicode back-office
  const handleImageClick = async () => {
    const code = prompt("Veuillez entrer le digicode pour accéder au back-office :");
    if (!code) return;

    try {
      const res = await fetch(`${API_BASE}/check-digicode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      type DigicodeResponse = { success: boolean };
      let data: DigicodeResponse = { success: false };
      try {
        data = await res.json() as DigicodeResponse;
      } catch {
        data = { success: false };
      }
      if (data.success) {
        setShowBackOffice(true);
      } else {
        alert("Digicode incorrect !");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la vérification du digicode");
    }
  };

  // --- Soumission rendez-vous
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) { alert(error); return; }

    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          date: formState.date?.toISOString(),
        }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setFormState({ name: '', email: '', date: null });
        alert("Rendez-vous enregistré !");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement du rendez-vous");
    }
  };

  // --- Envoyer confirmation par mail
  const meetingLink = "https://meet.google.com/xxx-xxxx-xxx";
  const handleSendConfirmation = (appointment: Appointment) => {
    const formattedDate = new Date(appointment.date).toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" });
    const subject = `Confirmation de votre rendez-vous`;
    const body = `Bonjour ${appointment.name},\n\nVotre rendez-vous est confirmé pour le ${formattedDate}.\n\nLien pour la réunion : ${meetingLink}\n\nMerci,`;
    window.location.href = `mailto:${appointment.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="h-full w-full min-h-[480px] py-6 px-2 sm:py-10 md:py-14 chrome-surface bg-radial-faint max-w-[1280px] mx-auto rounded-xl ring-chrome">
      <div className="h-full animate-fade-in flex flex-col w-full">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-4 sm:mb-8">Contactez-moi</h2>

          {/* Grille principale: infos + reseaux | formulaire */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
            {/* Carte informations + reseaux */}
            <motion.div variants={itemVariants} className="glass ring-chrome rounded-xl p-4 sm:p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Informations</h3>
                <div className="flex items-center gap-3"><MapPin className="text-blue-600 dark:text-blue-400" /><span className="text-gray-700 dark:text-gray-300">France</span></div>
                <div className="flex items-center gap-3"><Mail className="text-blue-600 dark:text-blue-400" /><a href="mailto:A.elfarouahDEV@outlook.fr" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 underline">A.elfarouahDEV@outlook.fr</a></div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Réseaux</h3>
                <a href="https://github.com/Abdeelfarouah/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/70 transition ring-1 ring-transparent hover:ring-blue-200/40 dark:hover:ring-blue-400/20">
                  <span className="flex items-center gap-3"><Github className="text-gray-900 dark:text-white" /><span className="text-gray-700 dark:text-gray-300">@Abdeelfarouah</span></span>
                </a>
                <a href="https://fr.linkedin.com/in/abderrahmaneelfarouah" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/70 transition ring-1 ring-transparent hover:ring-blue-200/40 dark:hover:ring-blue-400/20">
                  <span className="flex items-center gap-3"><Linkedin className="text-blue-600" /><span className="text-gray-700 dark:text-gray-300">Abderrahmane El Farouah</span></span>
                </a>
              </div>
            </motion.div>

            {/* Carte formulaire */}
            <motion.div variants={itemVariants} className="glass ring-chrome rounded-xl p-4 sm:p-6">
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">N'hésitez pas à me contacter pour discuter de vos projets ou opportunités de collaboration.</p>
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Nom</label>
                    <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} placeholder="Votre nom" className="touch-area focus-visible appearance-none border rounded-md w-full py-2.5 px-3 text-gray-800 dark:text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300/60 dark:focus:ring-blue-400/30 dark:bg-gray-800/80 bg-white/70" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} placeholder="exemple@mail.com" className="touch-area focus-visible appearance-none border rounded-md w-full py-2.5 px-3 text-gray-800 dark:text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300/60 dark:focus:ring-blue-400/30 dark:bg-gray-800/80 bg-white/70" required />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Date et heure du rendez-vous</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                        <Calendar size={18} />
                      </span>
                      <DatePicker
                        selected={formState.date}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        locale="fr"
                        minDate={new Date()}
                        filterDate={(d: Date) => d.getDay() !== 0 && d.getDay() !== 6}
                        placeholderText="Choisissez une date"
                        className="appearance-none border rounded-md w-full py-2.5 pl-10 pr-3 text-gray-800 dark:text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300/60 dark:focus:ring-blue-400/30 dark:bg-gray-800/80 bg-white/70"
                        calendarClassName="glass"
                        popperClassName="rdp-popper"
                        showPopperArrow={false}
                        todayButton="Aujourd'hui"
                        required
                      />
                    </div>
                    <div>
                      <select value={selectedHour ?? (formState.date ? new Date(formState.date).getHours() : '')} onChange={handleHourChange} className="touch-area focus-visible appearance-none border rounded-md w-full py-2.5 px-3 text-gray-800 dark:text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300/60 dark:focus:ring-blue-400/30 dark:bg-gray-800/80 bg-white/70" required>
                        <option value="" disabled>Choisissez l'heure</option>
                        {HOURS.map((h) => (
                          <option key={h} value={h}>{`${h.toString().padStart(2, '0')}:00`}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="touch-area focus-visible mt-6 btn-shiny">Envoyer</motion.button>
                {sent && <p className="mt-4 text-green-600 dark:text-green-400 font-medium">✅ Votre rendez-vous a été enregistré.</p>}
              </form>
            </motion.div>
          </div>

          {/* Image pour digicode */}
          <div className="flex justify-center">
            <motion.img src={PROFILE_IMAGE} alt="Abderrahmane El Farouah" className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover ring-2 ring-white/60 dark:ring-white/10 shadow-lg cursor-pointer" onClick={handleImageClick} />
          </div>

          {/* Back-office */}
          {showBackOffice && (
            <div className="fixed top-16 right-6 w-[380px] glass ring-chrome rounded-xl p-5 shadow-lg z-[60]">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Back-office sécurisé</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Voici les demandes de rendez-vous :</p>
              <ul className="max-h-64 overflow-auto pr-1 space-y-2">
                {appointments.map((appointment: Appointment) => (
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
