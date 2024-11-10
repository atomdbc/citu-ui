'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import EarlyAccessModal from './EarlyAccessModal';
import UserEarlyAccessModal from './UserEarlyAccessModal';

const translations = {
  'en-US': {
    userEarlyAccess: 'Sign Up for Early Access',
    agentEarlyAccess: "Early Access for Agents",
    newHomes: 'New Homes',
    findDevelopments: 'Find Developments',
    findAgents: 'Find Agents/Agencies',
    soldPrices: 'Sold Prices',
    instantValuation: 'Instant Valuation',
    comingSoon: 'coming soon',
    buy: 'Buy',
    rent: 'Rent'
  },
  'fr': {
    userEarlyAccess: "S'inscrire pour l'Accès Anticipé",
    agentEarlyAccess: "Accès Anticipé",
    newHomes: 'Nouvelles Maisons',
    findDevelopments: 'Trouver des Développements',
    findAgents: 'Trouver des Agents/Agences',
    soldPrices: 'Prix de Vente',
    instantValuation: 'Évaluation Instantanée',
    comingSoon: 'à venir',
    buy: 'Acheter',
    rent: 'Louer'
  },
};

const FlagUS = () => (
  <svg viewBox="0 0 60 30" className="w-6 h-4 sm:w-8 sm:h-6">
    <rect width="60" height="30" fill="#fff"/>
    <rect width="60" height="4" y="0" fill="#B22234"/>
    <rect width="60" height="4" y="8" fill="#B22234"/>
    <rect width="60" height="4" y="16" fill="#B22234"/>
    <rect width="60" height="4" y="24" fill="#B22234"/>
    <rect width="24" height="16" fill="#3C3B6E"/>
  </svg>
);

const FlagFR = () => (
  <svg viewBox="0 0 60 30" className="w-6 h-4 sm:w-8 sm:h-6">
    <rect width="20" height="30" x="0" fill="#002395"/>
    <rect width="20" height="30" x="20" fill="#fff"/>
    <rect width="20" height="30" x="40" fill="#ED2939"/>
  </svg>
);

const languages = [
  { code: 'en-US', Flag: FlagUS, name: 'English (US)' },
  { code: 'fr', Flag: FlagFR, name: 'Français' },
];

const Header = ({ lang = 'en-US' }) => {
  const t = translations[lang] || translations['en-US'];
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const menuRef = useRef(null);
  const langDropdownRef = useRef(null);

  const getCurrentFlag = () => {
    const language = languages.find(l => l.code === lang);
    return language ? <language.Flag /> : <FlagUS />;
  };

  const switchLanguage = (newLang) => {
    const currentPathWithoutLang = pathname.replace(/^\/[^/]+/, '');
    return `/${newLang}${currentPathWithoutLang}`;
  };

  const menuItems = [
    { key: 'newHomes', label: t.newHomes },
    { key: 'findDevelopments', label: t.findDevelopments },
    { key: 'findAgents', label: t.findAgents },
    { key: 'soldPrices', label: t.soldPrices },
    { key: 'instantValuation', label: t.instantValuation },
    { 
      key: 'userEarlyAccess', 
      label: t.userEarlyAccess, 
      highlight: true,
      onClick: () => setIsUserModalOpen(true)
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 lg:h-[89px]">
          {/* Logo Section */}
          <div className="flex-shrink-0 w-1/4 min-w-[120px] max-w-[180px]">
            <Link href={`/${lang}`}>
              <Image
                src="/citu_logo.png"
                alt="CITU Logo"
                width={160}
                height={42.82}
                className="w-28 sm:w-32 md:w-36 lg:w-40 h-auto"
                priority
              />
            </Link>
          </div>

          {/* Center Navigation - Dynamic width */}
          <div className="hidden lg:flex flex-grow justify-center items-start mx-4">
            <div className="flex" style={{ gap: '100px' }}>
              {/* Buy Section */}
              <div className="text-center" style={{ paddingTop: '30px', marginLeft: '120px', marginRight:'10px' }}>
                <div className="text-[22px] font-bold leading-[2px] text-[#DD4440] mb-[15px]">
                  {t.buy}
                </div>
                <div className="text-[14px] font-normal leading-[14px] text-[#3C3C3C]"
                     style={{
                       fontFamily: 'Work Sans, sans-serif',
                       textUnderlinePosition: 'from-font',
                       textDecorationSkipInk: 'none'
                     }}>
                  {t.comingSoon}
                </div>
              </div>
              {/* Rent Section */}
              <div className="text-center" style={{ paddingTop: '30px' }}>
                <div className="text-[22px] font-bold leading-[2px] text-[#DD4440] mb-[15px]">
                  {t.rent}
                </div>
                <div className="text-[14px] font-normal leading-[14px] text-[#3C3C3C]"
                     style={{
                       fontFamily: 'Work Sans, sans-serif',
                       textUnderlinePosition: 'from-font',
                       textDecorationSkipInk: 'none'
                     }}>
                  {t.comingSoon}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 flex-shrink-0">
            {/* Early Access Button */}
            <button 
              className="hidden sm:block bg-[#F87171] text-white px-6 py-3 rounded-xl hover:bg-[#EF4444] transition duration-300 text-base font-medium whitespace-nowrap"
              onClick={() => setIsAgentModalOpen(true)}
            >
              {t.agentEarlyAccess}
            </button>

            {/* Language Selector */}
            <div className="relative h-10 flex items-center" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="text-[#F87171] hover:text-[#EF4444] transition duration-300 p-1.5 sm:p-2"
              >
                {getCurrentFlag()}
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white shadow-md rounded-md overflow-hidden z-50" style={{ top: '100%' }}>
                  {languages.map((language) => (
                    <Link
                      key={language.code}
                      href={switchLanguage(language.code)}
                      className="block px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setIsLangDropdownOpen(false)}
                    >
                      <language.Flag />
                      <span className="ml-2">{language.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger Menu */}
            <div className="relative h-10 flex items-center" ref={menuRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#F87171] hover:text-[#EF4444] transition duration-300 p-1.5 sm:p-2"
              >
                <div className="space-y-1.5">
                  <div className="w-6 sm:w-7 h-0.5 bg-current"></div>
                  <div className="w-6 sm:w-7 h-0.5 bg-current"></div>
                  <div className="w-6 sm:w-7 h-0.5 bg-current"></div>
                </div>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white shadow-md rounded-md overflow-hidden z-50" style={{ top: '100%' }}>
                  <nav>
                    <ul className="py-2">
                      <li className="sm:hidden">
                        <a 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setIsAgentModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="block px-4 py-2 text-[#F87171] font-semibold hover:bg-gray-100"
                        >
                          {t.agentEarlyAccess}
                        </a>
                      </li>
                      {menuItems.map((item) => (
                        <li key={item.key}>
                          <a 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              if (item.onClick) item.onClick();
                              setIsMenuOpen(false);
                            }}
                            className={`block px-4 py-2 ${item.highlight ? 'text-[#F87171] font-semibold' : 'text-gray-700'} hover:bg-gray-100 transition duration-300`}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UserEarlyAccessModal 
        isOpen={isUserModalOpen} 
        onClose={() => setIsUserModalOpen(false)} 
        lang={lang} 
      />
      <EarlyAccessModal 
        isOpen={isAgentModalOpen} 
        onClose={() => setIsAgentModalOpen(false)} 
        lang={lang} 
      />
    </header>
  );
};

export default Header;