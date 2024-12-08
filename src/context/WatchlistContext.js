import React, { createContext, useState, useEffect } from 'react';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchedCoins, setWatchedCoins] = useState(() => {
    const savedWatchlist = localStorage.getItem('watchedCoinsList');
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchedCoinsList', JSON.stringify(watchedCoins));
  }, [watchedCoins]);

  const addToWatchlist = (coin) => {
    setWatchedCoins((prev) => [...prev, coin]);
  };

  const removeFromWatchlist = (symbol) => {
    setWatchedCoins((prev) => prev.filter((coin) => coin.symbol !== symbol));
  };

  return (
    <WatchlistContext.Provider value={{ watchedCoins, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
