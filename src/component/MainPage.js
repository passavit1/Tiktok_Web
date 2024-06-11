import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import SocialLinks from "./SocialLinks/SocialLinks";
import ProductCard from "./ProductCard/ProductCard";
import "./MainPage.css";
import profileService from "../services/profileService";
import productService from "../services/productService";

const MainPage = () => {
  const [profileData, setProfileData] = useState({
    profileImage: "",
    profileName: "",
    igUrl: "",
    tiktokUrl: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await profileService.getProfileById(process.env.REACT_APP_USER_ID);
        const data = response.data;
        setProfileData({
          profileImage: data.profileImageUrl || "",
          profileName: data.name || "",
          igUrl: data.igUrl || "https://instagram.com",
          tiktokUrl: data.tiktokUrl || "https://tiktok.com",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts(process.env.REACT_APP_USER_ID);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProfileData();
    fetchProducts();
  }, []);

  return (
    <div className="main-page">
      <Header
        profileImage={profileData.profileImage}
        profileName={profileData.profileName}
      />
      <SocialLinks
        igUrl={profileData.igUrl}
        tiktokUrl={profileData.tiktokUrl}
      />
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
