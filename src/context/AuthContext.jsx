import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);

  // Load saved user and session history from localStorage on initial render
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('airbnb_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedSessions = localStorage.getItem('user_sessions');
      if (savedSessions) {
        setSessions(JSON.parse(savedSessions));
      }
    } catch (e) {
      console.error('Failed to parse saved auth state from localStorage', e);
    }
  }, []);

  const login = (userData) => {
    const fullUser = {
      id: userData.id || 'usr_' + Date.now(),
      name: userData.name || 'Guest User',
      email: userData.email || 'user@airbnb.com',
      phone: userData.phone || '+20 100 000 0000',
      role: userData.role || 'guest',
      avatar: userData.avatar || 'https://i.pravatar.cc/150?img=33',
      bio: userData.bio || 'Airbnb traveler & community member',
      createdAt: userData.createdAt || new Date().toISOString(),
      sessionToken: 'sess_' + Math.random().toString(36).substring(2, 10),
      ...userData
    };

    const newSession = {
      sessionId: fullUser.sessionToken,
      userId: fullUser.id,
      userRole: fullUser.role,
      loginAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    const updatedSessions = [newSession, ...sessions];

    setUser(fullUser);
    setSessions(updatedSessions);

    try {
      localStorage.setItem('airbnb_user', JSON.stringify(fullUser));
      localStorage.setItem('user_sessions', JSON.stringify(updatedSessions));
    } catch (e) {
      console.error('Failed to save auth session to localStorage', e);
    }
  };

  const updateProfile = (profileUpdates) => {
    if (!user) return;
    const updatedUser = { ...user, ...profileUpdates };
    setUser(updatedUser);
    try {
      localStorage.setItem('airbnb_user', JSON.stringify(updatedUser));
    } catch (e) {
      console.error('Failed to update user profile in localStorage', e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('airbnb_user');
    } catch (e) {
      console.error('Failed to remove user from localStorage', e);
    }
  };

  const switchRole = (newRole) => {
    if (!user) return;
    const updatedUser = { ...user, role: newRole };
    setUser(updatedUser);
    try {
      localStorage.setItem('airbnb_user', JSON.stringify(updatedUser));
    } catch (e) {
      console.error('Failed to update user role in localStorage', e);
    }
  };

  const isHost = user?.role === 'host';
  const isGuest = user?.role === 'guest';

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isHost,
        isGuest,
        sessions,
        login,
        logout,
        switchRole,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: null,
      role: null,
      isHost: false,
      isGuest: false,
      login: () => {},
      logout: () => {},
      switchRole: () => {}
    };
  }
  return ctx;
};
