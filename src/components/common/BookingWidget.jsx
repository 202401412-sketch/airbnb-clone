import React, { useState } from 'react';

const BookingWidget = ({ price = 1000 }) => {
  const [nights, setNights] = useState(2);
  const totalBase = price * nights;
  const serviceFee = Math.round(totalBase * 0.14);
  const grandTotal = totalBase + serviceFee;

  return (
    <div className="border border-gray-300 rounded-2xl p-6 shadow-xl bg-white max-w-sm w-full">
      <div className="flex justify-between items-baseline mb-4">
        <span className="text-2xl font-bold">{price} EGP</span>
        <span className="text-gray-500 text-sm">/ night</span>
      </div>

      <div className="border rounded-xl mb-4">
        <div className="p-2 border-b">
          <label className="block text-xs font-bold text-gray-500">NIGHTS</label>
          <input 
            type="number" 
            min="1" 
            value={nights} 
            onChange={(e) => setNights(Number(e.target.value) || 1)} 
            className="w-full font-semibold focus:outline-none"
          />
        </div>
      </div>

      <button className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition mb-4">
        Reserve
      </button>

      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>{price} EGP x {nights} nights</span>
          <span>{totalBase} EGP</span>
        </div>
        <div className="flex justify-between">
          <span>Airbnb service fee</span>
          <span>{serviceFee} EGP</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-black text-base">
          <span>Total before taxes</span>
          <span>{grandTotal} EGP</span>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;