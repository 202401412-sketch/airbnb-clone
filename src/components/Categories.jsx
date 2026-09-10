import React from 'react';
import { 
  FaGlobe, FaSwimmingPool, FaUmbrellaBeach, FaHotel, 
  FaTree, FaHome, FaCity 
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

const Categories = ({ selectedCategory = 'all', onSelectCategory }) => {
  return (
    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3 px-4 border-b border-gray-200 bg-white" dir="ltr">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory && onSelectCategory(cat.id)}
            className={`flex items-center gap-2 pb-2 text-xs font-bold transition border-b-2 whitespace-nowrap ${
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
  );
};

export default Categories;