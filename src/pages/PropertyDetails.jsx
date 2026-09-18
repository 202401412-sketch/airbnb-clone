import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockProperties } from '../data/mockData';
import Calendar from '../components/Calendar';
import Footer from '../components/Footer';
import BookingWidget from '../components/common/BookingWidget.jsx';

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

export default function PropertyDetails({ property: propProperty, onClose, onOpenAuth, onNavigate, user }) {
  const { id } = useParams();

  // 1. PROPERTY DATA LOOKUP WITH SAFE FALLBACKS
  const propertyData =
    propProperty || mockProperties.find((item) => String(item.id) === String(id)) || mockProperties[0];

  const defaultImages = [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800"
  ];

  // Fill up to at least 5 images if needed
  const propertyImages = propertyData?.images || [];
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

  // Date Selection State
  const defaultCheckIn = '2026-09-10';
  const defaultCheckOut = '2026-09-15';

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);

  // Guest Menu State
  const [showGuestMenu, setShowGuestMenu] = useState(false);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    infants: 0
  });

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
  const pricePerNight = propertyData?.pricePerNight || propertyData?.price || 4778;
  const maxGuests = propertyData?.specs?.guests || 6;

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nightsCount = calculateNights();
  const basePrice = pricePerNight * nightsCount;
  const serviceFee = Math.round(basePrice * 0.14);
  const totalPrice = basePrice + serviceFee;
  const totalGuestCount = guests.adults + guests.children;

  // 4. HANDLERS
  const handleCalendarDateChange = ({ startDate, endDate }) => {
    setCheckIn(startDate);
    setCheckOut(endDate);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleOpenReserveModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const bookingPayload = {
      property: propertyData,
      startDate: checkIn,
      endDate: checkOut,
      checkIn: checkIn,
      checkOut: checkOut,
      totalNights: nightsCount,
      nightsCount: nightsCount,
      guestCount: totalGuestCount,
      guests: guests,
      totalPrice: totalPrice
    };

    if (onNavigate) {
      onNavigate('checkout', bookingPayload);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendMessageToHost = (e) => {
    e.preventDefault();
    if (!user) {
      if (onOpenAuth) onOpenAuth();
      return;
    }
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

  const amenitiesList = [
    { name: "Sea View", icon: Waves, offered: propertyData?.amenities?.includes("Sea View") },
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

  const ratingCategories = [
    { name: "Cleanliness", score: 4.9, percentage: "98%" },
    { name: "Accuracy", score: 4.9, percentage: "98%" },
    { name: "Communication", score: 5.0, percentage: "100%" },
    { name: "Location", score: 4.9, percentage: "98%" },
    { name: "Value", score: 4.8, percentage: "96%" }
  ];

  const reviewsList = [
    {
      id: 1,
      name: "Omar Khaled",
      date: "August 2026",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      text: "Outstanding stay! Clean, spacious, and the view over the Mediterranean Sea was unbelievable."
    },
    {
      id: 2,
      name: "Maryam Ali",
      date: "July 2026",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 5,
      text: "Great interior design and very smooth self check-in process."
    }
  ];

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
          <h2 className="text-white text-3xl font-bold mb-6">{propertyData?.title}</h2>
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

      {/* STICKY SUB-NAVBAR */}
      {showSubNavbar && (
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3.5 px-4 md:px-8 transition-all animate-in fade-in duration-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-6 text-sm font-semibold text-gray-700">
              <button onClick={() => scrollToSection('photos')} className="hover:text-black pb-1">Photos</button>
              <button onClick={() => scrollToSection('overview')} className="hover:text-black pb-1">Overview</button>
              <button onClick={() => scrollToSection('amenities')} className="hover:text-black pb-1">Amenities</button>
              <button onClick={() => scrollToSection('reviews')} className="hover:text-black pb-1">Reviews</button>
              <button onClick={() => scrollToSection('location')} className="hover:text-black pb-1">Location</button>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <span className="font-extrabold text-base text-gray-900">
                  {pricePerNight.toLocaleString()} EGP
                </span>
                <span className="text-gray-500 text-xs"> / night</span>
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
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 max-h-[85vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setShowAllAmenities(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100"
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* 1. TITLE & ACTION BUTTONS */}
        <div id="overview" className="mb-6 space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {propertyData?.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-800">
              <Star className="w-4 h-4 fill-black text-black" />
              <span>{propertyData?.rating || 4.88}</span>
              <span>·</span>
              <span className="underline cursor-pointer">{propertyData?.reviewsCount || 74} reviews</span>
              <span>·</span>
              <span className="underline font-medium text-gray-600">
                {propertyData?.location || "San Stefano, Alexandria, Egypt"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold relative">
              <button onClick={handleShare} className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-300">
                <Share className="w-4 h-4" /> Share
              </button>
              <button onClick={() => setIsLiked(!isLiked)} className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-300">
                <Heart className={`w-4 h-4 ${isLiked ? "fill-[#FF385C] text-[#FF385C]" : "text-gray-700"}`} />
                {isLiked ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* 2. IMAGE GRID */}
        <div id="photos" className="relative rounded-3xl overflow-hidden mb-10 group">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 h-[360px] md:h-[460px]">
            <div className="md:col-span-2 h-full cursor-pointer overflow-hidden relative" onClick={() => setShowAllPhotos(true)}>
              <img src={images[0]} alt="Main property view" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
            </div>
            <div className="hidden md:grid grid-cols-2 col-span-2 gap-2.5 h-full">
              {images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="overflow-hidden cursor-pointer h-full relative" onClick={() => setShowAllPhotos(true)}>
                  <img src={img} alt={`Property view ${idx + 2}`} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-5 right-5 bg-white/95 border border-gray-900 px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-lg">
            Show all photos ({images.length})
          </button>
        </div>

        {/* MAIN SECTION: LEFT INFO + RIGHT WIDGET */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* LEFT SIDE CONTENT */}
          <div className="lg:col-span-2 space-y-10">
            <div className="border-b pb-8 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {propertyData?.type || "Entire rental unit"} hosted by {propertyData?.host?.name || "Farida"}
                </h2>
                <p className="text-gray-600 text-base mt-1.5 font-medium">
                  {propertyData?.specs?.guests || 4} guests · {propertyData?.specs?.bedrooms || 2} bedrooms · {propertyData?.specs?.beds || 2} beds · {propertyData?.specs?.baths || 1} baths
                </p>
              </div>
              <img src={propertyData?.host?.avatar || "https://i.pravatar.cc/150?img=47"} alt="Host" className="w-16 h-16 rounded-full object-cover border-2" />
            </div>

            <div className="border-b pb-8 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">About this space</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                {propertyData?.description || "Enjoy a peaceful stay in this beautifully furnished property located in a prime neighborhood."}
              </p>
            </div>

            <Calendar
              startDate={checkIn}
              endDate={checkOut}
              onDateChange={handleCalendarDateChange}
              nightsCount={nightsCount}
              locationName={propertyData?.location?.split(',')[0] || "San Stefano"}
            />
          </div>

          {/* RIGHT SIDE STICKY BOOKING WIDGET */}
          <div className="relative">
            <BookingWidget
              price={pricePerNight}
              property={propertyData}
              onNavigate={onNavigate}
              onReserve={(bookingData) => {
                if (onNavigate) {
                  onNavigate('checkout', { ...bookingData, property: propertyData });
                }
              }}
            />
          </div>

        </div>

        {/* MAP SECTION */}
        <div id="location" className="border-t mt-16 pt-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Where you’ll be</h2>
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

      </div>
      <Footer />
    </div>
  );
}