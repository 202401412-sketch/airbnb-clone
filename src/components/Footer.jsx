import React, { useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useLanguage } from '../context/LanguageContext.jsx';

// Dynamic Inspiration Data Dictionary by Tab
const inspirationData = {
  'Popular': [
    { city: 'Cleveland', type: 'Villa rentals' },
    { city: 'Portland', type: 'Apartment rentals' },
    { city: 'Minneapolis', type: 'Monthly Rentals' },
    { city: 'Barcelona', type: 'Vacation rentals' },
    { city: 'Charlotte', type: 'Vacation rentals' },
    { city: 'Key West', type: 'Condo rentals' },
    { city: 'Oahu', type: 'Vacation rentals' },
    { city: 'Destin', type: 'House rentals' },
    { city: 'Alexandria', type: 'Beachfront stays' },
    { city: 'El Gouna', type: 'Luxury villas' },
    { city: 'Hurghada', type: 'Resort suites' },
    { city: 'Dubai', type: 'Downtown condos' }
  ],
  'Beach': [
    { city: 'Key West', type: 'Beachfront villas' },
    { city: 'Oahu', type: 'Oceanview condos' },
    { city: 'Destin', type: 'Beach rentals' },
    { city: 'El Alamein', type: 'Resort suites' },
    { city: 'Hurghada', type: 'Red Sea stays' },
    { city: 'Ain Sokhna', type: 'Beach chalets' },
    { city: 'Dahab', type: 'Coastal cabins' },
    { city: 'Alexandria', type: 'Corniche apartments' }
  ],
  'Mountains': [
    { city: 'Aspen', type: 'Mountain chalets' },
    { city: 'Lake Tahoe', type: 'Cabin rentals' },
    { city: 'Banff', type: 'Alpine lodges' },
    { city: 'Saint Moritz', type: 'Ski resorts' },
    { city: 'Interlaken', type: 'Swiss chalets' },
    { city: 'Gatlinburg', type: 'Smoky Mountain cabins' }
  ],
  'Outdoors': [
    { city: 'Yellowstone', type: 'Nature cabins' },
    { city: 'Yosemite', type: 'Park lodges' },
    { city: 'Sedona', type: 'Desert retreats' },
    { city: 'Joshua Tree', type: 'Eco glamping' },
    { city: 'Siwa Oasis', type: 'Eco lodges' },
    { city: 'Fayoum', type: 'Desert lakeside stays' }
  ],
  'Arts & culture': [
    { city: 'Paris', type: 'Historic apartments' },
    { city: 'Florence', type: 'Artisan suites' },
    { city: 'Cairo', type: 'Old Cairo lofts' },
    { city: 'Kyoto', type: 'Traditional machiya' },
    { city: 'Rome', type: 'Colosseum views' },
    { city: 'Vienna', type: 'Classic apartments' }
  ],
  'Things to do': [
    { city: 'Tokyo', type: 'Food tours & stays' },
    { city: 'London', type: 'Theater district lofts' },
    { city: 'New York', type: 'Museum district stays' },
    { city: 'Luxor', type: 'Nile cruise & stays' },
    { city: 'Istanbul', type: 'Bosphorus tours' }
  ],
  'Travel tips & inspiration': [
    { city: 'Solo Travel', type: 'Ultimate 2026 Guide' },
    { city: 'Family Vacation', type: 'Top Hacks & Tips' },
    { city: 'Budget Stays', type: 'Saving Advice' },
    { city: 'Luxury Retreats', type: 'Curated Bucket List' }
  ],
  'Airbnb-friendly apartments': [
    { city: 'Miami', type: 'Luxury high-rises' },
    { city: 'Dubai', type: 'Downtown apartments' },
    { city: 'Sheikh Zayed', type: 'Modern condos' },
    { city: 'New Cairo', type: 'Gated compound stays' }
  ]
};

const inspirationTabs = Object.keys(inspirationData);

const Footer = ({ onOpenLangModal, setIsLangModalOpen, onOpenFeatureModal, onSelectDestination, onNavigate }) => {
  const { language, currency, dir } = useLanguage();
  const [activeInspirationTab, setActiveInspirationTab] = useState('Popular');
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  const openModalWithTab = (tabName) => {
    if (onOpenLangModal) {
      onOpenLangModal(tabName);
    } else if (setIsLangModalOpen) {
      setIsLangModalOpen(true);
    }
  };

  const handleLinkClick = (pageOrFeature) => {
    if (onNavigate) {
      onNavigate(pageOrFeature);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onOpenFeatureModal) {
      onOpenFeatureModal(pageOrFeature);
    }
  };

  const handleDestinationClick = (cityName) => {
    if (onSelectDestination) {
      onSelectDestination(cityName);
    }
    if (onNavigate) {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentItems = inspirationData[activeInspirationTab] || inspirationData['Popular'];
  const displayedItems = showAllDestinations ? currentItems : currentItems.slice(0, 8);

  return (
    <footer className="bg-[#F7F7F7] border-t border-gray-200 text-gray-800 text-sm mt-auto" dir={dir}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-8">
        
        {/* SECTION 1: Inspiration for future getaways */}
        <div className="border-b border-gray-300 pb-12 mb-12">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Inspiration for future getaways</h3>
          
          {/* Category Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto border-b border-gray-300 pb-3 mb-6 scrollbar-none text-sm font-medium text-gray-500">
            {inspirationTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => { setActiveInspirationTab(tab); setShowAllDestinations(false); }}
                className={`whitespace-nowrap pb-3 transition ${
                  activeInspirationTab === tab 
                    ? 'text-black border-b-2 border-black font-bold' 
                    : 'hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6 text-xs">
            {displayedItems.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => handleDestinationClick(item.city)}
                className="cursor-pointer group hover:bg-white p-2 rounded-xl border border-transparent hover:border-gray-200 transition"
              >
                <div className="font-bold text-gray-900 leading-tight group-hover:text-[#FF385C] transition">{item.city}</div>
                <div className="text-gray-500 leading-tight mt-0.5">{item.type}</div>
              </div>
            ))}

            {/* Show More / Show Less Trigger */}
            <button 
              type="button"
              onClick={() => setShowAllDestinations(!showAllDestinations)}
              className="flex items-center gap-1 font-bold text-gray-900 cursor-pointer hover:underline self-center py-2"
            >
              <span>{showAllDestinations ? 'Show less' : 'Show more'}</span>
              <svg 
                className={`w-3.5 h-3.5 transition-transform duration-200 ${showAllDestinations ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* SECTION 2: Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-300 text-xs md:text-sm">
          {/* Column 1: Support */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Support</h4>
            <ul className="space-y-3 text-gray-700">
              <li onClick={() => handleLinkClick('help')} className="hover:underline cursor-pointer">Help Center</li>
              <li onClick={() => handleLinkClick('supportSafety')} className="hover:underline cursor-pointer">Get help with a safety issue</li>
              <li onClick={() => handleLinkClick('supportSafety')} className="hover:underline cursor-pointer">AirCover</li>
              <li onClick={() => handleLinkClick('supportSafety')} className="hover:underline cursor-pointer">Travel insurance</li>
              <li onClick={() => handleLinkClick('supportSafety')} className="hover:underline cursor-pointer">Anti-discrimination</li>
              <li onClick={() => handleLinkClick('supportSafety')} className="hover:underline cursor-pointer">Disability support</li>
              <li onClick={() => handleLinkClick('cancellation')} className="hover:underline cursor-pointer">Cancellation options</li>
              <li onClick={() => handleLinkClick('supportSafety')} className="hover:underline cursor-pointer">Report neighborhood concern</li>
            </ul>
          </div>

          {/* Column 2: Hosting */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Hosting</h4>
            <ul className="space-y-3 text-gray-700">
              <li onClick={() => handleLinkClick('becomeHost')} className="hover:underline cursor-pointer">Airbnb your home</li>
              <li onClick={() => handleLinkClick('becomeHost')} className="hover:underline cursor-pointer">Airbnb your experience</li>
              <li onClick={() => handleLinkClick('becomeHost')} className="hover:underline cursor-pointer">Airbnb your service</li>
              <li onClick={() => handleLinkClick('becomeHost')} className="hover:underline cursor-pointer">AirCover for Hosts</li>
              <li onClick={() => handleLinkClick('becomeHost')} className="hover:underline cursor-pointer">Hosting resources</li>
              <li onClick={() => handleLinkClick('company')} className="hover:underline cursor-pointer">Community forum</li>
              <li onClick={() => handleLinkClick('becomeHost')} className="hover:underline cursor-pointer">Hosting responsibly</li>
              <li onClick={() => handleLinkClick('becomeHost')} className="hover:underline cursor-pointer">Airbnb-friendly apartments</li>
              <li onClick={() => handleLinkClick('becomeHost')} className="hover:underline cursor-pointer">Join a free hosting class</li>
              <li onClick={() => handleLinkClick('becomeHost')} className="hover:underline cursor-pointer">Find a co-host</li>
              <li onClick={() => handleLinkClick('becomeHost')} className="hover:underline cursor-pointer">Refer a host</li>
            </ul>
          </div>

          {/* Column 3: Airbnb */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Airbnb</h4>
            <ul className="space-y-3 text-gray-700">
              <li onClick={() => handleLinkClick('company')} className="hover:underline cursor-pointer">2026 Summer Release</li>
              <li onClick={() => handleLinkClick('company')} className="hover:underline cursor-pointer">Newsroom</li>
              <li onClick={() => handleLinkClick('company')} className="hover:underline cursor-pointer">Careers</li>
              <li onClick={() => handleLinkClick('company')} className="hover:underline cursor-pointer">Investors</li>
              <li onClick={() => handleLinkClick('company')} className="hover:underline cursor-pointer">Gift cards</li>
              <li onClick={() => handleLinkClick('company')} className="hover:underline cursor-pointer">Airbnb.org emergency stays</li>
            </ul>
          </div>
        </div>

        {/* SECTION 3: Bottom Legal & Settings Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs gap-4 text-gray-800">
          {/* Left Terms & Privacy */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <span onClick={() => handleLinkClick('privacy')} className="hover:underline cursor-pointer">Privacy</span>
            <span>·</span>
            <span onClick={() => handleLinkClick('terms')} className="hover:underline cursor-pointer">Terms</span>
            <span>·</span>
            <span onClick={() => handleLinkClick('sitemap')} className="hover:underline cursor-pointer">Sitemap</span>
            <span>·</span>
            <span onClick={() => handleLinkClick('privacy')} className="hover:underline cursor-pointer flex items-center gap-1">
              Your Privacy Choices
              <svg className="w-6 h-3 inline-block" viewBox="0 0 26 12" fill="none">
                <rect width="26" height="12" rx="6" fill="#0056D2" />
                <circle cx="6" cy="6" r="4" fill="white" />
                <path d="M16 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {/* Right Language, Currency & Social Icons */}
          <div className="flex items-center gap-6 font-semibold">
            <button 
              type="button"
              onClick={() => openModalWithTab('lang')}
              className="flex items-center gap-2 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>{(language || '').toLowerCase().includes('ar') ? 'العربية (مصر)' : 'English (US)'}</span>
            </button>

            <button 
              type="button"
              onClick={() => openModalWithTab('currency')}
              className="hover:underline"
            >
              {currency}
            </button>

            <div className="flex items-center gap-4 text-base">
              <FaFacebookF className="cursor-pointer hover:text-black transition" onClick={() => window.open('https://facebook.com/airbnb', '_blank')} />
              <FaXTwitter className="cursor-pointer hover:text-black transition" onClick={() => window.open('https://x.com/airbnb', '_blank')} />
              <FaInstagram className="cursor-pointer hover:text-black transition" onClick={() => window.open('https://instagram.com/airbnb', '_blank')} />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;