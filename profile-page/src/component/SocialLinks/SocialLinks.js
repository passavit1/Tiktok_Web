import React from "react";
import { FaInstagram, FaTiktok, FaLine } from "react-icons/fa";
import "./SocialLinks.css";

const SocialLinks = () => {
  return (
    <div className="social-links">
      <a href="https://www.instagram.com/mimmewmeww/">
        <FaInstagram />
      </a>
      <a href="https://www.tiktok.com/@solmoon12">
        <FaTiktok />
      </a>
    </div>
  );
};

export default SocialLinks;
