import React, { useState } from 'react';
import axios from 'axios';
import Logout from '../Logout/Logout';

const AdminPage = ({ user, setUser }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState(user ? user.displayName : '');
  const [igUrl, setIgUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [products, setProducts] = useState([]);

  const userId = process.env.REACT_APP_USER_ID;

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleProfileNameChange = (e) => {
    setProfileName(e.target.value);
  };

  const handleIgUrlChange = (e) => {
    setIgUrl(e.target.value);
  };

  const handleTiktokUrlChange = (e) => {
    setTiktokUrl(e.target.value);
  };

  const handleAddProduct = () => {
    setProducts([...products, { image: '', title: '', url: '' }]);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = products.slice();
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleProductImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', userId);

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/products/upload-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const newProducts = products.slice();
        newProducts[index].image = response.data.url;
        setProducts(newProducts);
        console.log('Product Image URL:', response.data.url);
      } catch (error) {
        console.error('Error uploading product image:', error);
      }
    }
  };

  const handleSaveProfileImage = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append('image', profileImage);
      formData.append('userId', userId);

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/upload-profile-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Profile Image URL:', response.data.url);
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  };

  const handleSaveUserInfo = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        name: profileName,
        email: user.email,
        igUrl,
        tiktokUrl,
      });
      console.log('User Info Updated:', response.data.message);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const handleSaveProducts = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
        userId,
        products,
      });
      console.log('Products Updated:', response.data.message);
    } catch (error) {
      console.error('Error updating products:', error);
    }
  };

  if (!user) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <div>
        <label>Profile Image:</label>
        <input type="file" onChange={handleProfileImageChange} />
        <button onClick={handleSaveProfileImage}>Upload Profile Image</button>
      </div>
      <div>
        <label>Profile Name:</label>
        <input type="text" value={profileName} onChange={handleProfileNameChange} />
      </div>
      <div>
        <label>IG URL:</label>
        <input type="text" value={igUrl} onChange={handleIgUrlChange} />
      </div>
      <div>
        <label>TikTok URL:</label>
        <input type="text" value={tiktokUrl} onChange={handleTiktokUrlChange} />
      </div>
      <button onClick={handleSaveUserInfo}>Save User Info</button>
      <div>
        <h3>Products</h3>
        {products.map((product, index) => (
          <div key={index}>
            <label>Product Image:</label>
            <input type="file" onChange={(e) => handleProductImageChange(e, index)} />
            <label>Product Title:</label>
            <input type="text" value={product.title} onChange={(e) => handleProductChange(index, 'title', e.target.value)} />
            <label>Product URL:</label>
            <input type="text" value={product.url} onChange={(e) => handleProductChange(index, 'url', e.target.value)} />
          </div>
        ))}
        <button onClick={handleAddProduct}>Add Product</button>
        <button onClick={handleSaveProducts}>Save Products</button>
      </div>
      <Logout setUser={setUser} />
    </div>
  );
};

export default AdminPage;
