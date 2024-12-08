import React, { useState, useEffect } from 'react';
import '../styles/MarketSection.css';
import { Link } from 'react-router-dom';
import CryptoCard from './CryptoCard';

const MarketSection = () => {
  const [cryptos, setCryptos] = useState([]);

  // Fetch cryptocurrencies from CoinGecko API
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false'
        );
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptos();
  }, []);

  return (
    <div className='marketsection_div'>
      <div className="line"></div>
      <div className="market_preview">

        <div className="top">
          <div className="top_text">
            <p className="p1">Market cryptos</p>
            <p className="p2">Cryptos you can add to track here</p>
          </div>
          <Link to='/market' className='view_all_link'>View all</Link>
        </div>

        <div className="cryptolist">
          <div className="crypto_cards">
            {/* Map over the fetched cryptos and pass the data to CryptoCard */}
            {cryptos.length > 0 ? (
              cryptos.map((crypto) => (
                <CryptoCard
                  key={crypto.id}
                  image={crypto.image}
                  name={crypto.name}
                  symbol={crypto.symbol.toUpperCase()}
                  price={crypto.current_price}
                  change={crypto.price_change_percentage_24h}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <Link to='/market' className='view_all_link'>View all</Link>
        </div>

      </div>
    </div>
  );
};

export default MarketSection;
