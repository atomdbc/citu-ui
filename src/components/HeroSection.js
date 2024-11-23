'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Work_Sans } from 'next/font/google';
import UserEarlyAccessModal from './UserEarlyAccessModal';

const workSans = Work_Sans({ subsets: ['latin'] });

const translations = {
  'en-US': {
    title: 'The future of finding your new place, made simple.',
    buy: 'BUY',
    rent: 'RENT',
    comingSoon: 'coming soon...',
  },
  'fr': {
    title: "L'avenir de la recherche de votre bien, simplifié.",
    buy: 'ACHETER',
    rent: 'LOUER',
    comingSoon: 'bientôt disponible...',
  },
};

const HeroSection = ({ lang = 'en-US' }) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buy');
  const t = translations[lang] || translations['en-US'];

  return (
    <section className={`relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[778px] ${workSans.className}`}>
      {/* Background Image - Adjusted for mobile subject visibility */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero.png"
          alt="Woman with laptop"
          fill
          className="object-cover object-left sm:object-center"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Content Container */}
      <div className="relative w-full h-full max-w-[1440px] mx-auto px-0 sm:px-6 lg:px-8">
        {/* Search Container */}
        <div className="absolute w-[95%] sm:w-[85%] md:w-[720px] 
                      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
          {/* Semi-transparent background */}
          <div className="absolute inset-0 bg-white opacity-75 rounded-[24px] sm:rounded-[32px] md:rounded-[42px]" />

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 md:p-10">
            {/* Title */}
            <h1 className="text-[24px] sm:text-[32px] md:text-[42px] 
                         font-bold leading-tight text-center text-[#DD4440] 
                         max-w-[90%] sm:max-w-[95%] md:max-w-[600px] mx-auto">
              {t.title}
            </h1>

            {/* Red Search Container */}
            <div className="w-full max-w-[600px] mx-auto mt-4 sm:mt-6 md:mt-8 
                          bg-[#DD4440] rounded-[16px] sm:rounded-[20px] 
                          p-4 sm:p-6 md:p-8">
              {/* Buy/Rent Toggle */}
              <div className="flex items-center pl-[48px]">
                <button 
                  className={`text-white font-bold text-[20px] leading-[30px] relative transition-colors
                            ${activeTab === 'buy' ? '' : 'opacity-70 hover:opacity-90'}`}
                  onClick={() => setActiveTab('buy')}
                >
                  {t.buy}
                  {activeTab === 'buy' && (
                    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-white"></div>
                  )}
                </button>
                <div className="w-[15.43px]"></div>
                <button 
                  className={`text-white font-bold text-[20px] leading-[30px] relative transition-colors
                            ${activeTab === 'rent' ? '' : 'opacity-70 hover:opacity-90'}`}
                  onClick={() => setActiveTab('rent')}
                >
                  {t.rent}
                  {activeTab === 'rent' && (
                    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-white"></div>
                  )}
                </button>
              </div>

              {/* Search Input */}
              <div className="mt-4 relative">
                <input
                  type="text"
                  placeholder={t.comingSoon}
                  className="w-full h-[44px] sm:h-[48px] md:h-[50px] px-4 sm:px-6 
                           rounded-full text-gray-400 bg-white 
                           text-sm sm:text-base md:text-lg"
                  disabled
                />
                <button
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 
                           text-[#DD4440] p-1 sm:p-2 hover:text-[#EF4444] transition-colors"
                  onClick={() => setIsUserModalOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserEarlyAccessModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        lang={lang}
      />
    </section>
  );
};

export default HeroSection;