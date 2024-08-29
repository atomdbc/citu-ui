'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BedDouble, Bath, Move, MapPin } from 'lucide-react';
import ReviewList from '../../../components/ReviewList';
import PropertyCard from '../../../components/PropertyCard';

const ProductPage = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [similarListings, setSimilarListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listings/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch listing');
        }
        const data = await response.json();
        setListing(data.data);
        setLoading(false);

        // Fetch similar listings
        const similarResponse = await fetch(`/api/listings/${params.id}/similar`);
        if (similarResponse.ok) {
          const similarData = await similarResponse.json();
          setSimilarListings(similarData.data);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (params.id) {
      fetchListing();
    }
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!listing) return <div>Listing not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
      <div className="mb-8">
        <Carousel showThumbs={false} infiniteLoop={true}>
          {listing.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Property image ${index + 1}`} className="object-cover h-96 w-full" />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">About this property</h2>
          <p className="text-gray-600 mb-4">{listing.description}</p>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <BedDouble className="mr-2 text-terracotta" />
              <span>{listing.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-2 text-terracotta" />
              <span>{listing.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center">
              <Move className="mr-2 text-terracotta" />
              <span>{listing.area} m²</span>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <MapPin className="mr-2 text-terracotta" />
            <span>{listing.location.formattedAddress}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Features</h3>
          <ul className="list-disc list-inside mb-4">
            {listing.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <ReviewList listingId={listing._id} />
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">${listing.price.toLocaleString()}</h3>
            <p className="text-gray-600 mb-4">{listing.propertyType} for {listing.listingType}</p>
            <button className="w-full bg-terracotta text-white py-2 px-4 rounded hover:bg-terracotta-dark transition duration-300">
              Contact Agent
            </button>
          </div>
          {similarListings.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Similar Properties</h3>
              <div className="space-y-4">
                {similarListings.map((similar) => (
                  <PropertyCard key={similar._id} property={similar} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
