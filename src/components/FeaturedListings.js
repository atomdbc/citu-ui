'use client';

import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import Link from 'next/link';

const FeaturedListings = ({ limit = 4 }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`https://situ-backend-nqpg.vercel.app/api/listings?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch listings');
        const data = await response.json();
        setListings(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchListings();
  }, [limit]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <PropertyCard key={listing._id} property={listing} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/listings" className="bg-terracotta text-white py-2 px-4 rounded hover:bg-terracotta-dark transition-colors duration-300">
            View All Listings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;