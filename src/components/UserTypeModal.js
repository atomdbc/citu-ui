import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Work_Sans } from 'next/font/google';
import Image from 'next/image';

const workSans = Work_Sans({ subsets: ['latin'] });

const translations = {
  'en-US': {
    title: 'Choose the option which best describes you',
    options: {
      seeker: 'Property\nSeeker',
      agent: 'Real Estate\nAgent',
      other: 'Other'
    },
    next: 'Next'
  },
  'fr': {
    title: 'Choisissez l\'option qui vous décrit le mieux',
    options: {
      seeker: 'Chercheur\n des biens',
      agent: 'Agent\nimmobilier',
      other: 'Autre'
    },
    next: 'Suivant'
  }
};

const UserTypeModal = ({ isOpen, onClose, onNext, lang = 'en-US' }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const modalRef = useRef(null);
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

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleNext = () => {
    if (selectedType) {
      onNext(selectedType);
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/30 flex justify-center items-center z-50 backdrop-blur-sm
        transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-[20px] sm:rounded-[32px] w-full max-w-[608px] mx-4 relative
          transition-all duration-300 ease-out transform 
          ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'}
          ${workSans.className}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center px-6 sm:px-12 py-8 sm:py-12">
          {/* Logo */}
          <div className="relative w-[100px] h-[40px] sm:w-[140px] sm:h-[37px] mb-8 sm:mb-12">
            <Image
              src="/citu_logo.png"
              alt="Citu Logo"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-[#DD4440] text-lg sm:text-[24px] font-semibold leading-[1.5] mb-8 sm:mb-12 text-center max-w-[350px]">
            {t.title}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-3 gap-8 sm:gap-12 w-full max-w-[456px] mb-8 sm:mb-12">
            {[
              { label: t.options.seeker, value: 'seeker' },
              { label: t.options.agent, value: 'agent' },
              { label: t.options.other, value: 'other' }
            ].map((option) => (
              <div
                key={option.value}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => setSelectedType(option.value)}
                  className="relative mb-4 sm:mb-6"
                >
                  <div 
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-200
                      ${selectedType === option.value 
                        ? 'border-[#DD4440] bg-[#DD4440]' 
                        : 'border-[#DD4440]'}`}
                  >
                    {selectedType === option.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </button>

                <span className="text-base sm:text-2xl font-semibold leading-tight text-black text-center whitespace-pre-line">
                  {option.label}
                </span>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!selectedType}
            className={`w-[160px] h-[56px] rounded-2xl font-work-sans font-semibold text-[20px] leading-[20px] text-white
              transition-all duration-300
              ${!selectedType 
                ? 'bg-[#F87171] opacity-50 cursor-not-allowed' 
                : 'bg-[#F87171] hover:bg-[#DD4440]'}`}
          >
            {t.next}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeModal;