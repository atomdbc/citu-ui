'use client';

import React from 'react';
import Image from 'next/image';

const translations = {
  'en-US': {
    propertyDescription: 'Property description',
    listings: {
      '1': {  // Changed to strings to match URL params
        title: 'Modern 3sss Bedroom Apartment in Cocody',
        description1: 'Experience luxury living in this stunning 3-bedroom apartment in Cocody, Abidjan. Spanning over 1,200 square feet, this modern residence offers contemporary design with high-end finishes throughout. The spacious layout features an open-plan living area, perfect for both family life and entertaining guests.',
        description2: 'Situated in a premium gated community with 24/7 security, this property provides both comfort and peace of mind. The location offers easy access to international schools, shopping centers, and medical facilities, making it ideal for families seeking a combination of luxury and convenience in Cocody.'
      },
      '2': {
        title: 'Luxury 4 Bedroom Villa in Riviera',
        description1: 'This exceptional 4-bedroom villa in Riviera 1, Abidjan, presents 2,000 square feet of sophisticated living space. The property showcases modern architecture with premium finishes, featuring an open-plan design that seamlessly connects indoor and outdoor living areas. The fully equipped kitchen comes with state-of-the-art appliances and custom cabinetry.',
        description2: 'Located in the prestigious Riviera 1 neighborhood, this villa offers both luxury and convenience. The property includes a beautifully landscaped garden, perfect for outdoor entertaining, and a private driveway. Its proximity to high-end shopping, international schools, and the business district makes it an ideal choice for discerning buyers.'
      },
      '3': {
        title: 'Penthouse Suite in Plateau',
        description1: 'Discover unparalleled luxury in this stunning penthouse suite in Plateau, Abidjan. This exclusive residence offers breathtaking panoramic views of the city skyline and features premium finishes throughout. With its generous layout and floor-to-ceiling windows, the space is filled with natural light and provides an exceptional living experience.',
        description2: 'The property boasts a private terrace perfect for entertaining, modern amenities, and 24/7 concierge service. Its central location in Plateau provides easy access to business centers, fine dining, and cultural attractions, making it the perfect choice for those seeking the ultimate in urban luxury living.'
      }
    }
  },
  'fr': {
    propertyDescription: 'Description du bien',
    listings: {
      '1': {
        title: 'Appartement Moderne de 3 Chambres à Cocody',
        description1: 'Découvrez le luxe dans cet impressionnant appartement de 3 chambres à Cocody, Abidjan. S\'étendant sur plus de 110 mètres carrés, cette résidence moderne offre un design contemporain avec des finitions haut de gamme. La disposition spacieuse comprend un espace de vie décloisonné, parfait pour la vie familiale et la réception d\'invités.',
        description2: 'Situé dans une résidence sécurisée premium avec surveillance 24/7, ce bien assure confort et tranquillité d\'esprit. L\'emplacement offre un accès facile aux écoles internationales, centres commerciaux et établissements médicaux, idéal pour les familles recherchant une combinaison de luxe et de praticité à Cocody.'
      },
      '2': {
        title: 'Villa de Luxe 4 Chambres à Riviera',
        description1: 'Cette villa exceptionnelle de 4 chambres à Riviera 1, Abidjan, présente 185 mètres carrés d\'espace de vie sophistiqué. La propriété met en valeur une architecture moderne avec des finitions premium, offrant un design ouvert qui relie harmonieusement les espaces de vie intérieurs et extérieurs. La cuisine entièrement équipée dispose d\'appareils dernier cri et d\'armoires sur mesure.',
        description2: 'Située dans le prestigieux quartier de Riviera 1, cette villa allie luxe et commodité. La propriété comprend un jardin magnifiquement paysagé, parfait pour les réceptions en extérieur, et une allée privée. Sa proximité avec les boutiques haut de gamme, les écoles internationales et le quartier des affaires en fait un choix idéal pour les acheteurs exigeants.'
      },
      '3': {
        title: 'Suite Penthouse au Plateau',
        description1: 'Découvrez un luxe inégalé dans cette magnifique suite penthouse au Plateau, Abidjan. Cette résidence exclusive offre une vue panoramique à couper le souffle sur la ville et présente des finitions haut de gamme. Avec sa disposition généreuse et ses fenêtres allant du sol au plafond, l\'espace est baigné de lumière naturelle et offre une expérience de vie exceptionnelle.',
        description2: 'Le bien dispose d\'une terrasse privée parfaite pour recevoir, d\'équipements modernes et d\'un service de conciergerie 24/7. Sa situation centrale au Plateau permet un accès facile aux centres d\'affaires, aux restaurants gastronomiques et aux attractions culturelles, en faisant le choix parfait pour ceux qui recherchent le summum du luxe en milieu urbain.'
      }
    }
  }
};
const PropertyDescription = ({ lang = 'en-US', listingId }) => {
  const t = translations[lang] || translations['en-US'];
  
  const id = String(listingId || '');
  const listing = t.listings[id];

  if (!listing) {
    return (
      <div className="mt-8 sm:mt-12 text-center text-gray-600">
        Property information not available
      </div>
    );
  }

  const mapImage = '/images/map-placeholder.png';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mt-8 sm:mt-12">
        {/* Title Section */}
        <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold border-b border-gray-200 pb-3 sm:pb-4 mb-6 sm:mb-8">
          {t.propertyDescription}
        </h2>
        
        {/* Content Container - Stack on mobile, side by side on desktop */}
        <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-16">
          {/* Description Text */}
          <div className="w-full lg:w-[55%] xl:w-[60%] order-1 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <p className="font-work-sans text-sm sm:text-base font-normal leading-relaxed text-[#3C3C3C]">
                {listing.description1}
              </p>
              <p className="font-work-sans text-sm sm:text-base font-normal leading-relaxed text-[#3C3C3C]">
                {listing.description2}
              </p>
            </div>
          </div>

          {/* Map Section - Full width on mobile, moved to bottom */}
          <div className="w-full lg:w-[45%] xl:w-[40%] order-2 lg:order-2 mt-6 lg:mt-0 mb-10">
            <div className="w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[4/3] relative rounded-lg overflow-hidden">
              <Image
                src={mapImage}
                alt={`Location map for ${listing.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDescription;