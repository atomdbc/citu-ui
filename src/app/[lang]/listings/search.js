import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropertyCard from '../../components/PropertyCard';

const SearchResults = () => {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!router.isReady) return;

      try {
        const response = await fetch(`https://situ-backend-nqpg.vercel.app/api/listings/search${router.asPath.split('?')[1]}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setListings(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [router.isReady, router.asPath]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <PropertyCard key={listing._id} property={listing} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;