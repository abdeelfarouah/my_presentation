import { useMemo, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
  </div>
);

// Lazy load components
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const MentionsLegales = lazy(() => import('./components/MentionsLegales'));
const CGV = lazy(() => import('./components/CGV'));

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
    <h1 className="text-6xl font-display font-bold text-accent mb-4">404</h1>
    <p className="text-lg sm:text-xl text-text-secondary mb-6 font-body">Page non trouvée</p>
    <Link
      to="/"
      className="btn"
    >
      Retour à l'accueil
    </Link>
  </div>
);

export default function App() {
  const location = useLocation();

  // Gestion simplifiée activeTab
  const activeTab = useMemo(() => {
    const seg = location.pathname.split('/').filter(Boolean)[0] || 'home';
    const validTabs = new Set(['home', 'about', 'projects', 'skills', 'experience']);
    return seg === 'contact' ? 'home' : validTabs.has(seg) ? seg : 'home';
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div
        className="
          flex flex-col min-h-screen w-full mx-auto
          backdrop-blur-2xl transition-all duration-500 ease-in-out
          p-2 sm:p-3 md:p-6 lg:p-10
          rounded-none sm:rounded-3xl
        "
      >
        {/* Navbar */}
        <Navbar activeTab={activeTab} />

        {/* Main content */}
        <main id="main-content" className="flex-1 h-auto">
          <div className="h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full"
              >
                <Suspense fallback={<LoadingFallback />}>
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Contact />} />
                    <Route path="/contact" element={<Navigate to="/" />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/mentions-legales" element={<MentionsLegales />} />
                    <Route path="/cgv" element={<CGV />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="
            mt-3 sm:mt-4 md:mt-5 py-3 sm:py-4 text-center rounded-2xl
            glass
            transition-all duration-300
            sm:mt-8
          "
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="tracking-wide font-medium text-sm sm:text-base mb-2">
              &copy; {new Date().getFullYear()} Abderrahmane El Farouah
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <Link
                to="/mentions-legales"
                className="text-accent hover:text-accent-hover hover:underline transition-colors font-body"
                aria-current={activeTab === 'mentions-legales' ? 'page' : undefined}
              >
                Mentions légales
              </Link>
              <span className="text-text-secondary">|</span>
              <Link
                to="/cgv"
                className="text-accent hover:text-accent-hover hover:underline transition-colors font-body"
                aria-current={activeTab === 'cgv' ? 'page' : undefined}
              >
                CGV
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

