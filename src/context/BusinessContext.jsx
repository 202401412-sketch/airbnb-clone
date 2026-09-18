import React, { createContext, useContext, useState } from 'react';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [isBusinessMode, setIsBusinessMode] = useState(false);

  const toggleBusinessMode = () => {
    setIsBusinessMode((prev) => !prev);
  };

  return (
    <BusinessContext.Provider value={{ isBusinessMode, toggleBusinessMode }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);