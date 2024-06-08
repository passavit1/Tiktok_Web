// src/component/SocialLinks/SocialLinks.js
import React from 'react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import './SocialLinks.css';

const SocialLinks = ({ igUrl, tiktokUrl }) => {
  return (
    <div className="social-links">
      <a href={igUrl} target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
        <FaTiktok />
      </a>
    </div>
  );
};

export default SocialLinks;
