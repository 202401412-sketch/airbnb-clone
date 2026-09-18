import React from 'react';

const MyTripsPage = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 min-h-[60vh]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Trips & Bookings</h1>
        <button 
          onClick={() => onNavigate('home')} 
          className="text-sm font-semibold text-gray-600 hover:underline"
        >
          ← Back to Home
        </button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">🧳</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">No trips booked... yet!</h2>
        <p className="text-gray-500 text-sm mb-6">Time to dust off your bags and start planning your next adventure.</p>
        <button 
          onClick={() => onNavigate('home')} 
          className="bg-[#FF385C] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-rose-600 transition"
        >
          Start Searching
        </button>
      </div>
    </div>
  );
};

export default MyTripsPage;