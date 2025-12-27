import { useMemo, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
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
    <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 mb-6">Page non trouvée</p>
    <Link
      to="/"
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
          bg-gradient-to-br from-blue-100/40 via-white/60 to-blue-200/20
          dark:from-blue-900/40 dark:via-slate-900/60 dark:to-blue-950/30
          backdrop-blur-2xl transition-all duration-500 ease-in-out
          p-2 sm:p-3 md:p-6 lg:p-10
          shadow-[inset_0_0_80px_rgba(255,255,255,0.1)]
          rounded-none sm:rounded-3xl
        "
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25), transparent 70%), radial-gradient(circle at 80% 70%, rgba(0,100,255,0.25), transparent 70%)',
        }}
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
            bg-white/30 dark:bg-blue-900/20
            ring-1 ring-blue-300/30 dark:ring-blue-700/30
            backdrop-blur-xl shadow-inner
            text-blue-800 dark:text-blue-100
            transition-all duration-300
            hover:bg-white/40 dark:hover:bg-blue-900/30
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
                className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                aria-current={activeTab === 'mentions-legales' ? 'page' : undefined}
              >
                Mentions légales
              </Link>
              <span className="text-gray-500 dark:text-gray-400">|</span>
              <Link
                to="/cgv"
                className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
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

