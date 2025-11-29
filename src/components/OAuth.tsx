import React from 'react';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';

const OAuth: React.FC = () => {
  return (
    <div className="social-container">
      <button className="social-icon">
        <FaGoogle />
      </button>
      <button className="social-icon">
        <FaApple />
      </button>
      <button className="social-icon">
        <FaFacebook />
      </button>
    </div>
  );
};

export default OAuth;
