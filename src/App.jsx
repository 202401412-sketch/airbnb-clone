import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import PropertyGrid from './components/PropertyGrid.jsx';
import PropertyDetails from './components/PropertyDetails.jsx';
import Footer from './components/Footer.jsx';
import LanguageModal from './components/LanguageModal.jsx';
import InfoFeatureModal from './components/InfoFeatureModal.jsx';
import CheckoutPage from './pages/CheckoutPage';

// Malak Components
import AuthModal from './components/AuthModal.jsx';

// sara Components
import FilterModal from './components/common/FilterModal.jsx';
import MapContainer from './components/common/MapContainer.jsx';
import FloatingToggleButton from './components/common/FloatingToggleButton.jsx';

// Dedicated Page Views
import HelpCenterPage from './pages/HelpCenterPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import CompanyPage from './pages/CompanyPage.jsx';
import SitemapPage from './pages/SitemapPage.jsx';
import CancellationPage from './pages/CancellationPage.jsx';
import SupportSafetyPage from './pages/SupportSafetyPage.jsx';
import BecomeHostPage from './pages/BecomeHostPage.jsx';
import VantageBusiness from './components/VantageBusiness.jsx';

import { mockProperties } from './data/mockData.js';
import { SearchProvider } from './context/SearchContext.jsx';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { UserSavedProvider } from './context/UserSavedContext.jsx';

const MainLayout = ({
  onNavigate,
  selectedAmenity,
  setSelectedAmenity,
  selectedProperty,
  setSelectedProperty,
  setIsAuthModalOpen,
}) => {
  const { language, setLanguage, currency, setCurrency, dir, t } = useLanguage();
  const [activeMainTab, setActiveMainTab] = useState('All');
  const [activeSearchSection, setActiveSearchSection] = useState(null);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [langModalTab, setLangModalTab] = useState('lang');
  const [activeFeatureModal, setActiveFeatureModal] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
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

  const handleApplyFilters = (filters) => {
    const { typeOfPlace, minPrice, maxPrice, bedrooms, amenities } = filters;

    const filtered = mockProperties.filter((property) => {
      const propType = property.type || property.category || '';
      let matchType = typeOfPlace === 'Any type';
      if (!matchType) {
        if (typeOfPlace === 'Room') {
          matchType = propType.toLowerCase().includes('room') || propType.toLowerCase().includes('hotel');
        } else if (typeOfPlace === 'Entire home') {
          matchType = propType.toLowerCase().includes('apartment') || propType.toLowerCase().includes('villa') || propType.toLowerCase().includes('home');
        }
      }

      const price = property.pricePerNight || property.price || 0;
      const matchPrice = price >= minPrice && price <= maxPrice;

      const numBedrooms = property.specs?.bedrooms || property.bedrooms || 1;
      const matchBedrooms =
        bedrooms === 'Any' ||
        (bedrooms === '4+' ? numBedrooms >= 4 : String(numBedrooms) === String(bedrooms));

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

  const handleSelectDestination = (cityName) => {
    if (!cityName) return;

    const filtered = mockProperties.filter((property) => {
      const loc = (property.location || '').toLowerCase();
      const title = (property.title || '').toLowerCase();
      const target = cityName.toLowerCase();
      return loc.includes(target) || title.includes(target);
    });

    if (filtered.length > 0) {
      setDisplayedProperties(filtered);
    }
    setSelectedAmenity(cityName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col justify-between" dir={dir}>
      <header className="sticky top-0 bg-white z-30 relative border-b border-gray-100">
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
          onNavigate={onNavigate}
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

      <main className="p-6 flex-1 relative max-w-7xl mx-auto w-full">
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

      {selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onNavigate={onNavigate}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      )}

      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        selectedLang={language}
        selectedCurr={currency}
        onSelectLang={setLanguage}
        onSelectCurr={setCurrency}
        initialTab={langModalTab}
      />

      <InfoFeatureModal
        isOpen={Boolean(activeFeatureModal)}
        onClose={() => setActiveFeatureModal(null)}
        feature={activeFeatureModal}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />

      <FloatingToggleButton
        showMap={showMap}
        onToggle={() => setShowMap(!showMap)}
      />

      <Footer
        onOpenLangModal={handleOpenLangModal}
        setIsLangModalOpen={setIsLangModalOpen}
        onOpenFeatureModal={setActiveFeatureModal}
        onSelectDestination={handleSelectDestination}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleNavigate = (page, data = null) => {
    if (data) {
      setBookingData(data);
      if (data.property) {
        setSelectedProperty(data.property);
      }
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'help':
        return <HelpCenterPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;
      case 'company':
        return <CompanyPage onNavigate={handleNavigate} />;
      case 'sitemap':
        return <SitemapPage onNavigate={handleNavigate} />;
      case 'cancellation':
        return <CancellationPage onNavigate={handleNavigate} />;
      case 'supportSafety':
        return <SupportSafetyPage onNavigate={handleNavigate} />;
      case 'becomeHost':
        return <BecomeHostPage onNavigate={handleNavigate} />;
      case 'vantage':
        return (
          <VantageBusiness 
            onNavigate={handleNavigate} 
            onSelectAmenity={setSelectedAmenity} 
          />
        );
      case 'checkout':
        return (
          <CheckoutPage
            property={selectedProperty || bookingData?.property}
            bookingDetails={bookingData}
            onBack={() => setCurrentPage('home')}
            onNavigate={handleNavigate}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        );
      case 'home':
      default:
        return (
          <MainLayout 
            onNavigate={handleNavigate} 
            selectedAmenity={selectedAmenity}
            setSelectedAmenity={setSelectedAmenity}
            selectedProperty={selectedProperty} 
            setSelectedProperty={setSelectedProperty} 
            setIsAuthModalOpen={setIsAuthModalOpen} 
          />
        );
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <UserSavedProvider>
          <SearchProvider>
            {renderCurrentPage()}
            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
            />
          </SearchProvider>
        </UserSavedProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}