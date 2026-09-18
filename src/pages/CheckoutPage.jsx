import React, { useState } from 'react';
import { 
  ArrowLeft, Star, ShieldCheck, Check, CreditCard, Lock, 
  Calendar as CalendarIcon, Users, CheckCircle2, AlertCircle, ChevronRight
} from 'lucide-react';
import { FaAirbnb, FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';
import { useUserSaved } from '../context/UserSavedContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import Footer from '../components/Footer.jsx';

const CheckoutPage = ({
  property: propProperty,
  bookingDetails,
  checkoutData,
  onBack,
  onNavigate,
  onOpenAuth
}) => {
  const { user } = useAuth();
  const { addBooking } = useUserSaved();
  const { formatPrice, dir } = useLanguage();

  // Unified property and details data lookup
  const details = bookingDetails || checkoutData || {};
  const property = propProperty || details.property || checkoutData?.property || checkoutData || {};

  const nights = details?.totalNights || details?.nightsCount || 2;
  const basePrice = property?.pricePerNight || property?.price || 4778;
  const totalBase = basePrice * nights;
  const cleaningFee = 450;
  const serviceFee = Math.round(totalBase * 0.14);
  const grandTotal = details?.totalPrice || (totalBase + cleaningFee + serviceFee);
  const totalPrice = grandTotal;

  const startDate = details.startDate || details.checkIn || '2026-10-02';
  const endDate = details.endDate || details.checkOut || '2026-10-04';
  const guestCount = details.guestCount || (typeof details.guests === 'object' ? ((details.guests.adults || 1) + (details.guests.children || 0)) : Number(details.guests)) || 1;

  const title = property?.title || 'The Cozy Corner 4';
  const location = property?.location || 'San Stefano, Alexandria, Egypt';
  const rating = property?.rating || 4.88;
  const isSuperhost = property?.host?.isSuperhost ?? true;

  const image = (property?.images && property.images.length > 0) 
    ? property.images[0] 
    : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600';

  // Step state: 1 = Auth / Pay Option, 2 = Payment Method, 3 = Review Reservation
  const [activeStep, setActiveStep] = useState(1);
  const [payOption, setPayOption] = useState('full');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Card Inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(user?.name || '');
  const [cardError, setCardError] = useState('');

  // Editing UI Toggle State
  const [isEditingDates, setIsEditingDates] = useState(false);
  const [isEditingGuests, setIsEditingGuests] = useState(false);

  // Booking Confirmation State
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const formatDateLabel = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleStep2Next = () => {
    setCardError('');
    if (paymentMethod === 'card') {
      const cleanNum = cardNumber.replace(/\D/g, '');
      if (cleanNum.length < 12) {
        setCardError('Please enter a valid card number (12–16 digits).');
        return;
      }
      if (!cardExp.trim()) {
        setCardError('Please enter expiration date (MM/YY).');
        return;
      }
      if (!cardCvv.trim()) {
        setCardError('Please enter CVV code.');
        return;
      }
    }
    setActiveStep(3);
  };

  const handleConfirmAndPay = () => {
    const randomRef = 'AB-' + Math.floor(100000 + Math.random() * 900000);
    const bookingObj = {
      id: randomRef,
      userId: user?.id || 'usr_guest',
      userName: user?.name || cardName || 'Guest User',
      propertyId: property?.id || title,
      propertyTitle: title,
      propertyImage: image,
      location: location,
      checkIn: startDate,
      checkOut: endDate,
      nightsCount: nights,
      totalPrice: totalPrice,
      guestsCount: guestCount,
      paymentMethod: paymentMethod === 'card' ? 'Credit / Debit Card' : 'PayPal',
      createdAt: new Date().toISOString()
    };

    if (addBooking) {
      addBooking(bookingObj, user?.id);
    }
    setBookingRef(randomRef);
    setIsConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackNavigation = () => {
    if (onBack) {
      onBack();
    } else if (onNavigate) {
      onNavigate('home');
    }
  };

  // If Booking is Confirmed
  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between" dir={dir}>
        <header className="border-b border-gray-200 py-4 px-6 md:px-12 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleBackNavigation}>
            <FaAirbnb className="text-3xl text-[#FF385C]" />
            <span className="font-black text-xl tracking-tight text-gray-900">airbnb</span>
          </div>
          <button 
            onClick={handleBackNavigation} 
            className="text-xs font-bold text-gray-700 hover:underline cursor-pointer"
          >
            Back to Home
          </button>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white max-w-lg w-full rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
                Reservation Confirmed
              </span>
              <h2 className="text-2xl font-black text-gray-900 pt-1">You're booked for {location.split(',')[0]}! 🎉</h2>
              <p className="text-xs text-gray-500">Confirmation Code: <span className="font-bold text-black">{bookingRef}</span></p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Property:</span>
                <span className="font-bold text-gray-900 truncate max-w-[220px]">{title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dates:</span>
                <span className="font-semibold text-gray-900">{formatDateLabel(startDate)} – {formatDateLabel(endDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guests:</span>
                <span className="font-semibold text-gray-900">{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-bold text-sm">
                <span>Total Paid:</span>
                <span className="text-[#FF385C]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleBackNavigation}
                className="w-full py-3.5 bg-[#FF385C] hover:bg-[#E00B41] text-white rounded-xl font-bold text-sm transition shadow-md cursor-pointer"
              >
                Explore More Stays
              </button>
            </div>
          </div>
        </main>

        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col justify-between" dir={dir}>
      {/* Top Header Bar */}
      <header className="border-b border-gray-200 py-4 px-6 md:px-12 sticky top-0 bg-white z-30 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={handleBackNavigation}
            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-800 border border-gray-200 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-bold">Back</span>
          </button>
          <div className="text-[#FF385C] flex items-center gap-1 cursor-pointer" onClick={handleBackNavigation}>
            <FaAirbnb className="text-3xl" />
            <span className="font-black text-xl tracking-tight hidden md:inline text-gray-900">airbnb</span>
          </div>
        </div>

        <h1 className="font-bold text-lg md:text-xl text-gray-900">Confirm and pay</h1>
        <div className="w-16"></div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 w-full flex-1">
        
        {/* LEFT COLUMN: Accordion Steps */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* STEP 1: Log in or sign up */}
          <div className={`border rounded-2xl p-6 transition-all ${
            activeStep === 1 ? 'border-black bg-white shadow-md' : 'border-gray-200 bg-gray-50/50'
          }`}>
            {!user ? (
              /* IF USER IS NOT LOGGED IN */
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <h2 className="font-bold text-lg text-gray-900">1. Log in or sign up</h2>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <p className="text-xs text-gray-600">
                    Log in or sign up to finalize your reservation with Airbnb safety guarantees.
                  </p>

                  <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-black">
                    <input 
                      type="text" 
                      placeholder="Phone number or email"
                      className="w-full px-4 py-3 text-xs outline-none bg-white font-medium"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={onOpenAuth}
                    className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* IF USER IS LOGGED IN */
              <div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setActiveStep(1)}>
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      activeStep > 1 ? 'bg-emerald-600 text-white' : 'bg-black text-white'
                    }`}>
                      {activeStep > 1 ? <Check className="w-4 h-4" /> : '1'}
                    </span>
                    <div>
                      <h2 className="font-bold text-lg text-gray-900">1. Choose when to pay</h2>
                      <p className="text-xs text-gray-500 font-medium">Logged in as {user.name || user.email}</p>
                    </div>
                  </div>
                  {activeStep > 1 && (
                    <button className="text-xs font-bold text-black underline cursor-pointer">Edit</button>
                  )}
                </div>

                {activeStep === 1 && (
                  <div className="mt-5 space-y-3 pt-4 border-t">
                    <label 
                      onClick={() => setPayOption('full')}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                        payOption === 'full' ? 'border-black bg-rose-50/30' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payOption" 
                        checked={payOption === 'full'} 
                        onChange={() => setPayOption('full')}
                        className="mt-1 accent-black" 
                      />
                      <div>
                        <div className="font-bold text-sm text-gray-900">Pay {formatPrice(totalPrice)} now</div>
                        <div className="text-xs text-gray-500 mt-0.5">Pay the total amount today to finalize your booking instantly.</div>
                      </div>
                    </label>

                    <label 
                      onClick={() => setPayOption('part')}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                        payOption === 'part' ? 'border-black bg-rose-50/30' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payOption" 
                        checked={payOption === 'part'} 
                        onChange={() => setPayOption('part')}
                        className="mt-1 accent-black" 
                      />
                      <div>
                        <div className="font-bold text-sm text-gray-900">Pay {formatPrice(Math.round(totalPrice / 2))} now, pay rest later</div>
                        <div className="text-xs text-gray-500 mt-0.5">Pay half now and the remaining balance automatically on check-in date.</div>
                      </div>
                    </label>

                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="mt-4 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                    >
                      Next: Payment Method →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* STEP 2: Add a payment method */}
          <div className={`border rounded-2xl p-6 transition-all ${
            activeStep === 2 ? 'border-black bg-white shadow-md' : 'border-gray-200 bg-gray-50/50'
          }`}>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setActiveStep(2)}>
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  activeStep > 2 ? 'bg-emerald-600 text-white' : activeStep === 2 ? 'bg-black text-white' : 'bg-gray-300 text-gray-700'
                }`}>
                  {activeStep > 2 ? <Check className="w-4 h-4" /> : '2'}
                </span>
                <h2 className="font-bold text-lg text-gray-900">2. Add a payment method</h2>
              </div>
              {activeStep > 2 && (
                <button className="text-xs font-bold text-black underline cursor-pointer">Edit</button>
              )}
            </div>

            {activeStep === 2 && (
              <div className="mt-5 space-y-4 pt-4 border-t">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer ${
                      paymentMethod === 'card' ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-700 hover:border-black'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit or Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer ${
                      paymentMethod === 'paypal' ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-700 hover:border-black'
                    }`}
                  >
                    <FaPaypal className="w-4 h-4 text-sky-400" />
                    <span>PayPal</span>
                  </button>
                </div>

                {cardError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{cardError}</span>
                  </div>
                )}

                {paymentMethod === 'card' ? (
                  <div className="space-y-3 bg-gray-50/60 p-4 rounded-2xl border border-gray-200">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Card Number *</label>
                      <div className="relative">
                        <input 
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="1234 5678 9101 1121"
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-black"
                        />
                        <div className="absolute right-3 top-2.5 flex items-center gap-1.5 text-gray-400">
                          <FaCcVisa className="w-5 h-5 text-blue-800" />
                          <FaCcMastercard className="w-5 h-5 text-orange-600" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Expiration Date *</label>
                        <input 
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">CVV Code *</label>
                        <input 
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Cardholder Name *</label>
                      <input 
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name on card"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-5 bg-sky-50/60 border border-sky-200 rounded-2xl text-center space-y-2">
                    <FaPaypal className="w-8 h-8 text-sky-600 mx-auto" />
                    <p className="text-xs text-gray-700 font-semibold">You will be redirected to PayPal to complete your payment securely.</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleStep2Next}
                  className="mt-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  Next: Review & Confirm →
                </button>
              </div>
            )}
          </div>

          {/* STEP 3: Review reservation */}
          <div className={`border rounded-2xl p-6 transition-all ${
            activeStep === 3 ? 'border-black bg-white shadow-md' : 'border-gray-200 bg-gray-50/50'
          }`}>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveStep(3)}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStep === 3 ? 'bg-black text-white' : 'bg-gray-300 text-gray-700'
              }`}>
                3
              </span>
              <h2 className="font-bold text-lg text-gray-900">3. Review your reservation</h2>
            </div>

            {activeStep === 3 && (
              <div className="mt-5 space-y-5 pt-4 border-t text-xs text-gray-600 leading-relaxed">
                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-1 text-gray-800">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5 text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Free cancellation before {formatDateLabel(startDate)}</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Cancel before check-in for a full refund. AirCover protects every booking.
                    <button onClick={() => onNavigate && onNavigate('cancellation')} className="underline font-bold ml-1 text-emerald-900 cursor-pointer">Full policy</button>
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Ground Rules & Policies</h4>
                  <p className="text-gray-500 text-[11px]">
                    By selecting the button below, I agree to the Host's House Rules, Ground rules for guests, and Airbnb's Rebooking and Refund Policy.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmAndPay}
                  className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-4 rounded-2xl font-black text-base transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Confirm and Pay · {formatPrice(totalPrice)}</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky Property Summary Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 border border-gray-200 rounded-3xl p-6 bg-white shadow-xl space-y-5">
            
            {/* Property Summary Header */}
            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <img src={image} alt={title} className="w-24 h-24 rounded-2xl object-cover border border-gray-200 shrink-0" />
              <div className="space-y-1.5">
                <span className="bg-rose-100 text-[#FF385C] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block">
                  {isSuperhost ? 'Superhost' : 'Guest Favorite'}
                </span>
                <h3 className="font-bold text-sm text-gray-900 line-clamp-2">{title}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Star className="w-3.5 h-3.5 fill-black text-black" />
                  <span className="font-bold text-gray-900">{rating}</span>
                  <span>(74 reviews)</span>
                </div>
              </div>
            </div>

            {/* Cancellation Policy Box */}
            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1">
              <div className="font-bold text-gray-900 flex items-center justify-between">
                <span>Free cancellation</span>
                <button 
                  onClick={() => onNavigate && onNavigate('cancellation')}
                  className="text-[11px] font-bold text-black underline hover:text-[#FF385C] cursor-pointer"
                >
                  Full policy
                </button>
              </div>
              <p className="text-[11px] text-gray-500">Cancel before {formatDateLabel(startDate)} for a full refund.</p>
            </div>

            {/* Trip Details Summary */}
            <div className="space-y-3 text-xs border-b border-gray-200 pb-4">
              <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Your Trip</h4>
              
              {/* Dates Row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-700">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <span>Dates:</span>
                  <span className="font-bold text-gray-900">{formatDateLabel(startDate)} – {formatDateLabel(endDate)}</span>
                </div>
                <button 
                  onClick={() => setIsEditingDates(!isEditingDates)}
                  className="text-xs font-bold text-black underline hover:text-[#FF385C] cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* Guests Row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>Guests:</span>
                  <span className="font-bold text-gray-900">{guestCount} {guestCount === 1 ? 'adult' : 'guests'}</span>
                </div>
                <button 
                  onClick={() => setIsEditingGuests(!isEditingGuests)}
                  className="text-xs font-bold text-black underline hover:text-[#FF385C] cursor-pointer"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Price Details Breakdown */}
            <div className="space-y-2.5 text-xs text-gray-700">
              <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-2">Price details</h4>
              <div className="flex justify-between">
                <span>{formatPrice(basePrice)} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
                <span className="font-semibold text-gray-900">{formatPrice(totalBase)}</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span className="font-semibold text-gray-900">{formatPrice(cleaningFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Airbnb service fee</span>
                <span className="font-semibold text-gray-900">{formatPrice(serviceFee)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200 text-sm font-black text-gray-900">
                <span>Total (EGP)</span>
                <span className="text-[#FF385C]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default CheckoutPage;