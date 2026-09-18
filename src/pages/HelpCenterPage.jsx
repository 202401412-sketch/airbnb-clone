import React, { useState } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { 
  FiSearch, FiHelpCircle, FiShield, FiFileText, FiPhone, FiMail, 
  FiChevronRight, FiChevronDown, FiArrowLeft, FiCheckCircle, FiMessageSquare,
  FiHome, FiLock, FiAlertTriangle
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import Footer from '../components/Footer.jsx';

const HelpCenterPage = ({ onNavigate, onOpenLangModal, onOpenAuth }) => {
  const { dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketCategory, setTicketCategory] = useState('Reservation issue');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const categories = [
    { id: 'all', name: 'All Topics', icon: FiHelpCircle },
    { id: 'booking', name: 'Booking & Cancellation', icon: FiFileText },
    { id: 'aircover', name: 'AirCover & Safety', icon: FiShield },
    { id: 'hosting', name: 'Hosting & Listing', icon: FiHome },
    { id: 'payments', name: 'Payments & Refunds', icon: FiLock },
  ];

  const faqs = [
    {
      cat: 'booking',
      q: 'How do I cancel my reservation and get a refund?',
      a: 'Go to Trips, select your reservation, and click "Cancel reservation". The refund amount depends on your host’s cancellation policy (Flexible, Moderate, or Strict). Eligible refunds are automatically credited to your payment method within 3–5 business days.'
    },
    {
      cat: 'booking',
      q: 'Can I change the dates or guest count of my booking?',
      a: 'Yes, go to Trips > Change reservation. Send a request to your host specifying new dates or guests. Once accepted by the host, the reservation updates and any price adjustment is calculated.'
    },
    {
      cat: 'aircover',
      q: 'What does AirCover for Guests cover?',
      a: 'AirCover for Guests is included with every booking. It covers Booking Protection (if host cancels within 30 days), Check-in Guarantee (if listing isn’t as advertised), Get-What-You-Booked Guarantee, and 24/7 Safety Line support.'
    },
    {
      cat: 'aircover',
      q: 'What should I do if I feel unsafe at a listing?',
      a: 'If you are in immediate danger, contact local emergency services immediately. You can also call Airbnb’s 24/7 Safety Line directly from the app or Help Center to reach specialized safety agents.'
    },
    {
      cat: 'hosting',
      q: 'How do I become a host and list my property?',
      a: 'Click "Become a Host" in the top navigation bar. Complete the step-by-step setup form with photos, location, pricing, and house rules. Once published, your listing becomes visible to millions of global guests.'
    },
    {
      cat: 'payments',
      q: 'What payment methods does Airbnb accept?',
      a: 'Airbnb supports major credit cards (Visa, MasterCard, Amex), debit cards, Apple Pay, Google Pay, PayPal, and regional bank transfer options depending on your location.'
    },
  ];

  const filteredFaqs = faqs.filter(f => {
    const matchCat = activeCategory === 'all' || f.cat === activeCategory;
    const matchSearch = !searchQuery || f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketMessage('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between" dir={dir}>
      
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div 
            onClick={() => onNavigate && onNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer text-[#FF385C]"
          >
            <FaAirbnb className="w-8 h-8" />
            <span className="font-black text-xl tracking-tighter hidden sm:inline">airbnb</span>
            <span className="text-xs font-bold text-gray-500 border-l border-gray-300 pl-2 ml-1">Help Center</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate && onNavigate('home')}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-black border border-gray-300 hover:border-black px-4 py-2 rounded-full transition"
            >
              <FiArrowLeft />
              <span>Back to Homes & Stays</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <span className="hover:underline cursor-pointer" onClick={() => onNavigate && onNavigate('home')}>Home</span>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-bold">Help Center & Community Support</span>
        </div>

        {/* Hero Banner with Search */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-8 md:p-14 text-white space-y-6 shadow-xl text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">How can we help you?</h1>
            <p className="text-sm md:text-base text-rose-100 font-medium">
              Search help topics, booking guidance, cancellation policies, or safety standards.
            </p>

            <div className="relative max-w-xl mx-auto pt-2">
              <FiSearch className="absolute left-4 top-6 text-gray-400 w-5 h-5" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, cancellation, refunds, or safety..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-sm font-medium outline-none shadow-lg focus:ring-4 focus:ring-rose-200"
              />
            </div>
          </div>
        </div>

        {/* Topic Categories Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Explore Help Topics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`p-4 rounded-2xl border text-left flex flex-col items-center sm:items-start gap-3 transition ${
                    isActive 
                      ? 'border-black bg-white shadow-md ring-2 ring-black/10' 
                      : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${isActive ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-900">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout: FAQs + Support Ticket Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: FAQs */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>

            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center bg-white border border-gray-200 rounded-3xl space-y-2">
                <FiHelpCircle className="w-10 h-10 text-gray-400 mx-auto" />
                <h4 className="font-bold text-gray-800 text-base">No matching help articles found</h4>
                <p className="text-xs text-gray-500">Try adjusting your search terms or select another topic category above.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq, idx) => {
                  const isExpanded = expandedFaq === idx;
                  return (
                    <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition">
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-gray-900 hover:bg-gray-50"
                      >
                        <span>{faq.q}</span>
                        {isExpanded ? <FiChevronDown className="w-5 h-5 text-gray-500" /> : <FiChevronRight className="w-5 h-5 text-gray-400" />}
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-gray-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Contact Support Form & 24/7 Hotline */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-3 border-b pb-4">
                <FiMessageSquare className="w-6 h-6 text-[#FF385C]" />
                <div>
                  <h3 className="font-bold text-base text-gray-900">Submit a Support Request</h3>
                  <p className="text-xs text-gray-500">Our 24/7 team responds within 30 minutes.</p>
                </div>
              </div>

              {ticketSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <FiCheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-sm text-gray-900">Support Ticket Created!</h4>
                  <p className="text-xs text-gray-600">Reference #TK-84920. We will reply to your registered account email.</p>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Issue Category</label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-black bg-white"
                    >
                      <option value="Reservation issue">Reservation & Dates Issue</option>
                      <option value="Cancellation">Cancellation & Refund Request</option>
                      <option value="Host inquiry">Host Communication Issue</option>
                      <option value="Safety">Safety & AirCover Claim</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Details *</label>
                    <textarea
                      rows="4"
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      placeholder="Describe your issue or booking number..."
                      className="w-full p-3 border border-gray-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-black"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-3 rounded-xl font-bold text-xs transition shadow-sm"
                  >
                    Submit Ticket
                  </button>
                </form>
              )}
            </div>

            {/* 24/7 Phone Support Card */}
            <div className="bg-gray-900 text-white rounded-3xl p-6 space-y-3 shadow-md">
              <FiPhone className="w-8 h-8 text-rose-400" />
              <h4 className="font-bold text-base">24/7 Urgent Safety Helpline</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Need immediate help during an active reservation? Call our global support team directly.
              </p>
              <div className="text-sm font-bold text-rose-400 pt-1">+1 (888) 555-AIRB</div>
            </div>
          </div>

        </div>

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

export default HelpCenterPage;
