import React from "react";
import { Card } from "antd";
import "./ProductCard.css";

const ProductCard = ({ image, title, url }) => {
  return (
    <Card
      hoverable
      cover={
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img alt={title} src={image} className="product-card-image" />
        </a>
      }
      className="product-card"
    >
      <Card.Meta title={title} />
    </Card>
  );
};

export default ProductCard;
