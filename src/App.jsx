import React from 'react';
import { mockProperties } from './data/mockData';

function App() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-2">Airbnb Clone</h1>
      <p className="text-gray-600 mb-6">Available properties: {mockProperties.length}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockProperties.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-4 border">
            <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-3" />
            <h2 className="font-bold text-lg">{item.title}</h2>
            <p className="text-gray-500">{item.location}</p>
            <p className="font-bold text-primary mt-2">{item.pricePerNight} EGP / night</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;