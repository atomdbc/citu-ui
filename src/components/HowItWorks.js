import React from 'react';
import { Search, Home, Key, ThumbsUp } from 'lucide-react';

const StepCard = ({ icon: Icon, title, description, step }) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-terracotta text-white rounded-full p-4 mb-4">
      <Icon size={32} />
    </div>
    <div className="bg-terracotta text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">
      {step}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search",
      description: "Use our advanced search to find properties that match your criteria.",
      step: 1
    },
    {
      icon: Home,
      title: "Explore",
      description: "View detailed information, photos, and virtual tours of properties.",
      step: 2
    },
    {
      icon: Key,
      title: "Contact",
      description: "Connect with property owners or agents directly through our platform.",
      step: 3
    },
    {
      icon: ThumbsUp,
      title: "Finalize",
      description: "Complete your property transaction with our support and resources.",
      step: 4
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;