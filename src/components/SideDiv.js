import React, { useState, useEffect } from 'react';
import CryptoCard from './CryptoCard';
import { Link } from 'react-router-dom';
import DonateToUs from './DonateToUs';

const SideDiv = () => {
  const [cryptos, setCryptos] = useState([]);

  // Fetch cryptocurrencies from CoinGecko API
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false'
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
    <div className='sideDiv'>
      <div className='scrolldiv'>
        <div className='preview preview1'>
          {/* Map over the fetched cryptos and pass the data to CryptoCard */}
          {cryptos.length > 0 ? (
            cryptos.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                className="small"
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
          <Link to='/market' className='view_all_link'>View all</Link>
        </div>
        <div className='preview preview2'>
          <DonateToUs />
        </div>
      </div>
    </div>
  );
};

export default SideDiv;
