import React from 'react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import './SocialLinks.css';

const isMobileDevice = () => {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const SocialLinks = ({ igUrl, tiktokUrl }) => {
  const isMobile = isMobileDevice();

  return (
    <div className="social-links">
      <a href={igUrl} target={isMobile ? "_self" : "_blank"} rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href={tiktokUrl} target={isMobile ? "_self" : "_blank"} rel="noopener noreferrer">
        <FaTiktok />
      </a>
    </div>
  );
};

export default SocialLinks;
