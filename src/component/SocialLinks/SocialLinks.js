import React from 'react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import './SocialLinks.css';

const SocialLinks = ({ igUrl, tiktokUrl }) => {
  return (
    <div className="social-links">
      <a
        href={igUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-title="Instagram"
        data-html={igUrl}
        data-id="uniqueId"
        data-kid="uniqueKid"
        data-atype="4"
        data-type="4"
      >
        <FaInstagram />
      </a>
      <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" style={{pointerEvents:"unset"}}>
        <FaTiktok />
      </a>
    </div>
  );
};

export default SocialLinks;
