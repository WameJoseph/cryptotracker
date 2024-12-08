import React, { createContext, useState, useContext, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(() => {
    const savedWallet = localStorage.getItem('wallet');
    return savedWallet ? JSON.parse(savedWallet) : [];
  });

  useEffect(() => {
    localStorage.setItem('wallet', JSON.stringify(wallet));
  }, [wallet]);

  const addCryptoToWallet = (crypto, amount) => {
    setWallet((prevWallet) => {
      const existingCrypto = prevWallet.find((item) => item.id === crypto.id);
      if (existingCrypto) {
        return prevWallet.map((item) =>
          item.id === crypto.id
            ? { ...item, amount: item.amount + parseFloat(amount) }
            : item
        );
      }
      return [...prevWallet, { ...crypto, amount: parseFloat(amount) }];
    });
  };

  const totalBalance = wallet.reduce(
    (acc, item) => acc + item.amount * item.current_price,
    0
  );

  const totalGrowth = wallet.reduce(
    (acc, item) => acc + (item.price_change_percentage_24h || 0) * item.amount,
    0
  );

  return (
    <WalletContext.Provider
      value={{ wallet, addCryptoToWallet, totalBalance, totalGrowth }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
