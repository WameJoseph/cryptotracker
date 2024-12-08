import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import Suggested from './pages/Suggested';
import Team from './pages/Team';
import { CryptoProvider } from './context/CryptoContext';
import { WatchlistProvider } from './context/WatchlistContext'; // Import the WatchlistProvider
import { WalletProvider } from './context/WalletContext';
import './App.css';

function App() {
  return (
    <CryptoProvider>
      <WatchlistProvider> {/* Wrap the app with WatchlistProvider */}
        <WalletProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/market" element={<Market />} />
                <Route path="/suggested" element={<Suggested />} />
                <Route path="/team" element={<Team />} />
              </Routes>
            </div>
          </Router>
        </WalletProvider>
      </WatchlistProvider>
    </CryptoProvider>
  );
}

export default App;
