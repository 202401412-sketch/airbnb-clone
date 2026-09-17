import React, { useState } from 'react';
import { 
  FiBriefcase, FiCheckCircle, FiUsers, FiFileText, 
  FiShield, FiArrowRight, FiCheck, FiX, FiSend, FiTrendingUp,
  FiCalendar, FiCreditCard, FiUserCheck, FiChevronDown, FiClock, FiLock, FiGlobe,
  FiStar, FiPlus, FiMessageSquare, FiUserPlus, FiDownload, FiSearch, FiWifi, FiHeadphones
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext.jsx';

const VantageBusiness = ({ onNavigate, onSelectAmenity }) => {
  const { dir } = useLanguage();

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    teamSize: '1-10',
    phone: ''
  });

  // Feature Interactive Modals
  const [activeFeatureModal, setActiveFeatureModal] = useState(null);

  // Live Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! Welcome to Vantage Business Support. How can we assist your team today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Invoice Generator State
  const [invoiceDownloaded, setInvoiceDownloaded] = useState(false);

  // Calculator States
  const [employeesCount, setEmployeesCount] = useState(15);
  const [tripsPerYear, setTripsPerYear] = useState(4);

  // Interactive Dashboard States
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Interactive Bookings State
  const [bookings, setBookings] = useState([
    { id: 1, name: 'Sarah Jenkins', role: 'Product Lead', stay: 'San Francisco Loft', dates: 'Sep 20 - Sep 25', status: 'Confirmed' },
    { id: 2, name: 'Michael Chen', role: 'Engineering Lead', stay: 'London Executive Suite', dates: 'Oct 02 - Oct 08', status: 'Pending Approval' }
  ]);

  // Interactive Team Members State
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Sarah Jenkins', email: 'sarah@tech.com', role: 'Travel Manager' },
    { name: 'Michael Chen', email: 'michael@tech.com', role: 'Employee' }
  ]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Employee' });

  // Interactive Testimonials / Comments State
  const [reviews, setReviews] = useState([
    {
      quote: "Vantage Business cut our travel administrative time by 60%. Managing bookings and consolidated invoicing is now effortless.",
      name: "Sarah Jenkins",
      role: "Head of People & HR",
      company: "Nexus Tech",
      rating: 5
    },
    {
      quote: "The guaranteed 18% corporate savings helped us save over $24,000 in our first year alone. Highly recommended!",
      name: "Marcus Vance",
      role: "VP of Finance",
      company: "Global Logistics",
      rating: 5
    }
  ]);
  const [newReview, setNewReview] = useState({ quote: '', name: '', role: '', company: '', rating: 5 });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // FAQ State
  const [openFaq, setOpenFaq] = useState(null);

  // Calculations
  const avgTripCost = 450;
  const totalAnnualSpend = employeesCount * tripsPerYear * avgTripCost;
  const estimatedSavings = Math.round(totalAnnualSpend * 0.18);

  const features = [
    {
      id: 'work_ready',
      icon: <FiBriefcase className="w-6 h-6 text-[#FF385C]" />,
      title: 'Work Ready Places',
      desc: 'Top-rated stays with high-speed Wi-Fi, dedicated workspaces, and self check-in.',
      actionText: 'Search Work-Ready Stays'
    },
    {
      id: 'billing',
      icon: <FiFileText className="w-6 h-6 text-[#FF385C]" />,
      title: 'Centralized Billing',
      desc: 'Easily track corporate travel expenses with automated expensing and invoice generation.',
      actionText: 'Generate Demo Invoice'
    },
    {
      id: 'team',
      icon: <FiUsers className="w-6 h-6 text-[#FF385C]" />,
      title: 'Team Management',
      desc: 'Manage travel permissions, itineraries, and reporting for your whole organization.',
      actionText: 'Manage Team Access'
    },
    {
      id: 'support',
      icon: <FiShield className="w-6 h-6 text-[#FF385C]" />,
      title: '24/7 Premium Support',
      desc: 'Dedicated support team ready to assist your business travelers around the clock.',
      actionText: 'Open Live Support'
    }
  ];

  const faqs = [
    {
      q: 'How does corporate billing work on Vantage?',
      a: 'Companies can set up a central payment method or monthly invoicing. Employees book within approved budgets without using personal funds.'
    },
    {
      q: 'Can we integrate Vantage with our existing expense tools?',
      a: 'Yes! Vantage integrates smoothly with leading expense tools like Concur, Expensify, and QuickBooks for auto-receipt sync.'
    },
    {
      q: 'What is the cancellation policy for business travel?',
      a: 'Vantage stays offer flexible corporate cancellation options up to 24 hours before check-in for hassle-free itinerary changes.'
    },
    {
      q: 'Is there a minimum number of employees required?',
      a: 'No minimum required! Vantage Business works for small startups with 2 travelers up to enterprise organizations with thousands.'
    }
  ];

  // Actions
  const handleApproveBooking = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMember.name && newMember.email) {
      setTeamMembers([...teamMembers, newMember]);
      setNewMember({ name: '', email: '', role: 'Employee' });
      setShowAddMember(false);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReview.quote && newReview.name) {
      setReviews([newReview, ...reviews]);
      setNewReview({ quote: '', name: '', role: '', company: '', rating: 5 });
      setShowReviewForm(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'An enterprise support agent has received your query. We will contact your admin team shortly!' }
      ]);
    }, 1200);
  };

  const handleExploreStays = () => {
    if (onSelectAmenity) onSelectAmenity('Wi-Fi');
    if (onNavigate) {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({ companyName: '', workEmail: '', teamSize: '1-10', phone: '' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-16" dir={dir}>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 px-6 md:px-12 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <FiBriefcase className="w-3.5 h-3.5" />
              VANTAGE BUSINESS TRAVEL
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Elevate Your Corporate <br />
              <span className="text-[#FF385C]">Travel Experience</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Simplified team travel management, work-ready accommodations, and seamless corporate billing for modern organizations.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleExploreStays}
                className="bg-[#FF385C] hover:bg-rose-600 text-white font-bold px-6 py-3.5 rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Business Stays</span>
                <FiArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl transition border border-slate-700 cursor-pointer"
              >
                Register Your Company
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-slate-800/60 p-8 rounded-3xl border border-slate-700/80 shadow-2xl backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Vantage Enterprise Pass</span>
              </div>
              <p className="text-2xl font-bold text-white">Work-ready stays with guaranteed high-speed Wi-Fi</p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <FiCheck className="text-emerald-400" /> Automated expensing with corporate cards
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="text-emerald-400" /> Flexible cancellation for changing schedules
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="text-emerald-400" /> Centralized admin dashboard for travel managers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Bar */}
      <div className="bg-white border-b border-gray-200 py-6 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <FiShield className="w-5 h-5 text-[#FF385C]" />
            <span className="text-xs font-bold">100% Insured Stays</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <FiClock className="w-5 h-5 text-[#FF385C]" />
            <span className="text-xs font-bold">24/7 Priority Support</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <FiLock className="w-5 h-5 text-[#FF385C]" />
            <span className="text-xs font-bold">Encrypted Payments</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <FiGlobe className="w-5 h-5 text-[#FF385C]" />
            <span className="text-xs font-bold">Global Coverage</span>
          </div>
        </div>
      </div>

      {/* Interactive Features Grid Section (المطلوب تفاعله) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#FF385C] uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full">Interactive Features</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Why Top Companies Choose Vantage</h2>
          <p className="text-gray-500 mt-2 text-sm">Click on any feature card below to test its functionality in real-time!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveFeatureModal(item.id)}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-xl hover:border-[#FF385C]/50 transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 bg-rose-50 rounded-xl w-fit mb-4 group-hover:bg-[#FF385C] group-hover:text-white transition">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.desc}</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF385C] group-hover:translate-x-1 transition">
                <span>{item.actionText}</span>
                <FiArrowRight />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Modals */}
      {activeFeatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setActiveFeatureModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition text-gray-500 cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* 1. Work Ready Places Modal */}
            {activeFeatureModal === 'work_ready' && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-[#FF385C]">
                  <FiBriefcase className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-gray-900">Work Ready Accommodation Filter</h3>
                </div>
                <p className="text-xs text-gray-500">Search top listings pre-verified for remote working with guaranteed speeds.</p>
                
                <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-300 text-xs">
                    <FiWifi className="text-emerald-500 w-4 h-4" />
                    <span className="font-bold">Minimum Wi-Fi Speed:</span>
                    <span className="ml-auto font-black text-rose-600">100+ Mbps</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-300 text-xs">
                    <FiCheck className="text-emerald-500 w-4 h-4" />
                    <span>Dedicated Ergonomic Desk & Desk Chair</span>
                  </div>
                </div>

                <button
                  onClick={handleExploreStays}
                  className="w-full bg-[#FF385C] text-white font-bold py-3 rounded-xl text-xs hover:bg-rose-600 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiSearch className="w-4 h-4" /> View 142 Work-Ready Stays Now
                </button>
              </div>
            )}

            {/* 2. Centralized Billing Modal */}
            {activeFeatureModal === 'billing' && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-[#FF385C]">
                  <FiFileText className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-gray-900">Corporate Invoice Generator</h3>
                </div>
                <p className="text-xs text-gray-500">Preview and download consolidated monthly corporate invoices.</p>

                <div className="bg-slate-900 text-white p-4 rounded-xl text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Statement Period:</span>
                    <span className="font-bold">September 2026</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Total Approved Bookings:</span>
                    <span className="font-bold">14 Trips</span>
                  </div>
                  <div className="flex justify-between pt-1 text-emerald-400 font-bold text-sm">
                    <span>Total Amount Due:</span>
                    <span>$12,840.00</span>
                  </div>
                </div>

                <button
                  onClick={() => setInvoiceDownloaded(true)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiDownload className="w-4 h-4" /> 
                  <span>{invoiceDownloaded ? 'Invoice Statement Downloaded ✓' : 'Download Statement PDF'}</span>
                </button>
              </div>
            )}

            {/* 3. Team Management Modal */}
            {activeFeatureModal === 'team' && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-[#FF385C]">
                  <FiUsers className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-gray-900">Instant Team Invite</h3>
                </div>
                <p className="text-xs text-gray-500">Invite team members and auto-assign spending limits.</p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Employee Email</label>
                    <input type="email" placeholder="colleague@company.com" className="w-full p-2.5 border rounded-xl text-xs focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nightly Budget Limit</label>
                    <select className="w-full p-2.5 border rounded-xl text-xs bg-white">
                      <option>$150 / night</option>
                      <option>$250 / night</option>
                      <option>$500 / night (Executive)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setActiveFeatureModal(null)}
                  className="w-full bg-[#FF385C] text-white font-bold py-3 rounded-xl text-xs hover:bg-rose-600 transition cursor-pointer"
                >
                  Send Invitation Link
                </button>
              </div>
            )}

            {/* 4. 24/7 Support Live Chat Modal */}
            {activeFeatureModal === 'support' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#FF385C] border-b pb-3">
                  <FiHeadphones className="w-6 h-6" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Vantage Enterprise Concierge</h3>
                    <p className="text-[10px] text-emerald-600 font-bold">● Online 24/7 Priority Agent</p>
                  </div>
                </div>

                <div className="h-48 overflow-y-auto space-y-2 p-2 bg-gray-50 rounded-xl text-xs">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-2.5 rounded-xl max-w-[80%] ${msg.sender === 'user' ? 'bg-[#FF385C] text-white' : 'bg-white border text-gray-800'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 p-2.5 border rounded-xl text-xs focus:outline-none"
                  />
                  <button type="submit" className="bg-slate-900 text-white font-bold px-4 rounded-xl text-xs cursor-pointer">
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Savings Calculator Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16">
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full">
              <FiTrendingUp className="w-4 h-4" />
              Corporate Savings Calculator
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">See How Much Your Business Saves</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Adjust the sliders below to estimate annual savings on corporate stays, admin time, and invoice processing.
            </p>

            <div className="space-y-5 pt-2">
              <div>
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                  <span>Traveling Employees:</span>
                  <span className="text-[#FF385C] font-black">{employeesCount} Members</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={employeesCount} 
                  onChange={(e) => setEmployeesCount(Number(e.target.value))}
                  className="w-full accent-[#FF385C] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                  <span>Trips Per Employee / Year:</span>
                  <span className="text-[#FF385C] font-black">{tripsPerYear} Trips</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="12" 
                  value={tripsPerYear} 
                  onChange={(e) => setTripsPerYear(Number(e.target.value))}
                  className="w-full accent-[#FF385C] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-slate-900 text-white p-8 rounded-2xl space-y-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold text-slate-400">Estimated Annual Impact</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black text-emerald-400">${estimatedSavings.toLocaleString()}</span>
                <span className="text-slate-300 text-sm">/ year saved</span>
              </div>
              <p className="text-xs text-slate-400 border-t border-slate-800 pt-3">
                Based on an average 18% enterprise discount and automated expensing efficiency.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-center">
              <div>
                <span className="block text-xs text-slate-400">Total Travel Spend</span>
                <span className="text-lg font-bold text-white">${totalAnnualSpend.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400">Corporate Rebate</span>
                <span className="text-lg font-bold text-rose-400">18% Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Admin Dashboard Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Live Admin Dashboard</h2>
          <p className="text-gray-500 mt-2 text-sm">Experience our real-time management console. Try approving requests or adding team members below!</p>
        </div>

        <div className="flex justify-center border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition cursor-pointer ${
              activeTab === 'bookings' ? 'border-[#FF385C] text-[#FF385C]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FiCalendar className="w-4 h-4" /> Active Bookings
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition cursor-pointer ${
              activeTab === 'invoices' ? 'border-[#FF385C] text-[#FF385C]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FiCreditCard className="w-4 h-4" /> Invoices & Spending
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition cursor-pointer ${
              activeTab === 'permissions' ? 'border-[#FF385C] text-[#FF385C]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FiUserCheck className="w-4 h-4" /> Team Permissions
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm min-h-[260px]">
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {bookings.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 gap-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.name} <span className="text-gray-400 font-normal">({item.role})</span></h4>
                    <p className="text-xs text-gray-500">{item.stay} • {item.dates}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.status === 'Confirmed' ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold text-xs rounded-full">Confirmed</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 font-bold text-xs rounded-full">Pending</span>
                        <button
                          onClick={() => handleApproveBooking(item.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-lg transition cursor-pointer"
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Invoice #INV-2026-08</h4>
                  <p className="text-xs text-gray-500">August Corporate Travel Report • 12 Stays</p>
                </div>
                <span className="font-bold text-gray-900 text-sm">$8,450.00</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Invoice #INV-2026-07</h4>
                  <p className="text-xs text-gray-500">July Corporate Travel Report • 9 Stays</p>
                </div>
                <span className="font-bold text-gray-900 text-sm">$6,120.00</span>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500">Active Organization Members</span>
                <button
                  onClick={() => setShowAddMember(!showAddMember)}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FiUserPlus className="w-3.5 h-3.5" />
                  <span>{showAddMember ? 'Close Form' : 'Add Team Member'}</span>
                </button>
              </div>

              {showAddMember && (
                <form onSubmit={handleAddMember} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap gap-3 items-center">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none flex-1"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none flex-1"
                  />
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none"
                  >
                    <option value="Employee">Employee</option>
                    <option value="Travel Manager">Travel Manager</option>
                  </select>
                  <button type="submit" className="bg-[#FF385C] text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-rose-600 transition cursor-pointer">
                    Save Member
                  </button>
                </form>
              )}

              {teamMembers.map((member, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                  <span className="px-3 py-1 bg-slate-200 text-slate-800 font-bold text-xs rounded-full">{member.role}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reviews / Testimonials Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-slate-800 pb-8">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">Customer Feedback</span>
              <h2 className="text-3xl font-extrabold text-white mt-3">What Enterprise Leaders Say</h2>
            </div>
            
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-[#FF385C] hover:bg-rose-600 text-white text-xs font-bold px-5 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FiMessageSquare className="w-4 h-4" />
              <span>{showReviewForm ? 'Cancel' : 'Post Your Review'}</span>
            </button>
          </div>

          {showReviewForm && (
            <form onSubmit={handleAddReview} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4 mb-8">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FiPlus className="text-[#FF385C]" /> Add Your Feedback
              </h3>
              <textarea
                required
                rows="3"
                placeholder="Share your corporate travel experience with Vantage..."
                value={newReview.quote}
                onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Your Role (e.g. HR Lead)"
                  value={newReview.role}
                  onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                  className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={newReview.company}
                  onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                  className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((item, idx) => (
              <div key={idx} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-200 text-sm leading-relaxed italic">"{item.quote}"</p>
                <div className="pt-2 border-t border-slate-700/50">
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <p className="text-xs text-slate-400">{item.role || 'Enterprise User'} • <span className="text-rose-400">{item.company || 'Verified Company'}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-500 mt-2 text-sm">Got questions? We've got answers for your enterprise team.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 hover:bg-gray-50 transition cursor-pointer"
              >
                <span>{faq.q}</span>
                <FiChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-[#FF385C]' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Main Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition text-gray-500 cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                  <FiCheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Request Received!</h3>
                <p className="text-gray-600 text-sm">
                  Thank you for registering. Our Vantage Business team will reach out to <span className="font-semibold text-gray-900">{formData.workEmail}</span> within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-[#FF385C] font-bold text-sm mb-1">
                  <FiBriefcase className="w-4 h-4" />
                  <span>Vantage Enterprise</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Register Your Company</h3>
                <p className="text-gray-500 text-xs mb-6">Get custom corporate rates and centralized billing for your team.</p>

                <form onSubmit={handleSubmitModal} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Acme Corp" 
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-black transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Work Email</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="alex@company.com" 
                      value={formData.workEmail}
                      onChange={(e) => setFormData({...formData, workEmail: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-black transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Team Size</label>
                      <select 
                        value={formData.teamSize}
                        onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-black bg-white transition"
                      >
                        <option value="1-10">1-10 Employees</option>
                        <option value="11-50">11-50 Employees</option>
                        <option value="51-200">51-200 Employees</option>
                        <option value="200+">200+ Employees</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+1 (555) 000-0000" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-black transition"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#FF385C] hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 text-sm"
                  >
                    <FiSend className="w-4 h-4" />
                    <span>Submit Registration</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VantageBusiness;