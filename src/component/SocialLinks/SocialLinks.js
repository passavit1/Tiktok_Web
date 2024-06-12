import React from 'react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import './SocialLinks.css';

const SocialLinks = ({ igUrl, tiktokUrl }) => {
  const handleInstagramClick = () => {
    const instagramAppUrl = `instagram://user?username=${igUrl.split('.com/')[1]}`;
    const webUrl = igUrl.startsWith('http') ? igUrl : `https://${igUrl}`;
    
    window.location.href = instagramAppUrl;
    
    setTimeout(() => {
      if (document.visibilityState === 'hidden') {
        return;
      }
      window.location.href = webUrl;
    }, 500);
  };

  const handleTiktokClick = () => {
    const tiktokAppUrl = `tiktok://user/profile/${tiktokUrl.split('.com/@')[1]}`;
    const webUrl = tiktokUrl.startsWith('http') ? tiktokUrl : `https://${tiktokUrl}`;
    
    window.location.href = tiktokAppUrl;
    
    setTimeout(() => {
      if (document.visibilityState === 'hidden') {
        return;
      }
      window.location.href = webUrl;
    }, 500);
  };

  return (
    <div className="social-links">
      <a onClick={handleInstagramClick} rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a onClick={handleTiktokClick} rel="noopener noreferrer">
        <FaTiktok />
      </a>
    </div>
  );
};

export default SocialLinks;
