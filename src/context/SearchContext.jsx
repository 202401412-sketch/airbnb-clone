import React, { createContext, useState, useContext } from 'react';

// 1. EGP EGP Context
const SearchContext = createContext();

// 2. EGP Provider EGP EGP EGP
export const SearchProvider = ({ children }) => {
  // EGP EGP
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  // EGP EGP EGP EGP
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

// 3. Custom Hook EGP EGP EGP EGP EGP EGP EGP
export const useSearch = () => {
  return useContext(SearchContext);
};