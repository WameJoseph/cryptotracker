import React from 'react';
import '../styles/Dashboard.css';
import '../styles/Normalise.css';
import Navbar from '../components/Navbar';
import SideDiv from '../components/SideDiv';
import GreetingTexts from '../components/GreetingTexts';
import SearchBar from '../components/SearchBar';
import AccountBalance from '../components/AccountBalance';
import EmptyWatchlist from '../components/EmptyWatchlist';
import MarketSection from '../components/MarketSection';
import CoinAdded from '../components/CoinAdded';
import { useContext } from 'react';
import { WatchlistContext } from '../context/WatchlistContext';

const Dashboard = () => {
  const { watchedCoins } = useContext(WatchlistContext);

  return (
    <section className="dashboard_section">
      <div className="central_div">
        <div className="main_content">
          <GreetingTexts p1="Welcome!" p2="Abdullateef Ayomide" />
          <SearchBar />
          <AccountBalance />
          {watchedCoins.length === 0 ? (
            <EmptyWatchlist />
          ) : (
            <div className="Coinlist">
              {watchedCoins.map((coin, index) => (
                <CoinAdded key={index} coin={coin} />
              ))}
            </div>
          )}
          <MarketSection />
        </div>
        <Navbar />
      </div>
      <SideDiv />
    </section>
  );
};

export default Dashboard;
