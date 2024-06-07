import React from "react";
import "./ProductCard.css";

const ProductCard = ({ image, title, url }) => {
  return (
    <div className="product-card">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={title} />
      </a>
      <h2>{title}</h2>
    </div>
  );
};

export default ProductCard;
