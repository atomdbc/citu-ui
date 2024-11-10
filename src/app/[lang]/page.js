// app/[lang]/page.js
'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FutureListings from '@/components/FutureListings';
import DreamPlaceFinder from '@/components/DreamPlaceFinder';
import WhyYoullLikeCitu from '@/components/WhyYoullLikeCitu';
import EarlyAccessModal from '@/components/EarlyAccessModal';
import Footer from '@/components/Footer';

export default function Home({ params }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Header - Fixed position wrapper */}
      <Header lang={params.lang} />

      {/* Main Content */}
      <main className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="w-full pt-[89px] lg:pt-[89px] md:pt-20 sm:pt-16">
          <div className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[778px]">
            <HeroSection lang={params.lang} />
          </div>
        </section>

        {/* Content Sections */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Future Listings Section */}
            <section className="relative -mt-24 lg:-mt-24 md:-mt-16 sm:-mt-12">
              <FutureListings lang={params.lang} />
            </section>

            {/* Dream Place Finder Section */}
            <section className="relative mt-16 sm:mt-20 lg:mt-24">
              <DreamPlaceFinder
                lang={params.lang}
                onEarlyAccessClick={() => setIsModalOpen(true)}
              />
            </section>

            {/* WhyYoullLikeCitu Section */}
            <section className="relative mt-16 sm:mt-20 lg:mt-24">
              <WhyYoullLikeCitu lang={params.lang}/>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer lang={params.lang} />

      {/* Modal */}
      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={params.lang}
      />
    </>
  );
}