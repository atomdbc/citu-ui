'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ subsets: ['latin'] });

const generateTestimonials = (baseTestimonials) => {
  return [...baseTestimonials].map((item, index) => ({
    ...item,
    id: index
  }));
};

const translations = {
  'en-US': {
    title: "Why You'll Like citu",
    testimonials: generateTestimonials([
      {
        image: '/images/salama.png',
        quote: '"citu made my property search incredibly easy. Their user-friendly platform and detailed listings helped me find my dream home in no time!"',
        name: "Salama"
      },
      {
        image: '/images/moktar.png',
        quote: '"As a first-time homebuyer, citu\'s guidance was invaluable. Their comprehensive information and responsive support made the whole process smooth and stress-free."',
        name: "Moktar"
      },
      {
        image: '/images/jules.png',
        quote: '"citu\'s virtual tours saved me so much time. I could explore properties thoroughly online before deciding which ones to visit in person. It\'s a game-changer!"',
        name: "Jules"
      },
      {
        image: '/images/dieuveil.png',
        quote: '"Finding an apartment will be so much simpler. No more spending hours searching, the platform promises tools that will make it quick and efficient."',
        name: "Dieuveil"
      },
      {
        image: '/images/jane.png',
        quote: '"What can be frustrating is having to pay 3 months in advance and 3 months security deposit to rent an apartment. With citu, I hope to easily filter and find apartments with more affordable deposit and advance payment conditions."',
        name: "Jane"
      },
      {
        image: '/images/madou.png',
        quote: '"I want to proceed carefully with buying my first home, and I see great potential in citu for finding, in a transparent and easy way, the house that matches me and my family."',
        name: "Madou"
      },
      {
        image: '/images/aboubacar.png',
        quote: '"Finally, a site that will allow comparing prices and real estate without going through dozens of unnecessary appointments. citu will truly revolutionize property buying and selling."',
        name: "Aboubacar"
      },
      {
        image: '/images/magagi.png',
        quote: '"I\'m curious and excited to rent my first home. Comparing prices and neighborhoods, getting in touch with certified agents - that\'s what I need and what I get from citu to start this new adventure."',
        name: "Magagi"
      },
      {
        image: '/images/chafic.png',
        quote: '"I think citu will revolutionize land sales. I\'m looking forward to the visibility and direct contact with buyers that the platform promises to offer."',
        name: "Chafic"
      }
    ])
  },
  'fr': {
    title: "Pourquoi vous aimerez citu",
    testimonials: generateTestimonials([
      {
        image: '/images/salama.png',
        quote: '"citu va rendre la recherche de locataires beaucoup plus simple. Je suis sûr que je pourrai trouver rapidement des personnes sérieuses grâce à la visibilité que le site va offrir."',
        name: "Salama"
      },
      {
        image: '/images/moktar.png',
        quote: '"Ce sera un vrai gain de temps avec des annonces claires et des propriétaires sérieux. En ce moment, je perds beaucoup de temps à trouver des biens qui correspendent pas avec mes désirs."',
        name: "Moktar"
      },
      {
        image: '/images/jules.png',
        quote: '"Je suis vraiment enthousiaste à l\'idée d\'utiliser citu pour acheter ma première maison. La plateforme semble intuitive et va m\'aider à comparer facilement les offres dans différents quartiers."',
        name: "Jules"
      },
      {
        image: '/images/dieuveil.png',
        quote: '"Trouver un appartement sera tellement plus simple. Plus besoin de passer des heures à chercher, la plateforme promet des outils qui vont rendre ça rapide et efficace."',
        name: "Dieuveil"
      },
      {
        image: '/images/jane.png',
        quote: '"Ce qui peut être frustrant, c\'est qu\'il faut parfois payer 3 mois d\'avance et 3 mois de caution pour louer un appartement. Avec citu, j\'espère pouvoir filtrer plus facilement et trouver des appartements avec des conditions de caution et d\'avance plus abordables."',
        name: "Jane"
      },
      {
        image: '/images/madou.png',
        quote: '"Je veux avancer prudemment pour l\'achat de ma première maison, et je vois beaucoup de potentiel dans citu pour trouver, de manière transparente et facile, la maison qui correspond à moi et à ma famille."',
        name: "Madou"
      },
      {
        image: '/images/aboubacar.png',
        quote: '"Enfin un site qui va permettre de comparer les prix et les biens immobiliers sans passer par des dizaines de rendez-vous inutiles. citu va vraiment révolutionner l\'achat et la vente de propriétés."',
        name: "Aboubacar"
      },
      {
        image: '/images/magagi.png',
        quote: '"Je suis curieux et impatient de louer mon premier logement. Comparer les prix et les quartiers, entrer en contact avec des agents certifiés, c\'est ce dont j\'ai besoin et ce que j\'obtiens de citu pour commencer cette nouvelle aventure."',
        name: "Magagi"
      },
      {
        image: '/images/chafic.png',
        quote: '"Je pense que citu va révolutionner la vente de terrains. J\'attends avec impatience la visibilité et les contacts directs avec les acheteurs que la plateforme promet d\'offrir."',
        name: "Chafic"
      }
    ])
  }
};

const WhyYoullLikeCitu = ({ lang = 'en-US' }) => {
  const t = translations[lang] || translations['en-US'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerGroup = 3;
  const totalGroups = Math.ceil(t.testimonials.length / itemsPerGroup);
  const activeGroupIndex = Math.floor(currentIndex / itemsPerGroup);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % t.testimonials.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [t.testimonials.length]);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex(prev => Math.min(prev + 1, t.testimonials.length - 1));
    }
    if (isRightSwipe) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <section className={`bg-white py-12 sm:py-16 lg:py-20 ${workSans.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-citu-red text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center">
          {t.title}
        </h2>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div 
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {t.testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop 3-Column Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8">
            {t.testimonials
              .slice(activeGroupIndex * itemsPerGroup, (activeGroupIndex + 1) * itemsPerGroup)
              .map((testimonial, index) => (
                <div key={testimonial.id} className={index === 1 ? 'mt-8' : ''}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
          </div>
        </div>

        {/* Updated Navigation Dots */}
        <div className="flex justify-center mt-12 gap-6">
          {Array.from({ length: totalGroups }).map((_, groupIndex) => (
            <button
              key={groupIndex}
              onClick={() => setCurrentIndex(groupIndex * itemsPerGroup)}
              className={`w-10 h-10 rounded-full transition-colors duration-300
                ${groupIndex === activeGroupIndex 
                  ? 'bg-[#DD4440] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]' 
                  : 'bg-[#F8F8F8] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]'}`}
              aria-label={`Show testimonial group ${groupIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => (
  <div className="relative flex flex-col items-center">
    <div className="bg-gray-50 rounded-xl shadow-md p-6 sm:p-8 mt-16 relative w-full">
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-32 rounded-full border-4 border-citu-red overflow-hidden">
          <Image 
            src={testimonial.image} 
            alt={testimonial.name} 
            width={128} 
            height={128} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="mt-20">
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center mb-6">
          {testimonial.quote}
        </p>
        <h3 className="text-citu-red text-lg font-semibold text-center">
          {testimonial.name}
        </h3>
      </div>
    </div>
  </div>
);

export default WhyYoullLikeCitu;