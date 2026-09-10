import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const LanguageModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('lang'); // 'lang' | 'currency'
  const [translationAuto, setTranslationAuto] = useState(true);

  if (!isOpen) return null;

  // قائمة اللغات الكاملة مثل أيربنبي
  const languages = [
    { name: 'English', region: 'United States' },
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
    { name: 'Français', region: 'Belgique' },
    { name: 'Français', region: 'Canada' },
    { name: 'Français', region: 'France' },
    { name: 'Français', region: 'Suisse' },
    { name: 'Italiano', region: 'Italia' },
    { name: 'العربية', region: 'العالم' },
    { name: 'עברית', region: 'ישראל' },
    { name: 'Русский', region: 'Россия' },
    { name: 'ไทย', region: 'ประเทศไทย' },
    { name: '한국어', region: '대한민국' },
    { name: '日本語', region: '日本' },
    { name: '简体中文', region: '中国' },
  ];

  // قائمة العملات الكاملة مثل أيربنبي
  const currencies = [
    { name: 'Egyptian pound', symbol: 'EGP – ج.م' },
    { name: 'Australian dollar', symbol: 'AUD – $' },
    { name: 'Brazilian real', symbol: 'BRL – R$' },
    { name: 'Bulgarian lev', symbol: 'BGN – лв.' },
    { name: 'Canadian dollar', symbol: 'CAD – $' },
    { name: 'Chilean peso', symbol: 'CLP – $' },
    { name: 'Chinese yuan', symbol: 'CNY – ¥' },
    { name: 'Colombian peso', symbol: 'COP – $' },
    { name: 'Costa Rican colon', symbol: 'CRC – ₡' },
    { name: 'Czech koruna', symbol: 'CZK – Kč' },
    { name: 'Danish krone', symbol: 'DKK – kr' },
    { name: 'Emirati dirham', symbol: 'AED – إ.د' },
    { name: 'Euro', symbol: 'EUR – €' },
    { name: 'Ghanaian cedi', symbol: 'GHS – GH₵' },
    { name: 'Hong Kong dollar', symbol: 'HKD – $' },
    { name: 'Hungarian forint', symbol: 'HUF – Ft' },
    { name: 'Indian rupee', symbol: 'INR – ₹' },
    { name: 'Indonesian rupiah', symbol: 'IDR – Rp' },
    { name: 'Israeli new shekel', symbol: 'ILS – ₪' },
    { name: 'Japanese yen', symbol: 'JPY – ¥' },
    { name: 'Kazakhstani tenge', symbol: 'KZT – ₸' },
    { name: 'Kenyan shilling', symbol: 'KES – KSh' },
    { name: 'Malaysian ringgit', symbol: 'MYR – RM' },
    { name: 'Mexican peso', symbol: 'MXN – $' },
    { name: 'Moroccan dirham', symbol: 'MAD' },
    { name: 'New Taiwan dollar', symbol: 'TWD – $' },
    { name: 'New Zealand dollar', symbol: 'NZD – $' },
    { name: 'Norwegian krone', symbol: 'NOK – kr' },
    { name: 'Peruvian sol', symbol: 'PEN – S/' },
    { name: 'Philippine peso', symbol: 'PHP – ₱' },
    { name: 'Polish zloty', symbol: 'PLN – zł' },
    { name: 'Pound sterling', symbol: 'GBP – £' },
    { name: 'Qatari riyal', symbol: 'QAR – ر.ق' },
    { name: 'Romanian leu', symbol: 'RON – lei' },
    { name: 'Saudi Arabian riyal', symbol: 'SAR – SR' },
    { name: 'Singapore dollar', symbol: 'SGD – $' },
    { name: 'South African rand', symbol: 'ZAR – R' },
    { name: 'South Korean won', symbol: 'KRW – ₩' },
    { name: 'Swedish krona', symbol: 'SEK – kr' },
    { name: 'Swiss franc', symbol: 'CHF' },
    { name: 'Turkish lira', symbol: 'TRY – ₺' },
    { name: 'United States dollar', symbol: 'USD – $' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-5xl h-[88vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative" dir="ltr">
        
        {/* Header Tabs */}
        <div className="p-6 pb-0 border-b border-gray-200 relative">
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition absolute left-6 top-5 text-gray-700"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="flex gap-8 ml-12 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('lang')}
              className={`pb-4 transition border-b-2 ${
                activeTab === 'lang'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              Language and region
            </button>
            <button
              onClick={() => setActiveTab('currency')}
              className={`pb-4 transition border-b-2 ${
                activeTab === 'currency'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              Currency
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* TAB 1: LANGUAGES */}
          {activeTab === 'lang' && (
            <>
              {/* Translation Toggle Box */}
              <div className="bg-gray-50 p-5 rounded-2xl flex items-center justify-between border border-gray-100 max-w-sm">
                <div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                    Translation <span className="text-base">🌐</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Automatically translate descriptions and reviews to English.
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input 
                    type="checkbox" 
                    checked={translationAuto} 
                    onChange={() => setTranslationAuto(!translationAuto)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>

              {/* Suggested Section */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Suggested language and region</h3>
                <div className="w-48 p-3 rounded-xl border border-black bg-white cursor-pointer">
                  <div className="text-sm font-medium text-gray-900">English</div>
                  <div className="text-xs text-gray-500">United Kingdom</div>
                </div>
              </div>

              {/* Grid 5 Columns for Languages */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4">Choose a language and region</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-4 gap-x-2">
                  {languages.map((lang, index) => (
                    <div 
                      key={index} 
                      className={`p-2.5 rounded-xl transition cursor-pointer hover:bg-gray-100 ${
                        lang.name === 'English' && lang.region === 'United States' ? 'border border-black' : ''
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-900">{lang.name}</div>
                      <div className="text-xs text-gray-500">{lang.region}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: CURRENCIES */}
          {activeTab === 'currency' && (
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-4">Choose a currency</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-4 gap-x-2">
                {currencies.map((curr, index) => (
                  <div 
                    key={index} 
                    className={`p-2.5 rounded-xl transition cursor-pointer hover:bg-gray-100 ${
                      curr.name === 'Egyptian pound' ? 'border border-black' : ''
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-900">{curr.name}</div>
                    <div className="text-xs text-gray-500">{curr.symbol}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default LanguageModal;