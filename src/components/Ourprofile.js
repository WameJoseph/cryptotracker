import React, { useState, useEffect, useRef } from "react";
import CryptoCard from "../components/CryptoCard";
import DonateToUs from "../components/DonateToUs";
import userimg1 from "../assets/images/userimg1.png";
import userimg2 from "../assets/images/userimg2.png";
import userimg3 from "../assets/images/userimg3.png";

const OurProfile = ({ name, alias, profileImg }) => {
  const [cryptos, setCryptos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);

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

  return (
    <>
      <div className="our_profile_div">
        <img src={profileImg} alt="Profile" />
        <span>
          <p className="pp1">{name}</p>
          <p className="pp2">{alias}</p>
        </span>
      </div>
      <div className="listcryptos our_profile_div_listcryptos">
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

        <DonateToUs />
      </div>
    </>
  );
};

export default OurProfile;
