import React, { createContext, useState, useContext, useEffect } from 'react';

const CryptoContext = createContext();

export const useCrypto = () => {
  return useContext(CryptoContext);
};

export const CryptoProvider = ({ children }) => {
  const [watchedCoins, setWatchedCoins] = useState(() => {
    const savedCoins = localStorage.getItem('watchedCoins');
    return savedCoins ? JSON.parse(savedCoins) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchedCoins', JSON.stringify(watchedCoins));
  }, [watchedCoins]);

  const addCoin = (coin) => {
    if (!watchedCoins.some((c) => c.name === coin.name)) {
      setWatchedCoins((prevCoins) => [...prevCoins, coin]);
    }
  };

  const removeCoin = (coinName) => {
    setWatchedCoins((prevCoins) => prevCoins.filter((coin) => coin.name !== coinName));
  };

  return (
    <CryptoContext.Provider value={{ watchedCoins, addCoin, removeCoin }}>
      {children}
    </CryptoContext.Provider>
  );
};
