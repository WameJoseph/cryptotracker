import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import CryptoCard from "./CryptoCard"; // Make sure to import CryptoCard correctly

const SearchBar = () => {
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

  // Handle input change and search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Search bar */}
      <div className="searchbar" onClick={openModal}>
        <MagnifyingGlassIcon className="search_icon" />
        <form action="">
          <input
            type="search"
            placeholder="Search cryptocurrencies"
            onChange={handleSearch}
            value={searchQuery}
            ref={inputRef}
          />
        </form>
        <div className="cmd_shorcut">
          <p>⌘</p>
          <p>K</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="search_modal">
          <div className="cancel_button" onClick={closeModal}>
            <XMarkIcon className="close_icon" strokeWidth={3} />
          </div>
          <div className="searchbar">
            <MagnifyingGlassIcon className="search_icon" strokeWidth={2.5} />
            <form action="">
              <input
                type="search"
                placeholder="Search cryptocurrencies"
                ref={inputRef}
                onChange={handleSearch}
                value={searchQuery}
              />
            </form>
            <div className="cmd_shorcut">
              <p>⌘</p>
              <p>K</p>
            </div>
          </div>
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
      )}
    </>
  );
};

export default SearchBar;
