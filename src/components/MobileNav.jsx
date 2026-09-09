import React from 'react';
import { FaSearch, FaHeart, FaUserCircle } from 'react-icons/fa';
import { useSearch } from '../../context/SearchContext';

const MobileNav = ({ onSearchClick }) => {
  const { totalGuests, destination } = useSearch();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 flex justify-around items-center z-50 shadow-lg">
      {/* Search Tab */}
      <button 
        onClick={onSearchClick}
        className="flex flex-col items-center gap-1 text-[#FF385C]"
      >
        <FaSearch className="text-xl" />
        <span className="text-[10px] font-bold">Explore</span>
      </button>

      {/* Wishlist Tab */}
      <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-black">
        <FaHeart className="text-xl" />
        <span className="text-[10px] font-medium">Wishlists</span>
      </button>

      {/* Profile / Log in Tab */}
      <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-black">
        <FaUserCircle className="text-xl" />
        <span className="text-[10px] font-medium">Log in</span>
      </button>
    </div>
  );
};

export default MobileNav;