'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { X, Loader2, ChevronDown } from 'lucide-react';
import ThankYouModal from './ThankYouModal';
import { submitAgentWaitlist } from '@/services/api';
import { countries } from '@/data/countryCodes';

const translations = {
  'en-US': {
    title: 'Agents - Sign Up for Early Access',
    fullName: 'Full Name',
    company: 'Company',
    mobile: 'Mobile',
    email: 'Email Address',
    satisfaction: 'Are you satisfied with the leads you currently generate from your properties?',
    submit: 'SUBMIT',
    submitting: 'SUBMITTING...',
    veryDissatisfied: 'VERY\nDISSATISFIED',
    dissatisfied: 'DISSATISFIED',
    neutral: 'NEUTRAL',
    satisfied: 'SATISFIED',
    verySatisfied: 'VERY\nSATISFIED',
    required: 'Required field',
    error: 'Something went wrong. Please try again.'
  },
  'fr': {
    title: 'Agents - Inscrivez-vous pour un accès anticipé',
    fullName: 'Nom complet',
    company: 'Entreprise',
    mobile: 'Mobile',
    email: 'Adresse e-mail',
    satisfaction: 'Êtes-vous satisfait des prospects que vous générez actuellement à partir de vos propriétés ?',
    submit: 'SOUMETTRE',
    submitting: 'SOUMISSION...',
    veryDissatisfied: 'TRÈS\nINSATISFAIT',
    dissatisfied: 'INSATISFAIT',
    neutral: 'NEUTRE',
    satisfied: 'SATISFAIT',
    verySatisfied: 'TRÈS\nSATISFAIT',
    required: 'Champ obligatoire',
    error: 'Une erreur est survenue. Veuillez réessayer.'
  },
};

const EarlyAccessModal = ({ isOpen, onClose, lang = 'en-US' }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSatisfaction, setSelectedSatisfaction] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    mobile: '',
    email: ''
  });
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === 'CI')); // Ivory Coast default
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const modalRef = useRef(null);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const formatPhoneNumber = (countryCode, number) => {
    // Remove any non-digit characters from the phone number
    const cleanNumber = number.replace(/\D/g, '');
    // Remove leading zeros if any
    const trimmedNumber = cleanNumber.replace(/^0+/, '');
    // Remove the + from country code if present and combine
    const cleanCountryCode = countryCode.replace(/\+/, '');
    return `+${cleanCountryCode}${trimmedNumber}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return false;
    if (!formData.mobile.trim()) return false;
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
    if (!selectedSatisfaction) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError(t.error);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Format phone number with country code
      const formattedPhone = formatPhoneNumber(selectedCountry.dial_code, formData.mobile);

      await submitAgentWaitlist({
        ...formData,
        mobile: formattedPhone, // Send the formatted phone number
        satisfaction: selectedSatisfaction,
      });

      setShowThankYou(true);
      setFormData({
        fullName: '',
        company: '',
        mobile: '',
        email: ''
      });
      setSelectedSatisfaction(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !isAnimating) return null;

  const inputClassName = "w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DD4440] focus:border-transparent transition-all duration-200";

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/30 flex justify-center items-center z-50 backdrop-blur-sm
          transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleBackdropClick}
      >
        <div 
          ref={modalRef}
          className={`bg-white rounded-[20px] sm:rounded-[32px] p-4 sm:p-8 w-full max-w-[480px] mx-4 relative
            transition-all duration-300 ease-out transform ${
            isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
          }`}
        >
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          <div className="text-center mb-4 sm:mb-6">
            <Image 
              src="/citu_logo.png" 
              alt="Citu Logo" 
              width={100} 
              height={40} 
              className="mx-auto sm:w-[120px] sm:h-[48px]" 
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#DD4440] mb-6 sm:mb-8 text-center px-2">
            {t.title}
          </h2>

          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-gray-700 text-xs sm:text-sm mb-1 sm:mb-1.5">
                {t.fullName} <span className="text-[#DD4440]">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                disabled={isSubmitting}
                value={formData.fullName}
                onChange={handleInputChange}
                className={inputClassName}
                placeholder={t.fullName}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-xs sm:text-sm mb-1 sm:mb-1.5">
                {t.company}
              </label>
              <input
                type="text"
                name="company"
                disabled={isSubmitting}
                value={formData.company}
                onChange={handleInputChange}
                className={inputClassName}
                placeholder={t.company}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-xs sm:text-sm mb-1 sm:mb-1.5">
                {t.mobile} <span className="text-[#DD4440]">*</span>
              </label>
              <div className="flex gap-2 sm:gap-3">
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center gap-1 sm:gap-2 bg-gray-100 p-2.5 sm:p-3 rounded-lg text-sm sm:text-base text-gray-700 w-[100px] sm:w-[120px]"
                  >
                    <span>{selectedCountry.flag}</span>
                    <span className="text-xs sm:text-base">{selectedCountry.dial_code}</span>
                    <ChevronDown size={14} className={`transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showCountryDropdown && (
                    <div className="absolute z-50 top-full left-0 mt-1 w-[180px] sm:w-[200px] max-h-48 sm:max-h-60 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setShowCountryDropdown(false);
                          }}
                          className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 hover:bg-gray-50 text-left"
                        >
                          <span>{country.flag}</span>
                          <span className="text-xs sm:text-sm flex-1">{country.dial_code}</span>
                          <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:inline">{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  name="mobile"
                  required
                  disabled={isSubmitting}
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={inputClassName}
                  placeholder={t.mobile}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-xs sm:text-sm mb-1 sm:mb-1.5">
                {t.email}
              </label>
              <input
                type="email"
                name="email"
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleInputChange}
                className={inputClassName}
                placeholder={t.email}
              />
            </div>

            <div className="pt-4 sm:pt-6">
              <p className="text-[#DD4440] text-sm sm:text-base font-medium text-center mb-6 sm:mb-8 px-2">
                {t.satisfaction}
              </p>
              
              <div className="flex justify-between px-2 sm:px-4 mb-6 sm:mb-8">
                {[
                  { label: t.veryDissatisfied, value: 1 },
                  { label: t.dissatisfied, value: 2 },
                  { label: t.neutral, value: 3 },
                  { label: t.satisfied, value: 4 },
                  { label: t.verySatisfied, value: 5 }
                ].map((option) => (
                  <label 
                    key={option.value} 
                    className={`flex flex-col items-center gap-2 sm:gap-3 cursor-pointer group ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name="satisfaction"
                        value={option.value}
                        disabled={isSubmitting}
                        checked={selectedSatisfaction === option.value}
                        onChange={() => setSelectedSatisfaction(option.value)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200
                        ${selectedSatisfaction === option.value 
                          ? 'border-[#DD4440] bg-[#DD4440]' 
                          : 'border-[#DD4440]'}
                      `}>
                        {selectedSatisfaction === option.value && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-[8px] sm:text-xs font-medium text-gray-600 text-center whitespace-pre-line 
                      uppercase tracking-wide max-w-[50px] sm:max-w-[70px] leading-tight">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#DD4440] text-white py-2.5 sm:py-3 px-8 sm:px-12 rounded-[24px] sm:rounded-[32px] 
                    text-sm sm:text-base font-medium transition-all duration-300 flex items-center gap-2
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#C33C39]'}`}
                >
                  {isSubmitting && <Loader2 className="animate-spin w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
                  {isSubmitting ? t.submitting : t.submit}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ThankYouModal 
        isOpen={showThankYou} 
        onClose={() => {
          setShowThankYou(false);
          onClose();
        }}
        lang={lang}
      />
    </>
  );
};

export default EarlyAccessModal;