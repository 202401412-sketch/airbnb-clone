import React, { useState } from 'react';

const CategoryBar = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'All', label: 'All', icon: '🏡' },
    { id: 'Beachfront', label: 'Beachfront', icon: '🏖️' },
    { id: 'Pools', label: 'Amazing pools', icon: '🏊' },
    { id: 'Cabins', label: 'Cabins', icon: '🪵' },
    { id: 'Luxe', label: 'Luxe', icon: '🏰' },
    { id: 'Icons', label: 'Icons', icon: '⭐' },
  ];

  return (
    <div className="flex gap-10 overflow-x-auto px-10 py-4 justify-center border-t border-gray-100 bg-white">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => setSelectedCategory(cat.id)}
          className={`flex flex-col items-center gap-2 cursor-pointer border-b-2 pb-2 text-xs transition min-w-[60px] ${
            selectedCategory === cat.id
              ? 'border-black font-bold text-black opacity-100'
              : 'border-transparent text-gray-500 hover:text-black opacity-70 hover:opacity-100'
          }`}
        >
          <span className="text-2xl">{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;