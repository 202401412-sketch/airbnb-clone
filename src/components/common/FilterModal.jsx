import React, { useState } from 'react';

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(500);
  const [placeType, setPlaceType] = useState('any');
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  if (!isOpen) return null;

  const amenitiesList = [
    'Wifi', 'Kitchen', 'Washer', 'Dryer', 
    'Air conditioning', 'Heating', 'Pool', 'Free parking'
  ];

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(item => item !== amenity) : [...prev, amenity]
    );
  };

  const handleClearAll = () => {
    setMinPrice(10);
    setMaxPrice(500);
    setPlaceType('any');
    setBedrooms(0);
    setBeds(0);
    setBathrooms(0);
    setSelectedAmenities([]);
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({ minPrice, maxPrice, placeType, bedrooms, beds, bathrooms, selectedAmenities });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full text-xl font-bold">✕</button>
          <h2 className="text-lg font-bold">Filters</h2>
          <div className="w-6"></div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Price Range */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Price range</h3>
            <p className="text-gray-500 text-sm mb-4">Nightly prices before taxes and fees</p>
            <div className="flex gap-4 items-center">
              <div className="border rounded-xl p-3 flex-1">
                <label className="text-xs text-gray-500 block">Minimum</label>
                <input 
                  type="number" 
                  value={minPrice} 
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full outline-none text-sm font-semibold"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="border rounded-xl p-3 flex-1">
                <label className="text-xs text-gray-500 block">Maximum</label>
                <input 
                  type="number" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full outline-none text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          <hr />

          {/* Rooms and Beds */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Rooms and beds</h3>
            {[
              { label: 'Bedrooms', value: bedrooms, setter: setBedrooms },
              { label: 'Beds', value: beds, setter: setBeds },
              { label: 'Bathrooms', value: bathrooms, setter: setBathrooms },
            ].map(({ label, value, setter }) => (
              <div key={label} className="flex justify-between items-center mb-4">
                <span className="text-gray-700">{label}</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setter(Math.max(0, value - 1))}
                    className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 flex items-center justify-center hover:border-black"
                  >-</button>
                  <span className="w-4 text-center font-semibold">{value === 0 ? 'Any' : value}</span>
                  <button 
                    onClick={() => setter(value + 1)}
                    className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 flex items-center justify-center hover:border-black"
                  >+</button>
                </div>
              </div>
            ))}
          </div>

          <hr />

          {/* Amenities */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
              {amenitiesList.map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={selectedAmenities.includes(item)}
                    onChange={() => toggleAmenity(item)}
                    className="w-5 h-5 accent-black rounded"
                  />
                  <span className="text-gray-700 text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t bg-white">
          <button onClick={handleClearAll} className="underline font-semibold text-sm hover:text-black">
            Clear all
          </button>
          <button onClick={handleApply} className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
            Show places
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterModal;