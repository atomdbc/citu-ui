'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa6';
import ModalManager from './ModalManager';

const translations = {
  'en-US': {
    description: "citu helps you find the right property faster, with clear listings and direct access to real estate agents you can trust.",
    quickLinks: "Quick Links",
    links: [
      "Home", "Buy", "Rent", "New homes", "Find developments",
      "Find agents", "Sold prices", "Instant valuation", "Sign up for early access"
    ],
    contactUs: "Contact us",
    allRights: "© 2024 citu. All rights reserved.",
    location: "Ivory Coast, Abidjan",
    email: "info@citu.ci",
    phone: "+316 23 09 82 90"
  },
  'fr': {
    description: "citu vous aide à trouver la bonne propriété plus rapidement, avec des annonces claires et un accès direct aux agents immobiliers en qui vous pouvez avoir confiance.",
    quickLinks: "Liens Rapides",
    links: [
      "Accueil", "Acheter", "Louer", "Nouvelles maisons", "Trouver des développements",
      "Trouver des agents", "Prix de vente", "Évaluation instantanée", "S'inscrire pour un accès anticipé"
    ],
    contactUs: "Contactez-nous",
    allRights: "© 2024 citu. Tous droits réservés.",
    location: "Côte d'Ivoire, Abidjan",
    email: "info@citu.ci",
    phone: "+316 23 09 82 90"
  }
};

const Footer = ({ lang = 'en-US' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = translations[lang] || translations['en-US'];

  const handleLinkClick = (linkText) => {
    if (linkText.toLowerCase().includes('early access') || 
        linkText.toLowerCase().includes('accès anticipé')) {
      setIsModalOpen(true);
    }
  };

  return (
    <footer className="bg-[#DD4440] text-white">
      <div className="container mx-auto px-4 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo, Description, and Social Icons */}
          <div className="md:col-span-1 max-w-xs pl-5">
            <div className="mb-6">
              <Image
                src="/footer_logo.png"
                alt="citu Logo"
                width={220}
                height={92}
              />
            </div>
            <p className="text-white text-sm mb-6">{t.description}</p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <FaXTwitter size={16} className="text-[#DD4440]" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <FaInstagram size={16} className="text-[#DD4440]" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <FaYoutube size={16} className="text-[#DD4440]" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <FaLinkedinIn size={16} className="text-[#DD4440]" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1 pl-5">
            <h3 className="text-xl font-bold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2 text-sm list-disc list-inside">
              {t.links.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-white hover:text-gray-200"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link);
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1 pl-5">
            <h3 className="text-xl font-bold mb-4">{t.contactUs}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <MapPin size={20} className="mr-2" />
                <span>{t.location}</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2" />
                <span>{t.email}</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2" />
                <span>{t.phone}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright - Now in a separate container with border-top */}
      <div className="border-t border-white/20 mt-16">
        <div className="container mx-auto px-4">
          <div className="py-6 text-center text-sm">
            <p className="text-white">{t.allRights}</p>
          </div>
        </div>
      </div>

      <ModalManager 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang}
      />
    </footer>
  );
};

export default Footer;