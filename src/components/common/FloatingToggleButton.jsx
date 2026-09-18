import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const FloatingToggleButton = ({ showMap, onToggle }) => {
  const { t } = useLanguage();

  return (
    <button
      onClick={onToggle}
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#222222',
        color: '#ffffff',
        padding: '14px 24px',
        borderRadius: '30px',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        zIndex: 1500,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {showMap ? `${t('showList')} ☰` : `${t('showMap')} 🗺️`}
    </button>
  );
};

export default FloatingToggleButton;