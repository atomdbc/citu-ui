import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Work_Sans } from 'next/font/google';
import Image from 'next/image';

const workSans = Work_Sans({ subsets: ['latin'] });

const UserTypeModal = ({ isOpen, onClose, onNext }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const modalRef = useRef(null);

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
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 backdrop-blur-sm
        transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-[40px] w-[608px] relative
          transition-all duration-300 ease-out transform shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
          ${workSans.className}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center pt-[52px] px-[76px] pb-[48px]">
          {/* Logo */}
          <Image
            src="/citu_logo.png"
            alt="Citu Logo"
            width={140}
            height={37}
            priority
            className="mb-[52px]"
          />

          {/* Title - Now properly centered with max-width */}
          <h2 className="text-[#DD4440] text-[24px] font-semibold leading-[36px] mb-[55px] text-center max-w-[350px] mx-auto">
            Choose the option which best describes you
          </h2>

          {/* Options */}
          <div className="flex justify-between w-full mb-[55px]">
            {[
              { label: 'Property\nSeeker', value: 'seeker' },
              { label: 'Real Estate\nAgent', value: 'agent' },
              { label: 'Other', value: 'other' }
            ].map((option) => (
              <div
                key={option.value}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => setSelectedType(option.value)}
                  className="relative mb-6"
                >
                  <div 
                    className={`w-[40px] h-[40px] rounded-full border-2 transition-all duration-200
                      ${selectedType === option.value 
                        ? 'border-[#DD4440] bg-[#DD4440]' 
                        : 'border-[#DD4440]'}`}
                  >
                    {selectedType === option.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </button>

                <span className="text-[24px] font-semibold leading-[29px] text-black text-center whitespace-pre-line">
                  {option.label}
                </span>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!selectedType}
            className={`w-[176px] h-[56px] rounded-[16px] font-semibold text-white
              transition-all duration-300
              ${!selectedType 
                ? 'bg-[#F87171] opacity-50 cursor-not-allowed' 
                : 'bg-[#F87171] hover:bg-[#DD4440]'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeModal;