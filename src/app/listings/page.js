'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ListingsSearchBar from '../../components/ListingsSearchBar';
import PropertyCard from '../../components/PropertyCard';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [displayedListings, setDisplayedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchListings = async (searchParams = {}) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`https://situ-backend-nqpg.vercel.app/api/listings/search?${queryString}`);
      if (!response.ok) throw new Error('Failed to fetch listings');

      const data = await response.json();
      const itemsPerPage = 12;
      setListings(data.data);
      
      // Update total pages and displayed listings
      const totalItems = data.data.length;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
      updateDisplayedListings(1); // Set to the first page initially
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayedListings = (page) => {
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedListings(listings.slice(startIndex, endIndex));
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSearch = (searchParams) => {
    fetchListings(searchParams);
  };

  const handlePageChange = (page) => {
    updateDisplayedListings(page);
  };

  useEffect(() => {
    if (listings.length > 0) {
      updateDisplayedListings(currentPage);
    }
  }, [listings, currentPage]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow mt-16"> {/* Adjust margin-top here */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Find Your Perfect Property</h1>
          <ListingsSearchBar onSearch={handleSearch} />
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-terracotta"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
                {displayedListings.length > 0 ? (
                  displayedListings.map((listing) => (
                    <PropertyCard key={listing._id} property={listing} />
                  ))
                ) : (
                  <div className="text-center text-gray-500">No listings available</div>
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingsPage;
