import React, { useState } from 'react';
import { FaAirbnb, FaUserCircle } from 'react-icons/fa';
import { FiGlobe, FiMenu, FiSearch, FiSliders, FiHelpCircle } from 'react-icons/fi';
import { MdOutlinePublic, MdOutlineCardTravel, MdOutlineRoomService } from 'react-icons/md';
import { FiHome } from 'react-icons/fi';

const Header = ({ setIsLangModalOpen, isScrolled, isSearched, setIsSearched }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const mainTabs = [
    { id: 'All', label: 'All', icon: <MdOutlinePublic className="text-xl text-amber-600" /> },
    { id: 'Homes', label: 'Homes', icon: <FiHome className="text-lg text-emerald-600" /> },
    { id: 'Experiences', label: 'Experiences', icon: <MdOutlineCardTravel className="text-xl text-rose-500" /> },
    { id: 'Services', label: 'Services', icon: <MdOutlineRoomService className="text-xl text-sky-600" /> },
  ];

  const quickFilters = ['Free parking', 'Wifi', 'Allows pets', 'Kitchen', 'Air conditioning', 'Washer', 'Gym', 'Pool'];

  return (
    <div className="w-full bg-white border-b border-gray-200" dir="ltr">
      
      {/* Upper Navigation Bar */}
      <div className="flex items-center justify-between px-10 py-3">
        
        {/* Logo */}
        <div 
          onClick={() => setIsSearched && setIsSearched(false)} 
          className="text-[#FF385C] flex items-center gap-1.5 cursor-pointer"
        >
          <FaAirbnb className="w-8 h-8" />
          <span className="hidden md:inline font-black text-xl tracking-tighter">airbnb</span>
        </div>

        {/* Center: Tabs OR Compact Search Bar */}
        {!isSearched && !isScrolled ? (
          <div className="flex items-center gap-8">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-2 transition border-b-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-black text-black font-bold'
                    : 'border-transparent text-gray-500 hover:text-black opacity-80'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        ) : (
          /* Compact Search Bar */
          <div 
            onClick={() => setIsSearched && setIsSearched(false)} 
            className="flex items-center border border-gray-300 rounded-full py-2 px-5 shadow-sm hover:shadow-md transition cursor-pointer text-sm font-semibold gap-4 bg-white"
          >
            <div className="flex items-center gap-2 pr-3 border-r border-gray-200">
              <span className="text-xl">🏚️</span>
              <span className="text-gray-900 font-bold">Homes nearby</span>
            </div>
            <span className="text-gray-900 font-semibold border-r border-gray-200 pr-4">Any week</span>
            <span className="text-gray-500 font-normal">Add guests</span>
            <div className="bg-[#FF385C] text-white p-2 rounded-full ml-1">
              <FiSearch className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
        )}

        {/* Right Controls & User Menu */}
        <div className="flex items-center gap-3 relative">
          <button type="button" className="text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition">
            Become a host
          </button>
          <button 
            type="button" 
            onClick={() => setIsLangModalOpen && setIsLangModalOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-700"
          >
            <FiGlobe className="w-4 h-4" />
          </button>
          
          <button 
            type="button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 border border-gray-300 rounded-full py-1.5 px-3 hover:shadow-md transition cursor-pointer bg-white"
          >
            <FiMenu className="text-gray-600 text-sm" />
            <FaUserCircle className="text-gray-500 text-xl" />
          </button>

          {/* User Dropdown */}
          {isUserMenuOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 text-sm text-left">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-gray-800 font-medium">
                <FiHelpCircle className="w-4 h-4 text-gray-600" />
                <span>Help Center</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex justify-between items-start gap-2">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Become a host</div>
                  <div className="text-[11px] text-gray-500 leading-snug mt-0.5">
                    It's easy to start hosting and earn extra income.
                  </div>
                </div>
                <img 
                  src="https://a0.muscache.com/pictures/2a166430-8c28-4200-b36e-aa9322fee2c4.jpg" 
                  alt="Host" 
                  className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                />
              </div>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm">Refer a Host</button>
              <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm">Find a co-host</button>
              <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm">Gift cards</button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 font-bold text-black text-sm">Log in or sign up</button>
            </div>
          )}
        </div>

      </div>

      {/* Quick Filter Pill Buttons (Centered in Search View) */}
      {isSearched && (
        <div className="flex items-center justify-center gap-3 px-10 pb-4 pt-1 overflow-x-auto no-scrollbar w-full">
          <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-xs font-semibold hover:border-black transition bg-white flex-shrink-0 shadow-sm">
            <FiSliders className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
          <div className="h-4 w-[1px] bg-gray-300 mx-1 flex-shrink-0"></div>
          {quickFilters.map((filter, idx) => (
            <button 
              key={idx} 
              className="border border-gray-200 rounded-full px-4 py-2 text-xs font-medium text-gray-700 hover:border-black hover:text-black transition bg-white whitespace-nowrap flex-shrink-0"
            >
              {filter}
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default Header;