import { motion } from 'framer-motion';
import { ComponentProps } from 'react';
import Hero from '../components/sections/Hero';

type MainProps = ComponentProps<typeof motion.main> & {
  className?: string;
};

export default function Home() {
  console.log('Composant Home rendu'); // Log de débogage
  
  const mainProps: MainProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
    className: 'min-h-screen',
    style: {
      border: '2px solid blue', // Bordure bleue pour le débogage
      padding: '20px',
      backgroundColor: '#f0f0f0', // Fond gris clair pour une meilleure visibilité
      minHeight: '100vh',
      position: 'relative',
      zIndex: 1
    }
  };

  return (
    <motion.main {...mainProps}>
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '24px',
          marginBottom: '20px',
          color: '#333'
        }}>Bienvenue sur mon portfolio</h1>
        
        <p style={{
          marginBottom: '20px',
          color: '#666'
        }}>Ceci est un message de débogage pour vérifier le rendu.</p>
        
        <Hero />
      </div>
    </motion.main>
  );
}