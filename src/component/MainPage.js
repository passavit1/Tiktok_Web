import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import SocialLinks from "./SocialLinks/SocialLinks";
import ProductCard from "./ProductCard/ProductCard";
import CreateUserModal from './NewUserModal/CreateUserModal';
import "./MainPage.css";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/UserContext';
import userService from '../services/userService';
import productService from '../services/productService';

const MainPage = () => {
  const [profileData, setProfileData] = useState({
    profileImage: '',
    profileName: '',
    igUrl: '',
    tiktokUrl: '',
  });

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [uid, setUid] = useState('');
  const { user, setUser } = useUser(); // Use user context
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await userService.getUserByUid(process.env.REACT_APP_USER_ID);
        const data = response.data;

        setProfileData({
          profileImage: data.profileImageUrl || '',
          profileName: data.name || '',
          igUrl: data.igUrl || 'https://instagram.com',
          tiktokUrl: data.tiktokUrl || 'https://tiktok.com',
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await productService.getProductsByProfileId(process.env.REACT_APP_USER_ID);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProfileData();
    fetchProducts();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUid(user.uid);
      setUser(user);
      sessionStorage.setItem('user', JSON.stringify(user));
      checkUserExists(user.uid);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const checkUserExists = async (uid) => {
    try {
      const response = await userService.getUserByUid(uid);
      if (response.data) {
        navigate('/Tiktok_Web/admin'); // Navigate to admin page if user exists
      } else {
        setShowModal(true); // Show modal to create user if not exists
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      setShowModal(true); // Show modal to create user if error occurs
    }
  };

  const handleSaveUser = async (name) => {
    try {
      const newUser = { uid, name, isSuperadmin: false };
      const response = await userService.createUser(newUser);
      const { userId, profileId } = response.data;
      setShowModal(false);
      navigate(`/Tiktok_Web/admin`); // Navigate to admin page after creating user
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="main-page">
      <Header profileImage={profileData.profileImage} profileName={profileData.profileName} />
      <SocialLinks igUrl={profileData.igUrl} tiktokUrl={profileData.tiktokUrl} />
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
      {!user && (
        <div className="login-container">
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      )}
      {showModal && (
        <CreateUserModal
          uid={uid}
          onClose={() => setShowModal(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default MainPage;
