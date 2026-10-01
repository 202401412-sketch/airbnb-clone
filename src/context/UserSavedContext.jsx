import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { createBooking, getMyBookings, cancelBooking } from '../api/bookings';
import { sendMessage as sendMessageAPI, getConversations } from '../api/messages';
import { useAuth } from './AuthContext';

const UserSavedContext = createContext();

export const UserSavedProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  // Sync bookings from backend API
  const refreshBookings = useCallback(async () => {
    setIsLoadingBookings(true);
    try {
      const res = await getMyBookings();
      if (res && Array.isArray(res.data)) {
        setBookings(res.data);
        localStorage.setItem('airbnb_bookings', JSON.stringify(res.data));
      }
    } catch (err) {
      console.warn('Could not fetch live bookings from backend, using local cache:', err);
      const savedBookings = localStorage.getItem('airbnb_bookings');
      if (savedBookings) setBookings(JSON.parse(savedBookings));
    } finally {
      setIsLoadingBookings(false);
    }
  }, [user]);

  // Sync conversations from backend API
  const refreshConversations = useCallback(async () => {
    try {
      const res = await getConversations();
      if (res && Array.isArray(res.data)) {
        setConversations(res.data);
      }
    } catch (err) {
      console.warn('Could not fetch conversations from backend:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('airbnb_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedMsgs = localStorage.getItem('user_messages') || localStorage.getItem('airbnb_messages');
      if (savedMsgs) setMessages(JSON.parse(savedMsgs));
    } catch (e) {
      console.error('Failed to load local data', e);
    }

    refreshBookings();
    refreshConversations();
  }, [refreshBookings, refreshConversations]);

  // Favorites
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

  // Add Booking
  const addBooking = async (bookingData, userId) => {
    let backendResult = null;
    const resolvedGuestId = String(userId || bookingData.userId || bookingData.guestId || user?.id || '1');
    const resolvedGuestName =
      bookingData.userName ||
      bookingData.guestName ||
      user?.name ||
      user?.email ||
      'Guest User';

    try {
      const payload = {
        propertyId: String(bookingData.propertyId || bookingData.property?.id || 1),
        checkIn: bookingData.checkIn || bookingData.startDate,
        checkOut: bookingData.checkOut || bookingData.endDate,
        totalPrice: bookingData.totalPrice,
        guestsCount: bookingData.guestsCount || bookingData.guestCount || 1,
        guestId: resolvedGuestId,
        guestName: resolvedGuestName,
      };
      backendResult = await createBooking(payload);
    } catch (apiError) {
      console.warn('Backend booking API error, preserving local copy:', apiError);
    }

    const enrichedBooking = {
      ...bookingData,
      id: backendResult?.id ? Number(backendResult.id) : (typeof bookingData.id === 'number' ? bookingData.id : Date.now()),
      status: backendResult?.status || 'CONFIRMED',
      guestId: backendResult?.guestId || resolvedGuestId,
      guestName: backendResult?.guestName || resolvedGuestName,
      userId: resolvedGuestId,
      createdAt: backendResult?.createdAt || new Date().toISOString(),
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

    // Refresh live bookings list from backend
    refreshBookings();

    return backendResult || enrichedBooking;
  };

  // Cancel Booking
  const cancelUserBooking = async (bookingId) => {
    const cleanId = parseInt(String(bookingId ?? '').replace(/#/g, '').trim(), 10);
    try {
      await cancelBooking(cleanId);
      setBookings((prev) =>
        prev.map((b) => (Number(b.id) === cleanId ? { ...b, status: 'CANCELLED' } : b))
      );
      return true;
    } catch (err) {
      console.error('Failed to cancel booking via backend:', err);
      // Fallback update locally
      setBookings((prev) =>
        prev.map((b) => (Number(b.id) === cleanId ? { ...b, status: 'CANCELLED' } : b))
      );
      throw err;
    }
  };

  // Send Message
  const sendMessage = async (msgData) => {
    let backendResult = null;
    try {
      const payload = {
        conversationId: msgData.conversationId,
        recipientId: Number(msgData.recipientId) || 2,
        listingId: parseInt(String(msgData.propertyId || 1).match(/\d+/)?.[0] || '1', 10) || 1,
        messageText: msgData.messageText || msgData.content || msgData.text || '',
        senderId: Number(msgData.senderId || user?.id) || 1,
      };
      backendResult = await sendMessageAPI(payload);
    } catch (apiError) {
      console.warn('Backend sendMessage API error, storing locally:', apiError);
    }

    const enrichedMsg = {
      ...msgData,
      id: backendResult?.data?.id || msgData.id || 'MSG-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: backendResult?.data?.sentAt || msgData.timestamp || new Date().toISOString(),
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

    refreshConversations();
    return enrichedMsg;
  };

  return (
    <UserSavedContext.Provider
      value={{
        favorites,
        bookings,
        messages,
        conversations,
        isLoadingBookings,
        toggleFavorite,
        isFavorite,
        addBooking,
        cancelUserBooking,
        sendMessage,
        refreshBookings,
        refreshConversations,
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
      conversations: [],
      isLoadingBookings: false,
      toggleFavorite: () => {},
      isFavorite: () => false,
      addBooking: async () => {},
      cancelUserBooking: async () => {},
      sendMessage: async () => {},
      refreshBookings: () => {},
      refreshConversations: () => {},
    };
  }
  return ctx;
};
