import React from 'react';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';

const OAuth: React.FC = () => {
  return (
    <div className="flex justify-center my-4">
      <button className="w-10 h-10 rounded-full bg-surface flex justify-center items-center mx-2 text-textSecondary cursor-pointer transition-colors border border-border hover:bg-background">
        <FaGoogle />
      </button>
      <button className="w-10 h-10 rounded-full bg-surface flex justify-center items-center mx-2 text-textSecondary cursor-pointer transition-colors border border-border hover:bg-background">
        <FaApple />
      </button>
      <button className="w-10 h-10 rounded-full bg-surface flex justify-center items-center mx-2 text-textSecondary cursor-pointer transition-colors border border-border hover:bg-background">
        <FaFacebook />
      </button>
    </div>
  );
};

export default OAuth;
