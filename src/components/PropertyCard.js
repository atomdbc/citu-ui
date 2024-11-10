import React from 'react';
import Link from 'next/link';
import { BedDouble, Bath, Move } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <Link href={`/listings/${property._id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          <img
            src={property.images[0] || "/images/placeholder-image.jpg"}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-terracotta text-white px-2 py-1 rounded-full text-xs font-semibold">
            {property.listingType}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{property.title}</h3>
          <p className="text-sm text-gray-600 mb-2 truncate">{property.location.formattedAddress}</p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-terracotta font-bold text-xl">${property.price.toLocaleString()}</span>
            <span className="text-sm text-gray-500">{property.propertyType}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className="flex items-center">
              <BedDouble size={16} className="mr-1 text-gray-400" />
              {property.bedrooms}
            </span>
            <span className="flex items-center">
              <Bath size={16} className="mr-1 text-gray-400" />
              {property.bathrooms}
            </span>
            <span className="flex items-center">
              <Move size={16} className="mr-1 text-gray-400" />
              {property.area} m²
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;