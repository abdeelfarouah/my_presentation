import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Popup WhatsApp */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        >
          <div className="glass rounded-2xl p-6 max-w-md w-full mx-4 relative">
            {/* Bouton fermer */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Fermer WhatsApp"
            >
              <X size={20} />
            </button>

            {/* Contenu WhatsApp */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageCircle size={40} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-text-main mb-3">
                WhatsApp
              </h3>
              
              <p className="text-text-secondary mb-4">
                Discutez directement de votre projet avec moi sur WhatsApp. 
                Réponse rapide et sans engagement.
              </p>
              
              <a
                href="https://wa.me/33760751350"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-200 text-lg shadow-lg"
              >
                <MessageCircle size={24} />
                <span>Contacter</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Bouton flottant attractif - Desktop + Mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-110 group"
        aria-label="Contacter par WhatsApp"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Badge flottant attractif */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 -translate-y-24 z-40 bg-white rounded-full px-3 py-1 shadow-lg flex items-center gap-1 text-sm font-medium text-gray-700 animate-pulse">
        <span className="hidden sm:inline">Disponible</span>
      </div>
    </>
  );
}
