import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import SocialLinks from "./SocialLinks/SocialLinks";
import ProductCard from "./ProductCard/ProductCard";
import mainDataService from "../services/mainDataService";
import "./MainPage.css";

const MainPage = () => {
  const [profileData, setProfileData] = useState({
    profileImage: "",
    profileName: "",
    igUrl: "",
    tiktokUrl: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProfileWithProducts = async () => {
      try {
        const response = await mainDataService.getProfileWithProducts(process.env.REACT_APP_USER_ID);
        const data = response.data;

        setProfileData({
          profileImage: data.profile.profileImageUrl || "",
          profileName: data.profile.name || "",
          igUrl: data.profile.igUrl || "https://instagram.com",
          tiktokUrl: data.profile.tiktokUrl || "https://tiktok.com",
        });

        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching profile and products data:", error);
      }
    };

    fetchProfileWithProducts();
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
      <div className="product-slider">
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
