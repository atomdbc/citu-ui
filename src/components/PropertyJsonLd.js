export default function PropertyJsonLd({ property }) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": property.title,
      "description": property.description,
      "url": `https://citu.ci/listings/${property.id}`,
      "datePosted": property.listDate || new Date().toISOString(),
      "image": property.images?.map(img => `https://citu.ci${img}`) || [],
      "offers": {
        "@type": "Offer",
        "price": property.price,
        "priceCurrency": "XOF",
        "businessFunction": property.listingType === "sale" ? "sell" : "lease",
        "availability": "https://schema.org/InStock"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Abidjan",
        "addressRegion": property.location,
        "addressCountry": "CI"
      },
      "numberOfRooms": property.bedrooms,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.size,
        "unitCode": "MTK"
      },
      "amenityFeature": (property.features || []).map(feature => ({
        "@type": "LocationFeatureSpecification",
        "name": feature
      }))
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    );
  }