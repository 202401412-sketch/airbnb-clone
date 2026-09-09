import React, { useState } from 'react';

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
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '16px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #eee', sticky: 'top', backgroundColor: '#fff' }}>
          <h3 style={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>Filters</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Type of Place */}
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 'bold' }}>Type of place</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {['Any type', 'Room', 'Entire home'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeOfPlace(type)}
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: typeOfPlace === type ? '#000' : '#ccc',
                    backgroundColor: typeOfPlace === type ? '#000' : '#fff',
                    color: typeOfPlace === type ? '#fff' : '#000',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 'bold' }}>Price range</h4>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '12px', padding: '8px 12px' }}>
                <label style={{ display: 'block', fontSize: '10px', color: '#717171', fontWeight: 'bold' }}>MIN PRICE</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={{ width: '100%', border: 'none', outline: 'none', fontWeight: 'bold', fontSize: '14px' }}
                />
              </div>
              <span>-</span>
              <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '12px', padding: '8px 12px' }}>
                <label style={{ display: 'block', fontSize: '10px', color: '#717171', fontWeight: 'bold' }}>MAX PRICE</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={{ width: '100%', border: 'none', outline: 'none', fontWeight: 'bold', fontSize: '14px' }}
                />
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 'bold' }}>Bedrooms</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Any', '1', '2', '3', '4+'].map((num) => (
                <button
                  key={num}
                  onClick={() => setBedrooms(num)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: bedrooms === num ? '#000' : '#ccc',
                    backgroundColor: bedrooms === num ? '#000' : '#fff',
                    color: bedrooms === num ? '#fff' : '#000',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 'bold' }}>Amenities</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {['Wifi', 'Pool', 'Air conditioning', 'Free parking'].map((amenity) => (
                <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                  <input
                    type="checkbox"
                    checked={amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    style={{ accentColor: '#000', width: '16px', height: '16px' }}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid #eee' }}>
          <button onClick={handleClearAll} style={{ background: 'none', border: 'none', textDecoration: 'underline', fontWeight: 'bold', cursor: 'pointer' }}>
            Clear all
          </button>
          <button onClick={handleApply} style={{ backgroundColor: '#e11d48', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
            Show properties
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterModal;