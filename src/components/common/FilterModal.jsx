import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
  const [typeOfPlace, setTypeOfPlace] = useState('Any type');
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [bedrooms, setBedrooms] = useState('Any');
  const [amenities, setAmenities] = useState([]);

  if (!isOpen) return null;

  const handleAmenityToggle = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleClearAll = () => {
    setTypeOfPlace('Any type');
    setMinPrice(1000);
    setMaxPrice(10000);
    setBedrooms('Any');
    setAmenities([]);
  };

  const handleApply = () => {
    onApplyFilters({ 
      typeOfPlace, 
      minPrice: Number(minPrice), 
      maxPrice: Number(maxPrice), 
      bedrooms, 
      amenities 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative" dir="ltr">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition text-gray-700">
            <FiX className="w-5 h-5" />
          </button>
          <h3 className="font-bold text-lg text-gray-900">Filters</h3>
          <div className="w-8"></div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Type of Place */}
          <div className="space-y-3">
            <h4 className="font-bold text-base text-gray-900">Type of place</h4>
            <div className="grid grid-cols-3 gap-2">
              {['Any type', 'Room', 'Entire home'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTypeOfPlace(type)}
                  className={`p-3 rounded-2xl border text-xs font-bold transition ${
                    typeOfPlace === type
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 bg-white text-gray-800 hover:border-black'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3 border-t pt-5">
            <h4 className="font-bold text-base text-gray-900">Price range (EGP)</h4>
            <div className="flex gap-3 items-center">
              <div className="flex-1 border border-gray-300 rounded-2xl p-3 bg-gray-50/50">
                <label className="block text-[10px] font-bold text-gray-500 uppercase">MIN PRICE</label>
                <div className="flex items-center gap-1 font-bold text-sm text-gray-900 mt-0.5">
                  <span>EGP</span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-transparent outline-none font-bold"
                  />
                </div>
              </div>
              <span className="text-gray-400 font-bold">–</span>
              <div className="flex-1 border border-gray-300 rounded-2xl p-3 bg-gray-50/50">
                <label className="block text-[10px] font-bold text-gray-500 uppercase">MAX PRICE</label>
                <div className="flex items-center gap-1 font-bold text-sm text-gray-900 mt-0.5">
                  <span>EGP</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-transparent outline-none font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="space-y-3 border-t pt-5">
            <h4 className="font-bold text-base text-gray-900">Bedrooms</h4>
            <div className="flex gap-2">
              {['Any', '1', '2', '3', '4+'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setBedrooms(num)}
                  className={`px-5 py-2.5 rounded-full border text-xs font-bold transition ${
                    bedrooms === num
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 bg-white text-gray-800 hover:border-black'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3 border-t pt-5">
            <h4 className="font-bold text-base text-gray-900">Amenities</h4>
            <div className="grid grid-cols-2 gap-3">
              {['Wi-Fi', 'Pool', 'Air conditioning', 'Free parking', 'Sea View', 'Kitchen'].map((amenity) => {
                const checked = amenities.includes(amenity);
                return (
                  <label
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition text-sm font-semibold ${
                      checked ? 'border-black bg-gray-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${checked ? 'bg-black border-black text-white' : 'border-gray-400'}`}>
                      {checked && <FiCheck className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-gray-900">{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleClearAll}
            className="text-sm font-bold text-gray-900 underline hover:text-black"
          >
            Clear all
          </button>
          <button
            onClick={handleApply}
            className="bg-[#FF385C] hover:bg-[#E00B41] text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-md"
          >
            Show properties
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterModal;