import React from 'react';
import PropertyGrid from './components/PropertyGrid.jsx';
import { mockProperties } from './data/mockData.js';
import React, { useState, useEffect } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import Footer from './components/Footer';
import { SearchProvider, useSearch } from './context/SearchContext';

function App() {
  const [showMap, setShowMap] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [appliedFilters, setAppliedFilters] = useState(null);

  
  const categories = [
    { id: 'All', label: 'All', icon: '🏡' },
    { id: 'Beachfront', label: 'Beachfront', icon: '🏖️' },
    { id: 'Pools', label: 'Amazing pools', icon: '🏊' },
    { id: 'Cabins', label: 'Cabins', icon: '🪵' },
    { id: 'Luxe', label: 'Luxe', icon: '🏰' },
    { id: 'Icons', label: 'Icons', icon: '⭐' },
  ];

  
  const allProperties = [
    { id: 1, title: 'شقة في سان ستيفانو', price: 4778, rating: 4.85, location: 'سان ستيفانو، الإسكندرية', lat: 31.244, lng: 29.965, category: 'Beachfront', typeOfPlace: 'Entire home', bedrooms: '2', amenities: ['Wifi', 'Air conditioning'], image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500' },
    { id: 2, title: 'شقة في سيدي بشر بحري', price: 4168, rating: 4.90, location: 'سيدي بشر، الإسكندرية', lat: 31.258, lng: 29.981, category: 'Pools', typeOfPlace: 'Entire home', bedrooms: '3', amenities: ['Wifi', 'Pool'], image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500' },
    { id: 3, title: 'فيلا في الإسكندرية', price: 2974, rating: 4.75, location: 'الإسكندرية، مصر', lat: 31.220, lng: 29.940, category: 'Luxe', typeOfPlace: 'Entire home', bedrooms: '4+', amenities: ['Pool', 'Free parking'], image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500' },
    { id: 4, title: 'شقة مطلة على البحر', price: 3500, rating: 4.80, location: 'ستانلي، الإسكندرية', lat: 31.233, lng: 29.950, category: 'Beachfront', typeOfPlace: 'Room', bedrooms: '1', amenities: ['Wifi'], image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500' },
    { id: 5, title: 'شقة مودرن بوسط البلد', price: 5200, rating: 4.95, location: 'محطة الرمل، الإسكندرية', lat: 31.200, lng: 29.899, category: 'Icons', typeOfPlace: 'Room', bedrooms: '2', amenities: ['Air conditioning', 'Free parking'], image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=500' },
    { id: 6, title: 'شاليه خاص بحمام سباحة', price: 6100, rating: 4.65, location: 'الساحل الشمالي', lat: 31.020, lng: 29.600, category: 'Pools', typeOfPlace: 'Entire home', bedrooms: '3', amenities: ['Pool', 'Air conditioning', 'Free parking'], image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500' },
  ];

  
  const filteredProperties = allProperties.filter((prop) => {
    if (selectedCategory !== 'All' && prop.category !== selectedCategory) return false;
    if (appliedFilters) {
      if (appliedFilters.typeOfPlace !== 'Any type' && prop.typeOfPlace !== appliedFilters.typeOfPlace) return false;
      if (prop.price < appliedFilters.minPrice || prop.price > appliedFilters.maxPrice) return false;
      if (appliedFilters.bedrooms !== 'Any' && prop.bedrooms !== appliedFilters.bedrooms) return false;
      if (appliedFilters.amenities && appliedFilters.amenities.length > 0) {
        const hasAllAmenities = appliedFilters.amenities.every((amenity) => prop.amenities?.includes(amenity));
        if (!hasAllAmenities) return false;
      }
    }
    return true;
  });
// -------------------------------------------------------------
// 1. مكون التقويم والمواعيد المرنة (WhenModal)
// -------------------------------------------------------------
const WhenModal = () => {
  const [subTab, setSubTab] = useState('Dates'); // 'Dates' | 'Flexible'
  const [stayDuration, setStayDuration] = useState('Weekend'); // 'Weekend' | 'Week' | 'Month'
  const [selectedFlexOption, setSelectedFlexOption] = useState('Exact dates');

  const flexOptions = ['Exact dates', '± 1 day', '± 2 days', '± 3 days', '± 7 days', '± 14 days'];

  const monthsList = [
    { name: 'September', year: '2026' },
    { name: 'October', year: '2026' },
    { name: 'November', year: '2026' },
    { name: 'December', year: '2026' },
    { name: 'January', year: '2027' },
    { name: 'February', year: '2027' },
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const septDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const septEmpty = [null, null];

  const octDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const octEmpty = [null, null, null, null];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-gray-900 selection:text-white">
      <main>
        <PropertyGrid properties={mockProperties} isLoading={false} />
      </main>
    <div style={{ fontFamily: 'sans-serif', color: '#222', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Categories & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 100 }}>
        
        <div style={{ display: 'flex', gap: '28px', overflowX: 'auto' }}>
    <div style={{ fontFamily: 'sans-serif', color: '#222', backgroundColor: '#fff', minHeight: '100vh' }}>
      
      {}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', borderBottom: '1px solid #ebedef', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 100 }}>
        <div style={{ color: '#ff385c', fontSize: '22px', fontWeight: 'bold', cursor: 'pointer' }}>
          airbnb
        </div>
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 w-[680px] text-gray-800 mx-auto select-none">
      
      {/* TABS: Dates VS Flexible */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-full flex gap-1 text-xs font-semibold">
          <button
            onClick={() => setSubTab('Dates')}
            className={`px-8 py-2 rounded-full transition ${
              subTab === 'Dates' ? 'bg-white text-black shadow-sm font-bold' : 'text-gray-600 hover:text-black'
            }`}
          >
            Dates
          </button>
          <button
            onClick={() => setSubTab('Flexible')}
            className={`px-8 py-2 rounded-full transition ${
              subTab === 'Flexible' ? 'bg-white text-black shadow-sm font-bold' : 'text-gray-600 hover:text-black'
            }`}
          >
            Flexible
          </button>
        </div>
      </div>

      {/* TAB 1: DATES CALENDAR VIEW */}
      {subTab === 'Dates' && (
        <div>
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* September 2026 */}
            <div>
              <div className="text-center font-bold text-xs text-gray-900 mb-4">September 2026</div>
              <div className="grid grid-cols-7 gap-y-2 text-center text-[11px] font-semibold text-gray-400 mb-2">
                {daysOfWeek.map((day, i) => <span key={i}>{day}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-medium text-gray-800">
                {septEmpty.map((_, i) => <div key={`e-${i}`}></div>)}
                {septDays.map((day) => (
                  <div
                    key={day}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:border hover:border-black cursor-pointer mx-auto transition"
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* October 2026 */}
            <div>
              <div className="text-center font-bold text-xs text-gray-900 mb-4">October 2026</div>
              <div className="grid grid-cols-7 gap-y-2 text-center text-[11px] font-semibold text-gray-400 mb-2">
                {daysOfWeek.map((day, i) => <span key={i}>{day}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-medium text-gray-800">
                {octEmpty.map((_, i) => <div key={`e-${i}`}></div>)}
                {octDays.map((day) => (
                  <div
                    key={day}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:border hover:border-black cursor-pointer mx-auto transition"
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>

        {}
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #dddddd', borderRadius: '40px', padding: '8px 16px', boxShadow: '0 1px 2px rgba(0,0,0,0.08)', gap: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
          <span>Anywhere</span>
          <span style={{ color: '#ddd' }}>|</span>
          <span>Any week</span>
          <span style={{ color: '#ddd' }}>|</span>
          <span style={{ color: '#717171', fontWeight: 'normal' }}>Add guests</span>
          <div style={{ backgroundColor: '#ff385c', color: '#fff', borderRadius: '50%', padding: '6px 8px', fontSize: '12px' }}>🔍</div>
        </div>
          <div className="flex justify-center items-center gap-2 pt-2 border-t border-gray-100 overflow-x-auto">
            {flexOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedFlexOption(opt)}
                className={`px-3.5 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition ${
                  selectedFlexOption === opt
                    ? 'border-black bg-gray-50 text-black font-semibold'
                    : 'border-gray-200 text-gray-600 hover:border-black'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FLEXIBLE VIEW */}
      {subTab === 'Flexible' && (
        <div className="py-2">
          <div className="text-center mb-6">
            <h4 className="text-sm font-bold text-gray-900 mb-3">How long would you like to stay?</h4>
            <div className="flex justify-center gap-2">
              {['Weekend', 'Week', 'Month'].map((dur) => (
                <button
                  key={dur}
                  onClick={() => setStayDuration(dur)}
                  className={`px-5 py-2 rounded-full border text-xs font-semibold transition ${
                    stayDuration === dur
                      ? 'border-black bg-gray-50 text-black'
                      : 'border-gray-200 text-gray-600 hover:border-black'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-xs font-bold text-gray-900 text-center mb-4">Go anytime</h4>
            <div className="grid grid-cols-6 gap-3">
              {monthsList.map((m, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 hover:border-black rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition hover:shadow-xs group"
                >
                  <div className="text-2xl mb-2 text-gray-400 group-hover:text-black">🗓️</div>
                  <div className="text-xs font-bold text-gray-900">{m.name}</div>
                  <div className="text-[10px] text-gray-500 font-medium">{m.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      
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
      )}

    </div>
  );
};

// -------------------------------------------------------------
// 2. مكون القائمة المنبثقة المخصصة لشريط البحث (Search Modal Popup)
// -------------------------------------------------------------
const SearchModal = ({ activeSection, setActiveSection, onClose }) => {
  const { destination, setDestination, guests, setGuests, totalGuests, resetSearch } = useSearch();

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
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-50 text-left">
      <div className="flex justify-around border-b border-gray-100 pb-3 mb-4 text-xs font-bold text-gray-500">
        <button 
          onClick={() => setActiveSection('where')}
          className={`pb-1 ${activeSection === 'where' ? 'border-b-2 border-black text-black' : ''}`}
        >
          Where
        </button>
        <button 
          onClick={() => setActiveSection('when')}
          className={`pb-1 ${activeSection === 'when' ? 'border-b-2 border-black text-black' : ''}`}
        >
          When
        </button>
        <button 
          onClick={() => setActiveSection('who')}
          className={`pb-1 ${activeSection === 'who' ? 'border-b-2 border-black text-black' : ''}`}
        >
          Who ({totalGuests})
        </button>
      </div>

      {activeSection === 'where' && (
        <div>
          <label className="block text-xs font-bold text-black mb-3">Suggested destinations</label>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {destinationsList.map((item, index) => (
              <div 
                key={index}
                onClick={() => {
                  setDestination(item.name);
                  setActiveSection('when');
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

      {activeSection === 'when' && <WhenModal />}

      {activeSection === 'who' && (
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

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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

// -------------------------------------------------------------
// 3. مكون شريط البحث الكبير (الرئيسي)
// -------------------------------------------------------------
const SearchBarContent = ({ onSearchSubmit, activeSection, setActiveSection }) => {
  const { destination, setDestination, totalGuests } = useSearch();

  return (
    <div className="max-w-3xl mx-auto border border-gray-200 rounded-full shadow-md hover:shadow-lg transition bg-gray-50 flex items-center justify-between p-2 cursor-pointer mt-4 relative">
      <div 
        onClick={() => setActiveSection('where')}
        className={`flex-1 px-6 py-1 rounded-full transition ${activeSection === 'where' ? 'bg-white shadow-md' : 'hover:bg-gray-200/60'}`}
      >
        <div className="text-xs font-bold text-black">Where</div>
        <input 
          type="text" 
          placeholder="Search destinations" 
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full bg-transparent text-xs text-gray-700 outline-none cursor-text font-medium"
        />
      </div>

      <span className="border-r h-8 border-gray-300"></span>

      <div 
        onClick={() => setActiveSection('when')}
        className={`flex-1 px-6 py-1 rounded-full transition ${activeSection === 'when' ? 'bg-white shadow-md' : 'hover:bg-gray-200/60'}`}
      >
        <div className="text-xs font-bold text-black">When</div>
        <div className="text-xs text-gray-500">Add dates</div>
      </div>

      {/* Main Section */}
      <main style={{ padding: '24px 40px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#717171', fontWeight: 'bold' }}>
          Available properties count: {filteredProperties.length}
        </div>
      <span className="border-r h-8 border-gray-300"></span>

      <div 
        onClick={() => setActiveSection('who')}
        className={`flex-1 pl-6 pr-2 py-1 rounded-full transition flex items-center justify-between ${activeSection === 'who' ? 'bg-white shadow-md' : 'hover:bg-gray-200/60'}`}
      >
        <div>
          <div className="text-xs font-bold text-black">Who</div>
          <div className="text-xs text-gray-500">
            {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests'}
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSearchSubmit();
          }}
          className="bg-[#FF385C] text-white p-3 rounded-full flex items-center justify-center shadow-md hover:bg-[#E00B41] transition"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

        {showMap ? (
          <div style={{ height: '580px', width: '100%' }}>
            <MapContainer 
              properties={filteredProperties} 
              onClose={() => setShowMap(false)} 
            />
          </div>
        ) : (
          /* شبكة منسقة بالضبط 3 كروت في الصف */
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '24px', 
            width: '100%' 
          }}>
            {filteredProperties.map((prop) => (
              <div 
                key={prop.id} 
                style={{ 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)', 
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                  <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      {activeSection && (
        <SearchModal 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onClose={() => setActiveSection(null)}
        />
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 4. شريط الفلاتر السريع (Quick Filter Pills)
// -------------------------------------------------------------
const FilterBar = () => {
  const filters = [
    { label: 'Free parking' },
    { label: 'Wifi' },
    { label: 'Allows pets' },
    { label: 'Kitchen' },
    { label: 'Air conditioning' },
    { label: 'Washer' },
    { label: 'Gym' },
    { label: 'Pool' },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto py-3 px-8 border-t border-gray-100 justify-center text-xs font-semibold text-gray-700 select-none">
      <button className="flex items-center gap-2 border border-gray-300 hover:border-black rounded-full px-4 py-2 transition font-bold bg-white">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span>Filters</span>
      </button>
      <span className="border-r h-5 border-gray-200"></span>
      {filters.map((f, i) => (
        <button key={i} className="border border-gray-200 hover:border-black rounded-full px-4 py-2 transition whitespace-nowrap bg-white text-gray-800">
          {f.label}
        </button>
      ))}
    </div>
  );
};

// -------------------------------------------------------------
// 5. المكون الرئيسي للتطبيق (MainApp)
// -------------------------------------------------------------
const MainApp = () => {
  const { destination, totalGuests } = useSearch();
  const [activeTab, setActiveTab] = useState('Homes');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedModalTab, setSelectedModalTab] = useState('lang');
  const [selectedCurrency, setSelectedCurrency] = useState('EGP');
  const [selectedLang, setSelectedLang] = useState('English (US)');

  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeSearchSection, setActiveSearchSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
        setActiveSearchSection(null);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCompact = isSearchClicked || isScrolled;

  const handleOpenLangModal = (tabType) => {
    setSelectedModalTab(tabType);
    setIsLangModalOpen(true);
  };

  const handleSearchClick = () => {
    setIsSearchClicked(true);
    setActiveSearchSection(null);
  };

  const handleLogoClick = () => {
    setIsSearchClicked(false);
    setActiveSearchSection(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languagesList = [
    { name: 'English', sub: 'United States' },
    { name: 'Azərbaycan dili', sub: 'Azərbaycan' },
    { name: 'Bahasa Indonesia', sub: 'Indonesia' },
    { name: 'Bosanski', sub: 'Bosna i Hercegovina' },
    { name: 'Català', sub: 'Espanya' },
    { name: 'Čeština', sub: 'Česká republika' },
    { name: 'Crnogorski', sub: 'Crna Gora' },
    { name: 'Dansk', sub: 'Danmark' },
    { name: 'Deutsch', sub: 'Deutschland' },
    { name: 'Deutsch', sub: 'Österreich' },
    { name: 'Deutsch', sub: 'Schweiz' },
    { name: 'Deutsch', sub: 'Luxemburg' },
    { name: 'Eesti', sub: 'Eesti' },
    { name: 'English', sub: 'Australia' },
    { name: 'English', sub: 'Canada' },
    { name: 'English', sub: 'Guyana' },
    { name: 'English', sub: 'India' },
    { name: 'English', sub: 'Ireland' },
    { name: 'English', sub: 'New Zealand' },
    { name: 'English', sub: 'Singapore' },
    { name: 'English', sub: 'United Arab Emirates' },
    { name: 'Español', sub: 'Argentina' },
    { name: 'Español', sub: 'Belice' },
    { name: 'Español', sub: 'Bolivia' },
    { name: 'Español', sub: 'Chile' },
    { name: 'Español', sub: 'Colombia' },
    { name: 'Español', sub: 'Costa Rica' },
    { name: 'Español', sub: 'Ecuador' },
    { name: 'Español', sub: 'El Salvador' },
    { name: 'Español', sub: 'España' },
    { name: 'Español', sub: 'Estados Unidos' },
    { name: 'Español', sub: 'Guatemala' },
    { name: 'Español', sub: 'Honduras' },
    { name: 'Español', sub: 'Latinoamérica' },
    { name: 'Español', sub: 'México' },
    { name: 'Español', sub: 'Nicaragua' },
    { name: 'Español', sub: 'Panamá' },
    { name: 'Español', sub: 'Paraguay' },
    { name: 'Español', sub: 'Perú' },
    { name: 'Español', sub: 'Venezuela' },
    { name: 'Français', sub: 'Belgique' },
    { name: 'Français', sub: 'Canada' },
    { name: 'Français', sub: 'France' },
    { name: 'Français', sub: 'Suisse' },
    { name: 'Français', sub: 'Luxembourg' },
    { name: 'Gaeilge', sub: 'Éire' },
    { name: 'Hrvatski', sub: 'Hrvatska' },
    { name: 'isiXhosa', sub: 'eMzantsi Afrika' },
    { name: 'isiZulu', sub: 'iNingizimu Afrika' },
    { name: 'Íslenska', sub: 'Ísland' },
    { name: 'Magyar', sub: 'Magyarország' },
    { name: 'Malti', sub: 'Malta' },
    { name: 'Melayu', sub: 'Malaysia' },
    { name: 'Vlaams', sub: 'België' },
    { name: 'Nederlands', sub: 'Nederland' },
    { name: 'Norsk', sub: 'Norge' },
    { name: 'Polski', sub: 'Polska' },
    { name: 'Português', sub: 'Brasil' },
    { name: 'Português', sub: 'Portugal' },
    { name: 'Română', sub: 'România' },
    { name: 'Shqip', sub: 'Shqipëri' },
    { name: 'Slovenčina', sub: 'Slovensko' },
    { name: 'Slovenščina', sub: 'Slovenija' },
    { name: 'Srpski', sub: 'Srbija' },
    { name: 'Suomi', sub: 'Suomi' },
    { name: 'Svenska', sub: 'Sverige' },
    { name: 'Tagalog', sub: 'Pilipinas' },
    { name: 'Tiếng Việt', sub: 'Việt Nam' },
    { name: 'Türkçe', sub: 'Türkiye' },
    { name: 'Ελληνικά', sub: 'Ελλάδα' },
    { name: 'Български', sub: 'България' },
    { name: 'Македонски', sub: 'Северна Македонија' },
    { name: 'Русский', sub: 'Россия' },
    { name: 'Українська', sub: 'Україна' },
    { name: 'ქართული', sub: ' საქართველო' },
    { name: 'Հայերեն', sub: 'Հայաստան' },
    { name: 'עברית', sub: 'ישראל' },
    { name: 'العربية', sub: 'العالم' },
    { name: 'हिन्दी', sub: 'भारत' },
    { name: 'ಕನ್ನಡ', sub: 'ಭಾರತ' },
    { name: 'मराठी', sub: 'भारत' },
    { name: 'ไทย', sub: 'ประเทศไทย' },
    { name: '한국어', sub: '대한민국' },
    { name: '日本語', sub: '日本' },
    { name: '简体中文', sub: '美国' },
    { name: '繁體中文', sub: '美国' },
    { name: '简体中文', sub: '中国' },
    { name: '繁體中文', sub: '香港' },
    { name: '繁體中文', sub: '台灣' },
  ];

  const currenciesList = [
    { name: 'Egyptian pound', code: 'EGP - ج.م' },
    { name: 'Australian dollar', code: 'AUD - $' },
    { name: 'Brazilian real', code: 'BRL - R$' },
    { name: 'Bulgarian lev', code: 'BGN - лв.' },
    { name: 'Canadian dollar', code: 'CAD - $' },
    { name: 'Chilean peso', code: 'CLP - $' },
    { name: 'Chinese yuan', code: 'CNY - ¥' },
    { name: 'Colombian peso', code: 'COP - $' },
    { name: 'Costa Rican colon', code: 'CRC - ₡' },
    { name: 'Czech koruna', code: 'CZK - Kč' },
    { name: 'Danish krone', code: 'DKK - kr' },
    { name: 'Emirati dirham', code: 'AED - د.إ' },
    { name: 'Euro', code: 'EUR - €' },
    { name: 'Ghanaian cedi', code: 'GHS - GHC' },
    { name: 'Hong Kong dollar', code: 'HKD - $' },
    { name: 'Hungarian forint', code: 'HUF - Ft' },
    { name: 'Indian rupee', code: 'INR - ₹' },
    { name: 'Indonesian rupiah', code: 'IDR - Rp' },
    { name: 'Israeli new shekel', code: 'ILS - ₪' },
    { name: 'Japanese yen', code: 'JPY - ¥' },
    { name: 'Kazakhstani tenge', code: 'KZT - ₸' },
    { name: 'Kenyan shilling', code: 'KES - KSh' },
    { name: 'Malaysian ringgit', code: 'MYR - RM' },
    { name: 'Mexican peso', code: 'MXN - $' },
    { name: 'Moroccan dirham', code: 'MAD' },
    { name: 'New Taiwan dollar', code: 'TWD - $' },
    { name: 'New Zealand dollar', code: 'NZD - $' },
    { name: 'Norwegian krone', code: 'NOK - kr' },
    { name: 'Peruvian sol', code: 'PEN - S/' },
    { name: 'Philippine peso', code: 'PHP - ₱' },
    { name: 'Polish zloty', code: 'PLN - zł' },
    { name: 'Pound sterling', code: 'GBP - £' },
    { name: 'Qatari riyal', code: 'QAR - ر.ق' },
    { name: 'Romanian leu', code: 'RON - lei' },
    { name: 'Saudi Arabian riyal', code: 'SAR - SR' },
    { name: 'Singapore dollar', code: 'SGD - $' },
    { name: 'South African rand', code: 'ZAR - R' },
    { name: 'South Korean won', code: 'KRW - ₩' },
    { name: 'Swedish krona', code: 'SEK - kr' },
    { name: 'Swiss franc', code: 'CHF' },
    { name: 'Thai baht', code: 'THB - ฿' },
    { name: 'Turkish lira', code: 'TRY - ₺' },
    { name: 'Ugandan shilling', code: 'UGX - USh' },
    { name: 'Ukrainian hryvnia', code: 'UAH - ₴' },
    { name: 'United States dollar', code: 'USD - $' },
    { name: 'Uruguayan peso', code: 'UYU - $U' },
    { name: 'Vietnamese dong', code: 'VND - ₫' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-800 relative justify-between">
      
      {/* HEADER NAVBAR */}
      <header className={`border-b sticky top-0 bg-white z-40 transition-all duration-300 ${
        isCompact ? 'py-3 shadow-xs' : 'pt-4 pb-6 px-8'
      }`}>
        <div className="flex items-center justify-between max-w-[1700px] mx-auto px-8 relative">
          
          {/* Logo */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-1.5 cursor-pointer text-[#FF385C] z-10"
          >
            <FaAirbnb className="text-3xl" />
            <span className="font-bold text-xl tracking-tight hidden md:inline">airbnb</span>
          </div>

          {/* Center Content: Compact Search vs Expanded Tabs */}
          {isCompact ? (
            <div 
              onClick={() => {
                setIsSearchClicked(false);
                setActiveSearchSection('where');
              }}
              className="absolute left-1/2 -translate-x-1/2 flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition cursor-pointer py-1.5 px-3 text-xs font-semibold gap-3 bg-white"
            >
              <div className="flex items-center gap-2 text-gray-900 border-r border-gray-200 pr-3 font-bold">
                <span className="text-base">🏡</span>
                <span>{destination || 'Homes nearby'}</span>
              </div>
              <div className="text-gray-800 border-r border-gray-200 pr-3 font-semibold">Any week</div>
              <div className="text-gray-500 font-normal">
                {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests'}
              </div>
              <div className="bg-[#FF385C] text-white p-2 rounded-full ml-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-8 text-sm font-semibold text-gray-500 transition-all duration-300">
              <div 
                onClick={() => setActiveTab('All')}
                className={`flex items-center gap-2 cursor-pointer pb-1 transition ${
                  activeTab === 'All' ? 'text-black border-b-2 border-black font-bold' : 'hover:text-black'
                }`}
              >
                <svg className="w-5 h-5 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span>All</span>
              </div>

              <div 
                onClick={() => setActiveTab('Homes')}
                className={`flex items-center gap-2 cursor-pointer pb-1 transition ${
                  activeTab === 'Homes' ? 'text-black border-b-2 border-black font-bold' : 'hover:text-black'
                }`}
              >
                <svg className="w-5 h-5 text-green-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span>Homes</span>
              </div>

              <div 
                onClick={() => setActiveTab('Experiences')}
                className={`flex items-center gap-2 cursor-pointer pb-1 transition ${
                  activeTab === 'Experiences' ? 'text-black border-b-2 border-black font-bold' : 'hover:text-black'
                }`}
              >
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5-2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Experiences</span>
              </div>

              <div 
                onClick={() => setActiveTab('Services')}
                className={`flex items-center gap-2 cursor-pointer pb-1 transition ${
                  activeTab === 'Services' ? 'text-black border-b-2 border-black font-bold' : 'hover:text-black'
                }`}
              >
                <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 17h20v2H2zm11.84-9.21c.1-.25.16-.52.16-.8 0-1.1-.9-2-2-2s-2 .9-2 2c0 .28.06.55.16.8C6.46 8.8 3.54 11.98 3.06 16h17.88c-.48-4.02-3.4-7.2-7.1-8.21z"/>
                </svg>
                <span>Services</span>
              </div>
            </div>
          )}

          {/* Right Menu Controls */}
          <div className="relative flex items-center gap-1 text-sm font-semibold z-10">
            <div className="hover:bg-gray-100 px-3 py-2 rounded-full cursor-pointer transition">
              Become a host
            </div>

            <div 
              onClick={() => handleOpenLangModal('lang')}
              className="hover:bg-gray-100 p-3 rounded-full cursor-pointer text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>

            <div 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 border border-gray-300 pl-3 pr-1 py-1 rounded-full cursor-pointer hover:shadow-md transition bg-white ml-1"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>

            {isMenuOpen && (
              <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 text-sm z-50 text-gray-800">
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                  <span className="font-semibold">Help Center</span>
                </div>
                
                <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>{prop.title}</h3>
                      <span style={{ fontSize: '13px', fontWeight: 'bold' }}>★ {prop.rating}</span>
                    </div>
                    <p style={{ margin: '0 0 8px 0', color: '#717171', fontSize: '13px' }}>{prop.location}</p>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
                    {prop.price} EGP <span style={{ fontWeight: 'normal', color: '#717171' }}>/ night</span>
                  </p>
                <hr className="my-1.5 border-gray-100" />
                <div className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Become a host</div>
                    <div className="text-xs text-gray-500 font-normal mt-0.5">It's easy to start hosting and earn extra income.</div>
                  </div>
                </div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700">Refer a Host</div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700">Find a co-host</div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700">Gift cards</div>
                <hr className="my-1.5 border-gray-100" />
                <div className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer font-bold text-gray-900">
                  Log in or sign up
                </div>
              </div>
            )}
          </div>
        </div>

        {!isCompact ? (
          <SearchBarContent 
            activeSection={activeSearchSection}
            setActiveSection={setActiveSearchSection}
            onSearchSubmit={handleSearchClick} 
          />
        ) : (
          <div className="mt-2">
            <FilterBar />
          </div>
        )}
      </header>

      {/* Language / Currency Modal */}
      {isLangModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <button 
                onClick={() => setIsLangModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold text-lg"
              >
                ✕
              </button>
              <div className="flex gap-6 font-bold text-sm">
                <button 
                  onClick={() => setSelectedModalTab('lang')}
                  className={`pb-1 ${selectedModalTab === 'lang' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
                >
                  Language and region
                </button>
                <button 
                  onClick={() => setSelectedModalTab('currency')}
                  className={`pb-1 ${selectedModalTab === 'currency' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
                >
                  Currency
                </button>
              </div>
              <div className="w-8"></div>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              {selectedModalTab === 'lang' ? (
                <div>
                  <h3 className="text-xl font-bold mb-6">Translation</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {languagesList.map((lang, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          setSelectedLang(`${lang.name} (${lang.sub})`);
                          setIsLangModalOpen(false);
                        }}
                        className={`p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition ${selectedLang.includes(lang.name) ? 'border border-black' : ''}`}
                      >
                        <div className="text-sm font-semibold">{lang.name}</div>
                        <div className="text-xs text-gray-500">{lang.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold mb-6">Choose a currency</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {currenciesList.map((curr, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          setSelectedCurrency(curr.code);
                          setIsLangModalOpen(false);
                        }}
                        className={`p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition ${selectedCurrency === curr.code ? 'border border-black' : ''}`}
                      >
                        <div className="text-sm font-semibold">{curr.name}</div>
                        <div className="text-xs text-gray-500">{curr.code}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT BODY */}
      <main className="flex-1 max-w-[1700px] mx-auto px-8 py-8 w-full">
        <h2 className="text-xl font-bold mb-4">Inspiration for future getaways</h2>
      </main>

      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApplyFilters={(filters) => setAppliedFilters(filters)} 
      />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <SearchProvider>
      <MainApp />
    </SearchProvider>
  );
}