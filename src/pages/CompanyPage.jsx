import React, { useState } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { 
  FiGlobe, FiTrendingUp, FiBriefcase, FiHeart, FiGift, FiArrowLeft, FiChevronRight, FiCheckCircle 
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import Footer from '../components/Footer.jsx';

const CompanyPage = ({ onNavigate, onOpenLangModal }) => {
  const { dir } = useLanguage();
  const [activeTab, setActiveTab] = useState('summer');

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
            <span className="text-xs font-bold text-gray-500 border-l border-gray-300 pl-2 ml-1">About & Newsroom</span>
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
          <span className="text-gray-900 font-bold">About Airbnb & Company Updates</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl p-8 md:p-14 shadow-xl space-y-4 relative overflow-hidden">
          <span className="bg-rose-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-md tracking-wider">Airbnb Newsroom</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Belong Anywhere</h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl font-medium">
            Airbnb was born in 2007 when two hosts welcomed three guests to their San Francisco home. Today, millions of hosts have welcomed over 1.5 billion guest arrivals worldwide.
          </p>
        </div>

        {/* Company Subtabs */}
        <div className="flex border-b border-gray-200 gap-6 text-sm font-bold overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'summer', label: '2026 Summer Release' },
            { id: 'newsroom', label: 'Newsroom & Press' },
            { id: 'careers', label: 'Careers' },
            { id: 'investors', label: 'Investors (NASDAQ: ABNB)' },
            { id: 'emergency', label: 'Airbnb.org Emergency Stays' },
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

        {/* Tab Content Panels */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-6">
          
          {activeTab === 'summer' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 space-y-2">
                <span className="text-[#FF385C] font-extrabold text-xs uppercase tracking-wider">Release Announcement</span>
                <h2 className="text-2xl font-black text-gray-900">Introducing Icons & Group Trip Planning</h2>
                <p className="text-xs text-gray-700 leading-relaxed">
                  The 2026 Summer Release brings extraordinary experiences hosted by the greatest names in music, film, art, and sports, alongside split-payment group trip planning tools.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 border rounded-2xl space-y-2">
                  <FiGlobe className="w-6 h-6 text-[#FF385C]" />
                  <h4 className="font-bold text-sm">Icons Experience</h4>
                  <p className="text-xs text-gray-500">Stay in iconic locations like the Musée d’Orsay or Up House replica.</p>
                </div>
                <div className="p-5 border rounded-2xl space-y-2">
                  <FiTrendingUp className="w-6 h-6 text-[#FF385C]" />
                  <h4 className="font-bold text-sm">Group Payments</h4>
                  <p className="text-xs text-gray-500">Split listing reservation costs seamlessly among group guests.</p>
                </div>
                <div className="p-5 border rounded-2xl space-y-2">
                  <FiBriefcase className="w-6 h-6 text-[#FF385C]" />
                  <h4 className="font-bold text-sm">Host Earnings Dashboard</h4>
                  <p className="text-xs text-gray-500">Upgraded financial analytics and instant payout processing for hosts.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'newsroom' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h2 className="text-2xl font-black text-gray-900">Latest Airbnb News</h2>
              <div className="space-y-4">
                {[
                  { title: 'Airbnb Announces $10M Community Grant Program for Heritage Sites in Egypt', date: 'Sept 14, 2026' },
                  { title: 'Global Travel Trends 2026: Coastal Villages & Cultural Eco-Lodges Lead Growth', date: 'August 28, 2026' },
                  { title: 'AirCover Expands Damage Protection to $3 Million for All Global Hosts', date: 'July 15, 2026' },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 border border-gray-200 rounded-2xl hover:border-black transition space-y-1">
                    <span className="text-[10px] font-bold text-rose-600 uppercase">{item.date}</span>
                    <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'careers' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h2 className="text-2xl font-black text-gray-900">Live & Work Anywhere</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Airbnb’s design and engineering teams work remotely from over 80 countries. Join us to build human connection through travel.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 border rounded-2xl bg-gray-50 space-y-2">
                  <h4 className="font-bold text-sm text-gray-900">Senior Frontend Engineer (React / Next.js)</h4>
                  <span className="text-xs text-gray-500">Remote · Global Engineering</span>
                </div>
                <div className="p-5 border rounded-2xl bg-gray-50 space-y-2">
                  <h4 className="font-bold text-sm text-gray-900">Product Manager — Guest Experience</h4>
                  <span className="text-xs text-gray-500">Remote · Product Team</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'investors' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h2 className="text-2xl font-black text-gray-900">Investor Relations (NASDAQ: ABNB)</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Access Q2 2026 financial earnings reports, quarterly investor calls, ESG sustainability reports, and SEC filings.
              </p>
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 space-y-2">
                <FiHeart className="w-8 h-8 text-emerald-600" />
                <h2 className="text-2xl font-black text-gray-900">Airbnb.org Emergency Stays</h2>
                <p className="text-xs text-gray-700 leading-relaxed">
                  An independent non-profit partnering with hosts to provide free temporary housing to refugees, disaster survivors, and relief workers in times of crisis.
                </p>
              </div>
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

export default CompanyPage;
