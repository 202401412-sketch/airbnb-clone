import React, { useState } from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { 
  FiLock, FiShield, FiCheckCircle, FiArrowLeft, FiChevronRight, 
  FiCheck, FiSliders, FiFileText, FiInfo 
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';
import Footer from '../components/Footer.jsx';

const PrivacyPage = ({ onNavigate, onOpenLangModal }) => {
  const { dir } = useLanguage();
  const [activeSection, setActiveSection] = useState('collection');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [privacyChoices, setPrivacyChoices] = useState({
    personalization: true,
    analytics: true,
    targetedAds: false
  });

  const sections = [
    { id: 'collection', title: '1. Information We Collect' },
    { id: 'usage', title: '2. How We Use Your Data' },
    { id: 'sharing', title: '3. Data Sharing & Third Parties' },
    { id: 'rights', title: '4. Your Data Protection Rights' },
    { id: 'choices', title: '5. Your Privacy Choices & Cookies' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSaveChoices = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
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
            <span className="text-xs font-bold text-gray-500 border-l border-gray-300 pl-2 ml-1">Privacy Policy</span>
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
          <span className="text-gray-900 font-bold">Privacy Policy & Cookie Preferences</span>
        </div>

        {/* Page Hero Header */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-rose-600">
            <FiLock className="w-8 h-8" />
            <span className="text-xs font-bold uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-md border border-rose-100">Airbnb Legal Document</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Airbnb Privacy Policy</h1>
          <p className="text-xs text-gray-500 font-medium">Last updated: January 2026 · Effective for all global members and visitors</p>
        </div>

        {/* Layout Grid: Sidebar TOC + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sticky top-28 space-y-4 shadow-sm">
              <h3 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Table of Contents</h3>
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

          {/* Main Privacy Policy Text */}
          <div className="lg:col-span-3 space-y-10 bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm">
            
            {/* Section 1 */}
            <section id="collection" className="space-y-4 border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                When you use the Airbnb platform, we collect information you provide directly to us, as well as data gathered automatically during your navigation.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li><strong>Account Data:</strong> Name, email address, phone number, government identity verification, and profile photos.</li>
                <li><strong>Payment Information:</strong> Financial transaction data, payment card tokens, and billing address.</li>
                <li><strong>Log & Device Data:</strong> IP address, browser type, operating system, and timestamp logs.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="usage" className="space-y-4 border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Data</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                We utilize your personal information to operate, improve, and personalize your experience on Airbnb:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-gray-50 border rounded-2xl space-y-1">
                  <h4 className="font-bold text-xs text-gray-900">Booking Processing</h4>
                  <p className="text-xs text-gray-600">Connecting guests and hosts, facilitating check-ins, and sending reservation updates.</p>
                </div>
                <div className="p-4 bg-gray-50 border rounded-2xl space-y-1">
                  <h4 className="font-bold text-xs text-gray-900">Security & AirCover</h4>
                  <p className="text-xs text-gray-600">Fraud prevention, guest verification, identity checks, and AirCover claim evaluation.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="sharing" className="space-y-4 border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900">3. Data Sharing & Third Parties</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                We never sell your personal data. We share necessary details only to fulfill bookings (e.g., sharing guest name with host) or when mandated by legal authorities.
              </p>
            </section>

            {/* Section 4 */}
            <section id="rights" className="space-y-4 border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900">4. Your Data Protection Rights</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                You have the right to request access to your stored personal data, correct inaccuracies, or request complete account deletion under applicable data privacy laws (GDPR, CCPA).
              </p>
            </section>

            {/* Section 5: Interactive Privacy Choices */}
            <section id="choices" className="space-y-6 pt-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">5. Your Privacy Choices & Cookie Settings</h2>
                <p className="text-xs text-gray-500 mt-1">Manage your tracking preferences directly below.</p>
              </div>

              {savedSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <FiCheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Your privacy choices have been updated and saved to your browser session.</span>
                </div>
              )}

              <form onSubmit={handleSaveChoices} className="space-y-4 border p-6 rounded-3xl bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Personalization Cookies</h4>
                    <p className="text-xs text-gray-500">Customizes property recommendations based on your recent searches.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={privacyChoices.personalization} 
                    onChange={(e) => setPrivacyChoices({...privacyChoices, personalization: e.target.checked})}
                    className="w-5 h-5 text-black rounded accent-black"
                  />
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Analytics & Performance</h4>
                    <p className="text-xs text-gray-500">Helps us evaluate site speed, error logging, and listing loading times.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={privacyChoices.analytics} 
                    onChange={(e) => setPrivacyChoices({...privacyChoices, analytics: e.target.checked})}
                    className="w-5 h-5 text-black rounded accent-black"
                  />
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Targeted Advertising</h4>
                    <p className="text-xs text-gray-500">Allows partner networks to show relevant travel deals across third-party sites.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={privacyChoices.targetedAds} 
                    onChange={(e) => setPrivacyChoices({...privacyChoices, targetedAds: e.target.checked})}
                    className="w-5 h-5 text-black rounded accent-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-bold text-xs transition shadow-sm mt-2"
                >
                  Save Privacy Preferences
                </button>
              </form>
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

export default PrivacyPage;
