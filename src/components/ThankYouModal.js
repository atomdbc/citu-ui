'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';

const translations = {
  'en-US': {
    thankYou: 'Thank you for registering for Early Access!',
    message: 'You will be first to know when citu is live in Côte d\'Ivoire. One of our representatives will be in touch soon.',
    share: 'Share',
    website: 'www.citu.ci',
    connectWithUs: 'Connect With Us',
    returnHome: 'Return to Home'
  },
  'fr': {
    thankYou: 'Merci de vous être inscrit pour l\'accès anticipé !',
    message: 'Vous serez le premier à savoir quand citu sera disponible en Côte d\'Ivoire. L\'un de nos représentants vous contactera bientôt.',
    share: 'Partager',
    website: 'www.citu.ci',
    connectWithUs: 'Connectez-vous avec nous',
    returnHome: 'Retour à l\'accueil'
  }
};

const ThankYouModal = ({ isOpen, onClose, lang = 'en-US' }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const t = translations[lang] || translations['en-US'];

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        document.body.style.overflow = 'unset';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div 
      className={`fixed inset-0 bg-[#DD4440] flex justify-center items-center z-50
        transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className={`bg-white rounded-[20px] sm:rounded-[32px] p-4 sm:p-8 w-full max-w-[480px] mx-4 relative
          transition-all duration-300 ease-out transform ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="text-center mb-4 sm:mb-6">
          <Image 
            src="/citu_logo.png" 
            alt="citu Logo" 
            width={100} 
            height={40} 
            className="mx-auto sm:w-[120px] sm:h-[48px]" 
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#DD4440] mb-3 sm:mb-4 text-center px-2">
          {t.thankYou}
        </h2>

        <p className="text-gray-700 text-sm sm:text-base text-center mb-6 sm:mb-8 px-2">
          {t.message}
        </p>

        <div className="space-y-6 sm:space-y-8">
          <div className="text-center">
            <h3 className="text-[#DD4440] text-sm sm:text-base font-medium mb-2">{t.share}</h3>
            <a 
              href="https://www.citu.ci" 
              className="text-sm sm:text-base text-gray-600 hover:text-[#DD4440] transition-colors"
            >
              {t.website}
            </a>
          </div>

          <div className="text-center">
            <h3 className="text-[#DD4440] text-sm sm:text-base font-medium mb-3 sm:mb-4">
              {t.connectWithUs}
            </h3>
            <div className="flex justify-center gap-4 sm:gap-6">
              <a href="#" className="text-gray-400 hover:text-[#DD4440] transition-colors">
                <Twitter size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#DD4440] transition-colors">
                <Instagram size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#DD4440] transition-colors">
                <Facebook size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#DD4440] transition-colors">
                <Linkedin size={20} className="sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href={`/${lang}`}
              className="bg-[#DD4440] text-white py-2.5 sm:py-3 px-8 sm:px-12 rounded-[24px] sm:rounded-[32px] 
                text-sm sm:text-base font-medium hover:bg-[#C33C39] transition-colors duration-300"
            >
              {t.returnHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouModal;