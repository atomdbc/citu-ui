// components/listing/PropertyFeatures.js
const PropertyFeatures = () => {
    const features = [
      { label: 'Flat' },
      { label: '2 beds' },
      { label: '1 bath' },
    ];
  
    return (
      <div className="flex gap-8 px-6 py-4 border-b">
        {features.map((feature, index) => (
          <span key={index} className="text-gray-600">
            {feature.label}
          </span>
        ))}
      </div>
    );
  };
  