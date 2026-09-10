import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import PropertyGrid from './components/PropertyGrid.jsx';
import PropertyDetails from './components/PropertyDetails.jsx';
import Footer from './components/Footer.jsx';
import LanguageModal from './components/LanguageModal.jsx';
import InfoFeatureModal from './components/InfoFeatureModal.jsx';

// Developer 1 Components
import AuthModal from './components/AuthModal.jsx';

// Developer 4 Components
import FilterModal from './components/common/FilterModal.jsx';
import MapContainer from './components/common/MapContainer.jsx';
import FloatingToggleButton from './components/common/FloatingToggleButton.jsx';

import { mockProperties } from './data/mockData.js';
import { SearchProvider } from './context/SearchContext.jsx';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';

const MainLayout = () => {
  const { language, setLanguage, currency, setCurrency, dir, t } = useLanguage();
  const [activeMainTab, setActiveMainTab] = useState('All');
  const [activeSearchSection, setActiveSearchSection] = useState(null);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [langModalTab, setLangModalTab] = useState('lang');
  const [activeFeatureModal, setActiveFeatureModal] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  // Developer 1 State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Developer 4 States
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [displayedProperties, setDisplayedProperties] = useState(mockProperties);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter properties dynamically whenever quick filter amenity changes
  useEffect(() => {
    if (!selectedAmenity) {
      setDisplayedProperties(mockProperties);
      return;
    }

    const filtered = mockProperties.filter((property) => {
      const propAmenities = property.amenities || [];
      return propAmenities.some((a) =>
        a.toLowerCase().includes(selectedAmenity.toLowerCase()) ||
        selectedAmenity.toLowerCase().includes(a.toLowerCase())
      );
    });

    setDisplayedProperties(filtered);
  }, [selectedAmenity]);

  // Full Filter Modal application handler
  const handleApplyFilters = (filters) => {
    const { typeOfPlace, minPrice, maxPrice, bedrooms, amenities } = filters;

    const filtered = mockProperties.filter((property) => {
      // Type matching
      const propType = property.type || property.category || '';
      let matchType = typeOfPlace === 'Any type';
      if (!matchType) {
        if (typeOfPlace === 'Room') {
          matchType = propType.toLowerCase().includes('room') || propType.toLowerCase().includes('hotel');
        } else if (typeOfPlace === 'Entire home') {
          matchType = propType.toLowerCase().includes('apartment') || propType.toLowerCase().includes('villa') || propType.toLowerCase().includes('home');
        }
      }

      // Price matching
      const price = property.pricePerNight || property.price || 0;
      const matchPrice = price >= minPrice && price <= maxPrice;

      // Bedrooms matching
      const numBedrooms = property.specs?.bedrooms || property.bedrooms || 1;
      const matchBedrooms =
        bedrooms === 'Any' ||
        (bedrooms === '4+' ? numBedrooms >= 4 : String(numBedrooms) === String(bedrooms));

      // Amenities matching
      const propAmenities = property.amenities || [];
      const matchAmenities =
        !amenities || amenities.length === 0 ||
        amenities.every((a) => propAmenities.some((pa) => pa.toLowerCase().includes(a.toLowerCase())));

      return matchType && matchPrice && matchBedrooms && matchAmenities;
    });

    setDisplayedProperties(filtered);
  };

  const handleOpenLangModal = (tab = 'lang') => {
    setLangModalTab(tab);
    setIsLangModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col justify-between" dir={dir}>
      
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <Header 
          setIsLangModalOpen={() => handleOpenLangModal('lang')} 
          isScrolled={isScrolled} 
          isSearched={isSearched}
          setIsSearched={setIsSearched}
          activeSearchSection={activeSearchSection}
          setActiveSearchSection={setActiveSearchSection}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenFeatureModal={setActiveFeatureModal}
          selectedAmenity={selectedAmenity}
          onSelectAmenity={setSelectedAmenity}
          onOpenFilterModal={() => setIsFilterModalOpen(true)}
          activeMainTab={activeMainTab}
          onSelectMainTab={setActiveMainTab}
        />
        
        {!isScrolled && !isSearched && (
          <div className="pb-4 pt-1 transition-all duration-200">
            <SearchBar 
              activeSection={activeSearchSection} 
              setActiveSection={setActiveSearchSection} 
              onSearch={() => setIsSearched(true)}
            />
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="p-6 flex-1 relative max-w-7xl mx-auto w-full">
        {/* Filter Trigger Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">
              {displayedProperties.length} {displayedProperties.length === 1 ? t('placeAvailable') : t('placesAvailable')}
            </h2>
            {selectedAmenity && (
              <span className="bg-rose-100 text-[#FF385C] text-xs font-bold px-3 py-1 rounded-full border border-rose-200">
                {t('filteredBy')}: {selectedAmenity}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {selectedAmenity && (
              <button
                onClick={() => setSelectedAmenity(null)}
                className="text-xs font-bold text-gray-700 underline hover:text-black"
              >
                {t('resetFilters')}
              </button>
            )}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold hover:border-black transition bg-white shadow-sm"
            >
              <span>{t('filters')}</span>
              <span>🎛️</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display (Grid vs Map View) */}
        {showMap ? (
          <div className="h-[calc(100vh-220px)] w-full rounded-2xl overflow-hidden border border-gray-200">
            <MapContainer 
              properties={displayedProperties} 
              onClose={() => setShowMap(false)} 
            />
          </div>
        ) : (
          <PropertyGrid 
            properties={displayedProperties} 
            isLoading={false} 
            onSelectProperty={(property) => setSelectedProperty(property)}
            activeMainTab={activeMainTab}
          />
        )}
      </main>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetails 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}

      {/* Language Modal */}
      <LanguageModal 
        isOpen={isLangModalOpen} 
        onClose={() => setIsLangModalOpen(false)}
        selectedLang={language}
        selectedCurr={currency}
        onSelectLang={setLanguage}
        onSelectCurr={setCurrency}
        initialTab={langModalTab}
      />

      {/* Feature Modals (Become a host, Refer a host, Co-host, Gift cards, Help center) */}
      <InfoFeatureModal
        isOpen={Boolean(activeFeatureModal)}
        onClose={() => setActiveFeatureModal(null)}
        feature={activeFeatureModal}
      />

      {/* Auth Modal (Dev 1) */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Filter Modal (Dev 4) */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />

      {/* Floating Map/List Toggle Button (Dev 4) */}
      <FloatingToggleButton
        showMap={showMap}
        onToggle={() => setShowMap(!showMap)}
      />

      <Footer onOpenLangModal={handleOpenLangModal} setIsLangModalOpen={setIsLangModalOpen} />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <SearchProvider>
        <MainLayout />
      </SearchProvider>
    </LanguageProvider>
  );
}