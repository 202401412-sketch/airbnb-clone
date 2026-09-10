import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiMinus, FiPlus, FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';

const SearchBar = ({ onSearch }) => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState(null);
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const [dateTab, setDateTab] = useState('dates'); // 'dates' or 'flexible'
  const [stayDuration, setStayDuration] = useState('Weekend'); // 'Weekend', 'Week', 'Month'
  const [monthIndex, setMonthIndex] = useState(0);

  const searchBarRef = useRef(null);

  // EGP EGP EGPAliEGP EGP Flexible
  const allMonths = [
    { month: 'September', year: '2026' },
    { month: 'October', year: '2026' },
    { month: 'November', year: '2026' },
    { month: 'December', year: '2026' },
    { month: 'January', year: '2027' },
    { month: 'February', year: '2027' },
    { month: 'March', year: '2027' },
    { month: 'April', year: '2027' },
    { month: 'May', year: '2027' },
    { month: 'June', year: '2027' },
    { month: 'July', year: '2027' },
    { month: 'August', year: '2027' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setActiveSection(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateGuests = (type, operation) => {
    setGuests((prev) => ({
      ...prev,
      [type]: operation === 'inc' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const totalGuests = guests.adults + guests.children;

  const renderDays = (startDayOffset, totalDays) => {
    const days = [];
    for (let i = 0; i < startDayOffset; i++) {
      days.push(<div key={`empty-${i}`} />);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(
        <button
          key={d}
          type="button"
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium hover:border hover:border-black transition"
        >
          {d}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 relative z-50" ref={searchBarRef}>
      
      {/* Search Bar Bar */}
      <div className="relative flex items-center bg-white rounded-full border border-gray-200 shadow-md hover:shadow-lg transition cursor-pointer">
        
        {/* WHERE */}
        <div 
          onClick={() => setActiveSection(activeSection === 'where' ? null : 'where')}
          className={`flex-1 py-3 px-6 rounded-full transition-all text-left ${
            activeSection === 'where' ? 'bg-white shadow-xl border border-gray-200' : 'hover:bg-gray-100'
          }`}
        >
          <div className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">{t('where')}</div>
          <div className="text-gray-500 text-xs truncate">
            {destination || t('searchDestinations')}
          </div>
        </div>

        <div className="h-6 w-[1px] bg-gray-200"></div>

        {/* WHEN */}
        <div 
          onClick={() => setActiveSection(activeSection === 'when' ? null : 'when')}
          className={`flex-1 py-3 px-6 rounded-full transition-all text-left ${
            activeSection === 'when' ? 'bg-white shadow-xl border border-gray-200' : 'hover:bg-gray-100'
          }`}
        >
          <div className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">{t('checkIn')}</div>
          <div className="text-gray-500 text-xs truncate">
            {dateTab === 'flexible' ? 'Anytime' : t('anyWeek')}
          </div>
        </div>

        <div className="h-6 w-[1px] bg-gray-200"></div>

        {/* WHO */}
        <div 
          onClick={() => setActiveSection(activeSection === 'who' ? null : 'who')}
          className={`flex-[1.2] py-2 pl-6 pr-2 rounded-full transition-all flex items-center justify-between text-left ${
            activeSection === 'who' ? 'bg-white shadow-xl border border-gray-200' : 'hover:bg-gray-100'
          }`}
        >
          <div>
            <div className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">{t('who')}</div>
            <div className="text-gray-500 text-xs truncate">
              {totalGuests > 0 ? `${totalGuests} guests` : t('addGuests')}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveSection(null);
              if (onSearch) onSearch();
            }}
            className="p-3 bg-[#FF385C] hover:bg-[#E00B41] text-white rounded-full transition duration-200 flex items-center gap-2 shadow-md"
          >
            <FiSearch className="w-4 h-4 stroke-[2.5]" />
            <span className="text-xs font-semibold pr-1">{t('search')}</span>
          </button>
        </div>

      </div>

      {/* --- POPUP DROPDOWNS --- */}

      {/* WHERE DROPDOWN */}
      {activeSection === 'where' && (
        <div className="absolute top-20 left-4 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 z-50 w-96">
          <h3 className="text-xs font-bold text-gray-800 mb-3">Search by region</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Europe', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=100' },
              { label: 'Turkey', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100' },
              { label: 'Egypt', img: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=100' },
              { label: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=100' },
              { label: 'Southeast Asia', img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=100' },
              { label: 'United States', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=100' },
            ].map((reg, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  setDestination(reg.label);
                  setActiveSection('when');
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                <img src={reg.img} alt={reg.label} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                <span className="text-xs text-gray-700 font-medium">{reg.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* WHEN DROPDOWN (DATES + FLEXIBLE) */}
      {activeSection === 'when' && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 z-50 w-[780px]">
          {/* Main Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-full flex items-center">
              <button
                type="button"
                onClick={() => setDateTab('dates')}
                className={`px-8 py-2 rounded-full text-xs font-semibold transition ${
                  dateTab === 'dates' ? 'bg-white shadow-md text-black' : 'text-gray-600'
                }`}
              >
                Dates
              </button>
              <button
                type="button"
                onClick={() => setDateTab('flexible')}
                className={`px-8 py-2 rounded-full text-xs font-semibold transition ${
                  dateTab === 'flexible' ? 'bg-white shadow-md text-black' : 'text-gray-600'
                }`}
              >
                Flexible
              </button>
            </div>
          </div>

          {/* TAB 1: DATES (CALENDAR VIEW) */}
          {dateTab === 'dates' && (
            <>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button type="button" className="p-1.5 rounded-full hover:bg-gray-100"><FiChevronLeft /></button>
                    <h4 className="text-sm font-bold text-gray-800">September 2026</h4>
                    <div className="w-6"></div>
                  </div>
                  <div className="grid grid-cols-7 text-center text-xs text-gray-400 font-medium mb-2">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-y-1 text-center items-center justify-items-center">
                    {renderDays(2, 30)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-6"></div>
                    <h4 className="text-sm font-bold text-gray-800">October 2026</h4>
                    <button type="button" className="p-1.5 rounded-full hover:bg-gray-100"><FiChevronRight /></button>
                  </div>
                  <div className="grid grid-cols-7 text-center text-xs text-gray-400 font-medium mb-2">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-y-1 text-center items-center justify-items-center">
                    {renderDays(4, 31)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-gray-100 overflow-x-auto">
                {['Exact dates', '± 1 day', '± 2 days', '± 3 days', '± 7 days', '± 14 days'].map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`px-4 py-2 rounded-full text-xs font-medium border border-gray-200 transition whitespace-nowrap ${
                      i === 0 ? 'bg-gray-100 border-black font-semibold' : 'hover:border-black'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* TAB 2: FLEXIBLE (IMAGE EXACT REPLICA) */}
          {dateTab === 'flexible' && (
            <div className="text-center py-2">
              <h3 className="text-sm font-bold text-gray-800 mb-4">How long would you like to stay?</h3>
              
              {/* Duration Options */}
              <div className="flex justify-center gap-3 mb-8">
                {['Weekend', 'Week', 'Month'].map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setStayDuration(dur)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold border transition ${
                      stayDuration === dur 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-black text-gray-600'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>

              <h3 className="text-sm font-bold text-gray-800 mb-4">Go anytime</h3>

              {/* Slider for Months */}
              <div className="relative flex items-center px-4">
                <button
                  type="button"
                  disabled={monthIndex === 0}
                  onClick={() => setMonthIndex((prev) => Math.max(0, prev - 1))}
                  className="absolute left-0 z-10 p-2 rounded-full bg-white border border-gray-200 shadow-md hover:scale-105 transition disabled:opacity-20"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-4 overflow-hidden w-full px-8">
                  {allMonths.slice(monthIndex, monthIndex + 6).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center justify-center p-4 border border-gray-200 hover:border-black rounded-2xl cursor-pointer transition min-w-[100px]"
                    >
                      <FiCalendar className="w-8 h-8 text-gray-700 mb-3 stroke-[1.5]" />
                      <span className="text-xs font-bold text-gray-800">{item.month}</span>
                      <span className="text-[11px] text-gray-400 mt-0.5">{item.year}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={monthIndex >= allMonths.length - 6}
                  onClick={() => setMonthIndex((prev) => Math.min(allMonths.length - 6, prev + 1))}
                  className="absolute right-0 z-10 p-2 rounded-full bg-white border border-gray-200 shadow-md hover:scale-105 transition disabled:opacity-20"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* WHO DROPDOWN */}
      {activeSection === 'who' && (
        <div className="absolute top-20 right-4 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 z-50 w-80 space-y-4">
          {[
            { key: 'adults', title: 'Adults', desc: 'Ages 13 or above' },
            { key: 'children', title: 'Children', desc: 'Ages 2–12' },
            { key: 'infants', title: 'Infants', desc: 'Under 2' },
            { key: 'pets', title: 'Pets', desc: 'Bringing a service animal?' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-none">
              <div>
                <div className="text-sm font-bold text-gray-800">{item.title}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  onClick={() => updateGuests(item.key, 'dec')}
                  disabled={guests[item.key] === 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 hover:border-black"
                >
                  <FiMinus className="w-3 h-3" />
                </button>
                <span className="text-sm font-semibold w-4 text-center">{guests[item.key]}</span>
                <button 
                  type="button"
                  onClick={() => updateGuests(item.key, 'inc')}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black"
                >
                  <FiPlus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default SearchBar;