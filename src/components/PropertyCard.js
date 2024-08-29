import React from 'react';
import Link from 'next/link';
import { Home, BedDouble, Bath, Move, DollarSign } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <Link href={`/listings/${property._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img 
            src={property.images[0] || "/images/placeholder-image.jpg"} 
            alt={property.title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-0 right-0 bg-terracotta text-white px-2 py-1 m-2 rounded">
            {property.listingType}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{property.title}</h3>
          <p className="text-gray-600 mb-4">{property.location.formattedAddress}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-terracotta font-bold text-xl flex items-center">
              <DollarSign size={20} className="mr-1" />
              {property.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">{property.propertyType}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className="flex items-center"><BedDouble size={16} className="mr-1" /> {property.bedrooms}</span>
            <span className="flex items-center"><Bath size={16} className="mr-1" /> {property.bathrooms}</span>
            <span className="flex items-center"><Move size={16} className="mr-1" /> {property.area} m²</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;