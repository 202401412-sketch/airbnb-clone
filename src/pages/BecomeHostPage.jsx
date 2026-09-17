import React, { useState } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { 
  FiHome, FiUserPlus, FiShield, FiDollarSign, FiArrowLeft, FiChevronRight, 
  FiCheckCircle, FiPlus, FiSend, FiCheck 
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import Footer from '../components/Footer.jsx';

const BecomeHostPage = ({ onNavigate, onOpenLangModal }) => {
  const { dir } = useLanguage();
  const [step, setStep] = useState(1);
  const [formError, setFormError] = useState('');

  // Host Form State
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [pricePerNight, setPricePerNight] = useState('2500');
  const [propertyType, setPropertyType] = useState('Entire villa');
  const [bedrooms, setBedrooms] = useState('2');
  const [bathrooms, setBathrooms] = useState('2');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submittedProperty, setSubmittedProperty] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Please enter a property title.');
      return;
    }
    if (!location.trim()) {
      setFormError('Please enter property location/city.');
      return;
    }
    if (!pricePerNight || Number(pricePerNight) <= 0) {
      setFormError('Please enter a valid price per night.');
      return;
    }

    const newProp = {
      title,
      location,
      pricePerNight: Number(pricePerNight),
      type: propertyType,
      bedrooms,
      bathrooms,
      description,
      image: imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
    };

    setSubmittedProperty(newProp);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between" dir={dir}>
      
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div 
            onClick={() => onNavigate && onNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer text-[#FF385C]"
          >
            <FaAirbnb className="w-8 h-8" />
            <span className="font-black text-xl tracking-tighter hidden sm:inline">airbnb</span>
            <span className="text-xs font-bold text-gray-500 border-l border-gray-300 pl-2 ml-1">Airbnb Setup & Hosting</span>
          </div>

          <button 
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-black border border-gray-300 hover:border-black px-4 py-2 rounded-full transition"
          >
            <FiArrowLeft />
            <span>Back to Homes & Stays</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <span className="hover:underline cursor-pointer" onClick={() => onNavigate && onNavigate('home')}>Home</span>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-bold">Airbnb Setup — List Your Property</span>
        </div>

        {/* Step 1: Overview */}
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in duration-200">
            <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-rose-700 text-white rounded-3xl p-8 md:p-14 shadow-xl space-y-6">
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase px-3 py-1 rounded-md tracking-wider">Airbnb Setup</span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">Airbnb it with 1-on-1 Superhost guidance</h1>
              <p className="text-sm md:text-base text-rose-100 max-w-2xl font-medium">
                Host your space and earn extra income. Join over 4 million hosts worldwide earning up to EGP 25,000 / month on average.
              </p>
              <button
                onClick={() => setStep(2)}
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-base transition shadow-lg flex items-center gap-2"
              >
                <span>Start Airbnb Setup</span>
                <FiSend />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border rounded-3xl space-y-3 shadow-sm">
                <FiUserPlus className="w-8 h-8 text-[#FF385C]" />
                <h3 className="font-bold text-base text-gray-900">1-to-1 Guidance from a Superhost</h3>
                <p className="text-xs text-gray-600 leading-relaxed">We'll pair you with a top-rated Superhost in your area to guide you from your first question to your first guest.</p>
              </div>

              <div className="bg-white p-6 border rounded-3xl space-y-3 shadow-sm">
                <FiHome className="w-8 h-8 text-[#FF385C]" />
                <h3 className="font-bold text-base text-gray-900">An Experienced First Guest</h3>
                <p className="text-xs text-gray-600 leading-relaxed">Choose to welcome an experienced guest with at least 3 successful stays on Airbnb for your first booking.</p>
              </div>

              <div className="bg-white p-6 border rounded-3xl space-y-3 shadow-sm">
                <FiShield className="w-8 h-8 text-[#FF385C]" />
                <h3 className="font-bold text-base text-gray-900">$3 Million Host Damage Protection</h3>
                <p className="text-xs text-gray-600 leading-relaxed">AirCover for Hosts provides comprehensive protection for your home, art, and valuables.</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Listing Form */}
        {step === 2 && (
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-black text-gray-900">Tell Us About Your Space</h2>
              <button onClick={() => setStep(1)} className="text-xs font-bold text-gray-500 hover:text-black flex items-center gap-1">
                <FiArrowLeft /> Back
              </button>
            </div>

            {formError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Property Title *</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Luxury Beachfront Villa in El Gouna"
                  className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">City / Location *</label>
                  <input 
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. El Gouna, Hurghada"
                    className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Price Per Night (EGP) *</label>
                  <input 
                    type="number"
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                    placeholder="2500"
                    className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-black bg-white"
                  >
                    <option value="Entire villa">Entire villa</option>
                    <option value="Apartment / Condo">Apartment / Condo</option>
                    <option value="Private Room">Private Room</option>
                    <option value="Boutique Hotel">Boutique Hotel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Bedrooms</label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-black bg-white"
                  >
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4+">4+ Bedrooms</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Photo Image URL (Optional)</label>
                <input 
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Space Description</label>
                <textarea 
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your space, amenities, and nearby sea or city views..."
                  className="w-full p-3.5 border border-gray-300 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-black"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-4 rounded-xl font-bold text-base transition shadow-md"
              >
                Submit & Publish Listing Request
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-6 text-center max-w-2xl mx-auto animate-in fade-in duration-200">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <FiCheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Listing Submission Received! 🎉</h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your property <strong className="text-black">"{submittedProperty?.title}"</strong> in {submittedProperty?.location} at <strong className="text-black">{submittedProperty?.pricePerNight} EGP / night</strong> has been submitted.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={() => onNavigate && onNavigate('home')}
                className="bg-black hover:bg-gray-800 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition shadow-md"
              >
                Back to Stays & Homes
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer 
        onOpenLangModal={onOpenLangModal}
        onOpenFeatureModal={() => {}}
        onSelectDestination={() => {}}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default BecomeHostPage;
