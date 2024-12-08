import React, { useState, useEffect, useRef } from "react";
import "../styles/Dashboard.css";
import "../styles/Normalise.css";
import Navbar from "../components/Navbar";
import SideDiv from "../components/SideDiv";
import GreetingTexts from "../components/GreetingTexts";
import SearchBar from "../components/SearchBar";
import AccountBalance from "../components/AccountBalance";
import EmptyWatchlist from "../components/EmptyWatchlist";
import MarketSection from "../components/MarketSection";
import CoinAdded from "../components/CoinAdded";
import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import CryptoCard from "../components/CryptoCard";

const Market = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);

  // Fetch cryptocurrency data on component mount
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
        );
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
    };

    fetchCryptos();
  }, []);

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
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
        );
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
    };

    fetchCryptos();
  }, []);

  const { watchedCoins } = useContext(WatchlistContext);

  return (
    <section className="dashboard_section">
      <div className="central_div">
        <div className="main_content">
          <GreetingTexts p1="Market" p2="Find your next crypto here" />
          <SearchBar />

          <div className="listcryptos">
            {filteredCryptos.length > 0 ? (
              filteredCryptos.map((crypto) => (
                <CryptoCard
                  key={crypto.id}
                  image={crypto.image}
                  name={crypto.name}
                  symbol={crypto.symbol.toUpperCase()}
                  price={crypto.current_price}
                  change={crypto.price_change_percentage_24h}
                  circulating_supply={crypto.circulating_supply}
                  market_cap={crypto.market_cap}
                  volume={crypto.total_volumes}
                />
              ))
            ) : (
              <p>Searching ...</p>
            )}
          </div>
        </div>
        <Navbar />
      </div>
      <SideDiv />
    </section>
  );
};

export default Market;
