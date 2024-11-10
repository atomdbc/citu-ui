import React, { useState } from 'react';
import { Search, Calculator } from 'lucide-react';
import Image from 'next/image';
import UserEarlyAccessModal from './UserEarlyAccessModal';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ subsets: ['latin'] });

const CalculatorArrow = () => (
  <svg 
    width="22.42" 
    height="13.85" 
    viewBox="0 0 24 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="mt-0.5"
  >
    <path 
      d="M3.05917 1.53845L0.973633 11.3461M3.05917 1.53845L12.4441 3.84614M3.05917 1.53845C5.14471 6.15384 12.1313 15.3846 23.3932 15.3846" 
      stroke="#DD4440"
      strokeWidth="1"
    />
  </svg>
);

const translations = {
  'en-US': {
    title: 'How to find your dream place.',
    subtitle: 'let us guide you to make the right choice',
    search: {
      title: 'Search',
      description: 'Find a place that match your criteria',
      buy: 'BUY',
      rent: 'RENT',
      placeholder: 'Abidjan, Cocody',
      calculator: 'Find out your home\'s value',
      calculatorHint: '*click to calculate your homes value',
    },
    explore: {
      title: 'Explore',
      description: 'View detailed information, photos, and virtual tours of properties.',
    },
    contact: {
      title: 'Contact',
      description: 'Connect with property owners or agents and move in to your new house.',
      agent: 'Konate Estates',
      callAgent: 'Call agent: +225 12 345 6789',
      button: 'Early Access',
    },
  },
  'fr': {
    title: 'Comment trouver votre lieu de rêve.',
    subtitle: 'laissez-nous vous guider pour faire le bon choix',
    search: {
      title: 'Rechercher',
      description: 'Trouvez un endroit qui correspond à vos critères',
      buy: 'ACHETER',
      rent: 'LOUER',
      placeholder: 'Abidjan, Cocody',
      calculator: 'Découvrez la valeur de votre maison',
      calculatorHint: '*cliquez pour calculer la valeur de votre maison',
    },
    explore: {
      title: 'Explorer',
      description: 'Consultez des informations détaillées, des photos et des visites virtuelles des propriétés.',
    },
    contact: {
      title: 'Contacter',
      description: 'Connectez-vous avec les propriétaires ou les agents et emménagez dans votre nouvelle maison.',
      agent: 'Konate Immobilier',
      callAgent: 'Appelez l\'agent : +225 12 345 6789',
      button: 'Accès Anticipé',
    },
  }
};

const DreamPlaceFinder = ({ lang = 'en-US' }) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buy');
  const t = translations[lang] || translations['en-US'];
  const isFrench = lang === 'fr';

  const baseCardStyle = {
    width: '100%',
    maxWidth: '359.39px',
    borderRadius: '42px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#F8F8F8'
  };


  const getTitleStyle = (isFrench) => ({
    fontSize: isFrench ? '36px' : '42px',
    fontWeight: '700',
    lineHeight: isFrench ? '46px' : '63px',
    textAlign: 'center',
    color: '#DD4440',
    marginBottom: isFrench ? '12px' : '16px'
  });

  const getDescriptionStyle = (isFrench) => ({
    fontSize: isFrench ? '18px' : '22px',
    fontWeight: '400',
    lineHeight: isFrench ? '24px' : '27.5px',
    textAlign: 'center',
    color: '#4A4A4A',
    maxWidth: isFrench ? '300px' : '280px',
    margin: '0 auto',
    marginBottom: isFrench ? '36px' : '48px'
  });

  const getButtonStyle = (isFrench) => ({
    width: isFrench ? '200px' : '176px',
    height: '43px',
    backgroundColor: '#FF746C',
    color: 'white',
    borderRadius: '10px',
    fontSize: isFrench ? '15px' : '16px',
    fontWeight: '600',
    padding: isFrench ? '0 16px' : '0'
  });

  return (
    <div className={`relative w-full bg-white mt-12 lg:mt-4 ${workSans.className}`}>
      <section className="relative mx-auto mb-16 lg:mb-32 px-4 lg:px-0" style={{ maxWidth: '1280px' }}>
        <h1 
          className="text-center px-4" 
          style={{ 
            fontSize: isFrench ? '32px' : '36px', 
            lineHeight: isFrench ? '42px' : '46px',
            fontWeight: '700',
            color: '#DD4440',
            marginBottom: '12px',
            '@media (min-width: 1024px)': {
              fontSize: isFrench ? '48px' : '54px',
              lineHeight: isFrench ? '58px' : '64px',
              marginBottom: '16px'
            }
          }}
        >
          {t.title}
        </h1>
        <p 
          className="text-center px-4 mb-12 lg:mb-24"
          style={{ 
            fontSize: isFrench ? '20px' : '24px',
            lineHeight: isFrench ? '24px' : '28px',
            color: '#4A4A4A',
            '@media (min-width: 1024px)': {
              fontSize: isFrench ? '28px' : '32px',
              lineHeight: isFrench ? '28px' : '32px'
            }
          }}
        >
          {t.subtitle}
        </p>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-12">
          {/* Search Card */}
          <div 
            style={{
              ...baseCardStyle,
              height: '468px',
              padding: isFrench ? '28px 24px' : '32px'
            }}
            className="w-full lg:w-[359.39px]"
          >
            <h2 style={getTitleStyle(isFrench)}>
              {t.search.title}
            </h2>
            
            <p style={getDescriptionStyle(isFrench)}>
              {t.search.description}
            </p>

            {/* Buy/Rent Toggle */}
            <div 
              style={{
                display: 'flex',
                gap: '32px',
                marginBottom: '32px',
                justifyContent: 'center'
              }}
            >
              {['buy', 'rent'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                    fontSize: isFrench ? '16px' : '20px',
                    fontWeight: '700',
                    color: activeTab === tab ? '#DD4440' : '#4A4A4A',
                    position: 'relative',
                    padding: '4px 0'
                  }}
                >
                  {t.search[tab]}
                  {activeTab === tab && (
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: isFrench ? '45px' : '60px',
                        height: '4px',
                        backgroundColor: '#DD4440',
                        borderRadius: '2px'
                      }} 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '32px' }}>
              <input
                type="text"
                placeholder={t.search.placeholder}
                style={{ 
                  width: '100%',
                  height: '50px',
                  borderRadius: '20px',
                  border: '1px solid #DD4440',
                  padding: '0 48px 0 16px',
                  fontSize: '16px',
                  color: '#DD4440',
                  backgroundColor: 'white'
                }}
              />
              <Search 
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#DD4440',
                  cursor: 'pointer'
                }}
                size={20}
                onClick={() => setIsUserModalOpen(true)}
              />
            </div>

            {/* Calculator Section */}
            <div style={{ marginTop: isFrench ? '24px' : '32px' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}
              >
                <Calculator 
                  style={{
                    color: '#DD4440',
                    marginRight: '8px'
                  }}
                  size={24}
                />
                <span 
                  style={{ 
                    fontSize: isFrench ? '13px' : '14px',
                    fontWeight: '500',
                    color: '#4A4A4A'
                  }}
                >
                  {t.search.calculator}
                </span>
              </div>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  marginLeft: '4px'
                }}
              >
                <CalculatorArrow />
                <span 
                  style={{ 
                    fontSize: '10px',
                    fontWeight: '500',
                    color: '#757575'
                  }}
                >
                  {t.search.calculatorHint}
                </span>
              </div>
            </div>
          </div>

          {/* Explore Section */}
          <div 
            className="flex flex-col w-full lg:w-[359.39px]" 
            style={{ gap: '16px', height: 'auto', lg: { height: '468px' } }}
          >           <div 
          style={{
            ...baseCardStyle,
            backgroundColor: '#DD4440',
            height: '220px',
            padding: isFrench ? '24px' : '32px'
          }}
        >
              <h2 
                style={{ 
                  fontSize: isFrench ? '36px' : '42px',
                  fontWeight: '700',
                  lineHeight: isFrench ? '46px' : '63px',
                  textAlign: 'center',
                  color: 'white',
                  marginBottom: isFrench ? '12px' : '16px'
                }}
              >
                {t.explore.title}
              </h2>
              <p 
                style={{ 
                  fontSize: isFrench ? '18px' : '20px',
                  fontWeight: '400',
                  lineHeight: isFrench ? '24px' : '27.5px',
                  textAlign: 'center',
                  color: 'white',
                  maxWidth: isFrench ? '300px' : '280px',
                  margin: '0 auto'
                }}
              >
                {t.explore.description}
              </p>
            </div>

            <div 
              style={{
                ...baseCardStyle,
                height: '232px',
                overflow: 'hidden'
              }}
            >
              <Image 
                src="/images/scraper4.png" 
                alt="Property showcase" 
                width={359}
                height={234}
                className="object-cover w-full h-full"
                style={{ 
                  borderRadius: '42px',
                  position: 'relative',
                  top: '10px'
                }}
              />
            </div>
          </div>

          {/* Contact Card */}
          <div 
            style={{
              ...baseCardStyle,
              height: '468px',
              padding: isFrench ? '28px 24px' : '32px'
            }}
            className="w-full lg:w-[359.39px]"
          >
            <h2 style={getTitleStyle(isFrench)}>
              {t.contact.title}
            </h2>
            <p style={getDescriptionStyle(isFrench)}>
              {t.contact.description}
            </p>
            
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >
              <span 
                style={{ 
                  fontSize: isFrench ? '20px' : '22px',
                  fontWeight: '400',
                  lineHeight: '33px',
                  color: '#DD4440'
                }}
              >
                {t.contact.agent}
              </span>
              <span 
                style={{
                  backgroundColor: '#F2F2F2',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  color: '#4A4A4A',
                  fontWeight: '700'
                }}
              >
                KE
              </span>
            </div>
            
            <p 
              style={{ 
                fontSize: isFrench ? '18px' : '21px',
                fontWeight: '400',
                color: '#4A4A4A',
                marginBottom: isFrench ? '36px' : '48px',
                lineHeight: isFrench ? '22px' : '26px'
              }}
            >
              {t.contact.callAgent}
            </p>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                style={getButtonStyle(isFrench)}
                onClick={() => setIsUserModalOpen(true)}
              >
                {t.contact.button}
              </button>
            </div>
          </div>
        </div>
      </section>

      <UserEarlyAccessModal 
        isOpen={isUserModalOpen} 
        onClose={() => setIsUserModalOpen(false)} 
        lang={lang} 
      />
    </div>
  );
};

export default DreamPlaceFinder;