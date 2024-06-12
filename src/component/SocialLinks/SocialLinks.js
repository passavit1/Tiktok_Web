import React from 'react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import './SocialLinks.css';

const isMobileDevice = () => {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const SocialLinks = ({ igUrl, tiktokUrl }) => {
  const isMobile = isMobileDevice();

  const mobileIgUrl = isMobile ? `instagram://user?username=${igUrl.split('/').pop()}` : igUrl;
  const mobileTiktokUrl = isMobile ? `tiktok://user/@${tiktokUrl.split('/').pop()}` : tiktokUrl;

  return (
    <div className="social-links">
      <a href={mobileIgUrl} target={isMobile ? "_self" : "_blank"} rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href={mobileTiktokUrl} target={isMobile ? "_self" : "_blank"} rel="noopener noreferrer">
        <FaTiktok />
      </a>
    </div>
  );
};

export default SocialLinks;
