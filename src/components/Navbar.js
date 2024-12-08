import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

// Import solid and outline versions of the icons
import { HomeIcon as HomeIconSolid, UserIcon } from '@heroicons/react/24/solid';
import { ChartBarSquareIcon as ChartBarSquareIconSolid } from '@heroicons/react/24/solid';
import { CheckBadgeIcon as CheckBadgeIconSolid } from '@heroicons/react/24/solid';
import { UsersIcon as UsersIconSolid } from '@heroicons/react/24/solid';

import { HomeIcon as HomeIconOutline, UsersIcon } from '@heroicons/react/24/outline';
import { ChartBarSquareIcon as ChartBarSquareIconOutline } from '@heroicons/react/24/outline';
import { CheckBadgeIcon as CheckBadgeIconOutline } from '@heroicons/react/24/outline';
import { UsersIcon as UsersIconOutline } from '@heroicons/react/24/outline';

const Navbar = () => {
  // Get the current route location
  const location = useLocation();

  // Helper function to check if the current route matches the link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav">
      <Link to="/dashboard" className={`nav_item ${isActive('/dashboard') ? 'active' : ''}`}>
        {/* Render solid icon if active, outline if not */}
        {isActive('/dashboard') ? (
          <HomeIconSolid className="i" />
        ) : (
          <HomeIconOutline className="i" />
        )}
        <p>Dashboard</p>
      </Link>

      <Link to="/market" className={`nav_item ${isActive('/market') ? 'active' : ''}`}>
        {/* Render solid icon if active, outline if not */}
        {isActive('/market') ? (
          <ChartBarSquareIconSolid className="i" />
        ) : (
          <ChartBarSquareIconOutline className="i" />
        )}
        <p>Market</p>
      </Link>

      <Link to="/suggested" className={`nav_item ${isActive('/suggested') ? 'active' : ''}`}>
        {/* Render solid icon if active, outline if not */}
        {isActive('/suggested') ? (
          <CheckBadgeIconSolid className="i" />
        ) : (
          <CheckBadgeIconOutline className="i" />
        )}
        <p>Suggested</p>
      </Link>

      <Link to="/team" className={`nav_item ${isActive('/team') ? 'active' : ''}`}>
        {/* Render solid icon if active, outline if not */}
        {isActive('/team') ? (
          <UsersIconSolid className="i" />
        ) : (
          <UsersIconOutline className="i" />
        )}
        <p>Team</p>
      </Link>
    </nav>
  );
};

export default Navbar;
