import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function App() {
  const location = useLocation();

  const routeToTab = (pathname: string) => {
    const seg = pathname.split('/').filter(Boolean)[0] || 'home';
    return ['home','about','projects','skills','experience','contact'].includes(seg) ? seg : 'home';
  };

  const [activeTab, setActiveTab] = useState(routeToTab(location.pathname));

  useEffect(() => {
    setActiveTab(routeToTab(location.pathname));
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div
        className="
          min-h-screen flex flex-col
          bg-gray-50 dark:bg-gray-950 bg-radial-faint fluid-bg transition-colors
          w-full
          max-w-[768px] max-h-[1024px]    // smartphone portrait par défaut
          sm:max-w-[800px] sm:max-h-[1280px] // tablette portrait
          md:max-w-[1280px] md:max-h-[800px] // desktop paysage
          mx-auto
          overflow-y-auto
          p-4 sm:p-6 md:p-10
        "
        style={{ minHeight: '100vh' }}
      >
        {/* Navbar */}
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-full flex items-center justify-center">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/home" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="glass ring-chrome text-gray-800 dark:text-gray-100 py-4 mt-4 rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} Abderrahmane El Farouah</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}