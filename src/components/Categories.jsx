import React from 'react';
import { 
  FaGlobe, FaSwimmingPool, FaUmbrellaBeach, FaHotel, 
  FaMountain, FaTree, FaHome, FaCity 
} from 'react-icons/fa';

const CATEGORIES = [
  { id: 'all', label: 'الكل', icon: FaGlobe },
  { id: 'hotels', label: 'فنادق', icon: FaHotel },
  { id: 'pools', label: 'مسابح', icon: FaSwimmingPool },
  { id: 'beach', label: 'شاطئ', icon: FaUmbrellaBeach },
  { id: 'nature', label: 'طبيعة', icon: FaTree },
  { id: 'mansions', label: 'قصور وفلل', icon: FaHome },
  { id: 'cities', label: 'مدن شهيرة', icon: FaCity },
];

const Categories = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3 px-4 border-b border-gray-200 bg-white">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex flex-col items-center gap-2 pb-2 border-b-2 transition-all flex-shrink-0 cursor-pointer ${
              isActive 
                ? 'border-black text-black font-semibold' 
                : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[12px] whitespace-nowrap">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Categories;