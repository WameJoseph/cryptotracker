import React from 'react';
import '../styles/GreetingTexts.css';

const GreetingTexts = ({ p1, p2 }) => {
  return (
    <div className='greeting_text'>
      <p className="p1">{p1}</p>
      <p className="p2">{p2}</p>
    </div>
  );
};

export default GreetingTexts;
