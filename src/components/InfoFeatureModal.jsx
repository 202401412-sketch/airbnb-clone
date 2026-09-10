import React, { useState } from 'react';
import { FiX, FiCheck, FiCopy, FiSearch, FiHelpCircle, FiGift, FiUserPlus, FiHome, FiUsers } from 'react-icons/fi';
import { FaAirbnb } from 'react-icons/fa';

const InfoFeatureModal = ({ isOpen, onClose, feature }) => {
  const [copied, setCopied] = useState(false);
  const [searchHelp, setSearchHelp] = useState('');
  const [giftAmount, setGiftAmount] = useState('100');
  const [customGiftAmount, setCustomGiftAmount] = useState('');
  const [coHostQuery, setCoHostQuery] = useState('');
  const [actionDone, setActionDone] = useState(false);

  if (!isOpen || !feature) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://www.airbnb.com/r/host_referral_2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTriggerAction = (msg) => {
    setActionDone(true);
    setTimeout(() => {
      setActionDone(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200" dir="ltr">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-700"
          >
            <FiX className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <FaAirbnb className="text-[#FF385C] text-xl" />
            <h2 className="font-bold text-gray-900 text-base">
              {feature === 'becomeHost' && 'Airbnb Setup — Become a Host'}
              {feature === 'referHost' && 'Refer a Host & Earn Rewards'}
              {feature === 'findCoHost' && 'Find a Local Co-Host'}
              {feature === 'giftCards' && 'Airbnb Gift Cards'}
              {feature === 'helpCenter' && 'Airbnb Help Center'}
            </h2>
          </div>
          <div className="w-8"></div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">
          
          {actionDone ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <FiCheck className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Request Received!</h3>
              <p className="text-sm text-gray-600">Our Airbnb team will process your selection shortly.</p>
            </div>
          ) : (
            <>
              {/* FEATURE 1: BECOME A HOST */}
              {feature === 'becomeHost' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-rose-50 to-orange-50 p-6 rounded-2xl border border-rose-100">
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                      Earn up to EGP 18,500 / month hosting your space
                    </h3>
                    <p className="text-sm text-gray-600">
                      With Airbnb Setup, you get 1-on-1 guidance from a Superhost and specialized support.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 rounded-2xl space-y-2">
                      <FiUserPlus className="w-6 h-6 text-[#FF385C]" />
                      <h4 className="font-bold text-sm text-gray-900">One-to-one guidance</h4>
                      <p className="text-xs text-gray-500">We'll match you with a Superhost in your area to guide you from your first question to your first guest.</p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-2xl space-y-2">
                      <FiHome className="w-6 h-6 text-[#FF385C]" />
                      <h4 className="font-bold text-sm text-gray-900">An experienced guest</h4>
                      <p className="text-xs text-gray-500">For your first booking, you can choose to welcome an experienced guest who has at least three stays on Airbnb.</p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-2xl space-y-2">
                      <FiUsers className="w-6 h-6 text-[#FF385C]" />
                      <h4 className="font-bold text-sm text-gray-900">Specialized support</h4>
                      <p className="text-xs text-gray-500">New hosts get one-tap access to specially trained Community Support agents who can help with everything.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTriggerAction()}
                    className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-3.5 rounded-xl font-bold text-base transition shadow-md"
                  >
                    Start Airbnb Setup
                  </button>
                </div>
              )}

              {/* FEATURE 2: REFER A HOST */}
              {feature === 'referHost' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center space-y-3">
                    <FiUserPlus className="w-10 h-10 text-[#FF385C] mx-auto" />
                    <h3 className="text-2xl font-bold text-gray-900">Refer a Host & Earn Up to EGP 10,000</h3>
                    <p className="text-xs text-gray-600 max-w-md mx-auto">
                      Know someone with a great space? Invite them to host on Airbnb and get rewarded when they complete their first booking.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase">Your Personal Referral Link</label>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-xl p-2 bg-gray-50">
                      <input 
                        type="text" 
                        readOnly 
                        value="https://www.airbnb.com/r/host_referral_2026" 
                        className="flex-1 bg-transparent text-xs font-medium text-gray-800 outline-none px-2"
                      />
                      <button
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

              {/* FEATURE 3: FIND A CO-HOST */}
              {feature === 'findCoHost' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Partner with a local Co-Host</h3>
                    <p className="text-xs text-gray-500">Co-hosts take care of your listing, guest messaging, key exchange, and cleaning.</p>
                  </div>

                  <div className="relative">
                    <FiSearch className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                    <input 
                      type="text"
                      value={coHostQuery}
                      onChange={(e) => setCoHostQuery(e.target.value)}
                      placeholder="Enter city or neighborhood (e.g., Alexandria, Zayed, Gouna)"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-700 uppercase">Featured Top Co-Hosts</h4>
                    {[
                      { name: 'Ahmed K.', location: 'Alexandria', rating: '4.98 ★', listings: '48 listings managed', avatar: 'https://i.pravatar.cc/150?img=12' },
                      { name: 'Sara M.', location: 'Sheikh Zayed & Cairo', rating: '5.0 ★', listings: '22 listings managed', avatar: 'https://i.pravatar.cc/150?img=47' },
                      { name: 'Khaled B.', location: 'Hurghada & Gouna', rating: '4.95 ★', listings: '34 listings managed', avatar: 'https://i.pravatar.cc/150?img=68' },
                    ].map((ch, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition">
                        <div className="flex items-center gap-3">
                          <img src={ch.avatar} alt={ch.name} className="w-10 h-10 rounded-full object-cover border" />
                          <div>
                            <div className="font-bold text-sm text-gray-900">{ch.name} <span className="text-xs text-amber-600 ml-1">{ch.rating}</span></div>
                            <div className="text-xs text-gray-500">{ch.location} · {ch.listings}</div>
                          </div>
                        </div>
                        <button onClick={() => handleTriggerAction()} className="border border-black px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-black hover:text-white transition">
                          Contact
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FEATURE 4: GIFT CARDS */}
              {feature === 'giftCards' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-6 rounded-3xl text-white space-y-2 relative overflow-hidden shadow-lg">
                    <FiGift className="w-12 h-12 text-white/80" />
                    <h3 className="text-2xl font-black">Airbnb Gift Card</h3>
                    <p className="text-xs text-white/90">Give the gift of travel, stays, and experiences anywhere in the world.</p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase">Select Card Amount (USD / EGP equivalent)</label>
                    <div className="grid grid-cols-4 gap-3">
                      {['50', '100', '250', '500'].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setGiftAmount(amt)}
                          className={`py-3 rounded-xl border text-sm font-bold transition ${
                            giftAmount === amt ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black text-gray-800'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleTriggerAction()}
                    className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl font-bold text-base transition shadow-md"
                  >
                    Buy Gift Card (${giftAmount})
                  </button>
                </div>
              )}

              {/* FEATURE 5: HELP CENTER */}
              {feature === 'helpCenter' && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <FiHelpCircle className="w-10 h-10 text-[#FF385C] mx-auto" />
                    <h3 className="text-2xl font-extrabold text-gray-900">How can we help?</h3>
                  </div>

                  <div className="relative">
                    <FiSearch className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                    <input 
                      type="text"
                      value={searchHelp}
                      onChange={(e) => setSearchHelp(e.target.value)}
                      placeholder="Search help articles, policies, or booking issues..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: 'Cancellation Options', desc: 'Policies for canceling your reservation' },
                      { title: 'Refund Policies', desc: 'When and how you get your money back' },
                      { title: 'AirCover Protection', desc: 'Comprehensive protection for guests' },
                      { title: 'Safety & Security', desc: 'Guidelines for safe travels' },
                    ].map((h, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => handleTriggerAction()}
                        className="p-4 border border-gray-200 rounded-2xl hover:border-black hover:bg-gray-50 transition cursor-pointer"
                      >
                        <h4 className="font-bold text-sm text-gray-900">{h.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{h.desc}</p>
                      </div>
                    ))}
                  </div>
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
