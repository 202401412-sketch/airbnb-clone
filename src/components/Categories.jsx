import React from 'react';
import { 
  FaGlobe, FaSwimmingPool, FaUmbrellaBeach, FaHotel, 
  FaTree, FaHome, FaCity, FaWifi, FaSlidersH, FaTimes 
} from 'react-icons/fa';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: FaGlobe },
  { id: 'hotels', label: 'Hotels', icon: FaHotel },
  { id: 'pools', label: 'Pools', icon: FaSwimmingPool },
  { id: 'beach', label: 'Beachfront', icon: FaUmbrellaBeach },
  { id: 'nature', label: 'Nature', icon: FaTree },
  { id: 'mansions', label: 'Mansions & Villas', icon: FaHome },
  { id: 'cities', label: 'Popular Cities', icon: FaCity },
];

const Categories = ({ 
  selectedCategory = 'all', 
  onSelectCategory,
  selectedAmenity = null,
  onSelectAmenity,
  onOpenFilterModal 
}) => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 px-6 border-b border-gray-200 bg-white" dir="ltr">
      {/* 1. قائمة التصنيفات الرئيسية */}
      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar flex-1">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat.id)}
              className={`flex items-center gap-2 pb-2 text-xs font-bold transition border-b-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-black text-black opacity-100'
                  : 'border-transparent text-gray-500 hover:text-black opacity-70 hover:opacity-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. أزرار الفلاتر السريعة وزرار Filters الجانبي */}
      <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200">
        {/* زرار الـ Wi-Fi التفاعلي الأنيق */}
        <button
          onClick={() => onSelectAmenity && onSelectAmenity(selectedAmenity === 'Wi-Fi' ? null : 'Wi-Fi')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition border cursor-pointer ${
            selectedAmenity === 'Wi-Fi'
              ? 'bg-black text-white border-black shadow-sm'
              : 'bg-white text-gray-700 border-gray-300 hover:border-black'
          }`}
        >
          <FaWifi className="w-3.5 h-3.5" />
          <span>Wi-Fi</span>
          {selectedAmenity === 'Wi-Fi' && (
            <FaTimes className="w-3 h-3 ml-1 opacity-80 hover:opacity-100" />
          )}
        </button>

        {/* زرار Filters الشامل */}
        <button
          onClick={onOpenFilterModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-gray-300 hover:border-black transition bg-white text-gray-800 cursor-pointer shadow-2xs"
        >
          <FaSlidersH className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
};

export default Categories;