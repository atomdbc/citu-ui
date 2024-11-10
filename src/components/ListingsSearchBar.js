import React, { useState } from 'react';
import { Search, Home, DollarSign, BedDouble, Bath } from 'lucide-react';

const ListingsSearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    propertyType: '',
    listingType: '',
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="keyword"
            placeholder="Search by keyword"
            value={searchParams.keyword}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-800 placeholder-gray-500"
          />
        </div>
        <div className="relative">
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            name="propertyType"
            value={searchParams.propertyType}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta appearance-none text-gray-800 bg-white"
          >
            <option value="">Property Type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>
        </div>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={searchParams.minPrice}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-800 placeholder-gray-500"
          />
        </div>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={searchParams.maxPrice}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-800 placeholder-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex space-x-4 mb-4 lg:mb-0">
          <div className="relative">
            <BedDouble className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              name="bedrooms"
              value={searchParams.bedrooms}
              onChange={handleInputChange}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta appearance-none text-gray-800 bg-white"
            >
              <option value="">Bedrooms</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div className="relative">
            <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              name="bathrooms"
              value={searchParams.bathrooms}
              onChange={handleInputChange}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta appearance-none text-gray-800 bg-white"
            >
              <option value="">Bathrooms</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>
        <button type="submit" className="bg-terracotta text-white px-6 py-2 rounded-md hover:bg-terracotta-dark transition-colors duration-300 font-semibold">
          Search
        </button>
      </div>
    </form>
  );
};

export default ListingsSearchBar;