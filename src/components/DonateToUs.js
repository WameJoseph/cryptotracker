import React, { useState } from 'react';
import '../styles/DonateToUs.css';
import '../styles/CryptoCard.css';
import '../styles/AccountBalance.css';
import { XMarkIcon } from '@heroicons/react/24/outline';
import moneygif from '../assets/images/moneygif.gif'

const DonateToUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className='donatetous_div' onClick={toggleModal}>
        <p>Donate to Us ! ❤️😘</p>
        <div className="bg_img"></div>
        <button>Donate here 💵</button>
      </div>

      {isModalOpen && (
        <div className="modal_backdrop" onClick={toggleModal}>
          <div className="modal_content donatetous" onClick={(e) => e.stopPropagation()}>
          <div className="closeicon" onClick={toggleModal}>
              <XMarkIcon className="close_icon" strokeWidth={3} />
            </div>
            <br />

            <div className="modal_details">
              <img src={moneygif} className="donate_img" alt={'moneygif'} />
              <p className="crypto_price">Donate to this ❤️😘</p>
              <span className="deets deets2">
                <span>
                  <p className="p1">Account No :</p>
                  <p className="p2">70132518999</p>
                </span>
                <span>
                  <p className="p1">Bank No :</p>
                  <p className="p2">OPAY Bank</p>
                </span>
                <span>
                  <p className="p1">Account Name :</p>
                  <p className="p2">Ayomide Lateef</p>
                </span>
              </span>
              <button
                className='button2'
                onClick={toggleModal}
              >
                I’ve Donated !
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default DonateToUs;
