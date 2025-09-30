import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PROFILE_IMAGE } from '../utils/images';

interface Appointment {
  id: number;
  name: string;
  email: string;
  date: string;
}

export default function Contact() {
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
  const [sent, setSent] = useState(false);

  const [showBackOffice, setShowBackOffice] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // --- Fetch appointments si back-office visible
  const fetchAppointments = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/appointments', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (showBackOffice) fetchAppointments();
  }, [showBackOffice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date: Date | null) => setFormState({ ...formState, date });

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
      const res = await fetch('http://localhost:4000/api/check-digicode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.success) {
        setShowBackOffice(true);
      } else {
        alert("Digicode incorrect !");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Soumission rendez-vous
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) { alert(error); return; }

    try {
      const res = await fetch('http://localhost:4000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
        alert("Rendez-vous enregistré côté serveur !");
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
    <section id="contact" className="flex items-center justify-center h-full w-full min-h-[400px] py-10 px-2 sm:py-16 bg-white dark:bg-gray-900 max-w-[1280px] mx-auto rounded-lg">
      <div className="h-full animate-fade-in flex flex-col items-center justify-center w-full">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Contactez-moi</h2>

          {/* Informations & Réseaux */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <motion.div variants={itemVariants} className="flex-1 space-y-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Informations</h3>
              <div className="flex items-center gap-3"><MapPin className="text-blue-600 dark:text-blue-400" /><span className="text-gray-700 dark:text-gray-300">France</span></div>
              <div className="flex items-center gap-3"><Mail className="text-blue-600 dark:text-blue-400" /><a href="mailto:A.elfarouahDEV@outlook.fr" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 underline">A.elfarouahDEV@outlook.fr</a></div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex-1 space-y-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Réseaux</h3>
              <a href="https://github.com/Abdeelfarouah/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"><Github className="text-gray-900 dark:text-white" /><span className="text-gray-700 dark:text-gray-300">@Abdeelfarouah</span></a>
              <a href="https://fr.linkedin.com/in/abderrahmaneelfarouah" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"><Linkedin className="text-blue-600" /><span className="text-gray-700 dark:text-gray-300">Abderrahmane El Farouah</span></a>
            </motion.div>
          </div>

          {/* Formulaire */}
          <motion.div variants={itemVariants} className="text-center text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            <p>N'hésitez pas à me contacter pour discuter de vos projets ou opportunités de collaboration.</p>

            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nom:</label>
                <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} placeholder="Votre nom" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email:</label>
                <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} placeholder="exemple@mail.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800" required />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Date et heure du rendez-vous:</label>
                <DatePicker selected={formState.date} onChange={handleDateChange} dateFormat="dd/MM/yyyy HH:mm" showTimeSelect timeFormat="HH:mm" timeIntervals={30} minDate={new Date()} placeholderText="Choisissez une date et une heure" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800" required />
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Envoyer</motion.button>
              {sent && <p className="mt-4 text-green-600 dark:text-green-400 font-medium">✅ Votre rendez-vous a été enregistré.</p>}
            </form>
          </motion.div>

          {/* Image pour digicode */}
          <div className="flex justify-center items-center mt-6">
            <motion.img src={PROFILE_IMAGE} alt="Abderrahmane El Farouah" className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg cursor-pointer" onClick={handleImageClick} />
          </div>

          {/* Back-office */}
          {showBackOffice && (
            <div style={{ position: 'fixed', top: 50, right: 50, width: 400, background: '#fff', border: '2px solid #000', padding: 20, zIndex: 9999 }}>
              <h2>Back-office sécurisé</h2>
              <p>Voici les demandes de rendez-vous :</p>
              <ul>
                {appointments.map((appointment: Appointment) => (
                  <li key={appointment.id} className="mb-2">
                    {appointment.name} - {appointment.email} - {new Date(appointment.date).toLocaleString()}
                    <button onClick={() => handleSendConfirmation(appointment)} className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Envoyer confirmation</button>
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowBackOffice(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Fermer</button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
