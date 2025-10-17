import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const routeToTab = (pathname: string) => {
    const seg = pathname.split('/').filter(Boolean)[0] || 'home';
    return ['home', 'about', 'projects', 'skills', 'experience', 'contact'].includes(seg)
      ? seg
      : 'home';
  };

  const [activeTab, setActiveTab] = useState(routeToTab(location.pathname));

  useEffect(() => {
    setActiveTab(routeToTab(location.pathname));
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div
        className="
          min-h-screen flex flex-col w-full mx-auto overflow-y-auto
          bg-gradient-to-br from-blue-100/40 via-white/60 to-blue-200/20
          dark:from-blue-900/40 dark:via-slate-900/60 dark:to-blue-950/30
          backdrop-blur-2xl
          p-4 sm:p-6 md:p-10
          max-w-[1280px]
          transition-all duration-500 ease-in-out
          shadow-[inset_0_0_80px_rgba(255,255,255,0.15)]
        "
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25), transparent 70%), radial-gradient(circle at 80% 70%, rgba(0,100,255,0.25), transparent 70%)',
        }}
      >
        {/* Navbar */}
        <Navbar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            navigate(tab === 'home' ? '/' : `/${tab}`);
          }}
        />

        {/* Contenu principal animé */}
        <main id="main-content" className="flex-1 overflow-y-auto">
          <div className="h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full"
              >
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Hero />} />
                  <Route path="/home" element={<Navigate to="/" />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer avec effet chrome */}
        <footer
          className="
            mt-4 py-4 rounded-2xl text-center
            glass ring-1 ring-blue-300/30 dark:ring-blue-700/30
            bg-white/30 dark:bg-blue-900/20
            backdrop-blur-xl shadow-inner
            text-blue-800 dark:text-blue-100
            transition-all duration-300
            hover:bg-white/40 dark:hover:bg-blue-900/30
          "
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="tracking-wide font-medium drop-shadow-sm">
              &copy; {new Date().getFullYear()} Abderrahmane El Farouah
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

