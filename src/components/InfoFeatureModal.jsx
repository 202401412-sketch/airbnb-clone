import React, { useState, useEffect } from 'react';
import { 
  FiX, FiCheck, FiCopy, FiSearch, FiHelpCircle, FiGift, FiUserPlus, 
  FiHome, FiUsers, FiShield, FiFileText, FiLock, FiInfo, FiChevronDown, 
  FiChevronUp, FiHeart, FiBriefcase, FiAlertTriangle, FiPhoneCall, FiSend, 
  FiArrowLeft, FiDollarSign, FiGlobe
} from 'react-icons/fi';
import { FaAirbnb } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext.jsx';

const InfoFeatureModal = ({ isOpen, onClose, feature }) => {
  const { t, dir, language } = useLanguage();

  // Step and success states
  const [step, setStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [formError, setFormError] = useState('');

  // Become Host Form State
  const [hostTitle, setHostTitle] = useState('');
  const [hostLocation, setHostLocation] = useState('');
  const [hostPrice, setHostPrice] = useState('2500');
  const [hostType, setHostType] = useState('Entire villa');
  const [hostBedrooms, setHostBedrooms] = useState('2');
  const [hostDescription, setHostDescription] = useState('');

  // Refer Host State
  const [referralName, setReferralName] = useState('');
  const [referralEmail, setReferralEmail] = useState('');
  const [referralMessage, setReferralMessage] = useState('Hey! Join Airbnb as a host using my invitation link and earn extra income on your space.');
  const [copied, setCopied] = useState(false);

  // Find Co-Host State
  const [coHostQuery, setCoHostQuery] = useState('');
  const [selectedCoHost, setSelectedCoHost] = useState(null);
  const [coHostMessage, setCoHostMessage] = useState('');
  const [coHostContact, setCoHostContact] = useState('');

  // Gift Cards State
  const [giftAmount, setGiftAmount] = useState('100');
  const [customGiftAmount, setCustomGiftAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [giftMessage, setGiftMessage] = useState('');

  // Help Center State
  const [searchHelp, setSearchHelp] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportCategory, setSupportCategory] = useState('Booking issue');
  const [supportMessage, setSupportMessage] = useState('');

  // Legal / Terms State
  const [activeLegalTab, setActiveLegalTab] = useState('terms');
  const [privacyChoices, setPrivacyChoices] = useState({
    personalization: true,
    analytics: true,
    targetedAds: false
  });

  // Company Info State
  const [activeCompanyTab, setActiveCompanyTab] = useState('summer');

  // Support & Safety State
  const [activeSafetyTab, setActiveSafetyTab] = useState('aircover');
  const [safetyReportMessage, setSafetyReportMessage] = useState('');
  const [neighborhoodAddress, setNeighborhoodAddress] = useState('');

  // Reset states on modal open/feature change
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSuccessMessage('');
      setFormError('');
      setSelectedCoHost(null);
      setShowSupportForm(false);
      setExpandedFaq(null);
    }
  }, [isOpen, feature]);

  if (!isOpen || !feature) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://www.airbnb.com/r/host_referral_2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Submit Handlers with strict input validation
  const handleBecomeHostSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!hostTitle.trim()) {
      setFormError('Please enter a property title.');
      return;
    }
    if (!hostLocation.trim()) {
      setFormError('Please enter property location/city.');
      return;
    }
    if (!hostPrice || Number(hostPrice) <= 0) {
      setFormError('Please enter a valid price per night.');
      return;
    }

    setSuccessMessage(`Listing Request Submitted! Our hosting team will review details for "${hostTitle}" in ${hostLocation} (EGP ${hostPrice}/night) and contact you within 24 hours.`);
    setStep(3);
  };

  const handleReferHostSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!referralName.trim()) {
      setFormError("Please enter your friend's full name.");
      return;
    }
    if (!referralEmail.trim() || !referralEmail.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setSuccessMessage(`Invitation successfully sent to ${referralName} (${referralEmail})! You will earn up to EGP 10,000 once they complete their first booking.`);
    setStep(3);
  };

  const handleContactCoHostSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!coHostMessage.trim()) {
      setFormError('Please enter details about your property or inquiry.');
      return;
    }
    if (!coHostContact.trim()) {
      setFormError('Please provide your phone or email contact.');
      return;
    }

    setSuccessMessage(`Your message has been sent to Co-Host ${selectedCoHost?.name}! They will get in touch with you at ${coHostContact} shortly.`);
    setStep(3);
  };

  const handleGiftCardSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    const finalAmount = giftAmount === 'custom' ? customGiftAmount : giftAmount;

    if (!finalAmount || Number(finalAmount) <= 0) {
      setFormError('Please select or enter a valid gift card amount.');
      return;
    }
    if (!recipientName.trim()) {
      setFormError("Please enter recipient's full name.");
      return;
    }
    if (!recipientEmail.trim() || !recipientEmail.includes('@')) {
      setFormError("Please enter recipient's valid email address.");
      return;
    }

    setSuccessMessage(`Gift Card of $${finalAmount} successfully purchased for ${recipientName}! An e-gift code has been emailed to ${recipientEmail}.`);
    setStep(3);
  };

  const handleSupportFormSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!supportMessage.trim()) {
      setFormError('Please describe your issue or question.');
      return;
    }

    const ticketId = Math.floor(100000 + Math.random() * 900000);
    setSuccessMessage(`Support Ticket #${ticketId} created under category "${supportCategory}". Our 24/7 Community Support team will reply to your registered account within 30 minutes.`);
    setStep(3);
  };

  const handleSafetyReportSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!safetyReportMessage.trim()) {
      setFormError('Please describe the safety issue or neighborhood concern.');
      return;
    }

    setSuccessMessage('Urgent report submitted to Airbnb Trust & Safety Special Response Team. Case reference #SR-9942.');
    setStep(3);
  };

  // Co-Hosts Mock Data
  const coHostsList = [
    { name: 'Ahmed K.', location: 'Alexandria & North Coast', rating: '4.98 ★', listings: '48 listings managed', avatar: 'https://i.pravatar.cc/150?img=12', bio: 'Superhost with 7 years of local hospitality experience.' },
    { name: 'Sara M.', location: 'Sheikh Zayed & New Cairo', rating: '5.0 ★', listings: '22 listings managed', avatar: 'https://i.pravatar.cc/150?img=47', bio: 'Specializing in luxury apartments & interior design management.' },
    { name: 'Khaled B.', location: 'Hurghada & El Gouna', rating: '4.95 ★', listings: '34 listings managed', avatar: 'https://i.pravatar.cc/150?img=68', bio: '24/7 guest check-in, maintenance & housekeeping team owner.' },
    { name: 'Elena R.', location: 'Dahab & Sharm El Sheikh', rating: '4.99 ★', listings: '19 listings managed', avatar: 'https://i.pravatar.cc/150?img=32', bio: 'Bilingual co-host handling international guest communications.' },
  ].filter(c => !coHostQuery || c.name.toLowerCase().includes(coHostQuery.toLowerCase()) || c.location.toLowerCase().includes(coHostQuery.toLowerCase()));

  // FAQs Mock Data
  const faqCategories = [
    {
      id: 'cancellation',
      title: 'Cancellation & Refund Policies',
      faqs: [
        { q: 'How do I cancel my reservation?', a: 'Go to Trips, select your reservation, and click Cancel reservation. Refund amounts depend on the listing cancellation policy (Flexible, Moderate, or Strict).' },
        { q: 'When will I receive my refund?', a: 'Refunds are processed immediately by Airbnb and usually appear on your original payment method in 3–5 business days.' }
      ]
    },
    {
      id: 'aircover',
      title: 'AirCover for Guests Protection',
      faqs: [
        { q: 'What is included in AirCover?', a: 'Every booking includes Booking Protection, Check-in Guarantee, Get-What-You-Booked Guarantee, and a 24-hour Safety Line.' },
        { q: 'What if the host cancels last minute?', a: 'If a host cancels within 30 days of check-in, AirCover finds you a similar or better home or refunds 100% of your money.' }
      ]
    },
    {
      id: 'safety',
      title: 'Safety, Security & Account',
      faqs: [
        { q: 'How does Airbnb verify hosts and guests?', a: 'We require government ID verification, phone number confirmation, and background checks where allowed by law.' },
        { q: 'How do I report a suspicious message or safety issue?', a: 'Use the flag icon inside messages or click "Report Safety Issue" to alert our safety team 24/7.' }
      ]
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col my-auto border border-gray-100 animate-in fade-in zoom-in-95 duration-200" 
        dir={dir}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <button 
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-900 bg-gray-50 border border-gray-200 transition flex items-center justify-center shadow-xs cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5 text-gray-900 stroke-[2.5]" />
          </button>
          
          <div className="flex items-center gap-2">
            <FaAirbnb className="text-[#FF385C] text-2xl" />
            <h2 className="font-bold text-gray-900 text-base md:text-lg">
              {feature === 'becomeHost' && 'Airbnb Setup — Become a Host'}
              {feature === 'referHost' && 'Refer a Host & Earn Rewards'}
              {feature === 'findCoHost' && 'Find a Local Co-Host'}
              {feature === 'giftCards' && 'Airbnb Gift Cards'}
              {feature === 'helpCenter' && 'Airbnb Help Center'}
              {feature === 'termsPrivacy' && 'Terms, Privacy & Policy'}
              {feature === 'companyInfo' && 'About Airbnb & Releases'}
              {feature === 'supportSafety' && 'Support & Safety Hub'}
            </h2>
          </div>
          
          <div className="w-8"></div>
        </div>

        {/* Body Content */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">
          
          {/* STEP 3: SUCCESS CONFIRMATION SCREEN */}
          {step === 3 ? (
            <div className="text-center py-8 space-y-5 animate-in fade-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <FiCheck className="w-10 h-10 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Success!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-200 font-medium">
                {successMessage}
              </p>
              <button
                onClick={onClose}
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-bold text-sm transition shadow-md"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              {formError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
                  <FiAlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* ---------------- FEATURE 1: BECOME A HOST ---------------- */}
              {feature === 'becomeHost' && (
                <div className="space-y-6">
                  {step === 1 ? (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-rose-50 to-orange-50 p-6 rounded-2xl border border-rose-100 space-y-2">
                        <span className="bg-rose-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
                          Airbnb Setup
                        </span>
                        <h3 className="text-2xl font-extrabold text-gray-900">
                          Earn up to EGP 18,500 / month hosting your space
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          With Airbnb Setup, you get 1-on-1 guidance from a Superhost and specialized support from listing to your first guest.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border border-gray-200 rounded-2xl space-y-2 hover:border-black transition">
                          <FiUserPlus className="w-6 h-6 text-[#FF385C]" />
                          <h4 className="font-bold text-sm text-gray-900">1-on-1 Superhost Guide</h4>
                          <p className="text-xs text-gray-500">Matched with an experienced host to guide you every step.</p>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-2xl space-y-2 hover:border-black transition">
                          <FiHome className="w-6 h-6 text-[#FF385C]" />
                          <h4 className="font-bold text-sm text-gray-900">Experienced First Guest</h4>
                          <p className="text-xs text-gray-500">Welcome a guest with at least 3 successful stays on Airbnb.</p>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-2xl space-y-2 hover:border-black transition">
                          <FiShield className="w-6 h-6 text-[#FF385C]" />
                          <h4 className="font-bold text-sm text-gray-900">$3M Host Protection</h4>
                          <p className="text-xs text-gray-500">AirCover for Hosts provides top-to-bottom damage protection.</p>
                        </div>
                      </div>

                      <button
                        onClick={() => { setFormError(''); setStep(2); }}
                        className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-3.5 rounded-xl font-bold text-base transition shadow-md flex items-center justify-center gap-2"
                      >
                        <span>Start Listing Your Space</span>
                        <FiSend className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    /* Step 2: Multi-step Listing Form */
                    <form onSubmit={handleBecomeHostSubmit} className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b">
                        <h3 className="font-bold text-gray-900 text-lg">Property & Hosting Details</h3>
                        <button type="button" onClick={() => setStep(1)} className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1">
                          <FiArrowLeft /> Back
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Listing Title *</label>
                        <input 
                          type="text"
                          value={hostTitle}
                          onChange={(e) => setHostTitle(e.target.value)}
                          placeholder="e.g. Modern Villa with Pool & Sea View"
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">City / Location *</label>
                          <input 
                            type="text"
                            value={hostLocation}
                            onChange={(e) => setHostLocation(e.target.value)}
                            placeholder="e.g. El Gouna, Hurghada"
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Price per Night (EGP) *</label>
                          <input 
                            type="number"
                            value={hostPrice}
                            onChange={(e) => setHostPrice(e.target.value)}
                            placeholder="2500"
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Property Type</label>
                          <select 
                            value={hostType}
                            onChange={(e) => setHostType(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black bg-white"
                          >
                            <option value="Entire villa">Entire villa</option>
                            <option value="Apartment">Apartment / Condo</option>
                            <option value="Private room">Private room</option>
                            <option value="Boutique Hotel">Boutique Hotel</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Bedrooms</label>
                          <select 
                            value={hostBedrooms}
                            onChange={(e) => setHostBedrooms(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black bg-white"
                          >
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedrooms</option>
                            <option value="3">3 Bedrooms</option>
                            <option value="4+">4+ Bedrooms</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Property Description (Optional)</label>
                        <textarea 
                          rows="3"
                          value={hostDescription}
                          onChange={(e) => setHostDescription(e.target.value)}
                          placeholder="Describe your space, amenities, or nearby attractions..."
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-3 rounded-xl font-bold text-sm transition shadow-md"
                      >
                        Submit Listing Request
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* ---------------- FEATURE 2: REFER A HOST ---------------- */}
              {feature === 'referHost' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 text-center space-y-2">
                    <FiUserPlus className="w-10 h-10 text-[#FF385C] mx-auto" />
                    <h3 className="text-xl font-bold text-gray-900">Refer a Host & Earn Up to EGP 10,000</h3>
                    <p className="text-xs text-gray-600 max-w-md mx-auto">
                      Know someone with a space? Invite them to host on Airbnb and earn rewards after their first booking.
                    </p>
                  </div>

                  <form onSubmit={handleReferHostSubmit} className="space-y-4 border p-4 rounded-2xl bg-white">
                    <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wide">Send Direct Email Invitation</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Friend's Full Name *</label>
                        <input 
                          type="text"
                          value={referralName}
                          onChange={(e) => setReferralName(e.target.value)}
                          placeholder="e.g. Omar Hassan"
                          className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Friend's Email *</label>
                        <input 
                          type="email"
                          value={referralEmail}
                          onChange={(e) => setReferralEmail(e.target.value)}
                          placeholder="omar@example.com"
                          className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Personal Note</label>
                      <textarea 
                        rows="2"
                        value={referralMessage}
                        onChange={(e) => setReferralMessage(e.target.value)}
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-black"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-2.5 rounded-xl font-bold text-sm transition shadow-sm"
                    >
                      Send Invitation
                    </button>
                  </form>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase">Or Share Personal Referral Link</label>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-xl p-2 bg-gray-50">
                      <input 
                        type="text" 
                        readOnly 
                        value="https://www.airbnb.com/r/host_referral_2026" 
                        className="flex-1 bg-transparent text-xs font-medium text-gray-800 outline-none px-2"
                      />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                      >
                        {copied ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
                        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- FEATURE 3: FIND A CO-HOST ---------------- */}
              {feature === 'findCoHost' && (
                <div className="space-y-6">
                  {selectedCoHost ? (
                    <form onSubmit={handleContactCoHostSubmit} className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b">
                        <div className="flex items-center gap-3">
                          <img src={selectedCoHost.avatar} alt={selectedCoHost.name} className="w-10 h-10 rounded-full object-cover border" />
                          <div>
                            <h4 className="font-bold text-sm text-gray-900">Contact {selectedCoHost.name}</h4>
                            <p className="text-xs text-gray-500">{selectedCoHost.location} · {selectedCoHost.rating}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => setSelectedCoHost(null)} className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1">
                          <FiArrowLeft /> Back
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Contact Email / Phone *</label>
                        <input 
                          type="text"
                          value={coHostContact}
                          onChange={(e) => setCoHostContact(e.target.value)}
                          placeholder="e.g. +20 100 123 4567 or email@domain.com"
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message / Listing Inquiry *</label>
                        <textarea 
                          rows="4"
                          value={coHostMessage}
                          onChange={(e) => setCoHostMessage(e.target.value)}
                          placeholder="Describe your property address, type, and how a co-host can assist you..."
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-bold text-sm transition shadow-md"
                      >
                        Send Inquiry to {selectedCoHost.name}
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Partner with a Verified Local Co-Host</h3>
                        <p className="text-xs text-gray-500">Co-hosts manage listing setup, guest messaging, check-ins, and cleaning.</p>
                      </div>

                      <div className="relative">
                        <FiSearch className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                        <input 
                          type="text"
                          value={coHostQuery}
                          onChange={(e) => setCoHostQuery(e.target.value)}
                          placeholder="Search by city (e.g. Alexandria, Zayed, Gouna, Dahab)"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                        {coHostsList.length === 0 ? (
                          <p className="text-xs text-gray-500 text-center py-6">No co-hosts found matching your query.</p>
                        ) : (
                          coHostsList.map((ch, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3.5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition">
                              <div className="flex items-center gap-3">
                                <img src={ch.avatar} alt={ch.name} className="w-11 h-11 rounded-full object-cover border" />
                                <div>
                                  <div className="font-bold text-sm text-gray-900">{ch.name} <span className="text-xs text-amber-600 ml-1">{ch.rating}</span></div>
                                  <div className="text-xs text-gray-500">{ch.location} · {ch.listings}</div>
                                  <p className="text-[11px] text-gray-400 mt-0.5">{ch.bio}</p>
                                </div>
                              </div>
                              <button 
                                type="button"
                                onClick={() => { setFormError(''); setSelectedCoHost(ch); }} 
                                className="border border-black px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-black hover:text-white transition flex-shrink-0"
                              >
                                Contact
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ---------------- FEATURE 4: GIFT CARDS ---------------- */}
              {feature === 'giftCards' && (
                <form onSubmit={handleGiftCardSubmit} className="space-y-5">
                  <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-6 rounded-3xl text-white space-y-2 shadow-lg">
                    <FiGift className="w-10 h-10 text-white/90" />
                    <h3 className="text-2xl font-black">Airbnb Gift Card</h3>
                    <p className="text-xs text-white/90">Give the gift of travel, stays, and experiences anywhere in the world.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase">Select Amount (USD)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['25', '50', '100', '250'].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => { setGiftAmount(amt); setCustomGiftAmount(''); }}
                          className={`py-2.5 rounded-xl border text-sm font-bold transition ${
                            giftAmount === amt ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black text-gray-800'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>

                    <div className="pt-1">
                      <input 
                        type="number"
                        placeholder="Or enter custom amount ($)"
                        value={customGiftAmount}
                        onChange={(e) => { setCustomGiftAmount(e.target.value); setGiftAmount('custom'); }}
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Recipient Name *</label>
                      <input 
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Recipient's Name"
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Recipient Email *</label>
                      <input 
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="recipient@email.com"
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Sender Name (Optional)</label>
                      <input 
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Personal Message</label>
                      <input 
                        type="text"
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Happy Travels!"
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl font-bold text-base transition shadow-md"
                  >
                    Purchase Gift Card (${giftAmount === 'custom' ? (customGiftAmount || '0') : giftAmount})
                  </button>
                </form>
              )}

              {/* ---------------- FEATURE 5: HELP CENTER ---------------- */}
              {feature === 'helpCenter' && (
                <div className="space-y-5">
                  {showSupportForm ? (
                    <form onSubmit={handleSupportFormSubmit} className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b">
                        <h3 className="font-bold text-gray-900 text-base">Contact Customer Support</h3>
                        <button type="button" onClick={() => setShowSupportForm(false)} className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1">
                          <FiArrowLeft /> Back to FAQs
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Inquiry Category</label>
                        <select 
                          value={supportCategory}
                          onChange={(e) => setSupportCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black bg-white"
                        >
                          <option value="Booking issue">Booking or Cancellation Issue</option>
                          <option value="Payment question">Payment & Refund Question</option>
                          <option value="Host inquiry">Hosting & Listing Assistance</option>
                          <option value="Safety & Security">Safety & Security Concern</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message / Issue Details *</label>
                        <textarea 
                          rows="4"
                          value={supportMessage}
                          onChange={(e) => setSupportMessage(e.target.value)}
                          placeholder="Describe what you need help with..."
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-3 rounded-xl font-bold text-sm transition shadow-md"
                      >
                        Submit Support Request
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FiHelpCircle className="w-6 h-6 text-[#FF385C]" />
                          <h3 className="text-xl font-bold text-gray-900">How can we help?</h3>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => { setFormError(''); setShowSupportForm(true); }}
                          className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg transition"
                        >
                          Contact Support
                        </button>
                      </div>

                      <div className="relative">
                        <FiSearch className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                        <input 
                          type="text"
                          value={searchHelp}
                          onChange={(e) => setSearchHelp(e.target.value)}
                          placeholder="Search help articles, policies, or booking issues..."
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                        {faqCategories.map((cat) => {
                          const filteredFaqs = cat.faqs.filter(f => 
                            !searchHelp || 
                            f.q.toLowerCase().includes(searchHelp.toLowerCase()) || 
                            f.a.toLowerCase().includes(searchHelp.toLowerCase())
                          );

                          if (filteredFaqs.length === 0) return null;

                          return (
                            <div key={cat.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                              <div className="bg-gray-50 px-4 py-2.5 font-bold text-xs text-gray-700 uppercase tracking-wide border-b border-gray-200">
                                {cat.title}
                              </div>
                              <div className="divide-y divide-gray-100">
                                {filteredFaqs.map((faq, idx) => {
                                  const faqKey = `${cat.id}-${idx}`;
                                  const isExpanded = expandedFaq === faqKey;
                                  return (
                                    <div key={idx} className="p-3.5 hover:bg-gray-50 transition cursor-pointer" onClick={() => setExpandedFaq(isExpanded ? null : faqKey)}>
                                      <div className="flex items-center justify-between font-semibold text-sm text-gray-900">
                                        <span>{faq.q}</span>
                                        {isExpanded ? <FiChevronUp className="w-4 h-4 text-gray-500" /> : <FiChevronDown className="w-4 h-4 text-gray-500" />}
                                      </div>
                                      {isExpanded && (
                                        <p className="text-xs text-gray-600 mt-2 leading-relaxed bg-white p-3 rounded-xl border border-gray-100">
                                          {faq.a}
                                        </p>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ---------------- FEATURE 6: TERMS & PRIVACY ---------------- */}
              {feature === 'termsPrivacy' && (
                <div className="space-y-4">
                  {/* Legal Subtabs */}
                  <div className="flex border-b border-gray-200 text-sm font-semibold gap-6">
                    <button 
                      onClick={() => setActiveLegalTab('terms')}
                      className={`pb-2 border-b-2 transition ${activeLegalTab === 'terms' ? 'border-black text-black' : 'border-transparent text-gray-500'}`}
                    >
                      Terms of Service
                    </button>
                    <button 
                      onClick={() => setActiveLegalTab('privacy')}
                      className={`pb-2 border-b-2 transition ${activeLegalTab === 'privacy' ? 'border-black text-black' : 'border-transparent text-gray-500'}`}
                    >
                      Privacy Policy
                    </button>
                    <button 
                      onClick={() => setActiveLegalTab('choices')}
                      className={`pb-2 border-b-2 transition ${activeLegalTab === 'choices' ? 'border-black text-black' : 'border-transparent text-gray-500'}`}
                    >
                      Your Privacy Choices
                    </button>
                  </div>

                  {activeLegalTab === 'terms' && (
                    <div className="space-y-3 text-xs text-gray-600 leading-relaxed max-h-[350px] overflow-y-auto pr-2">
                      <h4 className="font-bold text-sm text-gray-900">Airbnb Terms of Service (Updated 2026)</h4>
                      <p>Welcome to Airbnb! These Terms of Service constitute a legally binding agreement between you and Airbnb governing your access to and use of the Airbnb platform.</p>
                      <h5 className="font-semibold text-gray-800 text-xs">1. Guest Booking Obligations</h5>
                      <p>When you book a listing, you agree to pay all charges for your reservation including listing price, applicable taxes, service fees, and security deposits.</p>
                      <h5 className="font-semibold text-gray-800 text-xs">2. Host Standards & Rules</h5>
                      <p>As a host, you are responsible for maintaining listing accuracy, guest safety, clean accommodations, and honoring confirmed bookings.</p>
                    </div>
                  )}

                  {activeLegalTab === 'privacy' && (
                    <div className="space-y-3 text-xs text-gray-600 leading-relaxed max-h-[350px] overflow-y-auto pr-2">
                      <h4 className="font-bold text-sm text-gray-900">Airbnb Privacy Policy</h4>
                      <p>We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, store, and safeguard your data.</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>We collect information you provide (account details, government ID for verification).</li>
                        <li>Payment information is processed securely through encrypted gateways.</li>
                        <li>You can request account data export or deletion at any time.</li>
                      </ul>
                    </div>
                  )}

                  {activeLegalTab === 'choices' && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-sm text-gray-900">Manage Preference & Cookie Settings</h4>
                      <div className="space-y-3 border p-4 rounded-2xl bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-xs text-gray-900">Personalization Cookies</div>
                            <div className="text-[11px] text-gray-500">Tailors property recommendations based on past searches.</div>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={privacyChoices.personalization} 
                            onChange={(e) => setPrivacyChoices({...privacyChoices, personalization: e.target.checked})}
                            className="w-4 h-4 text-black rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                          <div>
                            <div className="font-bold text-xs text-gray-900">Performance & Analytics</div>
                            <div className="text-[11px] text-gray-500">Helps us improve search speed and website stability.</div>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={privacyChoices.analytics} 
                            onChange={(e) => setPrivacyChoices({...privacyChoices, analytics: e.target.checked})}
                            className="w-4 h-4 text-black rounded"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSuccessMessage('Your privacy preferences have been updated and saved.');
                          setStep(3);
                        }}
                        className="w-full bg-black hover:bg-gray-800 text-white py-2.5 rounded-xl font-bold text-xs transition"
                      >
                        Save Preferences
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ---------------- FEATURE 7: COMPANY INFO ---------------- */}
              {feature === 'companyInfo' && (
                <div className="space-y-4">
                  <div className="flex border-b border-gray-200 text-xs font-semibold gap-4 overflow-x-auto pb-2">
                    {['summer', 'newsroom', 'careers', 'investors'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveCompanyTab(tab)}
                        className={`capitalize whitespace-nowrap pb-1 border-b-2 transition ${activeCompanyTab === tab ? 'border-black text-black font-bold' : 'border-transparent text-gray-500'}`}
                      >
                        {tab === 'summer' ? '2026 Summer Release' : tab}
                      </button>
                    ))}
                  </div>

                  {activeCompanyTab === 'summer' && (
                    <div className="space-y-3 bg-rose-50/60 p-5 rounded-2xl border border-rose-100">
                      <span className="bg-[#FF385C] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">New Feature</span>
                      <h4 className="font-black text-lg text-gray-900">2026 Summer Release Overview</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Introducing Icons, Group Trip planning split-payments, direct messaging enhancements, and instant co-host matching across global cities.
                      </p>
                    </div>
                  )}

                  {activeCompanyTab === 'newsroom' && (
                    <div className="space-y-3 text-xs text-gray-600">
                      <h4 className="font-bold text-sm text-gray-900">Airbnb Newsroom & Press Releases</h4>
                      <div className="p-3 border rounded-xl bg-gray-50 space-y-1">
                        <div className="text-[10px] text-rose-600 font-bold uppercase">Press Release · Sept 2026</div>
                        <div className="font-bold text-gray-900 text-xs">Airbnb Expands Sustainable Tourism Grants in Egypt & North Africa</div>
                      </div>
                    </div>
                  )}

                  {activeCompanyTab === 'careers' && (
                    <div className="space-y-3 text-xs">
                      <h4 className="font-bold text-sm text-gray-900">Careers at Airbnb</h4>
                      <p className="text-gray-600">Join our remote-first global team building the future of travel and hospitality.</p>
                      <button 
                        onClick={() => {
                          setSuccessMessage('Thank you for your interest! Redirected to Airbnb Careers portal.');
                          setStep(3);
                        }}
                        className="bg-black text-white px-4 py-2 rounded-xl font-bold text-xs"
                      >
                        Explore Open Roles
                      </button>
                    </div>
                  )}

                  {activeCompanyTab === 'investors' && (
                    <div className="space-y-3 text-xs text-gray-600">
                      <h4 className="font-bold text-sm text-gray-900">Investor Relations (NASDAQ: ABNB)</h4>
                      <p>Access quarterly financial reports, shareholder presentations, and SEC filings.</p>
                    </div>
                  )}
                </div>
              )}

              {/* ---------------- FEATURE 8: SUPPORT & SAFETY ---------------- */}
              {feature === 'supportSafety' && (
                <div className="space-y-5">
                  <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 flex items-start gap-3">
                    <FiShield className="w-8 h-8 text-[#FF385C] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-base text-gray-900">Guest Safety & AirCover Protection</h3>
                      <p className="text-xs text-gray-600 leading-relaxed mt-0.5">
                        Your safety is our top priority. Access 24/7 emergency response support, safety reporting, and AirCover booking guarantee.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSafetyReportSubmit} className="space-y-4 border p-4 rounded-2xl bg-white">
                    <h4 className="font-bold text-sm text-gray-900 uppercase">Submit Urgent Safety / Neighborhood Report</h4>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Neighborhood / Property Address (Optional)</label>
                      <input 
                        type="text"
                        value={neighborhoodAddress}
                        onChange={(e) => setNeighborhoodAddress(e.target.value)}
                        placeholder="e.g. Building 12, El Gouna Marina"
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Issue Description *</label>
                      <textarea 
                        rows="3"
                        value={safetyReportMessage}
                        onChange={(e) => setSafetyReportMessage(e.target.value)}
                        placeholder="Describe the safety concern, unauthorized party, or emergency issue..."
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-black"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-2.5 rounded-xl font-bold text-xs transition shadow-sm"
                    >
                      Report Safety Issue
                    </button>
                  </form>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default InfoFeatureModal;
