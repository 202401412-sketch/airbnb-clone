import React, { useState } from 'react';

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
  const [typeOfPlace, setTypeOfPlace] = useState('Any type');
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [bedrooms, setBedrooms] = useState('Any');
  const [beds, setBeds] = useState('Any');
  const [bathrooms, setBathrooms] = useState('Any');
  const [amenities, setAmenities] = useState([]);

  if (!isOpen) return null;

  const handleAmenityChange = (amenity) => {
    setAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleClearAll = () => {
    setTypeOfPlace('Any type');
    setMinPrice(1000);
    setMaxPrice(10000);
    setBedrooms('Any');
    setBeds('Any');
    setBathrooms('Any');
    setAmenities([]);
  };

  const handleApply = () => {
    onApplyFilters({ typeOfPlace, minPrice, maxPrice, bedrooms, beds, bathrooms, amenities });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '16px', width: '550px', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', padding: '24px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', pb: '12px', mb: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Filters</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        {/* 1. Type of Place */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '15px' }}>Type of place</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Any type', 'Room', 'Entire home'].map(type => (
              <button 
                key={type} 
                onClick={() => setTypeOfPlace(type)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: typeOfPlace === type ? '2px solid #111' : '1px solid #ccc', backgroundColor: typeOfPlace === type ? '#f7f7f7' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Price Range */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '15px' }}>Price range</h4>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }} placeholder="Min Price" />
            <span>-</span>
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }} placeholder="Max Price" />
          </div>
        </div>

        {/* 3. Rooms & Beds */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '15px' }}>Rooms and beds</h4>
          {['Bedrooms', 'Beds', 'Bathrooms'].map((item) => (
            <div key={item} style={{ marginBottom: '10px' }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666' }}>{item}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Any', '1', '2', '3', '4+'].map(num => (
                  <button 
                    key={num}
                    style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer' }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 4. Amenities */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '15px' }}>Amenities</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {['Wifi', 'Pool', 'Air conditioning', 'Free parking'].map(amenity => (
              <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                <input 
                  type="checkbox" 
                  checked={amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', pt: '15px', marginTop: '20px' }}>
          <button onClick={handleClearAll} style={{ border: 'none', background: 'none', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>Clear all</button>
          <button onClick={handleApply} style={{ backgroundColor: '#e11d48', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Show properties</button>
        </div>

      </div>
    </div>
  );
};

export default FilterModal;