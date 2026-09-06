import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Calendar as CalendarIcon } from 'lucide-react';

function Calendar({ startDate, endDate, onDateChange, nightsCount, locationName = 'San Stefano' }) {
  // Calendar navigation state (Year 2026, Month 8 = September)
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarMonth, setCalendarMonth] = useState(8);

  const handlePrevMonth = () => {
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
      // First click: set start date, clear end date
      onDateChange({ startDate: selectedStr, endDate: '' });
    } else if (new Date(selectedStr) > new Date(startDate)) {
      // Second click: set end date
      onDateChange({ startDate, endDate: selectedStr });
    } else {
      // Clicked date earlier than start date: reset start date
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

  // Helper to render grid for a specific month
  const renderMonthGrid = (year, monthIdx) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, monthIdx, 1).getDay(); // 0 = Sunday

    const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const minDateLimit = new Date(2026, 8, 1); // Sep 1, 2026

    return (
      <div className="space-y-4">
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
            <div key={`blank-${b}`} className="h-10 w-10"></div>
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

            let cellStyle = "hover:bg-gray-200 text-gray-900";
            if (isPast) {
              cellStyle = "text-gray-300 line-through cursor-not-allowed";
            } else if (isStart || isEnd) {
              cellStyle = "bg-[#FF385C] text-white font-bold shadow-md scale-105";
            } else if (isInRange) {
              cellStyle = "bg-rose-100 text-[#FF385C] font-semibold";
            }

            return (
              <button
                key={day}
                disabled={isPast}
                onClick={() => handleDateGridClick(year, monthIdx, day)}
                className={`h-10 w-10 mx-auto rounded-full flex items-center justify-center transition-all ${cellStyle}`}
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
    <div className="border-b pb-10 space-y-6">
      
      {/* Heading & Clear Dates Button */}
      <div className="flex justify-between items-end flex-wrap gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            {nightsCount} {nightsCount === 1 ? 'night' : 'nights'} in {locationName}
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            {startDate && endDate
              ? `${formatDateDisplay(startDate)} – ${formatDateDisplay(endDate)}`
              : 'Select check-in and check-out dates on the calendar'}
          </p>
        </div>

        {(startDate || endDate) && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 underline hover:text-black transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear dates
          </button>
        )}
      </div>

      {/* Calendar Card Container */}
      <div className="border rounded-3xl p-6 md:p-8 bg-gray-50/50 shadow-xs space-y-6">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition shadow-xs"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <span className="text-sm font-semibold text-gray-500">
            Select your stay dates
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition shadow-xs"
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* 2-Month Side-by-Side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl border border-gray-200">
          {renderMonthGrid(calendarYear, calendarMonth)}
          {renderMonthGrid(
            calendarMonth === 11 ? calendarYear + 1 : calendarYear,
            calendarMonth === 11 ? 0 : calendarMonth + 1
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#FF385C]" />
            <span className="font-semibold text-gray-700">
              {startDate ? `Check-in: ${formatDateDisplay(startDate)}` : 'Select check-in'}
              {endDate ? `  |  Checkout: ${formatDateDisplay(endDate)}` : ''}
            </span>
          </div>
          <span className="font-extrabold text-[#FF385C] text-base">
            {nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'}
          </span>
        </div>

      </div>

    </div>
  );
}

export default Calendar;
