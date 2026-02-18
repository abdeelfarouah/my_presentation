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
    { id: 'experience', label: 'Parcours', path: '/experience' },
    { id: 'services', label: 'Services', path: '/services' },
  ];

  const activeTab = useMemo(() => {
    if (activeTabProp) return activeTabProp;
    return location.pathname.split('/').filter(Boolean)[0] || 'home';
  }, [activeTabProp, location.pathname]);

  return (
    <nav className="glass sticky top-0 border-b border-border-color/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + titre */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img 
                src={NAV_IMAGE} 
                alt="Abderrahmane El Farouah" 
                width="48"
                height="48"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shadow-md border border-border-color/20 hover:shadow-lg transition-all duration-200"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm md:text-base lg:text-lg font-semibold text-text-main leading-tight">
                Abderrahmane <span className="text-text-secondary">El Farouah</span>
              </h1>
              <p className="text-xs md:text-sm text-text-secondary font-medium">
                Développeur Fullstack
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`touch-area focus-visible inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeTab === item.id
                      ? 'text-accent bg-accent/10 shadow-sm'
                      : 'text-text-secondary hover:text-text-main hover:bg-bg-secondary/50'
                    }`}
                  aria-current={activeTab === item.id ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Toggle + Theme */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <button
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden touch-area focus-visible inline-flex items-center justify-center p-2 rounded-lg text-text-secondary hover:text-text-main hover:bg-bg-secondary/50 transition-all duration-200"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[59] bg-black/50 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 right-0 h-screen w-72 glass z-[60] transform transition-transform duration-300 ease-in-out translate-x-0 border-l border-border-color/50">
            <div className="flex flex-col h-screen">
              <div className="flex items-center justify-between p-4 border-b border-border-color/50 flex-shrink-0">
                <h2 className="text-lg font-semibold text-text-main">Navigation</h2>
                <button
                  aria-label="Fermer le menu"
                  onClick={() => setIsOpen(false)}
                  className="touch-area focus-visible p-2 rounded-lg text-text-secondary hover:text-text-main hover:bg-bg-secondary/50 transition-all duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col p-4 overflow-hidden space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`touch-area focus-visible block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                      ${activeTab === item.id
                        ? 'text-accent bg-accent/10 shadow-sm'
                        : 'text-text-secondary hover:text-text-main hover:bg-bg-secondary/50'
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
