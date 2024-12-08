import React, { useState, useEffect, useRef } from 'react';
import OurProfile from './Ourprofile'
import userimg1 from '../assets/images/userimg1.png';
import userimg2 from '../assets/images/userimg2.png';
import userimg3 from '../assets/images/userimg3.png';

import CryptoCard from '../components/CryptoCard';
import DonateToUs from '../components/DonateToUs';

const ProfileReview = ({ name, alias, profileImg, desc }) => {
  return (
    <>
      <div className="our_profile_div">
        <img src={profileImg} alt="Profile" />
        <span>
          <p className="pp1">{name}</p>
          <p className="pp2">{alias}</p>
        </span>
      </div>
      <p className="team_profile_desc">{desc}</p>
    </>
  )
}

export default ProfileReview
