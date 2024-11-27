'use client';

import React, { useState } from 'react';
import { Heart, Share2, Building2, BedDouble, ShowerHead, House } from 'lucide-react';
import Image from 'next/image';
import ModalManager from '../ModalManager';

const translations = {
  'en-US': {
    indicationPrice: 'Indication Price',
    keyInformation: 'Key information',
    propertyFeatures: 'Property features',
    contact: 'CONTACT',
    callAgent: 'Call Agent',
    listings: {
      '1': {
        title: 'Example Listing',
        description: 'Modern 2 Bedroom Apartment for sale in Cocody, Abidjan',
        price: 'CFA 32,500,000',
        propertyType: 'Flat',
        beds: 2,
        baths: 1,
        keyInfo: [
          'Tenure: Freehold',
          'Annual Rent: CFA 100,000',
          'Service Charge: CFA 100,000 per annum',
          'Utility Costs: Electricity & Water not included | Average monthly: CFA 20,000',
          'Security: 24/7 security with gated entry',
          'Internet Availability: Fiber optic (up to 100Mbps) available',
          'Parking: 1 covered parking space included'
        ],
        features: [
          '2-Bedroom Apartment',
          'Modern Kitchen',
          '650 Square feet',
          'Business Area Location',
          '24/7 Security',
          'Balcony'
        ]
      },
      '2': {
        title: 'Example Listing',
        description: 'Modern 3 Bedroom Apartment for sale in Cocody, Abidjan',
        price: 'CFA 120,000,000',
        propertyType: 'Flat',
        beds: 3,
        baths: 4,
        keyInfo: [
          'Tenure: Leasehold | 20 years remaining',
          'Annual Rent: CFA 1,200,000 per annum | review period: 3 years',
          'Service Charge: CFA 150,000 per annum',
          'Utility Costs: Electricity & Water not included | Average monthly: CFA 25,000',
          'Security: Gated community with 24/7 security',
          'Internet Availability: High-speed fiber optic (up to 50Mbps) available'
        ],
        features: [
          'Spacious 3-Bedroom Apartment',
          'Large Living Room',
          'Contemporary Design',
          'Prime Cocody Location',
          'Family-Friendly Area',
          'Proximity to Amenities'
        ]
      },
      '3': {
        title: 'Example Listing',
        description: 'Modern 4 Bedroom House for sale in Cocody, Abidjan',
        price: 'CFA 200,500,000',
        propertyType: 'Detached house',
        beds: 4,
        baths: 4,
        keyInfo: [
          'Tenure: Freehold',
          'Price: CFA 200,500,000',
          'Service Charge: Not applicable',
          'Utility Costs: Electricity & Water not included | Average monthly: CFA 50,000',
          'Security: 24/7 gated security with CCTV',
          'Internet Availability: High-speed fiber optic (up to 50Mbps) available'
        ],
        features: [
          '4 Spacious Bedrooms',
          'Large Garden',
          '2,000 Square Feet',
          'Prime Riviera 1 Location',
          'Modern Kitchen',
          'Private Driveway & Kitchen'
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
        title: 'Example Listing',
        description: 'Appartement moderne de 2 chambres à vendre à Cocody, Abidjan',
        price: 'CFA 32,500,000',
        propertyType: 'Appartement',
        beds: 2,
        baths: 1,
        keyInfo: [
          'Tenure: Pleine propriété',
          'Loyer annuel: CFA 100,000',
          'Charges: CFA 100,000 par an',
          'Charges: Électricité & Eau non incluses | Moyenne mensuelle: CFA 20,000',
          'Sécurité: Gardiennage 24/7 avec entrée sécurisée',
          'Internet: Fibre optique disponible (jusqu\'à 100Mbps)',
          'Parking: 1 place de parking couverte incluse'
        ],
        features: [
          'Appartement 2 chambres',
          'Cuisine moderne',
          '650 pieds carrés',
          'Situé en zone d\'affaires',
          'Sécurité 24/7',
          'Balcon'
        ]
      },
      '2': {
        title: 'Example Listing',
        description: 'Appartement moderne de 3 chambres à vendre à Cocody, Abidjan',
        price: 'CFA 120,000,000',
        propertyType: 'Appartement',
        beds: 3,
        baths: 4,
        keyInfo: [
          'Tenure: Bail | 20 ans restants',
          'Loyer annuel: CFA 1,200,000 par an | révision: tous les 3 ans',
          'Charges: CFA 150,000 par an',
          'Charges: Électricité & Eau non incluses | Moyenne mensuelle: CFA 25,000',
          'Sécurité: Résidence sécurisée avec gardiennage 24/7',
          'Internet: Fibre optique haut débit disponible (jusqu\'à 50Mbps)'
        ],
        features: [
          'Appartement spacieux 3 chambres',
          'Grand salon',
          'Design contemporain',
          'Emplacement privilégié à Cocody',
          'Quartier familial',
          'Proximité des commodités'
        ]
      },
      '3': {
        title: 'Example Listing',
        description: 'Maison moderne de 4 chambres à vendre à Cocody, Abidjan',
        price: 'CFA 200,500,000',
        propertyType: 'Maison individuelle',
        beds: 4,
        baths: 4,
        keyInfo: [
          'Tenure: Pleine propriété',
          'Prix: CFA 200,500,000',
          'Charges: Non applicable',
          'Charges: Électricité & Eau non incluses | Moyenne mensuelle: CFA 50,000',
          'Sécurité: Gardiennage 24/7 avec vidéosurveillance',
          'Internet: Fibre optique haut débit disponible (jusqu\'à 50Mbps)'
        ],
        features: [
          '4 chambres spacieuses',
          'Grand jardin',
          '2,000 pieds carrés',
          'Emplacement privilégié à Riviera 1',
          'Cuisine moderne',
          'Allée privée et cuisine'
        ]
      }
    }
  }
};



const ListingDetailSection = ({ lang = 'en-US', listingId = '1' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = translations[lang] || translations['en-US'];
  const listing = t.listings[listingId] || t.listings['1'];

  const parkingInfo = listing.keyInfo.find(info => info.includes('Parking'));
  const otherKeyInfo = listing.keyInfo.filter(info => !info.includes('Parking'));

  // Function to render the appropriate property type icon
  const PropertyTypeIcon = () => {
    if (listing.propertyType === 'Villa') {
      return <House className="w-[20px] h-[20px] text-gray-600" />;
    }
    return <Building2 className="w-[20px] h-[20px] text-gray-600" />;
  };


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
  className="w-[160.74px] h-[55px] bg-[#FF746C] text-white rounded-2xl font-work-sans font-semibold text-[20px] leading-[20px] hover:bg-opacity-90 transition-colors"
  onClick={() => setIsModalOpen(true)}
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
          {listing.description}
        </p>

        <div className="flex gap-8 mb-4">
          <span className="font-work-sans text-[16px] font-normal leading-[24px] text-gray-600 flex items-center gap-2">
            <PropertyTypeIcon /> {listing.propertyType}
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
            {listing.description}
          </p>

          <div className="flex gap-8 mb-4">
            <span className="font-work-sans text-[16px] font-normal leading-[24px] text-gray-600 flex items-center gap-2">
              <PropertyTypeIcon /> {listing.propertyType}
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

        {/* Rest of the mobile view components */}
        <div className="mb-8">
          <AgentCard />
        </div>

        <div className="mb-6">
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
          <div className="border-b border-black w-full my-6"></div>
        </div>

        <div className="pl-4">
          <PropertyFeatures />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex gap-16 mt-8 justify-between">
        <div className="w-[45%] flex-shrink-0 mt-10">
          <MainContent />
        </div>
        <div className="w-[45%] flex-shrink-0">
          <AgentCard />
          <PropertyFeatures />
        </div>
      </div>

      {/* Modal */}
      <ModalManager 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang}
      />
    </div>
  );
};

export default ListingDetailSection;