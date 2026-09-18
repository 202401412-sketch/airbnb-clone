import React, { useState, useEffect } from 'react';
import { FiX, FiMail, FiPhone, FiCheckCircle, FiAlertCircle, FiUser, FiHome, FiKey, FiCheck } from 'react-icons/fi';
import { FaGoogle, FaApple, FaFacebook, FaAirbnb } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';

export const validatePhoneNumber = (phone, countryCode) => {
  const digitsOnly = phone.replace(/\D/g, '');

  if (!digitsOnly) {
    return { isValid: false, error: 'Phone number is required' };
  }

  switch (countryCode) {
    case '+20': {
      // Egypt: 010, 011, 012, 015 (11 digits) or 10, 11, 12, 15 (10 digits)
      const isMatch = /^(0?1[0125]\d{8})$/.test(digitsOnly);
      if (!isMatch) {
        return {
          isValid: false,
          error: 'Please enter a valid Egyptian mobile number starting with 010, 011, 012, or 015 (10–11 digits)'
        };
      }
      return { isValid: true, error: null };
    }

    case '+1': {
      // US / Canada: 10 digits
      const isMatch = /^[2-9]\d{9}$/.test(digitsOnly);
      if (!isMatch) {
        return {
          isValid: false,
          error: 'Please enter a valid 10-digit US phone number (e.g. 202 555 0123)'
        };
      }
      return { isValid: true, error: null };
    }

    case '+44': {
      // UK: Mobile starts with 07 or 7 (10-11 digits)
      const isMatch = /^(0?7\d{9})$/.test(digitsOnly);
      if (!isMatch) {
        return {
          isValid: false,
          error: 'Please enter a valid UK mobile number starting with 07 or 7 (10–11 digits)'
        };
      }
      return { isValid: true, error: null };
    }

    case '+966': {
      // Saudi Arabia: Mobile starts with 05 or 5
      const isMatch = /^(0?5\d{8})$/.test(digitsOnly);
      if (!isMatch) {
        return {
          isValid: false,
          error: 'Please enter a valid Saudi mobile number starting with 05 or 5'
        };
      }
      return { isValid: true, error: null };
    }

    case '+971': {
      // UAE: Mobile starts with 05 or 5
      const isMatch = /^(0?5\d{8})$/.test(digitsOnly);
      if (!isMatch) {
        return {
          isValid: false,
          error: 'Please enter a valid UAE mobile number starting with 05 or 5'
        };
      }
      return { isValid: true, error: null };
    }

    case '+33': {
      // France: Mobile starts with 06, 07
      const isMatch = /^(0?[67]\d{8})$/.test(digitsOnly);
      if (!isMatch) {
        return {
          isValid: false,
          error: 'Please enter a valid French mobile number starting with 06, 07, 6, or 7'
        };
      }
      return { isValid: true, error: null };
    }

    case '+49': {
      // Germany: Mobile starts with 01 or 1
      const isMatch = /^(0?1\d{9,10})$/.test(digitsOnly);
      if (!isMatch) {
        return {
          isValid: false,
          error: 'Please enter a valid German mobile number starting with 01 or 1'
        };
      }
      return { isValid: true, error: null };
    }

    default: {
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        return {
          isValid: false,
          error: 'Please enter a valid phone number (7–15 digits)'
        };
      }
      return { isValid: true, error: null };
    }
  }
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email address is required' };
  }
  const isMatch = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!isMatch) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. name@example.com)' };
  }
  return { isValid: true, error: null };
};

const countryPlaceholders = {
  '+20': '010 1234 5678',
  '+1': '202 555 0123',
  '+44': '07911 123456',
  '+966': '051 234 5678',
  '+971': '050 123 4567',
  '+33': '06 12 34 56 78',
  '+49': '0151 23456789'
};

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const { login } = useAuth();
  
  // Account Role State: 'guest' | 'host'
  const [selectedRole, setSelectedRole] = useState('guest');
  const [userName, setUserName] = useState('');
  
  // Auth Form State
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email'
  const [countryCode, setCountryCode] = useState('+20');
  const [inputValue, setInputValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Clear errors and input state when switching methods or country
  useEffect(() => {
    setIsTouched(false);
    setErrorMessage(null);
  }, [authMethod, countryCode]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
      setUserName('');
      setSelectedRole('guest');
      setIsTouched(false);
      setErrorMessage(null);
      setIsSubmitted(false);
      setLoggedInUser(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    if (authMethod === 'phone') {
      return validatePhoneNumber(inputValue, countryCode);
    }
    return validateEmail(inputValue);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    
    if (isTouched) {
      const res = authMethod === 'phone' 
        ? validatePhoneNumber(val, countryCode) 
        : validateEmail(val);
      setErrorMessage(res.isValid ? null : res.error);
    }
  };

  const handleInputBlur = () => {
    setIsTouched(true);
    const res = validate();
    setErrorMessage(res.isValid ? null : res.error);
  };

  const completeLogin = (name, email, phone) => {
    const finalName = name || (selectedRole === 'host' ? 'Host User' : 'Guest User');
    const userObj = {
      name: finalName,
      email: email || `${inputValue.replace(/\D/g, '') || 'user'}@airbnb.com`,
      phone: phone || (authMethod === 'phone' ? `${countryCode} ${inputValue}` : '+20 100 000 0000'),
      role: selectedRole, // 'guest' | 'host'
      avatar: selectedRole === 'host' 
        ? 'https://i.pravatar.cc/150?img=12' 
        : 'https://i.pravatar.cc/150?img=33'
    };

    login(userObj);
    if (onLoginSuccess) {
      onLoginSuccess(userObj);
    }

    setLoggedInUser(userObj);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setInputValue('');
      setUserName('');
      setIsTouched(false);
      onClose();
    }, 1800);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setIsTouched(true);

    const validationResult = validate();

    if (!validationResult.isValid) {
      setErrorMessage(validationResult.error);
      return;
    }

    setErrorMessage(null);
    
    // Construct default display name if empty
    let computedName = userName.trim();
    if (!computedName) {
      if (authMethod === 'email') {
        const prefix = inputValue.split('@')[0];
        computedName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      } else {
        computedName = selectedRole === 'host' ? 'Host Member' : 'Guest Traveler';
      }
    }

    const email = authMethod === 'email' ? inputValue : `${inputValue.replace(/\D/g, '')}@phone.user`;
    const phone = authMethod === 'phone' ? `${countryCode} ${inputValue}` : '';

    completeLogin(computedName, email, phone);
  };

  const handleSocialLogin = (provider) => {
    const defaultName = `${provider} ${selectedRole === 'host' ? 'Host' : 'Guest'}`;
    const defaultEmail = `${selectedRole}_${provider.toLowerCase()}@airbnb.com`;
    completeLogin(defaultName, defaultEmail, '+20 100 123 4567');
  };

  const validationResult = validate();
  const isFormValid = validationResult.isValid;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div 
        className="bg-white w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden relative flex flex-col my-auto border border-gray-100 animate-in fade-in zoom-in-95 duration-200" 
        dir="ltr"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 md:p-5 border-b border-gray-200">
          <button 
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-900 bg-gray-50 border border-gray-200 transition flex items-center justify-center shadow-xs cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5 text-gray-900 stroke-[2.5]" />
          </button>
          <h2 className="font-bold text-gray-900 text-base text-center flex-1 pr-7">
            Log in or sign up
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <>
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                  Welcome to Airbnb
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Select how you plan to use Airbnb to personalize your experience.
                </p>
              </div>

              {/* STEP 1: Account Role Selection (Guest vs. Host) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Select Account Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Guest Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedRole('guest')}
                    className={`p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between relative ${
                      selectedRole === 'guest'
                        ? 'border-black bg-gray-50/80 shadow-sm'
                        : 'border-gray-200 hover:border-gray-400 bg-white'
                    }`}
                  >
                    {selectedRole === 'guest' && (
                      <div className="absolute top-3 right-3 bg-black text-white p-1 rounded-full">
                        <FiCheck className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                    <div className="p-2.5 bg-rose-100 text-[#FF385C] rounded-xl w-fit mb-3">
                      <FiUser className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Guest</div>
                      <div className="text-[11px] text-gray-500 leading-snug mt-0.5">
                        Looking to rent & book stays
                      </div>
                    </div>
                  </button>

                  {/* Host Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedRole('host')}
                    className={`p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between relative ${
                      selectedRole === 'host'
                        ? 'border-black bg-rose-50/40 shadow-sm'
                        : 'border-gray-200 hover:border-gray-400 bg-white'
                    }`}
                  >
                    {selectedRole === 'host' && (
                      <div className="absolute top-3 right-3 bg-[#FF385C] text-white p-1 rounded-full">
                        <FiCheck className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                    <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl w-fit mb-3">
                      <FiKey className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">Host (Owner)</div>
                      <div className="text-[11px] text-gray-500 leading-snug mt-0.5">
                        List & earn from your properties
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Optional Name Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name (Optional)
                </label>
                <input 
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Omar Hassan"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <form onSubmit={handleContinue} className="space-y-4" noValidate>
                {authMethod === 'phone' ? (
                  <div>
                    <div 
                      className={`border rounded-2xl overflow-hidden transition-all ${
                        isTouched && errorMessage 
                          ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/10' 
                          : 'border-gray-300 focus-within:ring-2 focus-within:ring-black'
                      }`}
                    >
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
                          Phone number *
                        </label>
                        <input 
                          type="tel"
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          placeholder={countryPlaceholders[countryCode] || 'Phone number'}
                          required
                          className="w-full text-sm font-medium text-gray-900 outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    {isTouched && errorMessage && (
                      <div className="flex items-center gap-1.5 text-rose-600 text-xs font-medium mt-1.5 px-1 animate-in fade-in duration-150">
                        <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div 
                      className={`border rounded-2xl p-3 transition-all ${
                        isTouched && errorMessage 
                          ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/10' 
                          : 'border-gray-300 focus-within:ring-2 focus-within:ring-black'
                      }`}
                    >
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                        Email address *
                      </label>
                      <input 
                        type="email"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder="name@example.com"
                        required
                        className="w-full text-sm font-medium text-gray-900 outline-none bg-transparent"
                      />
                    </div>

                    {isTouched && errorMessage && (
                      <div className="flex items-center gap-1.5 text-rose-600 text-xs font-medium mt-1.5 px-1 animate-in fade-in duration-150">
                        <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-[11px] text-gray-500 leading-tight">
                  We'll call or text you to confirm your account. Standard message and data rates apply.
                </p>

                <button
                  type="submit"
                  disabled={isTouched && !isFormValid}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition shadow-md ${
                    isTouched && !isFormValid
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                      : 'bg-[#FF385C] hover:bg-[#E00B41] text-white'
                  }`}
                >
                  Continue as {selectedRole === 'host' ? 'Host' : 'Guest'}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="h-[1px] bg-gray-200 flex-1"></div>
                <span className="text-xs text-gray-500 font-medium">or</span>
                <div className="h-[1px] bg-gray-200 flex-1"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod(authMethod === 'phone' ? 'email' : 'phone');
                    setInputValue('');
                  }}
                  className="w-full border border-black hover:bg-gray-50 py-2.5 rounded-xl font-semibold text-xs text-gray-900 flex items-center justify-center gap-3 transition"
                >
                  {authMethod === 'phone' ? <FiMail className="w-4 h-4" /> : <FiPhone className="w-4 h-4" />}
                  <span>Continue with {authMethod === 'phone' ? 'Email' : 'Phone'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="w-full border border-gray-300 hover:border-black hover:bg-gray-50 py-2.5 rounded-xl font-semibold text-xs text-gray-900 flex items-center justify-center gap-3 transition"
                >
                  <FaGoogle className="w-4 h-4 text-rose-500" />
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  className="w-full border border-gray-300 hover:border-black hover:bg-gray-50 py-2.5 rounded-xl font-semibold text-xs text-gray-900 flex items-center justify-center gap-3 transition"
                >
                  <FaApple className="w-4 h-4 text-black" />
                  <span>Continue with Apple</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-4 animate-in fade-in duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <FiCheckCircle className="w-9 h-9 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Welcome Back, {loggedInUser?.name || 'User'}! 🎉
              </h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Logged in successfully as <span className="font-bold text-black uppercase bg-gray-100 px-2 py-0.5 rounded text-xs">{loggedInUser?.role}</span>.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthModal;