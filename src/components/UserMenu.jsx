import React from 'react';
import { 
  FiHelpCircle, FiLogOut, FiUser, FiKey, FiPlusSquare, 
  FiHeart, FiBriefcase, FiRepeat, FiGrid, FiHome 
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const UserMenu = ({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onOpenAuth, 
  onOpenFeatureModal 
}) => {
  const { user, isHost, isGuest, logout, switchRole } = useAuth();
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleAction = (callback) => {
    if (onClose) onClose();
    if (callback) callback();
  };

  const handleFeatureClick = (featureName) => {
    if (onClose) onClose();
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

  return (
    <div 
      className="absolute right-0 top-full mt-3 z-[9999] bg-white shadow-2xl rounded-2xl border border-gray-100 min-w-[260px] p-2 text-sm text-left animate-in fade-in duration-150 text-gray-800"
      style={{ position: 'absolute', right: 0, top: '100%', marginTop: '12px', zIndex: 9999 }}
    >
      {/* Logged-In User Profile Info */}
      {user && (
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/60 rounded-xl mb-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-900 text-sm truncate max-w-[170px]">{user.name}</div>
              <div className="text-[11px] text-gray-500 truncate max-w-[170px]">{user.email || user.phone}</div>
            </div>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
              isHost ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-rose-100 text-rose-700 border border-rose-200'
            }`}>
              {user.role || 'Guest'}
            </span>
          </div>

          {/* Role Switcher */}
          <button 
            type="button"
            onClick={() => handleAction(() => switchRole(isHost ? 'guest' : 'host'))}
            className="w-full mt-2.5 py-1.5 px-3 bg-white border border-gray-300 hover:border-black rounded-xl text-xs font-semibold text-gray-800 flex items-center justify-between transition shadow-2xs cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <FiRepeat className="w-3.5 h-3.5 text-rose-500" />
              <span>Switch to {isHost ? 'Guest View' : 'Host Console'}</span>
            </span>
            <span className="text-[10px] text-gray-400 font-normal">→</span>
          </button>
        </div>
      )}

      {/* Role-Specific Actions */}
      {isHost ? (
        <div className="py-1">
          <button 
            type="button"
            onClick={() => handleFeatureClick('becomeHost')}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2.5 text-gray-900 font-semibold cursor-pointer"
          >
            <FiGrid className="w-4 h-4 text-[#FF385C]" />
            <span>Manage My Listings / Console</span>
          </button>

          <button 
            type="button"
            onClick={() => handleFeatureClick('becomeHost')}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2.5 text-gray-700 cursor-pointer"
          >
            <FiPlusSquare className="w-4 h-4 text-emerald-600" />
            <span>Add New Property Listing</span>
          </button>

          <button 
            type="button"
            onClick={() => handleFeatureClick('findCoHost')}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2.5 text-gray-700 cursor-pointer"
          >
            <FiKey className="w-4 h-4 text-amber-600" />
            <span>Find a Local Co-Host</span>
          </button>
        </div>
      ) : isGuest && user ? (
        <div className="py-1">
          <button 
            type="button"
            onClick={() => handleFeatureClick('helpCenter')}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2.5 text-gray-900 font-semibold cursor-pointer"
          >
            <FiBriefcase className="w-4 h-4 text-[#FF385C]" />
            <span>My Trips & Bookings</span>
          </button>

          <button 
            type="button"
            onClick={() => handleFeatureClick('helpCenter')}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2.5 text-gray-700 cursor-pointer"
          >
            <FiHeart className="w-4 h-4 text-rose-500" />
            <span>Wishlists & Saved Stays</span>
          </button>

          <button 
            type="button"
            onClick={() => handleFeatureClick('becomeHost')}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2.5 text-gray-700 cursor-pointer"
          >
            <FiHome className="w-4 h-4 text-emerald-600" />
            <span>Become a Host / List Space</span>
          </button>
        </div>
      ) : null}

      {user && <div className="border-t border-gray-100 my-1"></div>}

      {/* Standard Links */}
      <button 
        type="button"
        onClick={() => handleFeatureClick('becomeHost')}
        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-gray-800 text-xs font-semibold flex items-center justify-between cursor-pointer"
      >
        <span>{t('becomeHost')}</span>
      </button>

      <button 
        type="button"
        onClick={() => handleFeatureClick('referHost')}
        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-gray-700 text-xs cursor-pointer"
      >
        {t('referHost')}
      </button>

      <button 
        type="button"
        onClick={() => handleFeatureClick('giftCards')}
        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-gray-700 text-xs cursor-pointer"
      >
        {t('giftCards')}
      </button>

      <button 
        type="button"
        onClick={() => handleFeatureClick('helpCenter')}
        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-gray-700 text-xs flex items-center gap-2 cursor-pointer"
      >
        <FiHelpCircle className="w-3.5 h-3.5 text-gray-500" />
        <span>{t('helpCenter')}</span>
      </button>

      <div className="border-t border-gray-100 my-1"></div>

      {/* Log In / Sign Up OR Log Out */}
      {user ? (
        <button 
          type="button"
          onClick={() => handleAction(logout)}
          className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600 font-bold text-xs flex items-center gap-2 rounded-lg transition cursor-pointer"
        >
          <FiLogOut className="w-4 h-4" />
          <span>Log out ({user.name})</span>
        </button>
      ) : (
        <button 
          type="button"
          onClick={() => handleAction(onOpenAuth)}
          className="w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg font-bold text-black text-sm cursor-pointer"
        >
          {t('loginSignUp')}
        </button>
      )}
    </div>
  );
};

export default UserMenu;
