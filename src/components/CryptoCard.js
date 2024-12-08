import React, { useState, useContext } from "react";
import "../styles/CryptoCard.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { WatchlistContext } from "../context/WatchlistContext.js"; // Adjust the path as needed

const CryptoCard = ({
  image,
  name,
  symbol,
  price,
  change,
  circulating_supply,
  market_cap,
  volume,
  small,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { watchedCoins, addToWatchlist, removeFromWatchlist } =
    useContext(WatchlistContext);

  const isWatching = watchedCoins.some((coin) => coin.symbol === symbol);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleWatch = (e) => {
    e.stopPropagation();
    if (isWatching) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist({
        image,
        name,
        symbol,
        price,
        change,
        circulating_supply,
        market_cap,
        volume,
      });
    }
  };

  // Combine className props
  const cardClass = `crypto_card_div ${small ? "small" : ""} ${
    className || ""
  }`;

  // Handle missing data by defaulting to 'N/A' if undefined or null
  const formatValue = (value) => {
    if (value === undefined || value === null) return "N/A";
    if (typeof value === "number") return value.toLocaleString();
    return value;
  };

  return (
    <>
      <div className={cardClass} onClick={toggleModal}>
        <img src={image} alt={`${name} logo`} />
        <div className="crypto_details">
          <p className="crypto_name_and_abbv">
            <b>{name}</b> {symbol}
          </p>
          <p className="crypto_price">
            {price !== undefined ? `$${price.toLocaleString()}` : "N/A"}
          </p>
          <p
            className={`crypto_percent ${
              change >= 0 ? "positive" : "negative"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change !== undefined ? change.toFixed(2) : "N/A"}%
          </p>
        </div>
        <button className={isWatching ? "watching" : ""} onClick={toggleWatch}>
          {isWatching ? "Watching" : "Watch"}
        </button>
      </div>

      {isModalOpen && (
        <div className="modal_backdrop" onClick={toggleModal}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <div className="closeicon" onClick={toggleModal}>
              <XMarkIcon className="close_icon" strokeWidth={3} />
            </div>
            <div className="modal_details">
              <img src={image} alt={`${name} logo`} />
              <p className="crypto_name_and_abbv">
                <b>{name}</b> {symbol}
              </p>
              <p className="crypto_price">
                {price !== undefined ? `$${price.toLocaleString()}` : "N/A"}
              </p>
              <span className="percent">
                <p
                  className={`crypto_percent ${
                    change >= 0 ? "positive" : "negative"
                  }`}
                >
                  {change >= 0 ? "+" : ""}
                  {change !== undefined ? change.toFixed(2) : "N/A"}%
                </p>
              </span>
              <span className="deets">
                <p className="p1">Circulating Supply</p>
                <p className="p2">{formatValue(circulating_supply)}</p>
              </span>
              <span className="deets deets2">
                <span>
                  <p className="p1">24h Volume</p>
                  <p className="p2">{formatValue(volume)}</p>
                </span>
                <span>
                  <p className="p1">Market Cap</p>
                  <p className="p2">{formatValue(market_cap)}</p>
                </span>
              </span>
              <button
                className={isWatching ? "button2 watching" : "button2"}
                onClick={toggleWatch}
              >
                {isWatching ? "Watching" : "Watch"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CryptoCard;
