import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src="/images/family.jpeg" 
          alt="Real Estate in Ivory Coast" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Home in Ivory Coast</h1>
          <p className="text-xl mb-8">Discover the perfect property with SITU</p>
          {/* <button className="bg-terracotta hover:bg-terracotta-dark text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
            Start Your Search
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;