import React, { useState, useEffect, useRef } from 'react';
import '../styles/Dashboard.css';
import '../styles/Normalise.css';
import '../styles/Ourprofile.css';
import Navbar from '../components/Navbar';
import SideDiv from '../components/SideDiv';
import GreetingTexts from '../components/GreetingTexts';
import { useContext } from 'react';
import { WatchlistContext } from '../context/WatchlistContext';
import CryptoCard from '../components/CryptoCard';
import DonateToUs from '../components/DonateToUs';
import Ourprofile from '../components/Ourprofile';

// Import images directly
import userimg1 from '../assets/images/userimg1.png';
import userimg2 from '../assets/images/userimg2.png';
import userimg3 from '../assets/images/userimg3.png';

const Suggested = () => {
  const { watchedCoins } = useContext(WatchlistContext);
  const [cryptos, setCryptos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter cryptocurrencies based on search query
  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <section className="dashboard_section">
      <div className="central_div">
        <div className="main_content">
          <GreetingTexts p1="Suggested" p2="Our suggestions & picks for you" />
          <Ourprofile name="Ayomide Lateef" alias="Aka. Crypto Ogba!" profileImg={userimg1} />
          <Ourprofile name="Ashok Ananth" alias="Wiz of BTC" profileImg={userimg2} />
          <Ourprofile name="Victor Emmanuel" alias="ETH IS BEST" profileImg={userimg3} />
        </div>
        <Navbar />
      </div>
      <SideDiv />
    </section>
  );
};

export default Suggested;
