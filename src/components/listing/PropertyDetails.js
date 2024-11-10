// components/listing/PropertyDetails.js
const PropertyDetails = () => {
    const keyInfo = [
      'Tenure: Freehold',
      'Annual Rent: CFA 100,000',
      'Service Charge: CFA 150,000 per annum',
      'Utility Costs: Electricity & Water not included | Average monthly: CFA 20,000',
      'Security: 24/7 security with gated entry',
      'Internet Availability: Fiber optic (up to 30Mbps) available'
    ];
  
    const propertyFeatures = [
      '2-Bedroom Apartment',
      'Modern Kitchen',
      '650 Square feet',
      'Business Area Location',
      '24/7 Security',
      'Balcony'
    ];
  
    return (
      <div className="grid grid-cols-2 gap-8 p-6">
        {/* Left Column */}
        <div>
          <h2 className="text-xl font-bold mb-4">Key information</h2>
          <ul className="space-y-3">
            {keyInfo.map((info, index) => (
              <li key={index} className="text-gray-600">
                • {info}
              </li>
            ))}
          </ul>
        </div>
  
        {/* Right Column */}
        <div>
          <h2 className="text-xl font-bold mb-4">Property features</h2>
          <ul className="space-y-3">
            {propertyFeatures.map((feature, index) => (
              <li key={index} className="text-gray-600">
                • {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  