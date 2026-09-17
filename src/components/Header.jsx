import React, { useState } from 'react';
import { FaAirbnb, FaUserCircle } from 'react-icons/fa';
import { 
  FiGlobe, FiMenu, FiSearch, FiSliders, FiHelpCircle, FiX, 
  FiLogOut, FiUser, FiKey, FiPlusSquare, FiHeart, FiBriefcase, 
  FiRepeat, FiGrid
} from 'react-icons/fi';
import { MdOutlinePublic, MdOutlineCardTravel, MdOutlineRoomService } from 'react-icons/md';
import { FiHome } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import UserMenu from './UserMenu.jsx';

const Header = ({ 
  setIsLangModalOpen, 
  isScrolled, 
  isSearched, 
  setIsSearched,
  selectedAmenity,
  onSelectAmenity,
  onOpenFilterModal,
  activeMainTab = 'All',
  onSelectMainTab,
  onOpenAuth,
  onOpenFeatureModal,
  onNavigate
}) => {
  const { t, dir } = useLanguage();
  const { user, isHost, isGuest, logout, switchRole } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleFeatureClick = (featureName) => {
    setIsUserMenuOpen(false);
    if (onNavigate) {
      if (featureName === 'helpCenter') onNavigate('help');
      else if (featureName === 'becomeHost') onNavigate('becomeHost');
      else if (featureName === 'referHost' || featureName === 'giftCards') onNavigate('company');
      else if (featureName === 'findCoHost') onNavigate('becomeHost');
      else onNavigate(featureName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onOpenFeatureModal) {
      onOpenFeatureModal(featureName);
    }
  };

  const handleAuthClick = () => {
    setIsUserMenuOpen(false);
    if (onOpenAuth) {
      onOpenAuth();
    }
  };

  const handleLogoutClick = () => {
    setIsUserMenuOpen(false);
    logout();
  };

  const mainTabs = [
    { id: 'All', label: t('all'), icon: <MdOutlinePublic className="text-xl text-amber-600" /> },
    { id: 'Homes', label: t('homes'), icon: <FiHome className="text-lg text-emerald-600" /> },
    { id: 'Experiences', label: t('experiences'), icon: <MdOutlineCardTravel className="text-xl text-rose-500" /> },
    { id: 'Services', label: t('services'), icon: <MdOutlineRoomService className="text-xl text-sky-600" /> },
  ];

  const quickFilters = [
    { key: 'Free parking', label: t('freeParking') },
    { key: 'Wi-Fi', label: t('wifi') },
    { key: 'Allows pets', label: t('allowsPets') },
    { key: 'Kitchen', label: t('kitchen') },
    { key: 'Air conditioning', label: t('airConditioning') },
    { key: 'Washer', label: t('washer') },
    { key: 'Gym', label: t('gym') },
    { key: 'Pool', label: t('pool') }
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200" dir={dir}>
      
      {/* Upper Navigation Bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-3">
        
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
                onClick={() => onSelectMainTab && onSelectMainTab(tab.id)}
                className={`flex items-center gap-2 pb-2 transition border-b-2 text-sm font-medium ${
                  activeMainTab === tab.id
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
            onClick={() => {
              if (setIsSearched) setIsSearched(false);
              if (setActiveSearchSection) setActiveSearchSection('when');
            }} 
            className="flex items-center border border-gray-300 rounded-full py-2 px-5 shadow-sm hover:shadow-md transition cursor-pointer text-sm font-semibold gap-4 bg-white"
          >
            <div 
              onClick={(e) => {
                e.stopPropagation();
                if (setIsSearched) setIsSearched(false);
                if (setActiveSearchSection) setActiveSearchSection('where');
              }}
              className="flex items-center gap-2 pr-3 border-r border-gray-200 hover:text-black"
            >
              <span className="text-xl">🏚️</span>
              <span className="text-gray-900 font-bold">{t('homesNearby')}</span>
            </div>
            <span 
              onClick={(e) => {
                e.stopPropagation();
                if (setIsSearched) setIsSearched(false);
                if (setActiveSearchSection) setActiveSearchSection('when');
              }}
              className="text-gray-900 font-semibold border-r border-gray-200 pr-4 hover:text-[#FF385C]"
            >
              {t('anyWeek')}
            </span>
            <span 
              onClick={(e) => {
                e.stopPropagation();
                if (setIsSearched) setIsSearched(false);
                if (setActiveSearchSection) setActiveSearchSection('who');
              }}
              className="text-gray-500 font-normal hover:text-black"
            >
              {t('addGuests')}
            </span>
            <div className="bg-[#FF385C] text-white p-2 rounded-full ml-1">
              <FiSearch className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
        )}

        {/* Right Controls & User Menu */}
        <div className="flex items-center gap-3 relative z-[100]">
          {/* Top Host Action Button */}
          {isHost ? (
            <button 
              type="button" 
              onClick={() => handleFeatureClick('becomeHost')}
              className="text-xs font-bold bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:opacity-95 px-4 py-2 rounded-full transition hidden sm:flex items-center gap-1.5 shadow-sm"
            >
              <FiGrid className="w-3.5 h-3.5" />
              <span>Host Console</span>
            </button>
          ) : (
            <button 
              type="button" 
              onClick={() => handleFeatureClick('becomeHost')}
              className="text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition hidden sm:block"
            >
              {t('becomeHost')}
            </button>
          )}

          {/* Language Selector Trigger */}
          <button 
            type="button" 
            onClick={() => setIsLangModalOpen && setIsLangModalOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-700"
          >
            <FiGlobe className="w-4 h-4" />
          </button>
          
          {/* User Menu Trigger Button */}
          <button 
            type="button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2.5 border border-gray-300 rounded-full py-1.5 px-3 hover:shadow-md transition cursor-pointer bg-white"
          >
            <FiMenu className="text-gray-600 text-sm" />
            {user ? (
              <div className="flex items-center gap-2">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover border" />
                ) : (
                  <div className="w-6 h-6 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-bold text-gray-900 hidden md:inline max-w-[80px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              </div>
            ) : (
              <FaUserCircle className="text-gray-500 text-xl" />
            )}
          </button>

          {/* User Dropdown Component */}
          <UserMenu 
            isOpen={isUserMenuOpen}
            onClose={() => setIsUserMenuOpen(false)}
            onNavigate={onNavigate}
            onOpenAuth={onOpenAuth}
            onOpenFeatureModal={onOpenFeatureModal}
          />
        </div>

      </div>

      {/* Quick Filter Pill Buttons */}
      <div className="flex items-center justify-center gap-2.5 px-6 pb-3 pt-1 overflow-x-auto no-scrollbar w-full border-t border-gray-100 bg-gray-50/40">
        <button 
          onClick={onOpenFilterModal}
          className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 text-xs font-bold hover:border-black transition bg-white flex-shrink-0 shadow-xs"
        >
          <FiSliders className="w-3.5 h-3.5" />
          <span>{t('filters')}</span>
        </button>

        {selectedAmenity && (
          <button
            onClick={() => onSelectAmenity && onSelectAmenity(null)}
            className="flex items-center gap-1 border border-rose-500 bg-rose-50 text-rose-600 rounded-full px-3.5 py-1.5 text-xs font-bold transition flex-shrink-0 hover:bg-rose-100"
          >
            <FiX className="w-3.5 h-3.5" />
            <span>Clear ({selectedAmenity})</span>
          </button>
        )}

        <div className="h-4 w-[1px] bg-gray-300 mx-1 flex-shrink-0"></div>

        {quickFilters.map((filterObj, idx) => {
          const isActive = selectedAmenity === filterObj.key;
          return (
            <button 
              key={idx} 
              onClick={() => onSelectAmenity && onSelectAmenity(isActive ? null : filterObj.key)}
              className={`rounded-full px-4 py-1.5 text-xs transition whitespace-nowrap flex-shrink-0 border ${
                isActive
                  ? 'bg-black text-white border-black font-bold shadow-md scale-105'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-black font-medium hover:text-black'
              }`}
            >
              {filterObj.label}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default Header;