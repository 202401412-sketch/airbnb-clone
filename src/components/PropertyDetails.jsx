import React, { useState } from 'react';
import { FiStar, FiShare, FiHeart, FiX, FiCheck } from 'react-icons/fi';
import { FaAirbnb } from 'react-icons/fa';

const PropertyDetails = ({ property, onClose }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  if (!property) return null;

  const pricePerNight = property.pricePerNight || property.price || 3000;
  const nights = property.nights || 2;
  const baseTotal = pricePerNight * nights;
  const cleaningFee = Math.round(baseTotal * 0.08);
  const serviceFee = Math.round(baseTotal * 0.12);
  const grandTotal = baseTotal + cleaningFee + serviceFee;

  const mainImage = property.images && property.images.length > 0 ? property.images[0] : property.image;
  const secondaryImages = property.images && property.images.length > 1 
    ? property.images.slice(1, 5) 
    : [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500'
      ];

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto" dir="ltr">
      
      {/* Top Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 px-8 py-4 flex items-center justify-between">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition text-gray-700"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-semibold underline">
            <FiShare className="w-4 h-4" /> Share
          </button>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-semibold underline"
          >
            <FiHeart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          {property.title || property.location || 'Apartment in Cairo'}
        </h1>
        
        <div className="flex items-center gap-2 text-sm text-gray-700 pb-6 font-medium">
          <span className="flex items-center gap-1 font-semibold">
            <FiStar className="fill-black text-black w-4 h-4" /> 
            {property.rating ? property.rating.toFixed(2) : '5.0'}
          </span>
          <span>·</span>
          <span className="underline cursor-pointer">Cairo, Egypt</span>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden mb-10 max-h-[450px]">
          <div className="md:col-span-2 h-[450px]">
            <img src={mainImage} alt="Main" className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer" />
          </div>
          <div className="hidden md:grid grid-cols-1 gap-2 h-[450px]">
            <img src={secondaryImages[0]} alt="2" className="w-full h-[221px] object-cover hover:opacity-95 transition cursor-pointer" />
            <img src={secondaryImages[1] || secondaryImages[0]} alt="3" className="w-full h-[221px] object-cover hover:opacity-95 transition cursor-pointer" />
          </div>
          <div className="hidden md:grid grid-cols-1 gap-2 h-[450px]">
            <img src={secondaryImages[2] || secondaryImages[0]} alt="4" className="w-full h-[221px] object-cover hover:opacity-95 transition cursor-pointer" />
            <img src={secondaryImages[3] || secondaryImages[0]} alt="5" className="w-full h-[221px] object-cover hover:opacity-95 transition cursor-pointer" />
          </div>
        </div>

        {/* Details & Reservation Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div className="pb-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Entire place hosted by Host</h2>
              <p className="text-sm text-gray-500 mt-1">4 guests · 2 bedrooms · 2 beds · 1 bath</p>
            </div>

            <div className="space-y-6 pb-6 border-b border-gray-200">
              <div className="flex items-start gap-4">
                <FaAirbnb className="w-6 h-6 text-[#FF385C] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Self check-in</h3>
                  <p className="text-sm text-gray-500">Check yourself in with the keypad.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FiCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Great location</h3>
                  <p className="text-sm text-gray-500">100% of recent guests gave the location a 5-star rating.</p>
                </div>
              </div>
            </div>

            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About this space</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Enjoy a stylish experience at this centrally-located place. Close to main attractions, restaurants, and shopping spots.
              </p>
            </div>
          </div>

          {/* Booking Box */}
          <div className="relative">
            <div className="sticky top-28 bg-white border border-gray-300 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900">EGP {pricePerNight.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <FiStar className="fill-black text-black w-3.5 h-3.5" />
                  <span>{property.rating ? property.rating.toFixed(2) : '5.0'}</span>
                </div>
              </div>

              <div className="border border-gray-400 rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 border-b border-gray-400">
                  <div className="p-3 border-r border-gray-400">
                    <label className="block text-[10px] font-bold uppercase">CHECK-IN</label>
                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-xs bg-transparent outline-none cursor-pointer" />
                  </div>
                  <div className="p-3">
                    <label className="block text-[10px] font-bold uppercase">CHECKOUT</label>
                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full text-xs bg-transparent outline-none cursor-pointer" />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-[10px] font-bold uppercase">GUESTS</label>
                  <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full text-xs bg-transparent outline-none cursor-pointer font-medium">
                    <option value={1}>1 guest</option>
                    <option value={2}>2 guests</option>
                    <option value={3}>3 guests</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white font-bold py-3.5 rounded-xl transition shadow-md">
                Reserve
              </button>

              <div className="space-y-3 pt-2 text-sm text-gray-700">
                <div className="flex justify-between underline">
                  <span>EGP {pricePerNight.toLocaleString()} x {nights} nights</span>
                  <span>EGP {baseTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between underline">
                  <span>Cleaning fee</span>
                  <span>EGP {cleaningFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between underline">
                  <span>Service fee</span>
                  <span>EGP {serviceFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-base text-gray-900">
                <span>Total before taxes</span>
                <span>EGP {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;