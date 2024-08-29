'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ListingsSearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          name="keyword"
          placeholder="Search by keyword"
          value={searchParams.keyword}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-black" // Added text-black class
        />
        <select
          name="propertyType"
          value={searchParams.propertyType}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-black" // Added text-black class
        >
          <option value="">Property Type</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
        </select>
        <div className="flex space-x-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={searchParams.minPrice}
            onChange={handleInputChange}
            className="w-1/2 p-2 border rounded text-black" // Added text-black class
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={searchParams.maxPrice}
            onChange={handleInputChange}
            className="w-1/2 p-2 border rounded text-black" // Added text-black class
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          name="bedrooms"
          value={searchParams.bedrooms}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-black" // Added text-black class
        >
          <option value="">Bedrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <select
          name="bathrooms"
          value={searchParams.bathrooms}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-black" // Added text-black class
        >
          <option value="">Bathrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>
        <button type="submit" className="w-full bg-terracotta text-white p-2 rounded hover:bg-terracotta-dark transition-colors duration-300">
          <Search className="inline-block mr-2" size={20} />
          Search
        </button>
      </div>
    </form>
  );
};

export default ListingsSearchBar;
