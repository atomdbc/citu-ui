import React from 'react';
import { Shield, Search, Building, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="text-terracotta mb-4 flex justify-center">
      <Icon size={48} />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Trusted Platform",
      description: "We verify all listings to ensure you're getting authentic and reliable property information."
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Our powerful search tools help you find the perfect property that matches your specific needs."
    },
    {
      icon: Building,
      title: "Wide Range of Properties",
      description: "From apartments to villas, we offer a diverse selection of properties across Ivory Coast."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our team of real estate experts is always ready to assist you throughout your property journey."
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Why Choose SITU</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;