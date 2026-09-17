import React, { useState, useRef, useEffect, memo } from 'react';
import { FiSearch, FiMinus, FiPlus, FiChevronLeft, FiChevronRight, FiCalendar, FiX } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import Calendar from './Calendar.jsx';

const SearchBar = memo(({ activeSection: controlledActiveSection, setActiveSection: setControlledActiveSection, onSearch }) => {
  const { t } = useLanguage();
  const [internalActiveSection, setInternalActiveSection] = useState(null);

  const activeSection = controlledActiveSection !== undefined ? controlledActiveSection : internalActiveSection;
  const setActiveSection = setControlledActiveSection || setInternalActiveSection;

  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const [dateTab, setDateTab] = useState('dates'); // 'dates' or 'flexible'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stayDuration, setStayDuration] = useState('Weekend');
  const [monthIndex, setMonthIndex] = useState(0);

  const searchBarRef = useRef(null);

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
  }, [setActiveSection]);

  const updateGuests = (type, operation) => {
    setGuests((prev) => ({
      ...prev,
      [type]: operation === 'inc' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const totalGuests = guests.adults + guests.children;

  const handleCalendarDateChange = ({ startDate: newStart, endDate: newEnd }) => {
    setStartDate(newStart);
    setEndDate(newEnd);
  };

  const calculateNights = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const formatDatePill = () => {
    if (startDate && endDate) {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const sStr = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const eStr = e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `${sStr} – ${eStr}`;
    }
    if (startDate) {
      const s = new Date(startDate);
      return s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return dateTab === 'flexible' ? 'Anytime' : t('addDates');
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
          <div className="text-gray-500 text-xs truncate font-medium">
            {destination || t('searchDestinations')}
          </div>
        </div>

        <div className="h-6 w-[1px] bg-gray-200"></div>

        {/* WHEN / CALENDAR TRIGGER */}
        <div 
          onClick={() => setActiveSection(activeSection === 'when' ? null : 'when')}
          className={`flex-1 py-3 px-6 rounded-full transition-all text-left ${
            activeSection === 'when' ? 'bg-white shadow-xl border border-gray-200' : 'hover:bg-gray-100'
          }`}
        >
          <div className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">{t('when')}</div>
          <div className="text-gray-900 text-xs truncate font-semibold">
            {formatDatePill()}
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
            <div className="text-gray-500 text-xs truncate font-medium">
              {totalGuests > 0 ? `${totalGuests} guests` : t('addGuests')}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveSection(null);
              if (onSearch) onSearch({ destination, startDate, endDate, guests });
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
        <div className="absolute top-20 left-4 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 z-50 w-96 animate-in fade-in duration-150">
          <h3 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider">Search by region</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Alexandria', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100' },
              { label: 'El Gouna', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100' },
              { label: 'Cairo', img: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=100' },
              { label: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=100' },
              { label: 'Hurghada', img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=100' },
              { label: 'Dahab', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=100' },
            ].map((reg, idx) => (
              <button 
                key={idx} 
                type="button"
                onClick={() => {
                  setDestination(reg.label);
                  setActiveSection('when');
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                <img src={reg.img} alt={reg.label} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                <span className="text-xs text-gray-700 font-bold">{reg.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* WHEN DROPDOWN WITH CALENDAR COMPONENT INTEGRATION */}
      {activeSection === 'when' && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 z-50 w-full max-w-3xl animate-in fade-in duration-150">
          {/* Calendar Header Tabs */}
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <div className="bg-gray-100 p-1 rounded-full flex items-center">
              <button
                type="button"
                onClick={() => setDateTab('dates')}
                className={`px-6 py-1.5 rounded-full text-xs font-bold transition ${
                  dateTab === 'dates' ? 'bg-white shadow-xs text-black' : 'text-gray-500'
                }`}
              >
                Select Dates
              </button>
              <button
                type="button"
                onClick={() => setDateTab('flexible')}
                className={`px-6 py-1.5 rounded-full text-xs font-bold transition ${
                  dateTab === 'flexible' ? 'bg-white shadow-xs text-black' : 'text-gray-500'
                }`}
              >
                Flexible
              </button>
            </div>

            <button 
              type="button"
              onClick={() => setActiveSection('who')}
              className="text-xs font-bold bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition"
            >
              Apply Dates
            </button>
          </div>

          {/* DATES TAB: EMBEDDED INTERACTIVE CALENDAR */}
          {dateTab === 'dates' && (
            <div className="space-y-4">
              <Calendar
                startDate={startDate}
                endDate={endDate}
                onDateChange={handleCalendarDateChange}
                nightsCount={calculateNights()}
                locationName={destination || 'your destination'}
              />
            </div>
          )}

          {/* FLEXIBLE TAB */}
          {dateTab === 'flexible' && (
            <div className="text-center py-4 space-y-4">
              <h3 className="text-sm font-bold text-gray-800">How long would you like to stay?</h3>
              <div className="flex justify-center gap-3">
                {['Weekend', 'Week', 'Month'].map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setStayDuration(dur)}
                    className={`px-5 py-2 rounded-full text-xs font-bold border transition ${
                      stayDuration === dur 
                        ? 'border-black bg-gray-50 text-black' 
                        : 'border-gray-200 hover:border-black text-gray-600'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>

              <div className="relative flex items-center px-4 pt-2">
                <button
                  type="button"
                  disabled={monthIndex === 0}
                  onClick={() => setMonthIndex((prev) => Math.max(0, prev - 1))}
                  className="absolute left-0 z-10 p-2 rounded-full bg-white border border-gray-200 shadow-md hover:scale-105 transition disabled:opacity-20"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-4 overflow-hidden w-full px-8">
                  {allMonths.slice(monthIndex, monthIndex + 5).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setStartDate(`2026-${String(idx + 9).padStart(2, '0')}-10`);
                        setEndDate(`2026-${String(idx + 9).padStart(2, '0')}-17`);
                        setActiveSection('who');
                      }}
                      className="flex-1 flex flex-col items-center justify-center p-3.5 border border-gray-200 hover:border-black rounded-2xl cursor-pointer transition min-w-[90px]"
                    >
                      <FiCalendar className="w-6 h-6 text-gray-700 mb-2 stroke-[1.5]" />
                      <span className="text-xs font-bold text-gray-800">{item.month}</span>
                      <span className="text-[10px] text-gray-400 mt-0.5">{item.year}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={monthIndex >= allMonths.length - 5}
                  onClick={() => setMonthIndex((prev) => Math.min(allMonths.length - 5, prev + 1))}
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
        <div className="absolute top-20 right-4 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 z-50 w-80 space-y-4 animate-in fade-in duration-150">
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
});

export default SearchBar;