import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockProperties } from '../data/mockData';
import Calendar from '../components/Calendar';
import Footer from '../components/Footer';

import {
  Heart,
  Share,
  Star,
  Award,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  X,
  Sparkles,
  MapPin,
  Wifi,
  Tv,
  Car,
  Wind,
  ShieldCheck,
  Check,
  Calendar as CalendarIcon,
  Users,
  Utensils,
  Waves,
  Coffee,
  Building,
  Info,
  CheckCircle2,
  RotateCcw,
  MessageCircle,
  Clock,
  Globe,
  AlertCircle,
  FileText,
  ShieldAlert,
  Key
} from 'lucide-react';

function PropertyDetails() {
  const { id } = useParams();

  // 1. PROPERTY DATA LOOKUP WITH SAFE FALLBACKS
  const propertyData =
    mockProperties.find((item) => String(item.id) === String(id)) || mockProperties[0];

  const defaultImages = [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800"
  ];

  // Fill up to at least 5 images if needed
  const propertyImages = propertyData.images || [];
  const images =
    propertyImages.length >= 5
      ? propertyImages
      : [...propertyImages, ...defaultImages.slice(propertyImages.length)];

  // 2. STATES
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showSubNavbar, setShowSubNavbar] = useState(false);

  // Date Selection State (YYYY-MM-DD format, synced with Calendar Component)
  const defaultCheckIn = '2026-09-10'; // Sep 10, 2026
  const defaultCheckOut = '2026-09-15'; // Sep 15, 2026

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);

  // Guest Menu State
  const [showGuestMenu, setShowGuestMenu] = useState(false);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    infants: 0
  });

  // Modal & Checkout Flow States
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  // Host Message Modal State
  const [showMessageHostModal, setShowMessageHostModal] = useState(false);
  const [hostMessageSent, setHostMessageSent] = useState(false);
  const [hostMessageText, setHostMessageText] = useState('');

  // Scroll listener for Sticky Sub-Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setShowSubNavbar(true);
      } else {
        setShowSubNavbar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. DYNAMIC CALCULATIONS
  const pricePerNight = propertyData.pricePerNight || 4778;
  const maxGuests = propertyData.specs?.guests || 6;

  // Calculate Nights count dynamically
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nightsCount = calculateNights();

  // Price Breakdown (Base Price, 14% Service Fee, Total Price)
  const basePrice = pricePerNight * nightsCount;
  const serviceFee = Math.round(basePrice * 0.14);
  const totalPrice = basePrice + serviceFee;

  const totalGuestCount = guests.adults + guests.children;

  // 4. HANDLERS
  const handleCalendarDateChange = ({ startDate, endDate }) => {
    setCheckIn(startDate);
    setCheckOut(endDate);
  };

  const handleGuestChange = (type, delta) => {
    setGuests((prev) => {
      const current = prev[type];
      const nextVal = Math.max(0, current + delta);

      if (type === 'adults') {
        const newAdults = Math.max(1, nextVal);
        if (newAdults + prev.children > maxGuests) return prev;
        return { ...prev, adults: newAdults };
      }

      if (type === 'children') {
        if (prev.adults + nextVal > maxGuests) return prev;
        return { ...prev, children: nextVal };
      }

      if (type === 'infants') {
        return { ...prev, infants: Math.min(5, nextVal) };
      }

      return prev;
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleCheckInChange = (e) => {
    const val = e.target.value;
    setCheckIn(val);
    if (val && checkOut && new Date(val) >= new Date(checkOut)) {
      const nextDay = new Date(val);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  };

  const handleCheckOutChange = (e) => {
    const val = e.target.value;
    if (checkIn && new Date(val) <= new Date(checkIn)) {
      alert("Checkout date must be after check-in date.");
      return;
    }
    setCheckOut(val);
  };

  const handleOpenReserveModal = () => {
    setShowReserveModal(true);
    setBookingConfirmed(false);
  };

  const handleConfirmBooking = () => {
    const randomRef = 'AB-' + Math.floor(100000 + Math.random() * 900000);
    setBookingReference(randomRef);
    setBookingConfirmed(true);
  };

  const handleSendMessageToHost = (e) => {
    e.preventDefault();
    if (!hostMessageText.trim()) return;
    setHostMessageSent(true);
    setTimeout(() => {
      setShowMessageHostModal(false);
      setHostMessageSent(false);
      setHostMessageText('');
    }, 2000);
  };

  const scrollToSection = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Amenities list with icons
  const amenitiesList = [
    { name: "Sea View", icon: Waves, offered: propertyData.amenities?.includes("Sea View") },
    { name: "High-Speed WiFi", icon: Wifi, offered: true },
    { name: "Central Air Conditioning", icon: Wind, offered: true },
    { name: "HDTV with Netflix", icon: Tv, offered: true },
    { name: "Free Driveway Parking", icon: Car, offered: true },
    { name: "Fully Equipped Kitchen", icon: Utensils, offered: true },
    { name: "Breakfast Bar", icon: Coffee, offered: true },
    { name: "Elevator in Building", icon: Building, offered: true },
    { name: "24/7 Building Security", icon: ShieldCheck, offered: true },
    { name: "Dedicated Workspace", icon: Sparkles, offered: true },
  ];

  // Rating Categories Breakdown
  const ratingCategories = [
    { name: "Cleanliness", score: 4.9, percentage: "98%" },
    { name: "Accuracy", score: 4.9, percentage: "98%" },
    { name: "Communication", score: 5.0, percentage: "100%" },
    { name: "Location", score: 4.9, percentage: "98%" },
    { name: "Value", score: 4.8, percentage: "96%" }
  ];

  // Mock User Reviews
  const reviewsList = [
    {
      id: 1,
      name: "Omar Khaled",
      date: "August 2026",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      text: "Outstanding stay! Clean, spacious, and the view over the Mediterranean Sea was unbelievable. Farida was extremely helpful and responsive throughout our visit."
    },
    {
      id: 2,
      name: "Maryam Ali",
      date: "July 2026",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 5,
      text: "Great interior design and very smooth self check-in process. The location in San Stefano is unbeatable with fast access to all cafes and malls."
    },
    {
      id: 3,
      name: "Ahmed Mostafa",
      date: "June 2026",
      avatar: "https://i.pravatar.cc/150?img=68",
      rating: 5,
      text: "Will definitely book this place again. Quiet environment, super comfortable beds, and excellent amenities provided by the host."
    },
    {
      id: 4,
      name: "Nourhan Hassan",
      date: "May 2026",
      avatar: "https://i.pravatar.cc/150?img=49",
      rating: 5,
      text: "Superb spot in San Stefano! Prime location and close to all main city points. Highly recommended for families and business trips."
    }
  ];

  // Helper date format display
  const formatDateDisplay = (dateString) => {
    if (!dateString) return 'Select date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // ALL PHOTOS FULLSCREEN MODAL
  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-y-auto p-6 md:p-12">
        <div className="flex justify-between items-center max-w-6xl mx-auto mb-8 sticky top-0 bg-black/90 py-4 z-10 backdrop-blur-md">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="text-white bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition flex items-center gap-2 font-medium"
          >
            <X className="w-6 h-6" /> Close photos
          </button>
          <span className="text-white font-medium text-lg">
            {images.length} Photos available
          </span>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-white text-3xl font-bold mb-6">{propertyData.title}</h2>
          {images.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl bg-gray-900">
              <img
                src={img}
                alt={`Property photo ${idx + 1}`}
                className="w-full object-cover max-h-[750px]"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen relative" dir="ltr">

      {/* STICKY SUB-NAVBAR ON SCROLL */}
      {showSubNavbar && (
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3.5 px-4 md:px-8 transition-all animate-in fade-in duration-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* Anchor Links */}
            <div className="flex items-center gap-6 text-sm font-semibold text-gray-700">
              <button
                onClick={() => scrollToSection('photos')}
                className="hover:text-black hover:border-b-2 hover:border-black pb-1 transition"
              >
                Photos
              </button>
              <button
                onClick={() => scrollToSection('overview')}
                className="hover:text-black hover:border-b-2 hover:border-black pb-1 transition"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection('amenities')}
                className="hover:text-black hover:border-b-2 hover:border-black pb-1 transition"
              >
                Amenities
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="hover:text-black hover:border-b-2 hover:border-black pb-1 transition"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('location')}
                className="hover:text-black hover:border-b-2 hover:border-black pb-1 transition"
              >
                Location
              </button>
            </div>

            {/* Price & Reserve Button */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <span className="font-extrabold text-base text-gray-900">
                  {pricePerNight.toLocaleString()} EGP
                </span>
                <span className="text-gray-500 text-xs"> / night</span>
                <div className="flex items-center justify-end gap-1 text-xs font-bold text-gray-700">
                  <Star className="w-3.5 h-3.5 fill-black text-black" />
                  <span>{propertyData.rating || 4.88} ({propertyData.reviewsCount || 74})</span>
                </div>
              </div>

              <button
                onClick={handleOpenReserveModal}
                className="bg-[#FF385C] hover:bg-[#E00B41] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-md"
              >
                Reserve
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AMENITIES MODAL */}
      {showAllAmenities && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 max-h-[85vh] overflow-y-auto relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAllAmenities(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What this place offers</h2>
            <div className="space-y-4">
              {amenitiesList.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4 text-lg">
                      <IconComponent className="w-6 h-6 text-gray-700" />
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    {item.offered && (
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Included
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MESSAGE HOST MODAL */}
      {showMessageHostModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowMessageHostModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            {!hostMessageSent ? (
              <form onSubmit={handleSendMessageToHost} className="space-y-4">
                <div className="flex items-center gap-3 border-b pb-4">
                  <img
                    src={propertyData.host?.avatar || "https://i.pravatar.cc/150?img=47"}
                    alt={propertyData.host?.name || "Host"}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Message {propertyData.host?.name || "Farida"}
                    </h3>
                    <p className="text-xs text-gray-500">Superhost · Typically responds in 1 hour</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Your message
                  </label>
                  <textarea
                    rows={4}
                    value={hostMessageText}
                    onChange={(e) => setHostMessageText(e.target.value)}
                    placeholder="Hi! I have a quick question about check-in timing and amenities..."
                    className="w-full border border-gray-300 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-black outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl font-bold text-base transition shadow-md"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-sm text-gray-600">
                  {propertyData.host?.name || "Farida"} will get back to you shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT CONFIRMATION MODAL OVERLAY */}
      {showReserveModal && (
        <div className="fixed inset-0 bg-black/65 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {!bookingConfirmed ? (
              <>
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Confirm Booking</h2>
                  <button
                    onClick={() => setShowReserveModal(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Property Card Summary */}
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border mb-6">
                  <img
                    src={images[0]}
                    alt={propertyData.title}
                    className="w-24 h-20 object-cover rounded-xl border"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#FF385C] uppercase tracking-wide">
                      {propertyData.type || "Entire place"}
                    </span>
                    <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{propertyData.title}</h3>
                    <p className="text-sm text-gray-500">{propertyData.location}</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-700 mt-1">
                      <Star className="w-4 h-4 fill-black text-black" />
                      <span>{propertyData.rating || 4.88} ({propertyData.reviewsCount || 74} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Booking Details Grid */}
                <div className="space-y-4 border-b pb-6 mb-6">
                  <h4 className="font-bold text-lg text-gray-900">Trip details</h4>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Dates</p>
                      <p className="text-sm text-gray-600">
                        {formatDateDisplay(checkIn)} – {formatDateDisplay(checkOut)} ({nightsCount} {nightsCount === 1 ? 'night' : 'nights'})
                      </p>
                    </div>
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Guests</p>
                      <p className="text-sm text-gray-600">
                        {totalGuestCount} {totalGuestCount === 1 ? 'guest' : 'guests'}
                        {guests.infants > 0 ? `, ${guests.infants} infants` : ''}
                      </p>
                    </div>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-b pb-6 mb-6">
                  <h4 className="font-bold text-lg text-gray-900">Price breakdown</h4>

                  <div className="flex justify-between text-base text-gray-700">
                    <span>{pricePerNight.toLocaleString()} EGP x {nightsCount} {nightsCount === 1 ? 'night' : 'nights'}</span>
                    <span className="font-medium">{basePrice.toLocaleString()} EGP</span>
                  </div>

                  <div className="flex justify-between text-base text-gray-700">
                    <span className="flex items-center gap-1">
                      Airbnb service fee (14%)
                      <Info className="w-4 h-4 text-gray-400" />
                    </span>
                    <span className="font-medium">{serviceFee.toLocaleString()} EGP</span>
                  </div>

                  <div className="flex justify-between text-lg font-extrabold text-gray-900 pt-3 border-t">
                    <span>Total (EGP)</span>
                    <span className="text-[#FF385C]">{totalPrice.toLocaleString()} EGP</span>
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl mb-6 text-xs text-emerald-900">
                  <span className="font-bold block mb-0.5">Free cancellation up to 48 hours before check-in</span>
                  Full refund if you change your mind before check-in date.
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowReserveModal(false)}
                    className="w-1/3 border border-gray-300 py-3.5 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="w-2/3 bg-[#FF385C] hover:bg-[#E00B41] text-white py-3.5 rounded-xl font-bold transition text-base shadow-lg hover:shadow-xl"
                  >
                    Confirm Booking ({totalPrice.toLocaleString()} EGP)
                  </button>
                </div>
              </>
            ) : (
              /* SUCCESS CONFIRMATION STATE */
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900">Booking Confirmed! 🎉</h2>
                  <p className="text-gray-600 mt-2 text-base">
                    You're going to <span className="font-semibold text-gray-900">{propertyData.location}</span>!
                  </p>
                </div>

                <div className="bg-gray-50 border p-6 rounded-2xl text-left space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 font-medium">Booking Reference</span>
                    <span className="font-mono font-bold text-gray-900">{bookingReference}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 font-medium">Property</span>
                    <span className="font-semibold text-gray-900 text-right">{propertyData.title}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 font-medium">Host</span>
                    <span className="font-semibold text-gray-900">{propertyData.host?.name || "Host"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 font-medium">Check-in</span>
                    <span className="font-semibold text-gray-900">{formatDateDisplay(checkIn)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 font-medium">Checkout</span>
                    <span className="font-semibold text-gray-900">{formatDateDisplay(checkOut)}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-base font-extrabold">
                    <span>Total Paid</span>
                    <span className="text-[#FF385C]">{totalPrice.toLocaleString()} EGP</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowReserveModal(false)}
                  className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold text-base hover:bg-black transition shadow-md"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* 1. TITLE & ACTION BUTTONS */}
        <div id="overview" className="mb-6 space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {propertyData.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-800">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-black text-black" />
                <span>{propertyData.rating || 4.88}</span>
              </div>
              <span>·</span>
              <span className="underline cursor-pointer">
                {propertyData.reviewsCount || 74} reviews
              </span>
              {propertyData.isGuestFavorite && (
                <>
                  <span>·</span>
                  <span className="bg-gray-100 text-xs px-2.5 py-0.5 rounded-full font-bold border border-gray-300">
                    Guest favorite
                  </span>
                </>
              )}
              <span>·</span>
              <span className="underline font-medium text-gray-600">
                {propertyData.location || "San Stefano, Alexandria, Egypt"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold relative">
              {copiedShare && (
                <span className="absolute -top-9 right-24 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg animate-in fade-in">
                  Link copied!
                </span>
              )}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-300 transition"
              >
                <Share className="w-4 h-4" /> Share
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-300 transition"
              >
                <Heart
                  className={`w-4 h-4 ${isLiked ? "fill-[#FF385C] text-[#FF385C]" : "text-gray-700"}`}
                />
                {isLiked ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* 2. RESPONSIVE AIRBNB 5-IMAGE GRID */}
        <div id="photos" className="relative rounded-3xl overflow-hidden mb-10 group">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 h-[360px] md:h-[460px]">
            {/* Main Hero Image (Left side - 2 cols on md+) */}
            <div
              className="md:col-span-2 h-full cursor-pointer overflow-hidden relative"
              onClick={() => setShowAllPhotos(true)}
            >
              <img
                src={images[0]}
                alt="Main property view"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* 4 Smaller Grid Images (Right side - 2x2 grid on md+) */}
            <div className="hidden md:grid grid-cols-2 col-span-2 gap-2.5 h-full">
              {images.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden cursor-pointer h-full relative"
                  onClick={() => setShowAllPhotos(true)}
                >
                  <img
                    src={img}
                    alt={`Property view ${idx + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Show All Photos Button */}
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-xs border border-gray-900 px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-lg hover:bg-white transition flex items-center gap-2 text-gray-900"
          >
            <Sparkles className="w-4 h-4" />
            Show all photos ({images.length})
          </button>
        </div>

        {/* MAIN SECTION: LEFT INFO + RIGHT STICKY WIDGET */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* LEFT SIDE CONTENT */}
          <div className="lg:col-span-2 space-y-10">

            {/* Host & Property Capacity Specs */}
            <div className="border-b pb-8 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {propertyData.type || "Entire rental unit"} hosted by {propertyData.host?.name || "Farida"}
                </h2>
                <p className="text-gray-600 text-base mt-1.5 flex flex-wrap items-center gap-2 font-medium">
                  <span>{propertyData.specs?.guests || 4} guests</span>
                  <span>·</span>
                  <span>{propertyData.specs?.bedrooms || 2} bedrooms</span>
                  <span>·</span>
                  <span>{propertyData.specs?.beds || 2} beds</span>
                  <span>·</span>
                  <span>{propertyData.specs?.baths || 1} baths</span>
                </p>
              </div>
              <img
                src={propertyData.host?.avatar || "https://i.pravatar.cc/150?img=47"}
                alt={propertyData.host?.name || "Host"}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-xs shrink-0"
              />
            </div>

            {/* Highlights Section */}
            <div className="border-b pb-8 space-y-6">
              {(propertyData.host?.isSuperhost ?? true) && (
                <div className="flex items-start gap-4">
                  <Award className="w-7 h-7 text-gray-900 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {propertyData.host?.name || "Farida"} is a Superhost
                    </h3>
                    <p className="text-gray-500 text-sm mt-0.5">
                      Superhosts are experienced, highly rated hosts committed to providing great stays for guests.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <MapPin className="w-7 h-7 text-gray-900 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Great location</h3>
                  <p className="text-gray-500 text-sm mt-0.5">
                    100% of recent guests gave the location a 5-star rating.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CalendarIcon className="w-7 h-7 text-gray-900 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Free cancellation for 48 hours</h3>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Get a full refund if you change your plans up to 48h before check-in.
                  </p>
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="border-b pb-8 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">About this space</h3>
              <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                {propertyData.description ||
                  "Enjoy a peaceful stay in this beautifully furnished property located in a prime neighborhood. Features bright living spaces, high-speed WiFi, modern kitchen appliances, and comfortable bedding designed for relaxation."}
              </p>
            </div>

            {/* Amenities Grid */}
            <div id="amenities" className="border-b pb-8 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">What this place offers</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                {amenitiesList.slice(0, 6).map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-gray-800 font-medium">
                      <IconComp className="w-6 h-6 text-gray-700" />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setShowAllAmenities(true)}
                className="mt-2 border border-gray-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition"
              >
                Show all {amenitiesList.length} amenities
              </button>
            </div>

            {/* STANDALONE CALENDAR COMPONENT IMPORT & INTEGRATION */}
            <Calendar
              startDate={checkIn}
              endDate={checkOut}
              onDateChange={handleCalendarDateChange}
              nightsCount={nightsCount}
              locationName={propertyData.location?.split(',')[0] || "San Stefano"}
            />

          </div>

          {/* STICKY BOOKING WIDGET (RIGHT SIDE) */}
          <div className="relative">
            <div className="border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl sticky top-28 bg-white space-y-6">
              
              {/* Header: Price per night & Rating */}
              <div className="flex justify-between items-baseline border-b pb-5">
                <div>
                  <span className="text-3xl font-extrabold text-gray-900">
                    {pricePerNight.toLocaleString()} EGP
                  </span>
                  <span className="text-gray-500 text-base font-normal"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                  <Star className="w-4 h-4 fill-black text-black" />
                  <span>{propertyData.rating || 4.88}</span>
                  <span className="text-gray-400 font-normal">({propertyData.reviewsCount || 74})</span>
                </div>
              </div>

              {/* Check-In / Check-Out & Guest Inputs Box */}
              <div className="border border-gray-400 rounded-2xl overflow-hidden shadow-xs relative">
                {/* Dates Row */}
                <div className="grid grid-cols-2 border-b border-gray-400">
                  <div className="p-3 border-r border-gray-400 bg-gray-50/40">
                    <label className="block font-extrabold text-[10px] text-gray-700 uppercase tracking-wider">
                      CHECK-IN
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={handleCheckInChange}
                      className="w-full bg-transparent text-xs md:text-sm font-semibold text-gray-900 cursor-pointer outline-none"
                    />
                  </div>
                  <div className="p-3 bg-gray-50/40">
                    <label className="block font-extrabold text-[10px] text-gray-700 uppercase tracking-wider">
                      CHECKOUT
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={handleCheckOutChange}
                      className="w-full bg-transparent text-xs md:text-sm font-semibold text-gray-900 cursor-pointer outline-none"
                    />
                  </div>
                </div>

                {/* Guest Selection Trigger */}
                <div
                  className="p-3 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => setShowGuestMenu(!showGuestMenu)}
                >
                  <label className="block font-extrabold text-[10px] text-gray-700 uppercase tracking-wider">
                    GUESTS
                  </label>
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-900 mt-0.5">
                    <span>
                      {totalGuestCount} {totalGuestCount === 1 ? 'guest' : 'guests'}
                      {guests.infants > 0 ? `, ${guests.infants} infants` : ''}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${showGuestMenu ? '-rotate-90' : 'rotate-90'}`}
                    />
                  </div>
                </div>

                {/* Guest Dropdown Menu */}
                {showGuestMenu && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl z-30 space-y-4">
                    {/* Adults */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-sm text-gray-900">Adults</p>
                        <p className="text-xs text-gray-500">Age 13+</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleGuestChange('adults', -1)}
                          disabled={guests.adults <= 1}
                          className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30 hover:bg-gray-100 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-sm w-4 text-center">{guests.adults}</span>
                        <button
                          onClick={() => handleGuestChange('adults', 1)}
                          disabled={totalGuestCount >= maxGuests}
                          className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30 hover:bg-gray-100 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex justify-between items-center border-t pt-3">
                      <div>
                        <p className="font-bold text-sm text-gray-900">Children</p>
                        <p className="text-xs text-gray-500">Ages 2–12</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleGuestChange('children', -1)}
                          disabled={guests.children <= 0}
                          className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30 hover:bg-gray-100 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-sm w-4 text-center">{guests.children}</span>
                        <button
                          onClick={() => handleGuestChange('children', 1)}
                          disabled={totalGuestCount >= maxGuests}
                          className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30 hover:bg-gray-100 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex justify-between items-center border-t pt-3">
                      <div>
                        <p className="font-bold text-sm text-gray-900">Infants</p>
                        <p className="text-xs text-gray-500">Under 2</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleGuestChange('infants', -1)}
                          disabled={guests.infants <= 0}
                          className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30 hover:bg-gray-100 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-sm w-4 text-center">{guests.infants}</span>
                        <button
                          onClick={() => handleGuestChange('infants', 1)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowGuestMenu(false)}
                      className="w-full mt-2 text-right text-xs font-bold text-gray-900 underline hover:text-black"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              {/* Reserve Button */}
              <button
                onClick={handleOpenReserveModal}
                className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-4 rounded-2xl font-bold text-lg transition shadow-md hover:shadow-lg active:scale-98"
              >
                Reserve
              </button>

              <p className="text-center text-xs text-gray-500 font-medium">
                You won't be charged yet
              </p>

              {/* DYNAMIC PRICE CALCULATION BREAKDOWN */}
              <div className="space-y-3.5 border-t pt-5">
                <div className="flex justify-between text-sm text-gray-700">
                  <span className="underline">
                    {pricePerNight.toLocaleString()} EGP x {nightsCount} {nightsCount === 1 ? 'night' : 'nights'}
                  </span>
                  <span className="font-medium">{basePrice.toLocaleString()} EGP</span>
                </div>

                <div className="flex justify-between text-sm text-gray-700">
                  <span className="underline">Airbnb service fee (14%)</span>
                  <span className="font-medium">{serviceFee.toLocaleString()} EGP</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-gray-900 pt-3 border-t">
                  <span>Total before taxes</span>
                  <span className="text-[#FF385C]">{totalPrice.toLocaleString()} EGP</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* REVIEWS SECTION */}
        <div id="reviews" className="border-t mt-16 pt-12 space-y-10">
          
          {/* Header Score */}
          <div className="flex items-center gap-3 text-2xl md:text-3xl font-extrabold text-gray-900">
            <Star className="w-7 h-7 fill-black text-black" />
            <h2>
              {propertyData.rating || 4.88} · {propertyData.reviewsCount || 74} reviews
            </h2>
          </div>

          {/* Rating Breakdown Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 bg-gray-50/60 p-6 md:p-8 rounded-3xl border border-gray-200">
            {ratingCategories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-gray-700 w-32">{cat.name}</span>
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gray-900 h-full rounded-full"
                      style={{ width: cat.percentage }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-gray-900 w-8 text-right">
                    {cat.score.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Mock User Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="border border-gray-200 p-6 rounded-3xl bg-white shadow-xs space-y-4 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-xs"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{rev.name}</h4>
                    <p className="text-gray-500 text-xs font-medium">{rev.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#FF385C]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF385C]" />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">{rev.text}</p>
              </div>
            ))}
          </div>

        </div>

        {/* MAP SECTION ("Where you'll be") */}
        <div id="location" className="border-t mt-16 pt-12 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Where you’ll be</h2>
            <p className="text-gray-600 text-base mt-1.5 font-medium flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-700" />
              <span>{propertyData.location || "San Stefano, Alexandria, Egypt"}</span>
            </p>
          </div>

          <div className="w-full h-96 bg-gray-100 rounded-3xl overflow-hidden relative shadow-md border border-gray-200">
            <iframe
              title="Property Location Map"
              src="https://maps.google.com/maps?q=San%20Stefano%20Alexandria%20Egypt&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* "MEET YOUR HOST" DETAILED SECTION */}
        <div className="border-t mt-16 pt-12 space-y-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Meet your host</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Host Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md text-center space-y-4">
              <div className="relative inline-block mx-auto">
                <img
                  src={propertyData.host?.avatar || "https://i.pravatar.cc/150?img=47"}
                  alt={propertyData.host?.name || "Host"}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                />
                {(propertyData.host?.isSuperhost ?? true) && (
                  <div className="absolute bottom-0 right-1 bg-[#FF385C] text-white p-2 rounded-full shadow-md">
                    <Award className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  {propertyData.host?.name || "Farida"}
                </h3>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">
                  {(propertyData.host?.isSuperhost ?? true) ? "Superhost" : "Host"}
                </p>
              </div>

              {/* Stats Row inside Card */}
              <div className="grid grid-cols-3 gap-2 border-t pt-4 text-center">
                <div>
                  <span className="block text-xl font-extrabold text-gray-900">142</span>
                  <span className="text-[11px] font-semibold text-gray-500">Reviews</span>
                </div>
                <div className="border-x border-gray-200">
                  <span className="block text-xl font-extrabold text-gray-900">4.98 ★</span>
                  <span className="text-[11px] font-semibold text-gray-500">Rating</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-gray-900">5</span>
                  <span className="text-[11px] font-semibold text-gray-500">Years hosting</span>
                </div>
              </div>
            </div>

            {/* Host Information & Message Button */}
            <div className="md:col-span-2 space-y-6">
              
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">
                  Host details & response rate
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                    <Clock className="w-5 h-5 text-gray-800" />
                    <span>Response rate: <strong className="text-gray-900">100%</strong></span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                    <MessageCircle className="w-5 h-5 text-gray-800" />
                    <span>Responds <strong className="text-gray-900">within an hour</strong></span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                    <Globe className="w-5 h-5 text-gray-800" />
                    <span>Languages: <strong className="text-gray-900">English, Arabic</strong></span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Identity: <strong className="text-gray-900">Verified Host</strong></span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-base">About {propertyData.host?.name || "Farida"}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hi! I'm {propertyData.host?.name || "Farida"}, a passionate host who loves welcoming guests from around the world to Alexandria. I take pride in providing immaculate, stylish, and comfortable spaces with authentic Mediterranean hospitality!
                </p>
              </div>

              <button
                onClick={() => setShowMessageHostModal(true)}
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Message Host
              </button>

            </div>

          </div>
        </div>

        {/* "THINGS TO KNOW" SECTION */}
        <div className="border-t mt-16 pt-12 space-y-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Things to know</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* House rules Column */}
            <div className="space-y-4 bg-gray-50/50 p-6 rounded-3xl border border-gray-200">
              <div className="flex items-center gap-2 font-extrabold text-lg text-gray-900">
                <FileText className="w-5 h-5 text-gray-800" />
                <h3>House rules</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" /> Check-in: 3:00 PM – 8:00 PM
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" /> Checkout before 11:00 AM
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" /> {propertyData.specs?.guests || 4} guests maximum
                </li>
                <li className="flex items-center gap-2 text-gray-500">
                  • No smoking allowed
                </li>
                <li className="flex items-center gap-2 text-gray-500">
                  • No pets allowed
                </li>
              </ul>
            </div>

            {/* Safety & property Column */}
            <div className="space-y-4 bg-gray-50/50 p-6 rounded-3xl border border-gray-200">
              <div className="flex items-center gap-2 font-extrabold text-lg text-gray-900">
                <ShieldAlert className="w-5 h-5 text-gray-800" />
                <h3>Safety & property</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> Carbon monoxide alarm installed
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> Smoke alarm installed
                </li>
                <li className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-500" /> Elevator available in building
                </li>
                <li className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-gray-500" /> Self check-in with keypad
                </li>
              </ul>
            </div>

            {/* Cancellation policy Column */}
            <div className="space-y-4 bg-gray-50/50 p-6 rounded-3xl border border-gray-200">
              <div className="flex items-center gap-2 font-extrabold text-lg text-gray-900">
                <AlertCircle className="w-5 h-5 text-gray-800" />
                <h3>Cancellation policy</h3>
              </div>
              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                Free cancellation up to 48 hours before check-in. If you cancel before check-in date, you’ll get a full refund minus service fees.
              </p>
              <button
                onClick={handleOpenReserveModal}
                className="text-xs font-bold text-gray-900 underline hover:text-black"
              >
                Review reservation policy
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default PropertyDetails;