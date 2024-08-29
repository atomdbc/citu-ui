'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';

const SearchBar = ({ onSearch }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('buy');
  const [suggestions, setSuggestions] = useState([]);

  const debouncedSearch = debounce(async (term) => {
    if (term.length > 2) {
      try {
        const response = await fetch(`https://situ-backend-nqpg.vercel.app/api/listings/search?keyword=${term}&limit=8`);
        const data = await response.json();
        setSuggestions(data.data.map(listing => listing.title));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  const handleSearch = (term) => {
    if (typeof onSearch === 'function') {
      onSearch({ keyword: term, listingType: searchType });
    }
    router.push(`/listings?keyword=${term}&listingType=${searchType}`);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="max-w-6xl mx-auto -mt-16 relative z-20 p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-6 text-center ${searchType === 'buy' ? 'bg-terracotta text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setSearchType('buy')}
          >
            Buy
          </button>
          <button
            className={`flex-1 py-3 px-6 text-center ${searchType === 'rent' ? 'bg-terracotta text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setSearchType('rent')}
          >
            Rent
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder={`Where do you want to ${searchType}? e.g Abidjan, Cocody`}
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full p-3 border-0 focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-800"
          />
          <button
            className="absolute right-3 top-3 text-gray-400 hover:text-terracotta"
            onClick={() => handleSearch(searchTerm)}
          >
            <Search size={20} />
          </button>
          {suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-200 rounded-b-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    handleSearch(suggestion);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;