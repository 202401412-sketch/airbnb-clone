import React, { useState } from 'react';

const MapContainer = ({ listings = [] }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const dummyListings = listings.length > 0 ? listings : [
    { id: 1, title: 'Cozy Apartment in City Center', price: 120, rating: 4.85, image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Luxury Beachfront Villa', price: 250, rating: 4.95, image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Modern Studio Near Metro', price: 85, rating: 4.70, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="relative w-full h-[600px] bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center border">
      <div className="absolute inset-0 bg-[#e5e3df] flex items-center justify-center">
        <span className="text-gray-400 font-semibold text-lg">Interactive Map View</span>
      </div>

      <div className="absolute inset-0 p-10 flex flex-wrap gap-12 items-center justify-around">
        {dummyListings.map((item) => (
          <div key={item.id} className="relative">
            <button
              onClick={() => setSelectedProperty(item)}
              className="bg-white hover:scale-110 transition-transform font-bold text-sm px-3 py-1.5 rounded-full shadow-md border border-gray-300 hover:bg-black hover:text-white"
            >
              ${item.price}
            </button>

            {selectedProperty?.id === item.id && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl p-2 w-48 z-20 border">
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedProperty(null); }} 
                  className="absolute top-1 right-2 text-xs font-bold bg-gray-100 rounded-full w-5 h-5"
                >
                  ✕
                </button>
                <div className="h-24 bg-gray-300 rounded-lg mb-2 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs">
                  <p className="font-bold truncate">{item.title}</p>
                  <p className="text-gray-500">★ {item.rating}</p>
                  <p className="font-semibold mt-1">${item.price} <span className="font-normal text-gray-500">/ night</span></p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapContainer;