import { Menu, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { NAV_IMAGE } from '../utils/images';

type NavbarProps = {
  activeTab?: string;
};

export default function Navbar({ activeTab: activeTabProp }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Accueil', path: '/' },
    { id: 'about', label: 'À propos', path: '/about' },
    { id: 'projects', label: 'Projets', path: '/projects' },
    { id: 'skills', label: 'Compétences', path: '/skills' },
    { id: 'experience', label: 'Expérience', path: '/experience' },
  ];

  const activeTab = useMemo(() => {
    if (activeTabProp) return activeTabProp;
    return location.pathname.split('/').filter(Boolean)[0] || 'home';
  }, [activeTabProp, location.pathname]);

  return (
    <nav className="glass metal-surface z-[60] sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + titre */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">
              <img src={NAV_IMAGE} width="64" height="64" className="w-12 h-12 sm:w-16 sm:h-16" alt="Logo" />
            </div>
            <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-white leading-tight">
              Abderrahmane el farouah<br className="block sm:hidden" />
              <span className="hidden sm:inline"> </span>Développeur Angular/Laravel
            </h1>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 px-4">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`touch-area focus-visible inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium ring-1 ring-transparent transition-all
                    ${activeTab === item.id
                      ? 'text-blue-600 dark:text-blue-400 bg-white/70 dark:bg-gray-800 ring-blue-200/40 dark:ring-blue-400/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/70 hover:ring-blue-200/40 dark:hover:ring-blue-400/20'
                    }`}
                  aria-current={activeTab === item.id ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Toggle + Theme */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <button
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden touch-area focus-visible inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-blue-400 ring-1 ring-transparent hover:ring-blue-200/40 dark:hover:ring-blue-400/20"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[59] bg-black/30 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 right-0 h-screen w-64 md:w-80 glass metal-surface ring-chrome z-[60] transform transition-transform duration-300 ease-in-out translate-x-0">
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

              <nav className="flex-1 flex flex-col justify-between p-4 overflow-hidden space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`touch-area focus-visible block w-full text-left px-4 py-3 rounded-lg text-base font-medium ring-1 ring-transparent transition-all
                      ${activeTab === item.id
                        ? 'text-blue-600 dark:text-blue-400 bg-white/70 dark:bg-gray-800 ring-blue-200/40 dark:ring-blue-400/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/70 hover:ring-blue-200/40 dark:hover:ring-blue-400/20'
                      }`}
                    aria-current={activeTab === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
