import React, { useState } from 'react';
import FilterModal from './components/common/FilterModal.jsx';
import MapContainer from './components/common/MapContainer.jsx';

function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // mockProperties بيانات تجريبية للعقارات
  const mockProperties = [
    { id: 1, title: 'شقة في سان ستيفانو', location: 'سان ستيفانو، الإسكندرية', price: 4778, rating: 4.85, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop' },
    { id: 2, title: 'شقة في سيدي بشر بحري', location: 'سيدي بشر، الإسكندرية', price: 4168, rating: 4.90, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop' },
    { id: 3, title: 'فيلا في الإسكندرية', location: 'الإسكندرية، مصر', price: 2974, rating: 4.75, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop' },
    { id: 4, title: 'شقة في سان ستيفانو', location: 'سان ستيفانو، الإسكندرية', price: 3500, rating: 4.80, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop' },
    { id: 5, title: 'شقة في سان ستيفانو', location: 'سان ستيفانو، الإسكندرية', price: 5200, rating: 4.95, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&auto=format&fit=crop' },
    { id: 6, title: 'شقة في سيدي بشر بحري', location: 'سيدي بشر، الإسكندرية', price: 3800, rating: 4.65, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      {/* Header / Top Navigation Bar */}
      <header className="border-b px-8 py-4 flex justify-between items-center sticky top-0 bg-white z-10 shadow-sm">
        <h1 className="text-xl font-bold text-red-500">Airbnb Clone</h1>
        
        <div className="flex gap-3 items-center">
          {/* Toggle Map/List Button */}
          <button 
            onClick={() => setShowMap(!showMap)}
            className="border px-4 py-2 rounded-full text-sm font-semibold hover:shadow-md transition flex items-center gap-2"
          >
            {showMap ? 'Show List ☰' : 'Show Map 🗺️'}
          </button>

          {/* Filter Modal Trigger Button */}
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="border px-4 py-2 rounded-full text-sm font-semibold hover:shadow-md transition flex items-center gap-2"
          >
            🎛️ Filters
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-8 max-w-7xl mx-auto">
        
        {/* Toggle between Map View and Properties Grid */}
        {showMap ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Interactive Map View</h2>
            <MapContainer listings={mockProperties} />
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Available properties</h2>
              <p className="text-gray-500 text-sm">Properties count: {mockProperties.length}</p>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {mockProperties.map((property) => (
                <div key={property.id} className="border rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover hover:scale-105 transition duration-300" 
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-base truncate">{property.title}</h3>
                      <span className="text-sm font-semibold">★ {property.rating}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">{property.location}</p>
                    <p className="font-bold text-base">{property.price} EGP <span className="font-normal text-gray-500 text-sm">/ night</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Filter Modal Popup */}
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={(filters) => {
          console.log('Applied Filters:', filters);
        }}
      />

    </div>
  );
}

export default App;