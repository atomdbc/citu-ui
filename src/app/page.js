import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import FeaturedListings from '../components/FeaturedListings';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SearchBar />
        <FeaturedListings limit={4} />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}