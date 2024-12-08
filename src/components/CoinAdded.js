import React, { useState, useEffect, useContext } from 'react';
import { WatchlistContext } from '../context/WatchlistContext'; // Correct the import path
import '../styles/CryptoCard.css';
import '../styles/CoinAdded.css';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const CoinAdded = ({ coin }) => {
  const { watchedCoins, addToWatchlist, removeFromWatchlist } = useContext(WatchlistContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coinData, setCoinData] = useState({}); // State to store data for all watched coins
  const [loading, setLoading] = useState(true); // State for loading

  const isWatching = watchedCoins.some((c) => c.symbol === coin.symbol);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleWatchToggle = (e) => {
    e.stopPropagation();
    if (isWatching) {
      removeFromWatchlist(coin.symbol);
    } else {
      addToWatchlist(coin);
    }
  };

  // Fetch data from CoinGecko API for a specific coin
  const fetchCoinData = async (coinId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`, {
          params: {
            localization: 'false',  // Avoid localization (translations)
            tickers: 'false',       // Avoid tickers (unnecessary for your needs)
            market_data: 'true',    // Include market data (prices, volume, market cap)
            community_data: 'false', // Exclude community data
            developer_data: 'false', // Exclude developer data
            sparkline: 'false',     // No need for sparkline data
          },
          headers: {
            'X-CG-API-KEY': 'CG-mZH7hJNVxyQoyMbxgE6NjaAe' // Your API key
          }
        }
      );
      
      const coinInfo = response.data; // Assuming the response data is correctly structured
      setCoinData(coinInfo);  // Update the state with fetched data
      setLoading(false); // Set loading state to false once data is fetched
    } catch (error) {
      console.error('Error fetching CoinGecko data:', error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  useEffect(() => {
    fetchCoinData(coin.id); // Fetch data when the coin's id changes
  }, [coin.id]);

  // Formatting price and volume for display
  const formatValue = (value) => {
    if (value === undefined || value === null) return "N/A";
    if (typeof value === "number") return value.toLocaleString();
    return value;
  };

  const getTime = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()} UTC`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Get the specific coin data from the state
  const specificCoinData = coinData.market_data || {};

  return (
    <>
      <div className="coinadded_container" onClick={toggleModal}>
        <div className="coincard">
          <div className="top_part">
            <img src={coin.image} alt={coin.name} />
            <p className="crypto_name_and_abbv">
              <b>{coin.name}</b> {coin.symbol}
            </p>
          </div>
          <div className="bottom_part">
            <p className="crypto_price">
                ${coin.price}
            </p>
            <p className={`crypto_percent ${coin.change >= 0 ? "positive" : "negative"}`}>
            {coin.change >= 0 ? "+" : ""}
              {coin.change !== undefined
                ? `${coin.change.toFixed(2)}%`
                : "N/A"}
                {/* {coin.change}% */}
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal_backdrop" onClick={toggleModal}>
          <div className="modal_content coinadded" onClick={(e) => e.stopPropagation()}>
            <div className="closeicon" onClick={toggleModal}>
              <XMarkIcon className="close_icon" strokeWidth={3} />
            </div>

            <div className="modal_details">
              <img src={coin.image} className="imgg" alt={coin.name} />
              <p className="crypto_name_and_abbv">
                <b>{coin.name}</b> {coin.symbol}
              </p>
              <p className="crypto_price">
                {coin.price
                  ? `$${coin.price.toLocaleString()}`
                  : "N/A"}
              </p>
              <span className="percent">
                <p className={`crypto_percent ${coin.change >= 0 ? "positive" : "negative"}`}>
                  {coin.change >= 0 ? "+" : ""}
                  {coin.change !== undefined 
                    ? coin.change.toFixed(2) 
                    : "N/A"}%
                </p>
                <p className="added">
                  {coin.price && coin.change
                    ? `Lost ${(coin.price * (coin.change / 100)).toFixed(2)}$ today`
                    : "No price change data"}
                </p>
              </span>
              <span className="deets">
                <p className="p1">Time</p>
                <p className="p2">{getTime(Date.now())}</p>
              </span>
              {/* <span className="deets deets2">
                <span>
                  <p className="p1">24h Volume</p>
                  <p className="p2">
                    {coin.volume 
                      ? formatValue(coin.volume) 
                      : "N/A"}
                  </p>
                </span>
                <span>
                  <p className="p1">Market Cap</p>
                  <p className="p2">
                    {coin.market_cap 
                      ? formatValue(coin.market_cap.usd) 
                      : "N/A"}
                  </p>
                </span>
              </span> */}
              <button
                className={isWatching ? 'button2 watching' : 'button2'}
                onClick={handleWatchToggle}
              >
                {isWatching ? 'Watching' : 'Watch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinAdded;
