import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { NAV_IMAGE } from '../utils/images';
interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'projects', label: 'Projets' },
    { id: 'skills', label: 'Compétences' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onTabChange(id);
    navigate(id === 'home' ? '/' : `/${id}`);
  };

  return (
    <nav className="glass metal-surface z-[60] sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">
              <img src={NAV_IMAGE} className="w-12 h-12 sm:w-16 sm:h-16" alt="Logo" />
            </div>
            <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-white text-left leading-tight">
              Abderrahmane el farouah<br className="block sm:hidden" />
              <span className="hidden sm:inline"> </span>Développeur Angular/Laravel
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <button
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setIsOpen(!isOpen)}
              className="touch-area focus-visible inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-blue-400 ring-1 ring-transparent hover:ring-blue-200/40 dark:hover:ring-blue-400/20"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar menu */}
      {isOpen && (
        <div
          className="fixed top-0 right-0 h-screen w-64 md:w-80 glass metal-surface ring-chrome z-[60] transform transition-transform duration-300 ease-in-out translate-x-0"
        >
        <div className="flex flex-col h-screen">
          <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-white/10 flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
            <button
              aria-label="Fermer le menu"
              onClick={() => setIsOpen(false)}
              className="touch-area focus-visible p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/70"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`touch-area focus-visible block w-full text-left px-4 py-3 rounded-lg text-base font-medium ring-1 ring-transparent transition-all
                    ${activeTab === item.id
                      ? 'text-blue-600 dark:text-blue-400 bg-white/70 dark:bg-gray-800 ring-blue-200/40 dark:ring-blue-400/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/70 hover:ring-blue-200/40 dark:hover:ring-blue-400/20'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
      )}
    </nav>
  );
}