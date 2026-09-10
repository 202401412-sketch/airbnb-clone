import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl font-bold">✕</button>
        <h2 className="text-xl font-bold mb-4 text-center">
          {isSignup ? 'Sign up for Airbnb' : 'Log in to Airbnb'}
        </h2>
        
        <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          {isSignup && (
            <input type="text" placeholder="Full Name" required className="border p-3 rounded-xl w-full" />
          )}
          <input type="email" placeholder="Email" required className="border p-3 rounded-xl w-full" />
          <input type="password" placeholder="Password" required className="border p-3 rounded-xl w-full" />
          
          <button type="submit" className="bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition">
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignup(!isSignup)} className="font-bold underline text-black">
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;