import React, { useState } from 'react';
import { useSearch } from '../../context/SearchContext';

const SearchModal = ({ activeSection = 'where', onClose }) => {
  const { 
    destination, 
    setDestination, 
    guests, 
    setGuests, 
    totalGuests, 
    resetSearch 
  } = useSearch();

  const [currentTab, setCurrentTab] = useState(activeSection || 'where');

  const destinationsList = [
    { name: 'Nearby', sub: "Find what's around you", icon: '🧭' },
    { name: 'New Cairo, Egypt', sub: 'Popular with travelers near you', icon: '🏢' },
    { name: 'Sheikh Zayed City, Egypt', sub: 'A hidden gem', icon: '🏡' },
    { name: 'Cairo, Egypt', sub: 'For sights like Khan el-Khalili', icon: '🕌' },
    { name: 'Alexandria, Egypt', sub: 'For its seaside allure', icon: '🌊' },
    { name: 'Dahab, Egypt', sub: 'For nature-lovers', icon: '🏔️' },
  ];

  const handleGuestChange = (type, operation) => {
    setGuests((prev) => ({
      ...prev,
      [type]: operation === 'inc' ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 max-w-xl mx-auto mt-2 z-50 relative text-left">
      {/* EGP EGP EGP EGP */}
      <div className="flex justify-around border-b border-gray-100 pb-3 mb-4 text-xs font-bold">
        <button 
          onClick={() => setCurrentTab('where')}
          className={`pb-1 ${currentTab === 'where' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
        >
          Where
        </button>
        <button 
          onClick={() => setCurrentTab('when')}
          className={`pb-1 ${currentTab === 'when' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
        >
          When
        </button>
        <button 
          onClick={() => setCurrentTab('who')}
          className={`pb-1 ${currentTab === 'who' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
        >
          Who ({totalGuests})
        </button>
      </div>

      {/* 1. Where */}
      {currentTab === 'where' && (
        <div>
          <label className="block text-xs font-bold text-black mb-3">Suggested destinations</label>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {destinationsList.map((item, index) => (
              <div 
                key={index}
                onClick={() => {
                  setDestination(item.name);
                  setCurrentTab('when');
                }}
                className="flex items-center gap-4 p-2.5 hover:bg-gray-100 rounded-2xl cursor-pointer transition"
              >
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-base">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">{item.name}</div>
                  <div className="text-[11px] text-gray-500">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. When */}
      {currentTab === 'when' && (
        <div className="text-center py-4">
          <div className="flex justify-center gap-2 mb-4 bg-gray-100 p-1 rounded-full w-fit mx-auto text-xs font-semibold">
            <button className="bg-white px-5 py-1 rounded-full shadow-xs">Dates</button>
            <button className="px-5 py-1 rounded-full text-gray-500">Flexible</button>
          </div>
          <div className="text-xs font-semibold text-gray-700 mb-1">Select Check-in & Check-out dates</div>
          <p className="text-[11px] text-gray-400">Calendar view</p>
          <button 
            onClick={() => setCurrentTab('who')}
            className="mt-4 text-xs font-bold underline text-black block mx-auto"
          >
            Continue to Guests →
          </button>
        </div>
      )}

      {/* 3. Who */}
      {currentTab === 'who' && (
        <div className="space-y-4">
          {[
            { key: 'adults', title: 'Adults', desc: 'Ages 13 or above' },
            { key: 'children', title: 'Children', desc: 'Ages 2–12' },
            { key: 'infants', title: 'Infants', desc: 'Under 2' },
            { key: 'pets', title: 'Pets', desc: 'Bringing a service animal?' },
          ].map((type) => (
            <div key={type.key} className="flex justify-between items-center py-1">
              <div>
                <div className="text-xs font-semibold text-gray-900">{type.title}</div>
                <div className="text-[11px] text-gray-500">{type.desc}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleGuestChange(type.key, 'dec')}
                  disabled={guests[type.key] === 0}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-20 hover:border-black transition text-xs"
                >
                  -
                </button>
                <span className="text-xs font-semibold min-w-[12px] text-center">{guests[type.key]}</span>
                <button
                  onClick={() => handleGuestChange(type.key, 'inc')}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black transition text-xs"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
        <button
          onClick={resetSearch}
          className="text-xs font-semibold underline text-gray-600 hover:text-black"
        >
          Clear all
        </button>
        <button
          onClick={onClose}
          className="bg-[#FF385C] text-white px-5 py-2 rounded-xl text-xs font-semibold hover:bg-[#E00B41] transition"
        >
          Search ({totalGuests} guests)
        </button>
      </div>
    </div>
  );
};

export default SearchModal;