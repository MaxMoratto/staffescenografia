"use client";

import React, { createContext, useContext, useState } from 'react';

const QuoteContext = createContext();

export function QuoteProvider({ children }) {
  const [quoteItems, setQuoteItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Add item to quote or increment quantity if it exists
  const addToQuote = (product) => {
    setQuoteItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    setIsSidebarOpen(true); // Auto-open sidebar when adding
  };

  const removeFromQuote = (productId) => {
    setQuoteItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setQuoteItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, item.quantity + amount);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  const getTotalPrice = () => {
    return quoteItems.reduce((total, item) => total + (item.product.rentalPrice * item.quantity), 0);
  };

  return (
    <QuoteContext.Provider value={{
      quoteItems,
      addToQuote,
      removeFromQuote,
      updateQuantity,
      clearQuote,
      getTotalPrice,
      isSidebarOpen,
      setIsSidebarOpen
    }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  return useContext(QuoteContext);
}
