// src/components/sections/Hero.tsx
import { motion } from 'framer-motion';

export default function Hero() {
  console.log('Composant Hero rendu'); // Log de débogage
  
  return (
    <section 
      style={{
        padding: '40px 0',
        background: 'linear-gradient(90deg, #e0f2fe 0%, #e0e7ff 100%)',
        width: '100%',
        border: '2px solid red', // Bordure rouge pour le débogage
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        position: 'relative',
        zIndex: 11
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center'
          }}
        >
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#1e293b',
            lineHeight: '1.2'
          }}>
            Abderrahmane El Farouah
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              fontSize: '1.125rem',
              color: '#475569',
              marginTop: '1rem',
              marginBottom: 0
            }}
          >
            Développeur Full Stack
          </motion.p>
        </motion.div>
        
        {/* Message de débogage */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 100
        }}>
          Composant Hero
        </div>
      </div>
    </section>
  );
}