import React from "react";
import Header from "./Header/Header";
import SocialLinks from "./SocialLinks/SocialLinks";
import ProductCard from "./ProductCard/ProductCard";
import "./MainPage.css";

import image1 from "../Images/image1.jpg";

const products = [
  {
    image: image1,
    title: "ผ้าโพกผมถักไหมพรม",
    url: "https://s.shopee.co.th/1LKREQ0Xaf",
  },
];

const MainPage = () => {
  return (
    <div className="main-page">
      <Header />
      <SocialLinks />
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            url={product.url}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
