import React, { useState } from 'react';
import FilterModal from './components/common/FilterModal';
import MapContainer from './components/common/MapContainer';

function App() {
  const [showMap, setShowMap] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [appliedFilters, setAppliedFilters] = useState(null);

  // قائمة التصنيفات المشهورة في Airbnb
  const categories = [
    { id: 'All', label: 'All', icon: '🏡' },
    { id: 'Beachfront', label: 'Beachfront', icon: '🏖️' },
    { id: 'Pools', label: 'Amazing pools', icon: '🏊' },
    { id: 'Cabins', label: 'Cabins', icon: '🪵' },
    { id: 'Luxe', label: 'Luxe', icon: '🏰' },
    { id: 'Icons', label: 'Icons', icon: '⭐' },
  ];

  // البيانات التجريبية للعقارات
  const allProperties = [
    { id: 1, title: 'شقة في سان ستيفانو', price: 4778, rating: 4.85, location: 'سان ستيفانو، الإسكندرية', lat: 31.244, lng: 29.965, category: 'Beachfront', typeOfPlace: 'Entire home', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500' },
    { id: 2, title: 'شقة في سيدي بشر بحري', price: 4168, rating: 4.90, location: 'سيدي بشر، الإسكندرية', lat: 31.258, lng: 29.981, category: 'Pools', typeOfPlace: 'Entire home', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500' },
    { id: 3, title: 'فيلا في الإسكندرية', price: 2974, rating: 4.75, location: 'الإسكندرية، مصر', lat: 31.220, lng: 29.940, category: 'Luxe', typeOfPlace: 'Entire home', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500' },
    { id: 4, title: 'شقة مطلة على البحر', price: 3500, rating: 4.80, location: 'ستانلي، الإسكندرية', lat: 31.233, lng: 29.950, category: 'Beachfront', typeOfPlace: 'Room', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500' },
    { id: 5, title: 'شقة مودرن بوسط البلد', price: 5200, rating: 4.95, location: 'محطة الرمل، الإسكندرية', lat: 31.200, lng: 29.899, category: 'Icons', typeOfPlace: 'Room', image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=500' },
    { id: 6, title: 'شاليه خاص بحمام سباحة', price: 6100, rating: 4.65, location: 'الساحل الشمالي', lat: 31.020, lng: 29.600, category: 'Pools', typeOfPlace: 'Entire home', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500' },
  ];

  // تصفية العقارات بناءً على التصنيف والفلاتر المطبقة
  const filteredProperties = allProperties.filter((prop) => {
    if (selectedCategory !== 'All' && prop.category !== selectedCategory) return false;
    if (appliedFilters) {
      if (appliedFilters.typeOfPlace !== 'Any type' && prop.typeOfPlace !== appliedFilters.typeOfPlace) return false;
      if (prop.price < appliedFilters.minPrice || prop.price > appliedFilters.maxPrice) return false;
    }
    return true;
  });

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#222', backgroundColor: '#fff', minHeight: '100vh' }}>
      
      {/* 1. Navbar الرئيسي */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', borderBottom: '1px solid #ebedef', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 100 }}>
        <div style={{ color: '#ff385c', fontSize: '22px', fontWeight: 'bold', cursor: 'pointer' }}>
          airbnb
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #dddddd', borderRadius: '40px', padding: '8px 16px', boxShadow: '0 1px 2px rgba(0,0,0,0.08)', gap: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
          <span>Anywhere</span>
          <span style={{ color: '#ddd' }}>|</span>
          <span>Any week</span>
          <span style={{ color: '#ddd' }}>|</span>
          <span style={{ color: '#717171', fontWeight: 'normal' }}>Add guests</span>
          <div style={{ backgroundColor: '#ff385c', color: '#fff', borderRadius: '50%', padding: '6px 8px', fontSize: '12px' }}>🔍</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', fontWeight: 'bold' }}>
          <span style={{ cursor: 'pointer' }}>Airbnb your home</span>
          <span style={{ cursor: 'pointer', fontSize: '18px' }}>🌐</span>
        </div>
      </header>

      {/* 2. شريط التصنيفات والتحكم (Categories & Controls) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', borderBottom: '1px solid #f0f0f0' }}>
        
        {/* Categories Bar */}
        <div style={{ display: 'flex', gap: '30px', overflowX: 'auto' }}>
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat.id)}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '6px', 
                cursor: 'pointer', 
                borderBottom: selectedCategory === cat.id ? '2px solid #000' : '2px solid transparent',
                paddingBottom: '8px',
                color: selectedCategory === cat.id ? '#000' : '#717171',
                fontWeight: selectedCategory === cat.id ? 'bold' : 'normal',
                fontSize: '12px'
              }}
            >
              <span style={{ fontSize: '20px' }}>{cat.icon}</span>
              <span>{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Control Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setIsFilterOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px', border: '1px solid #dddddd', backgroundColor: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
          >
            🎛️ Filters
          </button>

          <button 
            onClick={() => setShowMap(!showMap)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px', border: 'none', backgroundColor: '#222', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
          >
            {showMap ? 'Show List 📋' : 'Show Map 🗺️'}
          </button>
        </div>
      </div>

      {/* 3. الجزء الرئيسي: عرض الأماكن / الخريطة */}
      <main style={{ padding: '24px 40px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#717171', fontWeight: 'bold' }}>
          Available properties count: {filteredProperties.length}
        </div>

        {showMap ? (
          <div style={{ height: '620px', width: '100%' }}>
            <MapContainer 
              properties={filteredProperties} 
              onClose={() => setShowMap(false)} 
            />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {filteredProperties.map((prop) => (
              <div key={prop.id} style={{ border: '1px solid #e0e0e0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: '220px' }}>
                  <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>{prop.title}</h3>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>★ {prop.rating}</span>
                  </div>
                  <p style={{ margin: '0 0 8px 0', color: '#717171', fontSize: '13px' }}>{prop.location}</p>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
                    {prop.price} EGP <span style={{ fontWeight: 'normal', color: '#717171' }}>/ night</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 4. Filter Modal Window */}
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApplyFilters={(filters) => setAppliedFilters(filters)} 
      />

    </div>
  );
}

export default App;