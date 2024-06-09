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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Users/${process.env.REACT_APP_USER_ID}`);
        const data = response.data;

        setProfileData({
          profileImage: data.profileImageUrl || 'path/to/default/image.jpg',
          profileName: data.name || 'John Doe',
          igUrl: data.igUrl || 'https://instagram.com/default',
          tiktokUrl: data.tiktokUrl || 'https://tiktok.com/@default',
          products: data.products || [], // Default to an empty array if products are not provided
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchData();
  }, []);

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
