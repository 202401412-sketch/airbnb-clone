import React, { useState, useEffect } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

const LanguageModal = ({ isOpen, onClose, selectedLang = 'English', selectedCurr = 'Egyptian pound', onSelectLang, onSelectCurr, initialTab = 'lang' }) => {
  const [activeTab, setActiveTab] = useState(initialTab); // 'lang' | 'currency'
  const [currentLang, setCurrentLang] = useState(selectedLang);
  const [currentCurr, setCurrentCurr] = useState(selectedCurr);
  const [translationAuto, setTranslationAuto] = useState(true);

  useEffect(() => {
    setCurrentLang(selectedLang);
  }, [selectedLang]);

  useEffect(() => {
    setCurrentCurr(selectedCurr);
  }, [selectedCurr]);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const languages = [
    { name: 'English', region: 'United States', code: 'en' },
    { name: 'English', region: 'United Kingdom', code: 'en' },
    { name: 'Arabic', region: 'Arab World', code: 'ar' },
    { name: 'French', region: 'France', code: 'fr' },
    { name: 'German', region: 'Germany', code: 'de' },
    { name: 'Spanish', region: 'Spain', code: 'es' },
    { name: 'Italian', region: 'Italy', code: 'it' },
    { name: 'Turkish', region: 'Turkey', code: 'tr' },
    { name: 'Japanese', region: 'Japan', code: 'ja' },
    { name: 'Korean', region: 'South Korea', code: 'ko' },
  ];

  const currencies = [
    { name: 'Egyptian pound', symbol: 'EGP' },
    { name: 'United States dollar', symbol: 'USD – $' },
    { name: 'Euro', symbol: 'EUR – €' },
    { name: 'Pound sterling', symbol: 'GBP – £' },
    { name: 'Emirati dirham', symbol: 'AED' },
    { name: 'Saudi Arabian riyal', symbol: 'SAR' },
    { name: 'Canadian dollar', symbol: 'CAD – $' },
    { name: 'Australian dollar', symbol: 'AUD – $' },
    { name: 'Japanese yen', symbol: 'JPY – ¥' },
    { name: 'Swiss franc', symbol: 'CHF' },
  ];

  const handleSelectLanguage = (lang) => {
    setCurrentLang(lang.name);
    if (onSelectLang) onSelectLang(lang.name);
    onClose();
  };

  const handleSelectCurrency = (curr) => {
    setCurrentCurr(curr.name);
    if (onSelectCurr) onSelectCurr(curr.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative" dir="ltr">
        
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
              <div className="bg-gray-50 p-5 rounded-2xl flex items-center justify-between border border-gray-200 max-w-md">
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

              {/* Language Options Grid */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4">Choose a language and region</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {languages.map((lang, index) => {
                    const isSelected = currentLang === lang.name;
                    return (
                      <div 
                        key={index} 
                        onClick={() => handleSelectLanguage(lang)}
                        className={`p-3.5 rounded-2xl transition cursor-pointer flex justify-between items-center ${
                          isSelected ? 'border-2 border-black bg-gray-50 font-bold' : 'border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lang.name}</div>
                          <div className="text-xs text-gray-500">{lang.region}</div>
                        </div>
                        {isSelected && <FiCheck className="w-4 h-4 text-black" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: CURRENCIES */}
          {activeTab === 'currency' && (
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-4">Choose a currency</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {currencies.map((curr, index) => {
                  const isSelected = currentCurr === curr.name;
                  return (
                    <div 
                      key={index} 
                      onClick={() => handleSelectCurrency(curr)}
                      className={`p-3.5 rounded-2xl transition cursor-pointer flex justify-between items-center ${
                        isSelected ? 'border-2 border-black bg-gray-50 font-bold' : 'border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-900">{curr.name}</div>
                        <div className="text-xs text-gray-500">{curr.symbol}</div>
                      </div>
                      {isSelected && <FiCheck className="w-4 h-4 text-black" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default LanguageModal;