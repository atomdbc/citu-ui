'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Work_Sans } from 'next/font/google';
import Link from 'next/link';
import UserEarlyAccessModal from './UserEarlyAccessModal';

const workSans = Work_Sans({ subsets: ['latin'] });

const translations = {
  'en-US': {
    title: 'Future Listings.',
    subtitle: 'browse through the listings of tomorrow\nto get inspired',
    buttonText: 'Early Access',
  },
  'fr': {
    title: 'Annonces Futures.',
    subtitle: 'parcourez les annonces de demain\npour vous inspirer',
    buttonText: 'Accès Anticipé',
  },
};




const listingsData = {
  'en-US': [
    {
      id: '1',
      image: 'images/scraper1.png',
      title: 'Modern 3s Bedroom Apartment',
      location: 'Cocody, Abidjan',
      price: 'Fr 120,000,000',
      propertyType: 'Flat',
      beds: 3,
      baths: 4,
    },
    {
      id: '2',
      image: 'images/scraper2.png',
      title: 'Luxury 4 Bedroom Villa',
      location: 'Riviera, Abidjan',
      price: 'Fr 200,500,000',
      propertyType: 'Villa',
      beds: 4,
      baths: 4,
    },
    {
      id: '3',
      image: 'images/scraper3.png',
      title: 'Penthouse Suite',
      location: 'Plateau, Abidjan',
      price: 'Fr 55,000,000',
      propertyType: 'Penthouse',
      beds: 3,
      baths: 3,
    },
  ],
  'fr': [
    {
      id: '1',
      image: 'images/scraper1.png',
      title: 'Appartement Moderne de 3 Chambres',
      location: 'Cocody, Abidjan',
      price: 'Fr 120,000,000',
      propertyType: 'Appartement',
      beds: 3,
      baths: 4,
    },
    {
      id: '2',
      image: 'images/scraper2.png',
      title: 'Villa de Luxe 4 Chambres',
      location: 'Riviera, Abidjan',
      price: 'Fr 200,500,000',
      propertyType: 'Villa',
      beds: 4,
      baths: 4,
    },
    {
      id: '3',
      image: 'images/scraper3.png',
      title: 'Suite Penthouse',
      location: 'Plateau, Abidjan',
      price: 'Fr 55,000,000',
      propertyType: 'Penthouse',
      beds: 3,
      baths: 3,
    },
  ],
};

const FutureListings = ({ lang = 'en-US' }) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  const t = translations[lang] || translations['en-US'];
  const listings = listingsData[lang] || listingsData['en-US'];

  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < listings.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const isFrench = lang === 'fr';

  const buttonStyle = {
    width: isFrench ? '200px' : '176px',
    height: '43px',
    backgroundColor: '#FF746C',
    color: 'white',
    borderRadius: '10px',
    fontSize: isFrench ? '15px' : '16px',
    fontWeight: '600',
    padding: isFrench ? '0 16px' : '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const titleStyles = {
    fontSize: isFrench ? '32px' : '36px',
    lineHeight: isFrench ? '42px' : '46px',
    fontWeight: '700',
    color: '#DD4440',
    marginBottom: '12px',
    ['@media (minWidth: 1024px)']: {
      fontSize: isFrench ? '48px' : '54px',
      lineHeight: isFrench ? '58px' : '64px',
      marginBottom: '16px'
    }
  };


  return (
    <section className={`w-full bg-white ${workSans.className} relative z-10 mt-[200px] sm:mt-[300px] lg:mt-[230px]`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10" style={{ transform: 'translateX(6px)', marginBottom: '100px' }}>
          <h2 style={titleStyles} className="text-center">
            {t.title}
          </h2>
          <p className="text-gray-700 whitespace-pre-line text-base sm:text-lg md:text-xl lg:text-2xl mt-2">
            {t.subtitle}
          </p>
        </div>

        {/* Listings Container */}
        <div className="relative w-full">
          {/* Desktop View */}
          <div className="hidden lg:flex justify-center" style={{ gap: '0' }}>
            {/* First Image */}
            <div 
              key={listings[0].id}
              className="w-[321px]"
              style={{ marginRight: '77px' }}
            >
              <Link href={`/${lang}/listings/${listings[0].id}`} className="block">
                <div className="relative">
                  <div className="absolute -top-3 sm:-top-4 lg:-top-5 left-0 w-full h-2 sm:h-2.5 lg:h-3 bg-citu-red" />
                  <div className="relative w-[321px] h-[474px]">
                    <Image
                      src={`/${listings[0].image}`}
                      alt={listings[0].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1440px) 321px"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-4 sm:mt-5 lg:mt-6">
                  {[0, 1, 2].map((dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`w-5 h-5 mx-1.5 rounded-full ${
                        dotIndex === 0 
                          ? 'bg-[#DD4440] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]' 
                          : 'bg-[#F8F8F8] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]'
                      }`}
                    />
                  ))}
                </div>
              </Link>
            </div>

            {/* Second Image */}
            <div 
              key={listings[1].id}
              className="w-[321px]"
              style={{ marginRight: '79px' }}
            >
              <Link href={`/${lang}/listings/${listings[1].id}`} className="block">
                <div className="relative">
                  <div className="absolute -top-3 sm:-top-4 lg:-top-5 left-0 w-full h-2 sm:h-2.5 lg:h-3 bg-citu-red" />
                  <div className="relative w-[321px] h-[474px]">
                    <Image
                      src={`/${listings[1].image}`}
                      alt={listings[1].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1440px) 321px"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-4 sm:mt-5 lg:mt-6">
                  {[0, 1, 2].map((dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`w-5 h-5 mx-1.5 rounded-full ${
                        dotIndex === 0 
                          ? 'bg-[#DD4440] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]' 
                          : 'bg-[#F8F8F8] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]'
                      }`}
                    />
                  ))}
                </div>
              </Link>
            </div>

            {/* Third Image */}
            <div 
              key={listings[2].id}
              className="w-[321px]"
            >
              <Link href={`/${lang}/listings/${listings[2].id}`} className="block">
                <div className="relative">
                  <div className="absolute -top-3 sm:-top-4 lg:-top-5 left-0 w-full h-2 sm:h-2.5 lg:h-3 bg-citu-red" />
                  <div className="relative w-[321px] h-[474px]">
                    <Image
                      src={`/${listings[2].image}`}
                      alt={listings[2].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1440px) 321px"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-4 sm:mt-5 lg:mt-6">
                  {[0, 1, 2].map((dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`w-5 h-5 mx-1.5 rounded-full ${
                        dotIndex === 0 
                          ? 'bg-[#DD4440] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]' 
                          : 'bg-[#F8F8F8] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]'
                      }`}
                    />
                  ))}
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile/Tablet Swipeable View */}
          <div className="lg:hidden relative w-full overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-300 ease-out w-full touch-pan-y"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                >
                  <Link href={`/${lang}/listings/${listing.id}`} className="block">
                    <div className="relative">
                      <div className="absolute -top-3 sm:-top-4 left-0 w-full h-2 sm:h-2.5 bg-citu-red" />
                      <div className="relative w-full max-w-[300px] sm:max-w-[321px] mx-auto" 
                           style={{ aspectRatio: '321/450' }}>
                        <Image
                          src={`/${listing.image}`}
                          alt={listing.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 321px"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center mt-4 sm:mt-5">
              {listings.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 mx-1 rounded-full shadow-inner transition-colors
                    ${currentSlide === index ? 'bg-citu-red' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Button - Now using consistent styling for both mobile and desktop */}
        <div className="flex justify-center mt-8 sm:mt-10 lg:mt-12">
          <div className="flex items-center justify-center" style={{ transform: 'translateX(0px)' }}>
            <button
              onClick={() => setIsUserModalOpen(true)}
              className="hover:bg-[#EF4444] transition-colors duration-300"
              style={{
                ...buttonStyle,
                width: isFrench ? '200px' : '176px',
                height: '43px',
                '@media (max-width: 768px)': {
                  width: isFrench ? '200px' : '176px', // Maintaining same width on mobile
                  height: '43px' // Maintaining same height on mobile
                }
              }}
            >
              {t.buttonText}
            </button>
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

export default FutureListings;