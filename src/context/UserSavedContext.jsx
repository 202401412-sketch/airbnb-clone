import React, { createContext, useState, useContext, useEffect } from 'react';

const UserSavedContext = createContext();

export const UserSavedProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('airbnb_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedBookings = localStorage.getItem('airbnb_bookings');
      if (savedBookings) setBookings(JSON.parse(savedBookings));

      const savedMsgs = localStorage.getItem('user_messages') || localStorage.getItem('airbnb_messages');
      if (savedMsgs) setMessages(JSON.parse(savedMsgs));
    } catch (e) {
      console.error('Failed to load saved user data from localStorage', e);
    }
  }, []);

  // Save Favorites
  const toggleFavorite = (property) => {
    setFavorites((prev) => {
      const propId = property.id || property.title;
      const exists = prev.some((p) => (p.id || p.title) === propId);
      let updated;
      if (exists) {
        updated = prev.filter((p) => (p.id || p.title) !== propId);
      } else {
        updated = [...prev, property];
      }
      try {
        localStorage.setItem('airbnb_favorites', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save favorites to localStorage', e);
      }
      return updated;
    });
  };

  const isFavorite = (propertyId) => {
    return favorites.some((p) => (p.id || p.title) === propertyId);
  };

  // Add Booking (One-to-Many User to Bookings relationship)
  const addBooking = (bookingData, userId = 'usr_current') => {
    const enrichedBooking = {
      ...bookingData,
      userId: bookingData.userId || userId,
      createdAt: bookingData.createdAt || new Date().toISOString()
    };
    setBookings((prev) => {
      const updated = [enrichedBooking, ...prev];
      try {
        localStorage.setItem('airbnb_bookings', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save booking to localStorage', e);
      }
      return updated;
    });
  };

  // Send Message (Persisted under user_messages)
  const sendMessage = (msgData) => {
    const enrichedMsg = {
      ...msgData,
      id: msgData.id || 'MSG-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: msgData.timestamp || new Date().toISOString()
    };
    setMessages((prev) => {
      const updated = [enrichedMsg, ...prev];
      try {
        localStorage.setItem('user_messages', JSON.stringify(updated));
        localStorage.setItem('airbnb_messages', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save messages to localStorage', e);
      }
      return updated;
    });
  };

  return (
    <UserSavedContext.Provider
      value={{
        favorites,
        bookings,
        messages,
        toggleFavorite,
        isFavorite,
        addBooking,
        sendMessage
      }}
    >
      {children}
    </UserSavedContext.Provider>
  );
};

export const useUserSaved = () => {
  const ctx = useContext(UserSavedContext);
  if (!ctx) {
    return {
      favorites: [],
      bookings: [],
      messages: [],
      toggleFavorite: () => {},
      isFavorite: () => false,
      addBooking: () => {},
      sendMessage: () => {}
    };
  }
  return ctx;
};
