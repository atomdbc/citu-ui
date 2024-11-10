'use client';

import React, { useState } from 'react';
import { Heart, Share2, Building2, BedDouble, ShowerHead } from 'lucide-react';
import Image from 'next/image';
import UserEarlyAccessModal from '../UserEarlyAccessModal';

const translations = {
  'en-US': {
    indicationPrice: 'Indication Price',
    keyInformation: 'Key information',
    propertyFeatures: 'Property features',
    contact: 'CONTACT',
    callAgent: 'Call Agent',
    listings: {
      '1': {
        title: 'Modern 3 Bedroom Apartment for sale in Cocody, Abidjan',
        price: 'Fr 120,000,000',
        propertyType: 'Flat',
        beds: 3,
        baths: 4,
        keyInfo: [
          'Tenure: Freehold',
          'Service Charge: CFA 250,000 per annum',
          'Utility Costs: Electricity & Water not included | Average monthly: CFA 35,000',
          'Security: 24/7 security with gated entry',
          'Internet Availability: Fiber optic (up to 100Mbps) available',
          'Parking: 1 covered parking space included'
        ],
        features: [
          'Modern Kitchen with Built-in Appliances',
          'Master Bedroom with En-suite',
          '110 Square meters',
          'Prime Cocody Location',
          'Swimming Pool Access',
          'Private Balcony'
        ]
      },
      '2': {
        title: 'Luxury 4 Bedroom Villa for sale in Riviera, Abidjan',
        price: 'Fr 200,500,000',
        propertyType: 'Villa',
        beds: 4,
        baths: 4,
        keyInfo: [
          'Tenure: Freehold',
          'Land Size: 500 square meters',
          'Service Charge: CFA 350,000 per annum',
          'Utility Costs: Independent utilities | Solar backup',
          'Security: Private compound with 24/7 security',
          'Internet: High-speed fiber connection available'
        ],
        features: [
          'Private Garden with Pool',
          'Outdoor Entertainment Area',
          '185 Square meters living space',
          'Smart Home System',
          'Staff Quarters',
          'Double Garage'
        ]
      },
      '3': {
        title: 'Penthouse Suite for sale in Plateau, Abidjan',
        price: 'Fr 55,000,000',
        propertyType: 'Penthouse',
        beds: 3,
        baths: 3,
        keyInfo: [
          'Tenure: Freehold',
          'Service Charge: CFA 400,000 per annum',
          'Utility Costs: Premium utilities package available',
          'Security: 24/7 concierge and security service',
          'Internet: Premium fiber connection included',
          'Elevator: Private access to penthouse'
        ],
        features: [
          'Panoramic City Views',
          'Private Terrace',
          '150 Square meters',
          'Wine Cellar',
          'Smart Home Features',
          'Private Elevator Access'
        ]
      }
    }
  },
  'fr': {
    indicationPrice: 'Prix indicatif',
    keyInformation: 'Informations clés',
    propertyFeatures: 'Caractéristiques du bien',
    contact: 'CONTACTER',
    callAgent: 'Appeler l\'agent',
    listings: {
      '1': {
        title: 'Appartement moderne de 3 chambres à vendre à Cocody, Abidjan',
        price: 'Fr 120,000,000',
        propertyType: 'Appartement',
        beds: 3,
        baths: 4,
        keyInfo: [
          'Tenure: Pleine propriété',
          'Charges: 250 000 CFA par an',
          'Charges: Électricité & Eau non incluses | Moyenne mensuelle: 35 000 CFA',
          'Sécurité: Gardiennage 24/7 avec entrée sécurisée',
          'Internet: Fibre optique disponible (jusqu\'à 100Mbps)',
          'Parking: 1 place de parking couverte incluse'
        ],
        features: [
          'Cuisine moderne avec électroménagers intégrés',
          'Chambre principale avec salle de bain privative',
          '110 mètres carrés',
          'Emplacement privilégié à Cocody',
          'Accès piscine',
          'Balcon privé'
        ]
      },
      '2': {
        title: 'Villa de luxe 4 chambres à vendre à Riviera, Abidjan',
        price: 'Fr 200,500,000',
        propertyType: 'Villa',
        beds: 4,
        baths: 4,
        keyInfo: [
          'Tenure: Pleine propriété',
          'Terrain: 500 mètres carrés',
          'Charges: 350 000 CFA par an',
          'Charges: Utilities indépendantes | Backup solaire',
          'Sécurité: Résidence privée avec gardiennage 24/7',
          'Internet: Connexion fibre haut débit disponible'
        ],
        features: [
          'Jardin privé avec piscine',
          'Espace de réception extérieur',
          '185 mètres carrés habitables',
          'Système domotique',
          'Quartier du personnel',
          'Double garage'
        ]
      },
      '3': {
        title: 'Suite Penthouse à vendre au Plateau, Abidjan',
        price: 'Fr 55,000,000',
        propertyType: 'Penthouse',
        beds: 3,
        baths: 3,
        keyInfo: [
          'Tenure: Pleine propriété',
          'Charges: 400 000 CFA par an',
          'Charges: Package utilities premium disponible',
          'Sécurité: Conciergerie et sécurité 24/7',
          'Internet: Connexion fibre premium incluse',
          'Ascenseur: Accès privé au penthouse'
        ],
        features: [
          'Vue panoramique sur la ville',
          'Terrasse privée',
          '150 mètres carrés',
          'Cave à vin',
          'Équipements domotiques',
          'Accès ascenseur privé'
        ]
      }
    }
  }
};


const ListingDetailSection = ({ lang = 'en-US', listingId = '1' }) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const t = translations[lang] || translations['en-US'];
  const listing = t.listings[listingId] || t.listings['1'];

  const parkingInfo = listing.keyInfo.find(info => info.includes('Parking'));
  const otherKeyInfo = listing.keyInfo.filter(info => !info.includes('Parking'));

  // Agent Card Component
  const AgentCard = () => (
    <div className="bg-[#F9F9F9] rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.1)] p-10 pt-4 mb-12">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[302px] relative aspect-[302/131] mb-4">
          <Image
            src="/images/listings/konate_aliane.png"
            alt="Konate Aliane"
            width={302}
            height={131}
            className="object-contain"
            priority
          />
        </div>
        <p className="font-work-sans text-[18px] text-center mb-4 text-[#666666]">
          {t.callAgent} +225071234567
        </p>
        <button
          className="w-[160.74px] h-[55px] bg-[#FF746C] text-white rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
          onClick={() => setIsUserModalOpen(true)}
        >
          {t.contact}
        </button>
      </div>
    </div>
  );

  // Main content section
  const MainContent = ({ showTitle = true }) => (
    <>
      {showTitle && (
        <>
          <div className="flex justify-between items-start mb-4">
            <h1 className="font-work-sans text-[32px] font-bold leading-[36px] text-gray-800 pr-4">
              {listing.title}
            </h1>
            <div className="flex gap-6 flex-shrink-0">
              <button className="hover:opacity-80 transition-opacity">
                <Heart className="w-[36px] h-[32px] text-[#DD4440]" />
              </button>
              <button className="hover:opacity-80 transition-opacity">
                <Share2 className="w-[36px] h-[32px] text-[#DD4440]" />
              </button>
            </div>
          </div>
          <div className="border-b border-black w-full mb-4"></div>
        </>
      )}

      <div className="mb-6">
        <p className="text-[16px] font-bold leading-[20px] text-gray-900 mb-2">
          {t.indicationPrice}
        </p>
        <h2 className="font-work-sans text-[28px] font-bold leading-[32px] text-[#DD4440] mb-2">
          {listing.price}
        </h2>
        <p className="font-work-sans text-[18px] font-normal leading-[24px] text-[#3C3C3C] mb-4">
          {listing.title}
        </p>

        <div className="flex gap-8 mb-4">
          <span className="font-work-sans text-[16px] font-normal leading-[24px] text-gray-600 flex items-center gap-2">
            <Building2 className="w-[20px] h-[20px] text-gray-600" /> {listing.propertyType}
          </span>
          <span className="font-work-sans text-[16px] font-normal leading-[24px] text-gray-600 flex items-center gap-2">
            <BedDouble className="w-[20px] h-[20px] text-gray-600" /> {listing.beds} beds
          </span>
          <span className="font-work-sans text-[16px] font-normal leading-[24px] text-gray-600 flex items-center gap-2">
            <ShowerHead className="w-[20px] h-[20px] text-gray-600" /> {listing.baths} baths
          </span>
        </div>
      </div>

      <div className="border-b border-black w-full mb-8"></div>

      {/* Key Information */}
      <div>
        <h2 className="font-work-sans text-[24px] font-semibold leading-[24px] text-gray-800 mb-6">
          {t.keyInformation}
        </h2>
        <div className="space-y-4">
          {otherKeyInfo.map((info, index) => (
            <p key={index} className="font-work-sans text-[14px] font-normal leading-[20px] text-gray-600">
              • {info}
            </p>
          ))}
          {parkingInfo && (
            <p className="font-work-sans text-[14px] font-normal leading-[20px] text-gray-600">
              • {parkingInfo}
            </p>
          )}
        </div>
      </div>
    </>
  );

  // Property Features section
  const PropertyFeatures = () => (
    <div className="pl-4">
      <h2 className="font-work-sans text-[24px] font-bold leading-[32px] text-[#333333] mb-8">
        {t.propertyFeatures}
      </h2>
      <ul className="space-y-4">
        {listing.features.map((feature, index) => (
          <li key={index} className="font-work-sans text-[16px] font-normal leading-[24px] text-[#666666]">
            • {feature}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Title Section */}
        <div className="flex justify-between items-start mb-4">
          <h1 className="font-work-sans text-[32px] font-bold leading-[36px] text-gray-800 pr-4">
            {listing.title}
          </h1>
          <div className="flex gap-6 flex-shrink-0">
            <button className="hover:opacity-80 transition-opacity">
              <Heart className="w-[36px] h-[32px] text-[#DD4440]" />
            </button>
            <button className="hover:opacity-80 transition-opacity">
              <Share2 className="w-[36px] h-[32px] text-[#DD4440]" />
            </button>
          </div>
        </div>
        <div className="border-b border-black w-full mb-4"></div>

        {/* Price and Features */}
        <div className="mb-6">
          <p className="text-[16px] font-bold leading-[20px] text-gray-900 mb-2">
            {t.indicationPrice}
          </p>
          <h2 className="font-work-sans text-[28px] font-bold leading-[32px] text-[#DD4440] mb-2">
            {listing.price}
          </h2>
          <p className="font-work-sans text-[18px] font-normal leading-[24px] text-[#3C3C3C] mb-4">
            {listing.title}
          </p>

          <div className="flex gap-8 mb-4">
            <span className="font-work-sans text-[16px] font-normal leading-[24px] text-gray-600 flex items-center gap-2">
              <Building2 className="w-[20px] h-[20px] text-gray-600" /> {listing.propertyType}
            </span>
            <span className="font-work-sans text-[16px] font-normal leading-[24px] text-gray-600 flex items-center gap-2">
              <BedDouble className="w-[20px] h-[20px] text-gray-600" /> {listing.beds} beds
            </span>
            <span className="font-work-sans text-[16px] font-normal leading-[24px] text-gray-600 flex items-center gap-2">
              <ShowerHead className="w-[20px] h-[20px] text-gray-600" /> {listing.baths} baths
            </span>
          </div>
          <div className="border-b border-black w-full mb-6"></div>
        </div>

        {/* Agent Card - Now positioned after price section */}
        <div className="mb-8">
          <AgentCard />
        </div>

        {/* Key Information */}
        <div className="mb-6">
          <h2 className="font-work-sans text-[24px] font-semibold leading-[24px] text-gray-800 mb-6 ">
            {t.keyInformation}
          </h2>
          <div className="space-y-4">
            {otherKeyInfo.map((info, index) => (
              <p key={index} className="font-work-sans text-[14px] font-normal leading-[20px] text-gray-600">
                • {info}
              </p>
            ))}
            {parkingInfo && (
              <p className="font-work-sans text-[14px] font-normal leading-[20px] text-gray-600">
                • {parkingInfo}
              </p>
            )}
          </div>
          <div className="border-b border-black w-full my-6"></div>
        </div>

        {/* Property Features */}
        <div className="pl-4">
          <h2 className="font-work-sans text-[24px] font-bold leading-[32px] text-[#333333] mb-8">
            {t.propertyFeatures}
          </h2>
          <ul className="space-y-4">
            {listing.features.map((feature, index) => (
              <li key={index} className="font-work-sans text-[16px] font-normal leading-[24px] text-[#666666]">
                • {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop View - Remains unchanged */}
      <div className="hidden lg:flex gap-16 mt-8 justify-between">
        {/* Left Column */}
        <div className="w-[45%] flex-shrink-0 mt-10">
          <MainContent />
        </div>

        {/* Right Column */}
        <div className="w-[45%] flex-shrink-0">
          <AgentCard />
          <PropertyFeatures />
        </div>
      </div>

      {/* Modal */}
      <UserEarlyAccessModal 
        isOpen={isUserModalOpen} 
        onClose={() => setIsUserModalOpen(false)} 
        lang={lang} 
      />
    </div>
  );
};

export default ListingDetailSection;