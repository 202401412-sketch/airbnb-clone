import React, { useState } from 'react';
import { FiX, FiMail, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';

const AuthModal = ({ isOpen, onClose }) => {
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email'
  const [countryCode, setCountryCode] = useState('+20');
  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleContinue = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setInputValue('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200" dir="ltr">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 relative">
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-700"
          >
            <FiX className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-gray-900 text-base text-center flex-1 pr-7">
            Log in or sign up
          </h2>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {!isSubmitted ? (
            <>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                Welcome to Airbnb
              </h3>

              <form onSubmit={handleContinue} className="space-y-4">
                {authMethod === 'phone' ? (
                  <div className="border border-gray-300 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-black">
                    <div className="p-2.5 bg-gray-50 border-b border-gray-200">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        Country / Region
                      </label>
                      <select 
                        value={countryCode} 
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-gray-900 outline-none cursor-pointer pt-0.5"
                      >
                        <option value="+20">Egypt (+20)</option>
                        <option value="+1">United States (+1)</option>
                        <option value="+44">United Kingdom (+44)</option>
                        <option value="+966">Saudi Arabia (+966)</option>
                        <option value="+971">United Arab Emirates (+971)</option>
                        <option value="+33">France (+33)</option>
                        <option value="+49">Germany (+49)</option>
                      </select>
                    </div>
                    <div className="p-3">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                        Phone number
                      </label>
                      <input 
                        type="tel"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="010 1234 5678"
                        required
                        className="w-full text-sm font-medium text-gray-900 outline-none bg-transparent"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="border border-gray-300 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-black">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                      Email address
                    </label>
                    <input 
                      type="email"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full text-sm font-medium text-gray-900 outline-none bg-transparent"
                    />
                  </div>
                )}

                <p className="text-[11px] text-gray-500 leading-tight">
                  We'll call or text you to confirm your number. Standard message and data rates apply.{' '}
                  <span className="underline font-semibold cursor-pointer text-gray-800">Privacy Policy</span>
                </p>

                <button
                  type="submit"
                  className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md"
                >
                  Continue
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="h-[1px] bg-gray-200 flex-1"></div>
                <span className="text-xs text-gray-500 font-medium">or</span>
                <div className="h-[1px] bg-gray-200 flex-1"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setAuthMethod(authMethod === 'phone' ? 'email' : 'phone')}
                  className="w-full border border-black hover:bg-gray-50 py-3 rounded-xl font-semibold text-xs text-gray-900 flex items-center justify-center gap-3 transition"
                >
                  {authMethod === 'phone' ? <FiMail className="w-4 h-4" /> : <FiPhone className="w-4 h-4" />}
                  <span>Continue with {authMethod === 'phone' ? 'Email' : 'Phone'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setInputValue('guest@gmail.com'); setIsSubmitted(true); setTimeout(() => onClose(), 1200); }}
                  className="w-full border border-gray-300 hover:border-black hover:bg-gray-50 py-3 rounded-xl font-semibold text-xs text-gray-900 flex items-center justify-center gap-3 transition"
                >
                  <FaGoogle className="w-4 h-4 text-rose-500" />
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setInputValue('guest@apple.com'); setIsSubmitted(true); setTimeout(() => onClose(), 1200); }}
                  className="w-full border border-gray-300 hover:border-black hover:bg-gray-50 py-3 rounded-xl font-semibold text-xs text-gray-900 flex items-center justify-center gap-3 transition"
                >
                  <FaApple className="w-4 h-4 text-black" />
                  <span>Continue with Apple</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setInputValue('guest@facebook.com'); setIsSubmitted(true); setTimeout(() => onClose(), 1200); }}
                  className="w-full border border-gray-300 hover:border-black hover:bg-gray-50 py-3 rounded-xl font-semibold text-xs text-gray-900 flex items-center justify-center gap-3 transition"
                >
                  <FaFacebook className="w-4 h-4 text-blue-600" />
                  <span>Continue with Facebook</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <FiCheckCircle className="w-14 h-14 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">Welcome Back! 🎉</h3>
              <p className="text-sm text-gray-600">
                You have successfully logged in to your Airbnb account.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthModal;