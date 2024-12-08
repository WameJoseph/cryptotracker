import React, { useState, useEffect } from 'react';
import '../styles/AccountBalance.css';
import btcimg from '../assets/images/btcImg.png';
import { ArrowUpRightIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import '../styles/CryptoCard.css';
import '../styles/SearchBar.css';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const AccountBalance = () => {
  const [walletBalance, setWalletBalance] = useState(0); // Total wallet balance
  const [totalGrowthPercent, setTotalGrowthPercent] = useState(0); // Total growth percentage
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [addedCryptos, setAddedCryptos] = useState([]); // Track added cryptos
  const itemsPerPage = 5;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleCryptoModal = () => {
    setIsCryptoModalOpen(!isCryptoModalOpen);
    setCryptoAmount('');
  };

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        );
        const data = await response.json();
        setCryptos(data);
        setFilteredCryptos(data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptos();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(query.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCryptos(filtered);
  };

  const handleCryptoClick = (crypto) => {
    setSelectedCrypto(crypto);
    setIsCryptoModalOpen(true);
  };

  const handleAddToWallet = () => {
    if (cryptoAmount && selectedCrypto) {
      const amount = parseFloat(cryptoAmount);
      if (!isNaN(amount) && amount > 0) {
        setWalletBalance((prevBalance) => prevBalance + amount);

        // Add the crypto to the list of added cryptos
        const updatedCryptos = [...addedCryptos, selectedCrypto];
        setAddedCryptos(updatedCryptos);

        // Recalculate the total growth percentage
        const totalGrowth = updatedCryptos.reduce(
          (sum, crypto) => sum + (crypto.price_change_percentage_24h || 0),
          0
        );
        setTotalGrowthPercent(totalGrowth);

        toggleCryptoModal();
      } else {
        alert('Please enter a valid amount greater than 0.');
      }
    } else {
      alert('Please enter a valid amount and select a cryptocurrency.');
    }
  };

  const currentCryptos = filteredCryptos.slice(0, itemsPerPage);

  return (
    <>
      <div className="AccountBalance_div" onClick={toggleModal}>
        <div className="account_div">
          <span>
            <p className="p1">Your Wallet Value</p>
            <p className="p2">·</p>
            <p className="p2">USD</p>
          </span>
          <span>
            <p className="account_balance_text">${walletBalance.toFixed(2)}</p>
            <p className="account_growth_percent_text">
              {totalGrowthPercent >= 0 ? `+${totalGrowthPercent.toFixed(2)}%` : `${totalGrowthPercent.toFixed(2)}%`}
            </p>
          </span>
        </div>
        <div className="plus_sign">
          <PlusIcon className="plus_icon" strokeWidth={3} />
        </div>
      </div>

      {isModalOpen && (
        <div className="modal_backdrop" onClick={toggleModal}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <div className="closeicon" onClick={toggleModal}>
              <XMarkIcon className="close_icon" strokeWidth={3} />
            </div>
            <div className="modal_details">
              <div className="searchbar">
                <MagnifyingGlassIcon className="search_icon" />
                <form action="">
                  <input
                    type="search"
                    placeholder="Search cryptocurrencies"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </form>
              </div>

              <div className="crypto_item_list">
                <p className="big_text">Cryptos</p>
                {currentCryptos.length > 0 ? (
                  currentCryptos.map((crypto) => (
                    <div
                      className="crypto_item"
                      key={crypto.id}
                      onClick={() => handleCryptoClick(crypto)}
                    >
                      <img src={crypto.image} alt={`${crypto.name} logo`} />
                      <p className="crypto_name_and_abbv">
                        <b>{crypto.name}</b> {crypto.symbol.toUpperCase()}
                      </p>
                      <span>
                        <ArrowUpRightIcon className="arrowup_icon" strokeWidth={3} />
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="no_results_text">No results found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isCryptoModalOpen && selectedCrypto && (
        <div className="modal_backdrop" onClick={toggleCryptoModal}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <div className="closeicon" onClick={toggleCryptoModal}>
              <XMarkIcon className="close_icon" strokeWidth={3} />
            </div>
            <div className="crypto_modal_details account_balance_modal">
              <img
                src={selectedCrypto.image}
                alt={`${selectedCrypto.name} logo`}
                className="crypto_modal_image"
              />
              <h2>{selectedCrypto.name}</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value)}
                />
                <button type="button" onClick={handleAddToWallet}>
                  Add to Wallet
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountBalance;
