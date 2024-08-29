'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Image from 'next/image'; // Import Image from Next.js

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    "Instant online valuation", "Value my home", "For sale", "To rent", 
    "New homes","professionals", "Find developments", "Find agents", 
    "Blog"
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo with link */}
          <a href="/" className="flex items-center">
            <Image
              src="/situ_logo.png" // Update the path to the logo image
              alt="SITU Logo"
              width={120} // Adjust width as needed
              height={40} // Adjust height as needed
              className="cursor-pointer"
            />
          </a>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-terracotta transition duration-300">Find an agent</a>
            <a href="#" className="text-gray-700 hover:text-terracotta transition duration-300">Sign in/Register</a>
          </nav>
          <div className="relative">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-terracotta flex items-center transition duration-300">
              <Menu size={24} className="mr-2" />
              <span>Menu</span>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-md shadow-lg py-1 z-50">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-terracotta hover:text-white transition duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
