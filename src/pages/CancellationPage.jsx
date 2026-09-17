import React, { useState } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { 
  FiClock, FiShield, FiDollarSign, FiArrowLeft, FiChevronRight, FiCheckCircle 
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import Footer from '../components/Footer.jsx';

const CancellationPage = ({ onNavigate, onOpenLangModal }) => {
  const { dir } = useLanguage();
  const [selectedPolicy, setSelectedPolicy] = useState('flexible');

  const policies = [
    {
      id: 'flexible',
      title: 'Flexible Policy',
      badge: 'Most Popular',
      desc: 'Full refund up to 24 hours before check-in.',
      details: [
        'Cancel up to 24 hours before check-in for a 100% full refund of nightly rate and cleaning fee.',
        'If canceled less than 24 hours before check-in, the first night is non-refundable.',
        'Service fee is fully refunded if canceled within 48 hours of booking.'
      ]
    },
    {
      id: 'moderate',
      title: 'Moderate Policy',
      badge: 'Balanced',
      desc: 'Full refund up to 5 days before check-in.',
      details: [
        'Cancel up to 5 days before check-in for a 100% full refund.',
        'If canceled within 5 days of check-in, the first night + 50% of remaining nights are refunded.',
        'Cleaning fee is always refunded if canceled before check-in.'
      ]
    },
    {
      id: 'firm',
      title: 'Firm Policy',
      badge: 'Standard',
      desc: 'Full refund up to 30 days before check-in.',
      details: [
        'Full refund if canceled at least 30 days before check-in.',
        'If canceled between 7 and 30 days before check-in, 50% refund for all nights.'
      ]
    },
    {
      id: 'strict',
      title: 'Strict Policy',
      badge: 'Non-Flexible',
      desc: 'Full refund within 48 hours of booking if check-in is 14+ days away.',
      details: [
        'Guests must cancel within 48 hours of booking and at least 14 days before check-in to get a full refund.',
        'If canceled between 7 and 14 days before check-in, 50% refund.'
      ]
    }
  ];

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
            <span className="text-xs font-bold text-gray-500 border-l border-gray-300 pl-2 ml-1">Cancellation Options</span>
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
          <span className="text-gray-900 font-bold">Cancellation & Refund Policy Guide</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-600">
            <FiClock className="w-8 h-8" />
            <span className="text-xs font-bold uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-md border border-rose-100">Guest Protection</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Cancellation & Refund Policies</h1>
          <p className="text-sm text-gray-600 max-w-2xl font-medium">
            Hosts select a cancellation policy for their listing. Learn how refunds are calculated based on your check-in timeline.
          </p>
        </div>

        {/* Policy Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {policies.map((p) => {
            const isSelected = selectedPolicy === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPolicy(p.id)}
                className={`p-6 rounded-3xl border text-left transition flex flex-col justify-between ${
                  isSelected 
                    ? 'border-black bg-white shadow-md ring-2 ring-black/10' 
                    : 'border-gray-200 bg-white hover:border-gray-400'
                }`}
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-700">{p.badge}</span>
                  <h3 className="font-bold text-lg text-gray-900">{p.title}</h3>
                  <p className="text-xs text-gray-600">{p.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Policy Breakdown */}
        {(() => {
          const activeObj = policies.find(p => p.id === selectedPolicy) || policies[0];
          return (
            <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-6 animate-in fade-in duration-200">
              <h2 className="text-2xl font-black text-gray-900">Detailed Breakdown: {activeObj.title}</h2>
              <ul className="space-y-3">
                {activeObj.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <FiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}

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

export default CancellationPage;
