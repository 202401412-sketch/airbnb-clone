import React from 'react';
import { useUserSaved } from '../context/UserSavedContext.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import { mockProperties } from '../data/mockData.js';

const WishlistsPage = ({ onNavigate }) => {
  const savedContext = useUserSaved();

  // 1. فحص كل المسميات المحتملة للمصفوفة جوه الـ Context
  const rawSaved = 
    savedContext?.savedProperties || 
    savedContext?.saved || 
    savedContext?.wishlist || 
    savedContext?.favorites || 
    [];

  // 2. مطابقة الـ IDs بالعقارات الكاملة لو كان المخزن مجرد أرقام/IDs
  const favoriteProperties = mockProperties.filter((item) => {
    return rawSaved.some((savedItem) => {
      const savedId = typeof savedItem === 'object' ? savedItem.id : savedItem;
      return String(savedId) === String(item.id);
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 min-h-[70vh]">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wishlists</h1>
          <p className="text-gray-500 text-sm mt-1">Your saved favorite places to stay</p>
        </div>
        <button 
          onClick={() => onNavigate('home')} 
          className="text-sm font-semibold text-gray-700 hover:text-black underline cursor-pointer"
        >
          ← Back to Explore
        </button>
      </div>

      {favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-12 text-center max-w-xl mx-auto mt-10">
          <div className="text-5xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 text-sm mb-6">
            As you search, tap the heart icon on any home to save your favorite stays here.
          </p>
          <button 
            onClick={() => onNavigate('home')} 
            className="bg-[#FF385C] text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-600 transition shadow-sm cursor-pointer"
          >
            Start Exploring
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistsPage;