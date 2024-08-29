import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-terracotta">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Find Your Dream Property?</h2>
        <p className="text-xl mb-8 text-terracotta-light">Join thousands of satisfied users in Ivory Coast who have found their perfect home with SITU.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-white text-terracotta font-bold py-3 px-8 rounded-full hover:bg-terracotta-light hover:text-white transition duration-300 flex items-center">
            Get Started <ArrowRight className="ml-2" size={20} />
          </button>
          <button className="bg-transparent text-white font-bold py-3 px-8 rounded-full border-2 border-white hover:bg-white hover:text-terracotta transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;