import React from 'react'
import emptyimg from '../assets/images/Charco Mobile Life.png'
import '../styles/EmptyWatchlist.css'

const EmptyWatchlist = () => {
  return (
    <div className='emptywatchlist_div' >
      <img src={emptyimg} alt='empty state' />
      <p className="p1">Empty watchlist</p>
      <p className="p2">Your watchlist is currently empty, search or add cryptos from market.</p>
    </div>
  )
}

export default EmptyWatchlist
