import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, location, rating, comment, image }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-gray-600 text-sm">{location}</p>
      </div>
    </div>
    <div className="flex mb-2">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={18} className={i < rating ? "text-terracotta" : "text-gray-300"} fill="currentColor" />
      ))}
    </div>
    <p className="text-gray-700">{comment}</p>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      name: "Kouassi Aya",
      location: "Abidjan, Côte d'Ivoire",
      rating: 5,
      comment: "SITU made finding my dream home in Cocody so easy. The platform is user-friendly and the support team was incredibly helpful throughout the process.",
      image: "/images/placeholder-image.jpg"
    },
    {
      name: "Diallo Mamadou",
      location: "Yamoussoukro, Côte d'Ivoire",
      rating: 4,
      comment: "As a property owner, I've had great success listing my apartments on SITU. The exposure to potential tenants is excellent.",
      image: "/images/placeholder-image.jpg"
    },
    {
      name: "Bamba Fanta",
      location: "Bouaké, Côte d'Ivoire",
      rating: 5,
      comment: "I was amazed by the variety of properties available on SITU. It helped me find the perfect office space for my growing business.",
      image: "/images/placeholder-image.jpg"
    }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;