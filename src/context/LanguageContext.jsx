import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Header & Navigation
    all: 'All',
    homes: 'Homes',
    experiences: 'Experiences',
    services: 'Services',
    becomeHost: 'Become a host',
    helpCenter: 'Help Center',
    referHost: 'Refer a Host',
    findCoHost: 'Find a co-host',
    giftCards: 'Gift cards',
    loginSignUp: 'Log in or sign up',

    // Search bar
    where: 'Where',
    searchDestinations: 'Search destinations',
    checkIn: 'Check in',
    checkOut: 'Check out',
    who: 'Who',
    addGuests: 'Add guests',
    search: 'Search',
    anyWeek: 'Any week',
    homesNearby: 'Homes nearby',

    // Quick filters & controls
    freeParking: 'Free parking',
    wifi: 'Wi-Fi',
    allowsPets: 'Allows pets',
    kitchen: 'Kitchen',
    airConditioning: 'Air conditioning',
    washer: 'Washer',
    gym: 'Gym',
    pool: 'Pool',
    filters: 'Filters',
    resetFilters: 'Reset filters',
    filteredBy: 'Filtered by',
    placesAvailable: 'places available',
    placeAvailable: 'place available',

    // Grid & Sections
    popularAlex: 'Popular homes in Alexandria',
    greatHotels: 'Great hotels for your next trip',
    hotelsCredit: 'Plus, earn Airbnb credit when staying at a featured hotel.',
    weekendZayed: 'Available homes for this weekend in Sheikh Zayed',
    staysNewCairo: 'Stays in New Cairo',
    weekendHurghada: 'Available homes for this weekend in Hurghada',
    popularCairoExp: 'Popular travel experiences in Cairo',
    captureMemories: 'Capture memories in a destination near you',
    homesOctober: 'Homes in 6th of October City',
    dubaiNextMonth: 'Available homes next month in Dubai',
    placesSokhna: 'Places to stay in Ain Sokhna',
    exploreRiyadh: 'Explore homes in Riyadh',
    popularAlamein: 'Popular homes in El Alamein',
    staysIstanbul: 'Stays in Istanbul',
    otherStays: 'Other suggested stays for you',
    curatedServices: 'Curated Services for Your Stay',
    serviceSubtitle: 'Enhance your trip with trusted local service providers and premium experiences.',
    bookService: 'Book service',
    noMatchingStays: 'No matching stays found',
    tryAnotherCategory: 'Try selecting another category to explore available properties.',

    // Card badges & labels
    guestFavorite: 'Guest favorite',
    night: 'night',
    nights: 'nights',
    forNights: 'for',
    perPerson: 'per person',
    showAll: 'Show all',

    // Map & Floating Button
    showMap: 'Show map',
    showList: 'Show list',

    // Footer & Modal
    copyright: '© 2026 Airbnb, Inc. · Terms · Sitemap · Privacy · Your Privacy Choices',
    langRegion: 'English (US)',
    currencyLabel: 'EGP',
  },

  ar: {
    // Header & Navigation
    all: 'الكل',
    homes: 'بيوت',
    experiences: 'تجارب',
    services: 'خدمات',
    becomeHost: 'تأجير مسكنك',
    helpCenter: 'مركز المساعدة',
    referHost: 'ترشيح مضيف',
    findCoHost: 'البحث عن مضيف مشارك',
    giftCards: 'بطاقات الهدايا',
    loginSignUp: 'تسجيل الدخول أو الاشتراك',

    // Search bar
    where: 'الوجهة',
    searchDestinations: 'البحث عن الوجهات',
    checkIn: 'الوصول',
    checkOut: 'المغادرة',
    who: 'الضيوف',
    addGuests: 'إضافة ضيوف',
    search: 'بحث',
    anyWeek: 'أي أسبوع',
    homesNearby: 'بيوت قريبة',

    // Quick filters & controls
    freeParking: 'موقف سيارات مجاني',
    wifi: 'واي فاي',
    allowsPets: 'يسمح بالحيوانات الأليفة',
    kitchen: 'مطبخ',
    airConditioning: 'تكييف هواء',
    washer: 'غسالة',
    gym: 'صالة ألعاب رياضية',
    pool: 'مسبح',
    filters: 'مرشحات',
    resetFilters: 'إعادة ضبط المرشحات',
    filteredBy: 'مصفى حسب',
    placesAvailable: 'أماكن متاحة',
    placeAvailable: 'مكان متاح',

    // Grid & Sections
    popularAlex: 'بيوت شهيرة في الإسكندرية',
    greatHotels: 'فنادق رائعة لرحلتك القادمة',
    hotelsCredit: 'بالإضافة إلى الحصول على رصيد Airbnb عند الإقامة في فندق متميز.',
    weekendZayed: 'بيوت متاحة في عطلة نهاية الأسبوع في الشيخ زايد',
    staysNewCairo: 'أماكن إقامة في القاهرة الجديدة',
    weekendHurghada: 'بيوت متاحة في عطلة نهاية الأسبوع في الغردقة',
    popularCairoExp: 'تجارب سفر شهيرة في القاهرة',
    captureMemories: 'التقط ذكريات في وجهة قريبة منك',
    homesOctober: 'بيوت في مدينة 6 أكتوبر',
    dubaiNextMonth: 'بيوت متاحة الشهر القادم في دبي',
    placesSokhna: 'أماكن للإقامة في العين السخنة',
    exploreRiyadh: 'استكشف بيوت في الرياض',
    popularAlamein: 'بيوت شهيرة في العلمين',
    staysIstanbul: 'أماكن إقامة في إسطنبول',
    otherStays: 'إقامات أخرى مقترحة لك',
    curatedServices: 'خدمات مختارة لإقامتك',
    serviceSubtitle: 'ارتقِ برحلتك مع مقدمي خدمات محليين موثوقين وتجارب فاخرة.',
    bookService: 'حجز الخدمة',
    noMatchingStays: 'لم يتم العثور على أماكن إقامة مطابقة',
    tryAnotherCategory: 'جرب اختيار فئة أخرى لاستكشاف العقارات المتاحة.',

    // Card badges & labels
    guestFavorite: 'مفضل لدى الضيوف',
    night: 'ليلة',
    nights: 'ليال',
    forNights: 'مقابل',
    perPerson: 'للشخص',
    showAll: 'عرض الكل',

    // Map & Floating Button
    showMap: 'عرض الخريطة',
    showList: 'عرض القائمة',

    // Footer & Modal
    copyright: '© 2026 Airbnb, Inc. · الشروط · خريطة الموقع · الخصوصية',
    langRegion: 'العربية (مصر)',
    currencyLabel: 'ج.م',
  }
};

export const formatPrice = (egpAmount, currency = 'Egyptian pound', language = 'English') => {
  if (egpAmount === null || egpAmount === undefined || isNaN(Number(egpAmount))) return '';
  const num = Number(egpAmount);
  const isArabic = language.toLowerCase() === 'arabic' || language === 'ar';

  let converted = num;
  let symbol = 'EGP';

  const currKey = (currency || '').toLowerCase();

  if (currKey.includes('dollar') || currKey.includes('usd')) {
    converted = Math.round(num * 0.021);
    symbol = '$';
  } else if (currKey.includes('euro') || currKey.includes('eur')) {
    converted = Math.round(num * 0.019);
    symbol = '€';
  } else if (currKey.includes('pound sterling') || currKey.includes('gbp')) {
    converted = Math.round(num * 0.016);
    symbol = '£';
  } else if (currKey.includes('dirham') || currKey.includes('aed')) {
    converted = Math.round(num * 0.077);
    symbol = isArabic ? 'د.إ' : 'AED';
  } else if (currKey.includes('riyal') || currKey.includes('sar')) {
    converted = Math.round(num * 0.079);
    symbol = isArabic ? 'ر.س' : 'SAR';
  } else if (currKey.includes('canadian') || currKey.includes('cad')) {
    converted = Math.round(num * 0.029);
    symbol = 'CAD $';
  } else if (currKey.includes('australian') || currKey.includes('aud')) {
    converted = Math.round(num * 0.032);
    symbol = 'AUD $';
  } else if (currKey.includes('yen') || currKey.includes('jpy')) {
    converted = Math.round(num * 3.1);
    symbol = '¥';
  } else if (currKey.includes('franc') || currKey.includes('chf')) {
    converted = Math.round(num * 0.018);
    symbol = 'CHF';
  } else {
    // Egyptian Pound / default
    converted = num;
    symbol = isArabic ? 'ج.م' : 'EGP';
  }

  const formattedNum = converted.toLocaleString(isArabic ? 'ar-EG' : 'en-US');

  if (isArabic) {
    return `${formattedNum} ${symbol}`;
  }
  if (['$', '€', '£', '¥'].includes(symbol)) {
    return `${symbol}${formattedNum}`;
  }
  return `${symbol} ${formattedNum}`;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('English');
  const [currency, setCurrencyState] = useState('Egyptian pound');
  const [dir, setDir] = useState('ltr');

  const setLanguage = (lang) => {
    setLanguageState(lang);
    const isAr = (lang || '').toLowerCase() === 'arabic' || lang === 'ar';
    const newDir = isAr ? 'rtl' : 'ltr';
    setDir(newDir);
    document.documentElement.dir = newDir;
    document.documentElement.lang = isAr ? 'ar' : 'en';
  };

  const setCurrency = (curr) => {
    setCurrencyState(curr);
  };

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  const langCode = (language || '').toLowerCase() === 'arabic' || language === 'ar' ? 'ar' : 'en';
  const dict = translations[langCode] || translations.en;

  const t = (key) => {
    return dict[key] || translations.en[key] || key;
  };

  const formattedPriceHelper = (amount) => formatPrice(amount, currency, language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        dir,
        t,
        formatPrice: formattedPriceHelper,
        langCode
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      language: 'English',
      setLanguage: () => {},
      currency: 'Egyptian pound',
      setCurrency: () => {},
      dir: 'ltr',
      t: (key) => key,
      formatPrice: (amt) => formatPrice(amt, 'Egyptian pound', 'English'),
      langCode: 'en'
    };
  }
  return ctx;
};
