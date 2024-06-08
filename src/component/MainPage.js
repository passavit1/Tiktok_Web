import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header/Header';
import SocialLinks from './SocialLinks/SocialLinks';
import ProductCard from './ProductCard/ProductCard';
import './MainPage.css';

const MainPage = () => {
  const [profileData, setProfileData] = useState({
    profileImage: '',
    profileName: '',
    igUrl: '',
    tiktokUrl: '',
    products: [],
  });

  const userId = process.env.REACT_APP_USER_ID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user information
        const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`);
        const userData = userResponse.data;

        // Fetch products
        const productsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
          params: { userId },
        });
        const productsData = productsResponse.data;

        // Set profile data with both user information and products
        setProfileData({
          profileImage: userData.profileImageUrl || 'path/to/default/image.jpg',
          profileName: userData.name || 'John Doe',
          igUrl: userData.igUrl || 'https://instagram.com/default',
          tiktokUrl: userData.tiktokUrl || 'https://tiktok.com/@default',
          products: productsData || [], // Default to an empty array if products are not provided
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="main-page">
      <Header profileImage={profileData.profileImage} profileName={profileData.profileName} />
      <SocialLinks igUrl={profileData.igUrl} tiktokUrl={profileData.tiktokUrl} />
      <div className="product-grid">
        {profileData.products.map((product, index) => (
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
