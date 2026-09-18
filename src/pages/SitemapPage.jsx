import React from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { 
  FiMap, FiHome, FiCompass, FiShield, FiFileText, FiArrowLeft, FiChevronRight 
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import Footer from '../components/Footer.jsx';

const SitemapPage = ({ onNavigate, onOpenLangModal, onSelectDestination }) => {
  const { dir } = useLanguage();

  const handleDestinationClick = (city) => {
    if (onSelectDestination) {
      onSelectDestination(city);
    }
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const sitemapCategories = [
    {
      title: 'Featured Destinations',
      icon: FiMap,
      items: [
        { name: 'Alexandria Stays', action: () => handleDestinationClick('Alexandria') },
        { name: 'El Gouna Luxury Villas', action: () => handleDestinationClick('El Gouna') },
        { name: 'Sheikh Zayed & 6th October', action: () => handleDestinationClick('Sheikh Zayed') },
        { name: 'New Cairo Apartments', action: () => handleDestinationClick('New Cairo') },
        { name: 'Hurghada Red Sea Resorts', action: () => handleDestinationClick('Hurghada') },
        { name: 'Dahab Coastal Cabins', action: () => handleDestinationClick('Dahab') },
        { name: 'Ain Sokhna Chalets', action: () => handleDestinationClick('Ain Sokhna') },
        { name: 'Dubai Downtown Condos', action: () => handleDestinationClick('Dubai') },
      ]
    },
    {
      title: 'Categories & Stays',
      icon: FiHome,
      items: [
        { name: 'Entire Homes & Villas', action: () => onNavigate && onNavigate('home') },
        { name: 'Boutique Hotels', action: () => onNavigate && onNavigate('home') },
        { name: 'Beachfront Properties', action: () => onNavigate && onNavigate('home') },
        { name: 'Mountain & Nature Retreats', action: () => onNavigate && onNavigate('home') },
        { name: 'Curated Local Experiences', action: () => onNavigate && onNavigate('home') },
      ]
    },
    {
      title: 'Hosting & Partnering',
      icon: FiCompass,
      items: [
        { name: 'Become a Host', action: () => onNavigate && onNavigate('becomeHost') },
        { name: 'Find a Local Co-Host', action: () => onNavigate && onNavigate('becomeHost') },
        { name: 'AirCover for Hosts', action: () => onNavigate && onNavigate('becomeHost') },
        { name: 'Refer a Host & Earn', action: () => onNavigate && onNavigate('company') },
      ]
    },
    {
      title: 'Support & Safety',
      icon: FiShield,
      items: [
        { name: 'Help Center', action: () => onNavigate && onNavigate('help') },
        { name: 'Safety & AirCover Hub', action: () => onNavigate && onNavigate('supportSafety') },
        { name: 'Cancellation & Refund Policies', action: () => onNavigate && onNavigate('cancellation') },
        { name: 'Report Neighborhood Concern', action: () => onNavigate && onNavigate('supportSafety') },
      ]
    },
    {
      title: 'Legal & Privacy',
      icon: FiFileText,
      items: [
        { name: 'Terms of Service', action: () => onNavigate && onNavigate('terms') },
        { name: 'Privacy Policy', action: () => onNavigate && onNavigate('privacy') },
        { name: 'Your Privacy Choices & Cookies', action: () => onNavigate && onNavigate('privacy') },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between" dir={dir}>
      
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div 
            onClick={() => onNavigate && onNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer text-[#FF385C]"
          >
            <FaAirbnb className="w-8 h-8" />
            <span className="font-black text-xl tracking-tighter hidden sm:inline">airbnb</span>
            <span className="text-xs font-bold text-gray-500 border-l border-gray-300 pl-2 ml-1">Sitemap</span>
          </div>

          <button 
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-black border border-gray-300 hover:border-black px-4 py-2 rounded-full transition"
          >
            <FiArrowLeft />
            <span>Back to Homes & Stays</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <span className="hover:underline cursor-pointer" onClick={() => onNavigate && onNavigate('home')}>Home</span>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-bold">Airbnb Full Website Sitemap</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Airbnb Sitemap</h1>
          <p className="text-sm text-gray-600 max-w-2xl font-medium">
            Explore all sections, regional stay destinations, legal policies, hosting tools, and support hubs across Airbnb.
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapCategories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3 border-b pb-3 text-rose-600">
                  <IconComp className="w-6 h-6" />
                  <h3 className="font-bold text-base text-gray-900">{cat.title}</h3>
                </div>

                <ul className="space-y-2.5">
                  {cat.items.map((item, itemIdx) => (
                    <li 
                      key={itemIdx}
                      onClick={item.action}
                      className="text-xs font-bold text-gray-700 hover:text-[#FF385C] hover:underline cursor-pointer flex items-center justify-between transition group"
                    >
                      <span>{item.name}</span>
                      <FiChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF385C]" />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <Footer 
        onOpenLangModal={onOpenLangModal}
        onOpenFeatureModal={() => {}}
        onSelectDestination={() => {}}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default SitemapPage;
