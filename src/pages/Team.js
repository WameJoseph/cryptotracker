import React from 'react';
import '../styles/Dashboard.css';
import '../styles/Normalise.css';
import '../styles/Team.css';
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
import DonateToUs from '../components/DonateToUs';
import ProfileReview from '../components/ProfileReview';
// Import images directly
import userimg1 from '../assets/images/userimg1.png';
import userimg2 from '../assets/images/userimg2.png';
import userimg3 from '../assets/images/userimg3.png';


const Team = () => {
  const { watchedCoins } = useContext(WatchlistContext);

  return (
    <section className="dashboard_section">
      <div className="central_div">
      {/* <div className="profileBg"></div> */}
        <div className="main_content">
          <div className="profileBg"></div>
          <DonateToUs />
          <div className="profile_reviews">
            <ProfileReview name="Ayomide Lateef" alias="Aka. Crypto Ogba!" desc="I’m Ayomide Lateef, Computer science major, and master of crypto, ready to build " profileImg={userimg1} />
            <ProfileReview name="Ashok Ananth" alias="Wiz of BTC" desc="Hello, I’m Ashok, a crypto enthusiast, and Wizard of BTC." profileImg={userimg2} />
            <ProfileReview name="Victor Emmanuel" alias="ETH IS BEST" profileImg={userimg3} desc="Victor Emmanuel here, Biggest fan of tech, crypto, and more, reach me on my socials below." />

          </div>
        </div>
        <Navbar />
      </div>
      <SideDiv />
    </section>
  );
};

export default Team;
