import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = (pkg = null) => {
    setSelectedPackage(pkg);
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setSelectedPackage(null);
  };

  return (
    <AppContext.Provider value={{
      menuOpen, setMenuOpen,
      selectedPackage, setSelectedPackage,
      bookingOpen, openBooking, closeBooking,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
