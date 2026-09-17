import React, { useState } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { 
  FiFileText, FiShield, FiArrowLeft, FiChevronRight, FiCheck 
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import Footer from '../components/Footer.jsx';

const TermsPage = ({ onNavigate, onOpenLangModal }) => {
  const { dir } = useLanguage();
  const [activeSection, setActiveSection] = useState('guest');

  const sections = [
    { id: 'guest', title: '1. Guest Terms & Bookings' },
    { id: 'host', title: '2. Host Responsibilities & Standards' },
    { id: 'payment', title: '3. Service Fees & Payment Terms' },
    { id: 'cancel', title: '4. Cancellations & Extenuating Circumstances' },
    { id: 'liability', title: '5. Liability & Dispute Resolution' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between" dir={dir}>
      
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div 
            onClick={() => onNavigate && onNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer text-[#FF385C]"
          >
            <FaAirbnb className="w-8 h-8" />
            <span className="font-black text-xl tracking-tighter hidden sm:inline">airbnb</span>
            <span className="text-xs font-bold text-gray-500 border-l border-gray-300 pl-2 ml-1">Terms of Service</span>
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
          <span className="text-gray-900 font-bold">Terms of Service Agreement</span>
        </div>

        {/* Page Hero Header */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-rose-600">
            <FiFileText className="w-8 h-8" />
            <span className="text-xs font-bold uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-md border border-rose-100">Official Terms</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Airbnb Terms of Service</h1>
          <p className="text-xs text-gray-500 font-medium">Effective Date: January 1, 2026 · Governing all stays, experiences, and platform usage globally</p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* TOC Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sticky top-28 space-y-4 shadow-sm">
              <h3 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Navigation</h3>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                      activeSection === sec.id ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{sec.title}</span>
                    {activeSection === sec.id && <FiCheck className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Legal Text Content */}
          <div className="lg:col-span-3 space-y-10 bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm">
            
            <section id="guest" className="space-y-4 border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900">1. Guest Terms & Bookings</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                When you confirm a booking on Airbnb, you enter into a direct contract with the host. You agree to pay all total charges including nightly rate, service fee, and taxes.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Guests must follow property house rules set by the host (check-in times, noise limits, guest caps).</li>
                <li>Damage or unauthorized extra guests may result in security deposit charges under AirCover for Hosts.</li>
              </ul>
            </section>

            <section id="host" className="space-y-4 border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900">2. Host Responsibilities & Standards</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Hosts are responsible for providing accurate property descriptions, maintaining safe & clean premises, honoring confirmed bookings, and complying with local rental laws.
              </p>
            </section>

            <section id="payment" className="space-y-4 border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900">3. Service Fees & Payment Terms</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Airbnb charges a guest service fee (typically ~14% of the subtotal) to cover 24/7 customer support, platform maintenance, and AirCover guarantees.
              </p>
            </section>

            <section id="cancel" className="space-y-4 border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900">4. Cancellations & Extenuating Circumstances</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Cancellation refunds are determined by the host policy selected for the listing. In rare cases of major government travel restrictions or declared disasters, Airbnb's Major Extenuating Circumstances policy applies.
              </p>
            </section>

            <section id="liability" className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">5. Liability & Dispute Resolution</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Airbnb is not liable for indirect damages arising from accommodation stays. Disputes are resolved via binding arbitration or small claims court where applicable.
              </p>
            </section>

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

export default TermsPage;
