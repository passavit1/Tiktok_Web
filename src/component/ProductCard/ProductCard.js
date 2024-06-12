import React from "react";
import { Card } from "antd";
import "./ProductCard.css";

const ProductCard = ({ image, title, url }) => {
  return (
    <Card
      hoverable
      cover={<img alt={title} src={image} className="product-card-image" />}
      className="product-card"
    >
      <Card.Meta title={title} />
    </Card>
  );
};

export default ProductCard;
