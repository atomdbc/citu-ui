// components/listing/AgentCard.js
const AgentCard = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-right mb-4">
          <span className="bg-[#DD4440] text-white px-3 py-1 rounded-lg text-lg font-semibold">
            AE
          </span>
        </div>
        <h3 className="text-[#DD4440] font-semibold text-xl mb-2">Aliane Estates</h3>
        <p className="text-gray-600 mb-6">
          Call Agent: +225071234567
        </p>
        <button className="w-full bg-[#DD4440] text-white py-3 rounded-xl font-semibold">
          CONTACT
        </button>
      </div>
    );
  };
  
  // Usage in the main listing page:
