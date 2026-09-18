import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { Star } from 'lucide-react';

const BookingWidget = ({ 
  price = 4778, 
  onReserve, 
  onNavigate, 
  property 
}) => {
  const { formatPrice } = useLanguage();
  const [nights, setNights] = useState(2);
  const [startDate, setStartDate] = useState('2026-10-02');
  const [endDate, setEndDate] = useState('2026-10-04');
  const [guests, setGuests] = useState(1);

  const pricePerNight = property?.pricePerNight || property?.price || price || 4778;
  const totalBase = pricePerNight * nights;
  const cleaningFee = 450;
  const serviceFee = Math.round(totalBase * 0.14);
  const grandTotal = totalBase + cleaningFee + serviceFee;

  // Auto-update end date when start date or nights change
  useEffect(() => {
    if (startDate) {
      const start = new Date(startDate);
      if (!isNaN(start.getTime())) {
        const calculatedEnd = new Date(start);
        calculatedEnd.setDate(calculatedEnd.getDate() + nights);
        setEndDate(calculatedEnd.toISOString().split('T')[0]);
      }
    }
  }, [startDate, nights]);

  const handleReserve = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const bookingData = {
      startDate,
      endDate,
      totalNights: nights,
      nightsCount: nights,
      totalPrice: grandTotal,
      guestCount: guests,
      guests: guests,
      property
    };

    if (onReserve) {
      onReserve(bookingData);
    } else if (onNavigate) {
      onNavigate('checkout', { ...bookingData, property });
    }
  };

  return (
    <div className="border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl sticky top-28 bg-white space-y-6 max-w-sm w-full">
      <div className="flex justify-between items-baseline border-b pb-5">
        <div>
          <span className="text-3xl font-extrabold text-gray-900">
            {formatPrice ? formatPrice(pricePerNight) : `${pricePerNight.toLocaleString()} EGP`}
          </span>
          <span className="text-gray-500 text-base font-normal"> / night</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
          <Star className="w-4 h-4 fill-black text-black" />
          <span>{property?.rating || 4.88}</span>
        </div>
      </div>

      {/* Date & Guest Controls */}
      <div className="border border-gray-300 rounded-2xl overflow-hidden divide-y divide-gray-300 bg-white shadow-xs">
        <div className="grid grid-cols-2 divide-x divide-gray-300">
          <div className="p-2.5">
            <label className="block text-[9px] font-black text-gray-700 uppercase tracking-wider">Check-in</label>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full font-bold focus:outline-none text-xs text-gray-900 bg-transparent cursor-pointer"
            />
          </div>
          <div className="p-2.5">
            <label className="block text-[9px] font-black text-gray-700 uppercase tracking-wider">Nights</label>
            <input 
              type="number" 
              min="1" 
              max="30"
              value={nights} 
              onChange={(e) => setNights(Math.max(1, Number(e.target.value) || 1))} 
              className="w-full font-bold focus:outline-none text-xs text-gray-900 bg-transparent"
            />
          </div>
        </div>

        <div className="p-2.5">
          <label className="block text-[9px] font-black text-gray-700 uppercase tracking-wider">Guests</label>
          <select 
            value={guests} 
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full font-bold focus:outline-none text-xs text-gray-900 bg-transparent cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button 
        type="button"
        onClick={handleReserve}
        className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-4 rounded-2xl font-bold text-lg transition shadow-md cursor-pointer"
      >
        Reserve
      </button>

      <p className="text-center text-xs text-gray-500 font-medium">
        You won't be charged yet
      </p>

      {/* Price breakdown */}
      <div className="space-y-3.5 border-t pt-5 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>{formatPrice ? formatPrice(pricePerNight) : `${pricePerNight.toLocaleString()} EGP`} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
          <span className="font-medium">{formatPrice ? formatPrice(totalBase) : `${totalBase.toLocaleString()} EGP`}</span>
        </div>
        <div className="flex justify-between">
          <span>Cleaning fee</span>
          <span className="font-medium">{formatPrice ? formatPrice(cleaningFee) : `${cleaningFee.toLocaleString()} EGP`}</span>
        </div>
        <div className="flex justify-between">
          <span>Airbnb service fee (14%)</span>
          <span className="font-medium">{formatPrice ? formatPrice(serviceFee) : `${serviceFee.toLocaleString()} EGP`}</span>
        </div>
        <div className="flex justify-between text-base font-extrabold text-gray-900 pt-3 border-t">
          <span>Total before taxes</span>
          <span className="text-[#FF385C]">{formatPrice ? formatPrice(grandTotal) : `${grandTotal.toLocaleString()} EGP`}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;