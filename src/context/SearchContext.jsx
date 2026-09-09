import React, { createContext, useState, useContext } from 'react';

// 1. إنشاء الـ Context
const SearchContext = createContext();

// 2. الـ Provider اللي هيشيل البيانات
export const SearchProvider = ({ children }) => {
  // بيانات البحث
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  // حساب إجمالي عدد الضيوف
  const totalGuests = guests.adults + guests.children;

  return (
    <SearchContext.Provider
      value={{
        destination,
        setDestination,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        guests,
        setGuests,
        totalGuests,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// 3. Custom Hook عشان نستخدم البيانات بسهولة في أي مكان
export const useSearch = () => {
  return useContext(SearchContext);
};