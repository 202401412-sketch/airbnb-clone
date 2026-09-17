import React, { useState } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { 
  FiShield, FiPhone, FiAlertTriangle, FiArrowLeft, FiChevronRight, FiCheckCircle, FiSend 
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import Footer from '../components/Footer.jsx';

const SupportSafetyPage = ({ onNavigate, onOpenLangModal }) => {
  const { dir } = useLanguage();
  const [activeTab, setActiveTab] = useState('aircover');
  const [reportAddress, setReportAddress] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportDetails.trim()) return;
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportDetails('');
      setReportAddress('');
    }, 4000);
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
            <span className="text-xs font-bold text-gray-500 border-l border-gray-300 pl-2 ml-1">Safety & AirCover</span>
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
          <span className="text-gray-900 font-bold">Safety, AirCover & Neighborhood Support</span>
        </div>

        {/* Hero Header */}
        <div className="bg-rose-500 text-white rounded-3xl p-8 md:p-14 shadow-xl space-y-4 relative overflow-hidden">
          <FiShield className="w-12 h-12 text-white/90" />
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">AirCover & Guest Safety</h1>
          <p className="text-sm md:text-base text-rose-100 max-w-2xl font-medium">
            Every booking comes with AirCover for Guests — comprehensive protection against host cancellations, listing inaccuracies, and safety concerns.
          </p>
        </div>

        {/* Navigation Subtabs */}
        <div className="flex border-b border-gray-200 gap-6 text-sm font-bold overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'aircover', label: 'AirCover Guarantee' },
            { id: 'safety', label: 'Safety & 24/7 Line' },
            { id: 'neighborhood', label: 'Report Neighborhood Concern' },
            { id: 'disability', label: 'Disability & Accessibility' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 border-b-2 whitespace-nowrap transition ${
                activeTab === tab.id ? 'border-[#FF385C] text-[#FF385C]' : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Panels */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-6">
          
          {activeTab === 'aircover' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h2 className="text-2xl font-black text-gray-900">Always Included, Always Free</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border rounded-3xl bg-gray-50 space-y-2">
                  <h4 className="font-bold text-base text-gray-900">Booking Protection Guarantee</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">If a host cancels your reservation within 30 days of check-in, we will find you a similar or better home or refund 100% of your money.</p>
                </div>

                <div className="p-6 border rounded-3xl bg-gray-50 space-y-2">
                  <h4 className="font-bold text-base text-gray-900">Check-in Guarantee</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">If you can’t check in to your home and the host cannot resolve the issue, we will rehouse you or issue a full refund.</p>
                </div>

                <div className="p-6 border rounded-3xl bg-gray-50 space-y-2">
                  <h4 className="font-bold text-base text-gray-900">Get-What-You-Booked Guarantee</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">If at any time during your stay you find your space isn’t as advertised (e.g. broken AC or missing bedrooms), report it within 72 hours for immediate rehousing or refund.</p>
                </div>

                <div className="p-6 border rounded-3xl bg-gray-50 space-y-2">
                  <h4 className="font-bold text-base text-gray-900">24-Hour Safety Line</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">If you ever feel unsafe, you get priority access to specially trained safety agents, day or night.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-gray-900 text-white rounded-3xl p-8 space-y-4">
                <FiPhone className="w-10 h-10 text-rose-400" />
                <h3 className="text-2xl font-bold">24/7 Global Safety Hotline</h3>
                <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
                  If you are in immediate danger, always call local emergency services first. For urgent safety escalation during an active Airbnb stay, our dedicated safety response line is available 24/7.
                </p>
                <div className="text-lg font-bold text-rose-400">+1 (888) 555-AIRB</div>
              </div>
            </div>
          )}

          {activeTab === 'neighborhood' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Report a Neighborhood Concern</h2>
                <p className="text-xs text-gray-500 mt-1">Neighbors can report unauthorized parties, excessive noise, or safety concerns regarding an active Airbnb listing.</p>
              </div>

              {reportSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl text-emerald-800 text-center space-y-2">
                  <FiCheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-base">Report Submitted to Trust & Safety Team</h3>
                  <p className="text-xs text-gray-600">Case reference #NR-74920. Our local field team will investigate immediately.</p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-4 max-w-2xl border p-6 rounded-3xl bg-gray-50">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Property Address / Neighborhood *</label>
                    <input 
                      type="text"
                      value={reportAddress}
                      onChange={(e) => setReportAddress(e.target.value)}
                      placeholder="e.g. Building 14, Marina 2, El Gouna"
                      className="w-full p-3 border border-gray-300 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Issue Details *</label>
                    <textarea 
                      rows="4"
                      value={reportDetails}
                      onChange={(e) => setReportDetails(e.target.value)}
                      placeholder="Describe noise, party, parking disruption, or safety issue..."
                      className="w-full p-3 border border-gray-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-black"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-3 rounded-xl font-bold text-xs transition shadow-sm"
                  >
                    Submit Neighborhood Concern
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'disability' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h2 className="text-2xl font-black text-gray-900">Accessibility & Disability Support</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Airbnb evaluates step-free access, wide doorways, roll-in showers, and accessibility features on listings to support guests with mobility needs.
              </p>
            </div>
          )}

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

export default SupportSafetyPage;
