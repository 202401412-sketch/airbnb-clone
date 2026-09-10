import React, { useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useLanguage } from '../context/LanguageContext.jsx';

// Category Tabs Data
const inspirationTabs = [
  'Popular',
  'Arts & culture',
  'Beach',
  'Mountains',
  'Outdoors',
  'Things to do',
  'Travel tips & inspiration',
  'Airbnb-friendly apartments'
];

// Destinations Grid Data
const inspirationItems = [
  { city: 'Cleveland', type: 'Villa rentals' },
  { city: 'Portland', type: 'Apartment rentals' },
  { city: 'Minneapolis', type: 'Monthly Rentals' },
  { city: 'Barcelona', type: 'Vacation rentals' },
  { city: 'Charlotte', type: 'Vacation rentals' },
  { city: 'Wilmington', type: 'Cottage rentals' },
  { city: 'Key West', type: 'Condo rentals' },
  { city: 'Oahu', type: 'Vacation rentals' },
  { city: 'Destin', type: 'House rentals' },
  { city: 'Raleigh', type: 'House rentals' },
  { city: 'Gulf Shores', type: 'Apartment rentals' },
  { city: 'Galveston', type: 'Vacation rentals' },
  { city: 'San Jose', type: 'Monthly Rentals' },
  { city: 'Chicago', type: 'Condo rentals' },
  { city: 'Dallas', type: 'House rentals' },
  { city: 'Ocean City', type: 'Vacation rentals' },
  { city: 'Washington', type: 'Monthly Rentals' },
];

const Footer = ({ onOpenLangModal, setIsLangModalOpen }) => {
  const { language, currency, t } = useLanguage();
  const [activeInspirationTab, setActiveInspirationTab] = useState('Popular');

  const openModalWithTab = (tabName) => {
    if (onOpenLangModal) {
      onOpenLangModal(tabName);
    } else if (setIsLangModalOpen) {
      setIsLangModalOpen(true);
    }
  };

  return (
    <footer className="bg-[#F7F7F7] border-t border-gray-200 text-gray-800 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-8">
        
        {/* SECTION 1: Inspiration for future getaways */}
        <div className="border-b border-gray-300 pb-12 mb-12">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Inspiration for future getaways</h3>
          
          {/* Category Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto border-b border-gray-300 pb-3 mb-6 scrollbar-none text-sm font-medium text-gray-500">
            {inspirationTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveInspirationTab(tab)}
                className={`whitespace-nowrap pb-3 transition ${
                  activeInspirationTab === tab 
                    ? 'text-black border-b-2 border-black font-semibold' 
                    : 'hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-6 text-xs">
            {inspirationItems.map((item, idx) => (
              <div key={idx} className="cursor-pointer">
                <div className="font-semibold text-gray-900 leading-tight">{item.city}</div>
                <div className="text-gray-500 leading-tight mt-0.5">{item.type}</div>
              </div>
            ))}

            {/* Show More Trigger */}
            <div className="flex items-center gap-1 font-semibold text-gray-900 cursor-pointer hover:underline">
              <span>Show more</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* SECTION 2: Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-300 text-xs md:text-sm">
          {/* Column 1: Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="hover:underline cursor-pointer">Help Center</li>
              <li className="hover:underline cursor-pointer">Get help with a safety issue</li>
              <li className="hover:underline cursor-pointer">AirCover</li>
              <li className="hover:underline cursor-pointer">Travel insurance</li>
              <li className="hover:underline cursor-pointer">Anti-discrimination</li>
              <li className="hover:underline cursor-pointer">Disability support</li>
              <li className="hover:underline cursor-pointer">Cancellation options</li>
              <li className="hover:underline cursor-pointer">Report neighborhood concern</li>
            </ul>
          </div>

          {/* Column 2: Hosting */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Hosting</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="hover:underline cursor-pointer">Airbnb your home</li>
              <li className="hover:underline cursor-pointer">Airbnb your experience</li>
              <li className="hover:underline cursor-pointer">Airbnb your service</li>
              <li className="hover:underline cursor-pointer">AirCover for Hosts</li>
              <li className="hover:underline cursor-pointer">Hosting resources</li>
              <li className="hover:underline cursor-pointer">Community forum</li>
              <li className="hover:underline cursor-pointer">Hosting responsibly</li>
              <li className="hover:underline cursor-pointer">Airbnb-friendly apartments</li>
              <li className="hover:underline cursor-pointer">Join a free hosting class</li>
              <li className="hover:underline cursor-pointer">Find a co-host</li>
              <li className="hover:underline cursor-pointer">Refer a host</li>
            </ul>
          </div>

          {/* Column 3: Airbnb */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Airbnb</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="hover:underline cursor-pointer">2026 Summer Release</li>
              <li className="hover:underline cursor-pointer">Newsroom</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Investors</li>
              <li className="hover:underline cursor-pointer">Gift cards</li>
              <li className="hover:underline cursor-pointer">Airbnb.org emergency stays</li>
            </ul>
          </div>
        </div>

        {/* SECTION 3: Bottom Legal & Settings Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs gap-4 text-gray-800">
          {/* Left Terms & Privacy */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer flex items-center gap-1">
              Your Privacy Choices
              {/* Privacy Choice Toggle Icon */}
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
              onClick={() => openModalWithTab('lang')}
              className="flex items-center gap-2 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>{language === 'Arabic' ? 'العربية (مصر)' : 'English (US)'}</span>
            </button>

            <button 
              onClick={() => openModalWithTab('currency')}
              className="hover:underline"
            >
              {currency}
            </button>

            <div className="flex items-center gap-4 text-base">
              <FaFacebookF className="cursor-pointer hover:text-black transition" />
              <FaXTwitter className="cursor-pointer hover:text-black transition" />
              <FaInstagram className="cursor-pointer hover:text-black transition" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;