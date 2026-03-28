import { Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
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
    } catch (err) {
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
    } catch (err) {
      setAdminError('Erreur de connexion');
    }
  };

  return (
    <main id="contact" className="min-h-screen py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">

        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Prise de <span className="text-blue-600">Rendez-vous</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discutons de votre projet lors d'un entretien personnalisé.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Profil */}
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="flex justify-center mb-6">
              <img 
                src={PROFILE_IMAGE} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
              Abderrahmane El Farouah
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Spécialiste applications web Angular & Laravel
            </p>
            <div className="flex justify-center gap-3">
              <a href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                <Github className="w-5 h-5 text-gray-700" />
              </a>
              <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href={`mailto:a.elfarouahDEV@outlook.com`} className="p-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
              Prendre rendez-vous
            </h2>
            
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
                  <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    value={formState.firstName}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-2">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    value={formState.lastName}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-gray-700 text-sm font-medium mb-2">Date</label>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholderText="Choisissez une date"
                    required
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="hour" className="block text-gray-700 text-sm font-medium mb-2">Heure</label>
                  <select
                    id="hour"
                    name="hour"
                    value={selectedHour || ''}
                    onChange={handleHourChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Sélectionnez une heure</option>
                    {HOURS.map((hour) => (
                      <option key={hour} value={hour}>{hour}:00</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Confirmer le rendez-vous
                </button>
              </form>
            )}
          </div>
        </div>

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
            <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-semibold mb-4">Accès Admin</h3>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="Code admin"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                {adminError && <p className="text-red-500 text-sm">{adminError}</p>}
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Connexion</button>
                  <button type="button" onClick={() => setShowAdminLogin(false)} className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300">Annuler</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Admin panel */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow border border-gray-200 mt-8 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Rendez-vous ({appointments.length})</h3>
              <button onClick={() => setIsAdmin(false)} className="text-gray-500 hover:text-gray-700">Fermer</button>
            </div>
            {appointments.map((apt) => (
              <div key={apt.id} className="p-3 bg-gray-50 rounded mb-2 flex justify-between">
                <div>
                  <p className="font-medium">{apt.name}</p>
                  <p className="text-sm text-gray-600">{new Date(apt.date).toLocaleString('fr-FR')}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
