import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Calendar as CalendarIcon, Clock, Sparkles } from 'lucide-react';

function Calendar({ startDate, endDate, onDateChange, nightsCount = 1, locationName = 'your stay' }) {
  const [activeTab, setActiveTab] = useState('dates'); // 'dates' | 'months' | 'flexible'
  const [stayDuration, setStayDuration] = useState('Weekend');

  // Initial anchor date: September 2026 (Year 2026, Month 8)
  const minYear = 2026;
  const minMonthIdx = 8;

  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarMonth, setCalendarMonth] = useState(8);

  const isPrevDisabled = calendarYear < minYear || (calendarYear === minYear && calendarMonth <= minMonthIdx);

  const handlePrevMonth = () => {
    if (isPrevDisabled) return;
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((prev) => prev - 1);
    } else {
      setCalendarMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((prev) => prev + 1);
    } else {
      setCalendarMonth((prev) => prev + 1);
    }
  };

  const handleDateGridClick = (year, monthIdx, dayNum) => {
    const selectedStr = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

    if (!startDate || (startDate && endDate)) {
      onDateChange({ startDate: selectedStr, endDate: '' });
    } else if (new Date(selectedStr) > new Date(startDate)) {
      onDateChange({ startDate, endDate: selectedStr });
    } else {
      onDateChange({ startDate: selectedStr, endDate: '' });
    }
  };

  const handleClear = () => {
    onDateChange({ startDate: '', endDate: '' });
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return 'Select date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const nextMonthYear = calendarMonth === 11 ? calendarYear + 1 : calendarYear;
  const nextMonthIdx = calendarMonth === 11 ? 0 : calendarMonth + 1;

  // 12 upcoming months list for Months & Flexible tabs
  const upcomingMonthsList = [
    { name: 'September', year: 2026, monthIdx: 8 },
    { name: 'October', year: 2026, monthIdx: 9 },
    { name: 'November', year: 2026, monthIdx: 10 },
    { name: 'December', year: 2026, monthIdx: 11 },
    { name: 'January', year: 2027, monthIdx: 0 },
    { name: 'February', year: 2027, monthIdx: 1 },
    { name: 'March', year: 2027, monthIdx: 2 },
    { name: 'April', year: 2027, monthIdx: 3 },
    { name: 'May', year: 2027, monthIdx: 4 },
    { name: 'June', year: 2027, monthIdx: 5 },
    { name: 'July', year: 2027, monthIdx: 6 },
    { name: 'August', year: 2027, monthIdx: 7 },
  ];

  const renderMonthGrid = (year, monthIdx) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, monthIdx, 1).getDay();

    const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const minDateLimit = new Date(2026, 8, 1);

    return (
      <div className="space-y-3">
        <h4 className="font-bold text-base text-gray-900 text-center">
          {monthNames[monthIdx]} {year}
        </h4>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-500">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold">
          {blanks.map((b) => (
            <div key={`blank-${b}`} className="h-9 w-9"></div>
          ))}

          {days.map((day) => {
            const dateObj = new Date(year, monthIdx, day);
            const dateStr = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isPast = dateObj < minDateLimit;

            const isStart = startDate === dateStr;
            const isEnd = endDate === dateStr;
            const isInRange =
              startDate &&
              endDate &&
              new Date(dateStr) > new Date(startDate) &&
              new Date(dateStr) < new Date(endDate);

            let cellStyle = "hover:bg-gray-200 text-gray-900 cursor-pointer";
            if (isPast) {
              cellStyle = "text-gray-300 line-through cursor-not-allowed opacity-40";
            } else if (isStart || isEnd) {
              cellStyle = "bg-[#FF385C] text-white font-bold shadow-md scale-105 cursor-pointer";
            } else if (isInRange) {
              cellStyle = "bg-rose-100 text-[#FF385C] font-semibold cursor-pointer";
            }

            return (
              <button
                key={day}
                type="button"
                disabled={isPast}
                onClick={() => handleDateGridClick(year, monthIdx, day)}
                className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center transition-all text-xs font-medium ${cellStyle}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="border-b pb-8 space-y-5 overflow-y-auto max-h-[80vh] p-1">
      
      {/* Top Header Controls: Title & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {nightsCount} {nightsCount === 1 ? 'night' : 'nights'} in {locationName}
          </h3>
          <p className="text-gray-500 text-xs mt-0.5">
            {startDate && endDate
              ? `${formatDateDisplay(startDate)} – ${formatDateDisplay(endDate)}`
              : 'Select check-in and check-out dates on the calendar'}
          </p>
        </div>

        {/* Tab Switcher: Dates | Months | Flexible */}
        <div className="bg-gray-100 p-1 rounded-full flex items-center shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('dates')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              activeTab === 'dates' ? 'bg-white shadow-xs text-black' : 'text-gray-600 hover:text-black'
            }`}
          >
            Dates
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('months')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              activeTab === 'months' ? 'bg-white shadow-xs text-black' : 'text-gray-600 hover:text-black'
            }`}
          >
            Months
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('flexible')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              activeTab === 'flexible' ? 'bg-white shadow-xs text-black' : 'text-gray-600 hover:text-black'
            }`}
          >
            Flexible
          </button>
        </div>
      </div>

      {/* DATES TAB: Side-by-Side 2-Month Grid with Navigation Arrows */}
      {activeTab === 'dates' && (
        <div className="border rounded-3xl p-5 md:p-6 bg-gray-50/50 shadow-xs space-y-5">
          
          {/* Month Arrows Navigation */}
          <div className="flex justify-between items-center px-2">
            <button
              type="button"
              disabled={isPrevDisabled}
              onClick={handlePrevMonth}
              className="p-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition shadow-xs disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Select dates
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition shadow-xs cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* 2-Month Side-by-Side Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-5 rounded-2xl border border-gray-200">
            {renderMonthGrid(calendarYear, calendarMonth)}
            {renderMonthGrid(nextMonthYear, nextMonthIdx)}
          </div>
        </div>
      )}

      {/* MONTHS TAB: Full 12-Month Selector Grid */}
      {activeTab === 'months' && (
        <div className="border rounded-3xl p-6 bg-white shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-gray-800 text-center">Select your preferred month</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {upcomingMonthsList.map((item, idx) => {
              const monthStartStr = `${item.year}-${String(item.monthIdx + 1).padStart(2, '0')}-10`;
              const monthEndStr = `${item.year}-${String(item.monthIdx + 1).padStart(2, '0')}-17`;
              const isSelected = startDate.startsWith(`${item.year}-${String(item.monthIdx + 1).padStart(2, '0')}`);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onDateChange({ startDate: monthStartStr, endDate: monthEndStr });
                    setActiveTab('dates');
                  }}
                  className={`flex flex-col items-center justify-center p-4 border rounded-2xl cursor-pointer transition ${
                    isSelected
                      ? 'border-[#FF385C] bg-rose-50/60 shadow-sm text-[#FF385C]'
                      : 'border-gray-200 hover:border-black text-gray-800 bg-white'
                  }`}
                >
                  <CalendarIcon className="w-6 h-6 mb-1 text-gray-600" />
                  <span className="text-sm font-bold">{item.name}</span>
                  <span className="text-[11px] text-gray-400">{item.year}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* FLEXIBLE TAB: Duration & Quick Season Options */}
      {activeTab === 'flexible' && (
        <div className="border rounded-3xl p-6 bg-white shadow-xs space-y-5 text-center">
          <h4 className="text-sm font-bold text-gray-800">How long would you like to stay?</h4>
          
          <div className="flex justify-center gap-3">
            {['Weekend', 'Week', 'Month'].map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => setStayDuration(dur)}
                className={`px-6 py-2 rounded-full text-xs font-bold border transition cursor-pointer ${
                  stayDuration === dur 
                    ? 'border-black bg-gray-900 text-white shadow-sm' 
                    : 'border-gray-300 hover:border-black text-gray-700 bg-white'
                }`}
              >
                {dur}
              </button>
            ))}
          </div>

          <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider pt-2">Go anytime</h5>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {upcomingMonthsList.slice(0, 8).map((m, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  const monthStartStr = `${m.year}-${String(m.monthIdx + 1).padStart(2, '0')}-05`;
                  const monthEndStr = `${m.year}-${String(m.monthIdx + 1).padStart(2, '0')}-12`;
                  onDateChange({ startDate: monthStartStr, endDate: monthEndStr });
                  setActiveTab('dates');
                }}
                className="p-3 border border-gray-200 hover:border-black rounded-2xl flex flex-col items-center gap-1 cursor-pointer transition bg-gray-50/50"
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-bold text-gray-900">{m.name}</span>
                <span className="text-[10px] text-gray-400">{m.year}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Status Bar & Clear Action */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 text-sm gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#FF385C]" />
          <span className="font-semibold text-gray-700 text-xs sm:text-sm">
            {startDate ? `Check-in: ${formatDateDisplay(startDate)}` : 'Select check-in'}
            {endDate ? `  |  Checkout: ${formatDateDisplay(endDate)}` : ''}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {(startDate || endDate) && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-600 underline hover:text-black transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear dates
            </button>
          )}

          <span className="font-extrabold text-[#FF385C] text-sm sm:text-base">
            {nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'}
          </span>
        </div>
      </div>

    </div>
  );
}

export default Calendar;
