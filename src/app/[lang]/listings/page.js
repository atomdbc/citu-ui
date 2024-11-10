'use client';

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListingsSearchBar from '../../components/ListingsSearchBar';
import PropertyCard from '../../components/PropertyCard';
import { MapPin } from 'lucide-react';

const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [{ color: "#f8f9fa" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c2e3f6" }]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#e8f2e1" }]
  },
  // Add more custom styles as needed
];

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [displayedListings, setDisplayedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mapCenter, setMapCenter] = useState({ lat: 5.3096, lng: -4.0126 }); // Default to Abidjan
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  const mapContainerStyle = {
    width: '100%',
    height: 'calc(100vh - 100px)',
  };

  const fetchListings = async (searchParams = {}) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`https://situ-backend-nqpg.vercel.app/api/listings/search?${queryString}`);
      if (!response.ok) throw new Error('Failed to fetch listings');

      const data = await response.json();
      const itemsPerPage = 9;
      setListings(data.data);

      const totalItems = data.data.length;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
      updateDisplayedListings(1, data.data);

      if (data.data.length > 0 && data.data[0].location) {
        setMapCenter({
          lat: data.data[0].location.coordinates[1],
          lng: data.data[0].location.coordinates[0],
        });
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayedListings = (page, listingsData = listings) => {
    const itemsPerPage = 9;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedListings(listingsData.slice(startIndex, endIndex));
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

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    if (mapRef) {
      mapRef.panTo({ lat: property.location.coordinates[1], lng: property.location.coordinates[0] });
    }
  };

  const handleMapLoad = (map) => {
    setMapRef(map);
  };

  const handleSearchThisArea = () => {
    if (mapRef) {
      const bounds = mapRef.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      
      fetchListings({
        minLat: sw.lat(),
        maxLat: ne.lat(),
        minLng: sw.lng(),
        maxLng: ne.lng(),
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 mt-20">
          <ListingsSearchBar onSearch={handleSearch} />
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-terracotta"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedListings.map((listing) => (
                      <PropertyCard key={listing._id} property={listing} />
                    ))}
                  </div>
                  {/* Add Pagination component here */}
                </>
              )}
            </div>
            <div className="w-full lg:w-1/2 relative">
              <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={10}
                  options={{ styles: mapStyles }}
                  onLoad={handleMapLoad}
                >
                  {listings.map((listing) => (
                    <Marker
                      key={listing._id}
                      position={{
                        lat: listing.location.coordinates[1],
                        lng: listing.location.coordinates[0],
                      }}
                      onClick={() => handleMarkerClick(listing)}
                      icon={{
                        url: '/custom-marker.svg', // Ensure this is placed correctly in your public folder
                        scaledSize: new window.google.maps.Size(30, 30),
                      }}
                    />
                  ))}
                  {selectedProperty && (
                    <InfoWindow
                      position={{
                        lat: selectedProperty.location.coordinates[1],
                        lng: selectedProperty.location.coordinates[0],
                      }}
                      onCloseClick={() => setSelectedProperty(null)}
                    >
                      <div className="p-2">
                        <h3 className="font-semibold">{selectedProperty.title}</h3>
                        <p className="text-sm">${selectedProperty.price.toLocaleString()}</p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
              <button
                onClick={handleSearchThisArea}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-300 flex items-center"
              >
                <MapPin size={16} className="mr-2" />
                Search this area
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingsPage;
