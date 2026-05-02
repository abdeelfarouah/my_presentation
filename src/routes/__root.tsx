import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import SEO from '../components/SEO'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { ThemeProvider } from '../contexts/ThemeContext'
import { MenuProvider, useMenu } from '../contexts/MenuContext'

function RootComponent() {
  const { isMenuOpen } = useMenu()

  return (
    <HelmetProvider>
      <SEO />
      <div className="flex flex-col min-h-screen w-full mx-auto transition-all duration-500 ease-out p-3 sm:p-4 md:p-6 lg:p-8">
        <header role="banner">
          <Navbar activeTab="home" />
        </header>
        <main role="main"
          id="main-content"
          className={`flex-1 h-auto transition-all duration-500 ease-out ${isMenuOpen ? 'pointer-events-none blur-sm scale-[0.98]' : ''}`}
        >
          <div className="h-full">
            <Outlet />
          </div>
        </main>

        {/* WhatsApp Flottant Global */}
        <WhatsAppFloat />

        <footer role="contentinfo" className="mt-4 sm:mt-6 md:mt-8 py-6 sm:py-8 text-center rounded-2xl glass-strong transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="tracking-normal font-medium text-sm sm:text-base mb-3 text-text-secondary">
            &copy; 2025 -  {new Date().getFullYear()} Abderrahmane El Farouah. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link
                to="/mentions-legales"
                className="text-accent hover:text-accent-foreground transition-colors font-medium hover:underline underline-offset-4"
              >
                Mentions légales
              </Link>
              <span className="text-text-muted">•</span>
              <Link
                to="/cgv"
                className="text-accent hover:text-accent-foreground transition-colors font-medium hover:underline underline-offset-4"
              >
                CGV
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  )
}

function RootWithProviders() {
  return (
    <ThemeProvider>
      <MenuProvider>
        <RootComponent />
      </MenuProvider>
    </ThemeProvider>
  )
}

export const Route = createRootRoute({
  component: RootWithProviders,
})
