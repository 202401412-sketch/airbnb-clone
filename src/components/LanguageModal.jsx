import React, { useState, useEffect } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

const LanguageModal = ({ 
  isOpen, 
  onClose, 
  selectedLang = 'English', 
  selectedCurr = 'Egyptian pound', 
  onSelectLang, 
  onSelectCurr, 
  initialTab = 'lang' 
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
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

  // 🌐 قائمة شاملة بجميع اللغات والمناطق
  const languages = [
    { name: 'English', region: 'United States', code: 'en-US' },
    { name: 'English', region: 'United Kingdom', code: 'en-GB' },
    { name: 'English', region: 'Canada', code: 'en-CA' },
    { name: 'English', region: 'Australia', code: 'en-AU' },
    { name: 'العربية', region: 'مصر', code: 'ar-EG' },
    { name: 'العربية', region: 'المملكة العربية السعودية', code: 'ar-SA' },
    { name: 'العربية', region: 'الإمارات العربية المتحدة', code: 'ar-AE' },
    { name: 'العربية', region: 'الكويت', code: 'ar-KW' },
    { name: 'العربية', region: 'قطر', code: 'ar-QA' },
    { name: 'Français', region: 'France', code: 'fr-FR' },
    { name: 'Français', region: 'Canada', code: 'fr-CA' },
    { name: 'Français', region: 'Belgique', code: 'fr-BE' },
    { name: 'Deutsch', region: 'Deutschland', code: 'de-DE' },
    { name: 'Deutsch', region: 'Österreich', code: 'de-AT' },
    { name: 'Deutsch', region: 'Schweiz', code: 'de-CH' },
    { name: 'Español', region: 'España', code: 'es-ES' },
    { name: 'Español', region: 'México', code: 'es-MX' },
    { name: 'Español', region: 'Argentina', code: 'es-AR' },
    { name: 'Italiano', region: 'Italia', code: 'it-IT' },
    { name: 'Português', region: 'Brasil', code: 'pt-BR' },
    { name: 'Português', region: 'Portugal', code: 'pt-PT' },
    { name: 'Русский', region: 'Россия', code: 'ru-RU' },
    { name: 'Türkçe', region: 'Türkiye', code: 'tr-TR' },
    { name: 'Nederlands', region: 'Nederland', code: 'nl-NL' },
    { name: 'Polski', region: 'Polska', code: 'pl-PL' },
    { name: 'Svenska', region: 'Sverige', code: 'sv-SE' },
    { name: 'Norsk', region: 'Norge', code: 'no-NO' },
    { name: 'Dansk', region: 'Danmark', code: 'da-DK' },
    { name: 'Suomi', region: 'Suomi', code: 'fi-FI' },
    { name: 'Ελληνικά', region: 'Ελλάδα', code: 'el-GR' },
    { name: '日本語', region: '日本', code: 'ja-JP' },
    { name: '한국어', region: '대한민국', code: 'ko-KR' },
    { name: '简体中文', region: '中国', code: 'zh-CN' },
    { name: '繁體中文', region: '台灣', code: 'zh-TW' },
    { name: 'हिन्दी', region: 'भारत', code: 'hi-IN' },
  ];

  // 💰 قائمة شاملة بكافة العملات ورموزها
  const currencies = [
    { name: 'Egyptian pound', symbol: 'EGP – ج.م' },
    { name: 'United States dollar', symbol: 'USD – $' },
    { name: 'Euro', symbol: 'EUR – €' },
    { name: 'Pound sterling', symbol: 'GBP – £' },
    { name: 'Saudi Arabian riyal', symbol: 'SAR – ر.س' },
    { name: 'Emirati dirham', symbol: 'AED – د.إ' },
    { name: 'Kuwaiti dinar', symbol: 'KWD – د.ك' },
    { name: 'Qatari riyal', symbol: 'QAR – ر.ق' },
    { name: 'Bahraini dinar', symbol: 'BHD – د.ب' },
    { name: 'Omani rial', symbol: 'OMR – ر.ع' },
    { name: 'Jordanian dinar', symbol: 'JOD – د.أ' },
    { name: 'Canadian dollar', symbol: 'CAD – $' },
    { name: 'Australian dollar', symbol: 'AUD – $' },
    { name: 'Swiss franc', symbol: 'CHF – CHF' },
    { name: 'Japanese yen', symbol: 'JPY – ¥' },
    { name: 'Chinese yuan', symbol: 'CNY – ¥' },
    { name: 'Indian rupee', symbol: 'INR – ₹' },
    { name: 'Turkish lira', symbol: 'TRY – ₺' },
    { name: 'Brazilian real', symbol: 'BRL – R$' },
    { name: 'Mexican peso', symbol: 'MXN – $' },
    { name: 'South African rand', symbol: 'ZAR – R' },
    { name: 'Russian ruble', symbol: 'RUB – ₽' },
    { name: 'Swedish krona', symbol: 'SEK – kr' },
    { name: 'Norwegian krone', symbol: 'NOK – kr' },
    { name: 'Danish krone', symbol: 'DKK – kr' },
    { name: 'New Zealand dollar', symbol: 'NZD – $' },
    { name: 'Singapore dollar', symbol: 'SGD – $' },
    { name: 'Hong Kong dollar', symbol: 'HKD – $' },
    { name: 'South Korean won', symbol: 'KRW – ₩' },
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
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative my-auto border border-gray-100" 
        dir="ltr"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Tabs */}
        <div className="p-6 pb-0 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center justify-between">
          <button 
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-900 bg-gray-50 border border-gray-200 transition flex items-center justify-center shadow-xs cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5 text-gray-900 stroke-[2.5]" />
          </button>

          <div className="flex gap-8 ml-4 text-sm font-semibold flex-1">
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