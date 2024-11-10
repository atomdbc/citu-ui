'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ListingGallery from '@/components/listing/ListingGallery';
import ListingDetailSection from '@/components/listing/ListingDetailSection';
import PropertyDescription from '@/components/listing/PropertyDescription';

const listingImages = {
  '1': [
    '/images/listings/cocody1.png',
    '/images/listings/cocody2.png',
    '/images/listings/cocody3.png',
    '/images/listings/cocody4.png'
  ],
  '2': [
    '/images/listings/riviera1.png',
    '/images/listings/riviera2.png',
    '/images/listings/riviera3.png',
    '/images/listings/riviera4.png'
  ],
  '3': [
    '/images/listings/plateau1.png',
    '/images/listings/plateau2.png',
    '/images/listings/plateau3.png',
    '/images/listings/plateau4.png'
  ]
};

function ListingDetail() {
  const params = useParams();
  const { lang, id } = params;

  // Validate listingId
  const validListingId = ['1', '2', '3'].includes(id) ? id : '1';
  const images = listingImages[validListingId];

  return (
    <div className="min-h-screen bg-white">
      <Header lang={lang} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 sm:pt-24 pb-8 sm:pb-14 space-y-6 sm:space-y-8">
          <ListingGallery
            images={images}
            listingId={validListingId}
          />
          <ListingDetailSection
            lang={lang}
            listingId={validListingId}
          />
          <PropertyDescription
            lang={lang}
            listingId={validListingId}
          />
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}

export default ListingDetail;