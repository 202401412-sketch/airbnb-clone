import React, { useState } from 'react';
import Calendar from './Calendar';
import Footer from './Footer.jsx';
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

const PropertyDetails = ({ property, onClose }) => {
  if (!property) return null;

  // States
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Date Selection State (YYYY-MM-DD format)
  const defaultCheckIn = '2026-09-10';
  const defaultCheckOut = '2026-09-15';
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);

  // Guest Selection
  const [showGuestMenu, setShowGuestMenu] = useState(false);
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0 });

  // Modal States
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [showMessageHostModal, setShowMessageHostModal] = useState(false);
  const [hostMessageSent, setHostMessageSent] = useState(false);
  const [hostMessageText, setHostMessageText] = useState('');

  // Property Data Fillers
  const pricePerNight = property.pricePerNight || property.price || 4778;
  const maxGuests = property.specs?.guests || 6;
  const title = property.title || "Luxury Apartment in San Stefano";
  const location = property.location || "San Stefano, Alexandria, Egypt";
  const rating = property.rating || 4.88;
  const reviewsCount = property.reviewsCount || 74;

  const defaultImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600"
  ];
  const propertyImages = property.images || [];
  const images = propertyImages.length >= 5 ? propertyImages : [...propertyImages, ...defaultImages.slice(propertyImages.length)];

  // Calculate Nights & Prices
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

  const handleCalendarDateChange = ({ startDate, endDate }) => {
    setCheckIn(startDate);
    setCheckOut(endDate);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleConfirmBooking = () => {
    const randomRef = 'AB-' + Math.floor(100000 + Math.random() * 900000);
    setBookingReference(randomRef);
    setBookingConfirmed(true);
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return 'Select date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const amenitiesList = [
    { name: "Sea View", icon: Waves, offered: true },
    { name: "High-Speed Wi-Fi", icon: Wifi, offered: true },
    { name: "Central Air Conditioning", icon: Wind, offered: true },
    { name: "HDTV with Netflix", icon: Tv, offered: true },
    { name: "Free Driveway Parking", icon: Car, offered: true },
    { name: "Fully Equipped Kitchen", icon: Utensils, offered: true }
  ];

  const ratingCategories = [
    { name: "Cleanliness", score: 4.9, percentage: "98%" },
    { name: "Accuracy", score: 4.9, percentage: "98%" },
    { name: "Communication", score: 5.0, percentage: "100%" },
    { name: "Location", score: 4.9, percentage: "98%" },
    { name: "Value", score: 4.8, percentage: "96%" }
  ];

  const reviewsList = property.reviews?.length > 0 ? property.reviews : [
    {
      id: 1,
      author: "Omar Khaled",
      date: "August 2026",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      comment: "Outstanding stay! Clean, spacious, and the view over the Mediterranean Sea was unbelievable."
    },
    {
      id: 2,
      author: "Maryam Ali",
      date: "July 2026",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 5,
      comment: "Great interior design and very smooth self check-in process. Location is unbeatable."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto" dir="ltr">
      
      {/* Top Header Bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition text-gray-700 font-semibold"
        >
          <X className="w-5 h-5" /> Close
        </button>

        <div className="flex items-center gap-3">
          <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50 text-sm font-semibold">
            <Share className="w-4 h-4" /> Share
          </button>
          <button onClick={() => setIsLiked(!isLiked)} className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50 text-sm font-semibold">
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#FF385C] text-[#FF385C]' : ''}`} /> {isLiked ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        
        {/* 1. Header & Title */}
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">{title}</h1>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-black text-black" />
              <span>{rating}</span>
            </div>
            <span>·</span>
            <span className="underline">{reviewsCount} reviews</span>
            <span>·</span>
            <span className="underline font-medium text-gray-600">{location}</span>
          </div>
        </div>

        {/* 2. Photo Gallery Grid */}
        <div className="relative rounded-3xl overflow-hidden group">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 h-[360px] md:h-[460px]">
            <div className="md:col-span-2 h-full cursor-pointer overflow-hidden" onClick={() => setShowAllPhotos(true)}>
              <img src={images[0]} alt="Main" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
            </div>
            <div className="hidden md:grid grid-cols-2 col-span-2 gap-2.5 h-full">
              {images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="overflow-hidden cursor-pointer h-full" onClick={() => setShowAllPhotos(true)}>
                  <img src={img} alt={`sub-${idx}`} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content & Sticky Booking Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-10">
            
            {/* Overview & Host Summary */}
            <div className="border-b pb-8 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {property.type || "Entire apartment"} hosted by {property.host?.name || "Farida"}
                </h2>
                <p className="text-gray-600 text-base mt-1 font-medium">
                  {property.specs?.guests || 4} guests · {property.specs?.bedrooms || 2} bedrooms · {property.specs?.beds || 2} beds · {property.specs?.baths || 1} baths
                </p>
              </div>
              <img src={property.host?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} alt="Host" className="w-16 h-16 rounded-full object-cover border" />
            </div>

            {/* Description */}
            <div className="border-b pb-8 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">About this space</h3>
              <p className="text-gray-700 text-base leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities Grid */}
            <div className="border-b pb-8 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                {amenitiesList.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-gray-800 font-medium">
                      <IconComp className="w-6 h-6 text-gray-700" />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. STANDALONE CALENDAR COMPONENT */}
            <Calendar
              startDate={checkIn}
              endDate={checkOut}
              onDateChange={handleCalendarDateChange}
              nightsCount={nightsCount}
              locationName={location.split(',')[0]}
            />

          </div>

          {/* Sticky Booking Widget */}
          <div className="relative">
            <div className="border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl sticky top-28 bg-white space-y-6">
              <div className="flex justify-between items-baseline border-b pb-5">
                <div>
                  <span className="text-3xl font-extrabold text-gray-900">{pricePerNight.toLocaleString()} EGP</span>
                  <span className="text-gray-500 text-base font-normal"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                  <Star className="w-4 h-4 fill-black text-black" />
                  <span>{rating}</span>
                </div>
              </div>

              {/* Reserve Button */}
              <button
                onClick={() => setShowReserveModal(true)}
                className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-4 rounded-2xl font-bold text-lg transition shadow-md"
              >
                Reserve
              </button>

              {/* Dynamic Price Breakdown */}
              <div className="space-y-3.5 border-t pt-5 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>{pricePerNight.toLocaleString()} EGP x {nightsCount} nights</span>
                  <span className="font-medium">{basePrice.toLocaleString()} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span>Airbnb service fee (14%)</span>
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

        {/* 4. Detailed Reviews Section */}
        <div className="border-t pt-12 space-y-10">
          <div className="flex items-center gap-3 text-2xl md:text-3xl font-extrabold text-gray-900">
            <Star className="w-7 h-7 fill-black text-black" />
            <h2>{rating} · {reviewsCount} reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 bg-gray-50/60 p-6 md:p-8 rounded-3xl border border-gray-200">
            {ratingCategories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-gray-700 w-32">{cat.name}</span>
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gray-900 h-full rounded-full" style={{ width: cat.percentage }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-900 w-8 text-right">{cat.score.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {reviewsList.map((rev, idx) => (
              <div key={rev.id || idx} className="border border-gray-200 p-6 rounded-3xl bg-white shadow-xs space-y-4">
                <div className="flex items-center gap-4">
                  <img src={rev.avatar || "https://i.pravatar.cc/150?img=11"} alt={rev.author || rev.name} className="w-12 h-12 rounded-full object-cover border" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{rev.author || rev.name || "Guest"}</h4>
                    <p className="text-gray-500 text-xs">{rev.date || "Recent stay"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#FF385C]">
                  {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF385C]" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{rev.comment || rev.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location Map Section */}
        <div className="border-t pt-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Where you’ll be</h2>
          <p className="text-gray-600 text-base font-medium flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-700" />
            <span>{location}</span>
          </p>
          <div className="w-full h-80 bg-gray-100 rounded-3xl overflow-hidden shadow-md border border-gray-200">
            <iframe
              title="Location Map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* 5. "Meet Your Host" Card */}
        <div className="border-t pt-12 space-y-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Meet your host</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md text-center space-y-4">
              <img src={property.host?.avatar || "https://i.pravatar.cc/150?img=47"} alt="Host" className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-200" />
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">{property.host?.name || "Farida"}</h3>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">{property.host?.isSuperhost ? "Superhost" : "Host"}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t pt-4 text-center">
                <div>
                  <span className="block text-lg font-bold text-gray-900">{property.host?.reviewsCount || 142}</span>
                  <span className="text-[11px] text-gray-500">Reviews</span>
                </div>
                <div className="border-x border-gray-200">
                  <span className="block text-lg font-bold text-gray-900">{property.host?.rating || 4.98} ★</span>
                  <span className="text-[11px] text-gray-500">Rating</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-gray-900">{property.host?.yearsHosting || 3}</span>
                  <span className="text-[11px] text-gray-500">Years hosting</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
              <p className="text-gray-600 text-sm leading-relaxed">{property.host?.bio || "We always strive to create a seamless, elegant, and personalized stay experience for our guests."}</p>
              <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700">
                <div className="bg-gray-50 p-3.5 rounded-2xl border">Response rate: <strong className="text-gray-900">{property.host?.responseRate || "100%"}</strong></div>
                <div className="bg-gray-50 p-3.5 rounded-2xl border">Languages: <strong className="text-gray-900">{property.host?.languages || "English, Arabic"}</strong></div>
              </div>
              <button onClick={() => setShowMessageHostModal(true)} className="border-2 border-gray-900 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-gray-900 hover:text-white transition">
                Message Host
              </button>
            </div>
          </div>
        </div>

        {/* 6. "Things to Know" Footer Grid */}
        <div className="border-t pt-12 space-y-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Things to know</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 bg-gray-50 p-6 rounded-3xl border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900">House rules</h3>
              <p className="text-sm text-gray-600">Check-in: 3:00 PM – 8:00 PM</p>
              <p className="text-sm text-gray-600">Checkout before 11:00 AM</p>
              <p className="text-sm text-gray-600">{property.specs?.guests || 4} guests maximum</p>
            </div>
            <div className="space-y-3 bg-gray-50 p-6 rounded-3xl border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900">Safety & property</h3>
              <p className="text-sm text-gray-600">Carbon monoxide alarm installed</p>
              <p className="text-sm text-gray-600">Smoke alarm installed</p>
              <p className="text-sm text-gray-600">Self check-in with keypad</p>
            </div>
            <div className="space-y-3 bg-gray-50 p-6 rounded-3xl border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900">Cancellation policy</h3>
              <p className="text-sm text-gray-600">Free cancellation up to 48 hours before check-in. Full refund minus service fee.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Global Footer */}
      <Footer />

      {/* Confirmation Modal */}
      {showReserveModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 relative shadow-2xl space-y-6">
            {!bookingConfirmed ? (
              <>
                <div className="flex justify-between items-center border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Confirm Booking</h2>
                  <button onClick={() => setShowReserveModal(false)} className="p-2 rounded-full hover:bg-gray-100"><X className="w-6 h-6" /></button>
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Dates</span>
                    <span className="font-semibold">{formatDateDisplay(checkIn)} – {formatDateDisplay(checkOut)} ({nightsCount} nights)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests</span>
                    <span className="font-semibold">{totalGuestCount} guests</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t text-lg font-bold text-gray-900">
                    <span>Total Price</span>
                    <span className="text-[#FF385C]">{totalPrice.toLocaleString()} EGP</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setShowReserveModal(false)} className="w-1/3 border py-3 rounded-xl font-bold">Cancel</button>
                  <button onClick={handleConfirmBooking} className="w-2/3 bg-[#FF385C] text-white py-3 rounded-xl font-bold">Confirm Booking ({totalPrice.toLocaleString()} EGP)</button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-900">Booking Confirmed! 🎉</h3>
                <p className="text-sm text-gray-600">Reference: <strong className="font-mono">{bookingReference}</strong></p>
                <button onClick={() => setShowReserveModal(false)} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold">Done</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default PropertyDetails;