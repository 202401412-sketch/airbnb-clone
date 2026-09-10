import React, { useState, useEffect } from 'react';
import { FaAirbnb } from 'react-icons/fa';

const languages = [
  { name: 'English', region: 'United States' },
  { name: 'English', region: 'United Kingdom' },
  { name: 'EGP', region: 'EGP' },
  { name: 'Azərbaycan dili', region: 'Azərbaycan' },
  { name: 'Bahasa Indonesia', region: 'Indonesia' },
  { name: 'Bosanski', region: 'Bosna i Hercegovina' },
  { name: 'Català', region: 'Espanya' },
  { name: 'Čeština', region: 'Česká republika' },
  { name: 'Crnogorski', region: 'Crna Gora' },
  { name: 'Dansk', region: 'Danmark' },
  { name: 'Deutsch', region: 'Deutschland' },
  { name: 'Deutsch', region: 'Österreich' },
  { name: 'Deutsch', region: 'Schweiz' },
  { name: 'Deutsch', region: 'Luxemburg' },
  { name: 'Eesti', region: 'Eesti' },
  { name: 'English', region: 'Australia' },
  { name: 'English', region: 'Canada' },
  { name: 'English', region: 'Guyana' },
  { name: 'English', region: 'India' },
  { name: 'English', region: 'Ireland' },
  { name: 'English', region: 'New Zealand' },
  { name: 'English', region: 'Singapore' },
  { name: 'English', region: 'United Arab Emirates' },
  { name: 'Español', region: 'Argentina' },
  { name: 'Español', region: 'Belice' },
  { name: 'Español', region: 'Bolivia' },
  { name: 'Español', region: 'Chile' },
  { name: 'Español', region: 'Colombia' },
  { name: 'Español', region: 'Costa Rica' },
  { name: 'Español', region: 'Ecuador' },
  { name: 'Español', region: 'El Salvador' },
  { name: 'Español', region: 'España' },
  { name: 'Español', region: 'Estados Unidos' },
  { name: 'Español', region: 'Guatemala' },
  { name: 'Español', region: 'Honduras' },
  { name: 'Español', region: 'Latinoamérica' },
  { name: 'Español', region: 'México' },
  { name: 'Español', region: 'Nicaragua' },
  { name: 'Español', region: 'Panamá' },
  { name: 'Español', region: 'Paraguay' },
  { name: 'Español', region: 'Perú' },
  { name: 'Français', region: 'France' },
  { name: 'Italiano', region: 'Italia' },
  { name: 'Türkçe', region: 'Türkiye' },
];

const currencies = [
  { name: 'Egyptian pound', code: 'EGP', symbol: 'EGP' },
  { name: 'Australian dollar', code: 'AUD', symbol: '$' },
  { name: 'Brazilian real', code: 'BRL', symbol: 'R$' },
  { name: 'Bulgarian lev', code: 'BGN', symbol: 'лв.' },
  { name: 'Canadian dollar', code: 'CAD', symbol: '$' },
  { name: 'Chilean peso', code: 'CLP', symbol: '$' },
  { name: 'Chinese yuan', code: 'CNY', symbol: '¥' },
  { name: 'Colombian peso', code: 'COP', symbol: '$' },
  { name: 'Costa Rican colon', code: 'CRC', symbol: '₡' },
  { name: 'Czech koruna', code: 'CZK', symbol: 'Kč' },
  { name: 'Danish krone', code: 'DKK', symbol: 'kr' },
  { name: 'Emirati dirham', code: 'AED', symbol: 'EGP.EGP' },
  { name: 'Euro', code: 'EUR', symbol: '€' },
  { name: 'Ghanaian cedi', code: 'GHS', symbol: 'GHC' },
  { name: 'Hong Kong dollar', code: 'HKD', symbol: '$' },
  { name: 'Hungarian forint', code: 'HUF', symbol: 'Ft' },
  { name: 'Indian rupee', code: 'INR', symbol: '₹' },
  { name: 'Indonesian rupiah', code: 'IDR', symbol: 'Rp' },
  { name: 'Israeli new shekel', code: 'ILS', symbol: '₪' },
  { name: 'Japanese yen', code: 'JPY', symbol: '¥' },
  { name: 'Kazakhstani tenge', code: 'KZT', symbol: '₸' },
  { name: 'Kenyan shilling', code: 'KES', symbol: 'KSh' },
  { name: 'Malaysian ringgit', code: 'MYR', symbol: 'RM' },
  { name: 'Mexican peso', code: 'MXN', symbol: '$' },
  { name: 'Moroccan dirham', code: 'MAD', symbol: 'MAD' },
  { name: 'New Taiwan dollar', code: 'TWD', symbol: '$' },
  { name: 'New Zealand dollar', code: 'NZD', symbol: '$' },
  { name: 'Norwegian krone', code: 'NOK', symbol: 'kr' },
  { name: 'Peruvian sol', code: 'PEN', symbol: 'S/' },
  { name: 'Philippine peso', code: 'PHP', symbol: '₱' },
  { name: 'Polish zloty', code: 'PLN', symbol: 'zł' },
  { name: 'Pound sterling', code: 'GBP', symbol: '£' },
  { name: 'Qatari riyal', code: 'QAR', symbol: 'EGP.EGP' },
  { name: 'Romanian leu', code: 'RON', symbol: 'lei' },
  { name: 'Saudi Arabian riyal', code: 'SAR', symbol: 'SR' },
  { name: 'Singapore dollar', code: 'SGD', symbol: '$' },
  { name: 'South African rand', code: 'ZAR', symbol: 'R' },
  { name: 'South Korean won', code: 'KRW', symbol: '₩' },
  { name: 'Swedish krona', code: 'SEK', symbol: 'kr' },
  { name: 'Swiss franc', code: 'CHF', symbol: 'CHF' },
  { name: 'Thai baht', code: 'THB', symbol: '฿' },
  { name: 'Turkish lira', code: 'TRY', symbol: '₺' },
  { name: 'Ugandan shilling', code: 'UGX', symbol: 'USh' },
  { name: 'Ukrainian hryvnia', code: 'UAH', symbol: '₴' },
  { name: 'United States dollar', code: 'USD', symbol: '$' },
  { name: 'Uruguayan peso', code: 'UYU', symbol: '$U' },
  { name: 'Vietnamese dong', code: 'VND', symbol: '₫' }
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Homes');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('lang');
  const [selectedCurrency, setSelectedCurrency] = useState('EGP');

  // state EGP EGP (EGP)
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`border-b sticky top-0 bg-white z-50 px-8 transition-all duration-300 shadow-sm ${
      isScrolled ? 'py-3' : 'pt-4 pb-6'
    }`}>
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-1.5 cursor-pointer text-[#FF385C]">
          <FaAirbnb className="text-3xl" />
          <span className="font-bold text-xl tracking-tight hidden md:inline">airbnb</span>
        </div>

        {/* CENTER SECTION: Changes dynamically based on Scroll State */}
        {!isScrolled ? (
          /* Big Main Categories Tabs (Expanded State) */
          <div className="flex items-center gap-8 text-sm font-semibold text-gray-500 transition-all duration-300">
            <div 
              onClick={() => setActiveTab('All')}
              className={`flex items-center gap-2 cursor-pointer pb-1 transition ${activeTab === 'All' ? 'text-black border-b-2 border-black font-bold' : 'hover:text-black'}`}
            >
              <svg className="w-5 h-5 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span>All</span>
            </div>

            <div 
              onClick={() => setActiveTab('Homes')}
              className={`flex items-center gap-2 cursor-pointer pb-1 transition ${activeTab === 'Homes' ? 'text-black border-b-2 border-black font-bold' : 'hover:text-black'}`}
            >
              <svg className="w-5 h-5 text-green-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span>Homes</span>
            </div>

            <div 
              onClick={() => setActiveTab('Experiences')}
              className={`flex items-center gap-2 cursor-pointer pb-1 transition ${activeTab === 'Experiences' ? 'text-black border-b-2 border-black font-bold' : 'hover:text-black'}`}
            >
              <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>Experiences</span>
            </div>

            <div 
              onClick={() => setActiveTab('Services')}
              className={`flex items-center gap-2 cursor-pointer pb-1 transition ${activeTab === 'Services' ? 'text-black border-b-2 border-black font-bold' : 'hover:text-black'}`}
            >
              <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 17h20v2H2zm11.84-9.21c.1-.25.16-.52.16-.8 0-1.1-.9-2-2-2s-2 .9-2 2c0 .28.06.55.16.8C6.46 8.8 3.54 11.98 3.06 16h17.88c-.48-4.02-3.4-7.2-7.1-8.21z"/>
              </svg>
              <span>Services</span>
            </div>
          </div>
        ) : (
          /* Compact Search Pill Bar (Scrolled State) */
          <div className="flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition cursor-pointer py-2 px-4 text-xs font-bold gap-3">
            <div className="flex items-center gap-1.5 text-gray-800 border-r border-gray-200 pr-3">
              {/* Tiny House/Cabin Icon like picture */}
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span>Anywhere</span>
            </div>
            <div className="text-gray-800 border-r border-gray-200 pr-3">
              Anyweek
            </div>
            <div className="text-gray-500 font-normal">
              Add guests
            </div>
            <div className="bg-[#FF385C] text-white p-1.5 rounded-full ml-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}

        {/* Right Menu Container */}
        <div className="relative flex items-center gap-1 text-sm font-semibold">
          <div className="hover:bg-gray-100 px-3 py-2 rounded-full cursor-pointer transition">
            Become a host
          </div>

          {/* Globe Button */}
          <div 
            onClick={() => setIsLangModalOpen(true)}
            className="hover:bg-gray-100 p-3 rounded-full cursor-pointer text-gray-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>

          {/* Menu Trigger Button */}
          <div 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 border border-gray-300 pl-3 pr-1 py-1 rounded-full cursor-pointer hover:shadow-md transition bg-white ml-1"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg className="w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>

          {/* Profile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 text-sm z-50 text-gray-800">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                <span>Help Center</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <hr className="my-2 border-gray-100" />

              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-900">Become a host</div>
                  <div className="text-xs text-gray-500 max-w-[170px] leading-tight mt-0.5">
                    It's easy to start hosting and earn extra income.
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>

              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                <span>Refer a Host</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>

              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                <span>Gift cards</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V6a2 2 0 10-2 2h2zm-7 4h14a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1v-7a1 1 0 011-1z" />
                </svg>
              </div>

              <hr className="my-2 border-gray-100" />

              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-bold text-gray-900">
                Log in or sign up
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Big Search Bar (Only shown when NOT scrolled) */}
      {!isScrolled && (
        <div className="max-w-3xl mx-auto border border-gray-200 rounded-full shadow-md hover:shadow-lg transition bg-gray-50 flex items-center justify-between p-2 cursor-pointer mt-4">
          <div className="flex-1 px-6 py-1 hover:bg-gray-200/60 rounded-full transition">
            <div className="text-xs font-bold text-black">Where</div>
            <input 
              type="text" 
              placeholder="Search destinations" 
              className="w-full bg-transparent text-xs text-gray-500 outline-none cursor-pointer"
              readOnly
            />
          </div>

          <span className="border-r h-8 border-gray-300"></span>

          <div className="flex-1 px-6 py-1 hover:bg-gray-200/60 rounded-full transition">
            <div className="text-xs font-bold text-black">When</div>
            <div className="text-xs text-gray-500">Add dates</div>
          </div>

          <span className="border-r h-8 border-gray-300"></span>

          <div className="flex-1 pl-6 pr-2 py-1 hover:bg-gray-200/60 rounded-full transition flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-black">Who</div>
              <div className="text-xs text-gray-500">Add guests</div>
            </div>
            <div className="bg-[#FF385C] text-white p-3 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Language & Region Modal */}
      {isLangModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsLangModalOpen(false)}
              className="text-gray-600 hover:bg-gray-100 p-2 rounded-full mb-4 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex gap-8 border-b border-gray-200 pb-3 mb-6 text-sm font-semibold">
              <button 
                onClick={() => setSelectedTab('lang')}
                className={`pb-3 ${selectedTab === 'lang' ? 'border-b-2 border-black font-bold text-black' : 'text-gray-500'}`}
              >
                Language and region
              </button>
              <button 
                onClick={() => setSelectedTab('currency')}
                className={`pb-3 ${selectedTab === 'currency' ? 'border-b-2 border-black font-bold text-black' : 'text-gray-500'}`}
              >
                Currency
              </button>
            </div>

            {selectedTab === 'lang' ? (
              <div>
                <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between mb-8">
                  <div>
                    <div className="font-bold text-sm">Translation</div>
                    <div className="text-xs text-gray-500">Automatically translate descriptions and reviews to English.</div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-black cursor-pointer" defaultChecked />
                </div>

                <h3 className="font-bold text-lg mb-4">Choose a language and region</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {languages.map((lang, index) => (
                    <div 
                      key={index}
                      onClick={() => setIsLangModalOpen(false)}
                      className="p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition border border-transparent hover:border-gray-200"
                    >
                      <div className="text-sm font-semibold">{lang.name}</div>
                      <div className="text-xs text-gray-500">{lang.region}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-lg mb-4">Choose a currency</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {currencies.map((currency, index) => {
                    const isSelected = selectedCurrency === currency.code;
                    return (
                      <div 
                        key={index}
                        onClick={() => {
                          setSelectedCurrency(currency.code);
                          setIsLangModalOpen(false);
                        }}
                        className={`p-3 rounded-xl cursor-pointer transition border ${
                          isSelected 
                            ? 'border-black bg-gray-50' 
                            : 'border-transparent hover:bg-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="text-sm font-semibold text-gray-900">{currency.name}</div>
                        <div className="text-xs text-gray-500">{currency.code} – {currency.symbol}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;