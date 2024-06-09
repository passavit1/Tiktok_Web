import React, { useState, useEffect } from "react";
import Logout from "../Logout/Logout";
import { useUser } from "../../Context/UserContext";
import userService from "../../services/userService";
import productService from "../../services/productService";
import uploadService from "../../services/uploadService";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { user, setUser } = useUser(); // Use user context
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(""); // To hold the image URL after upload
  const [profileName, setProfileName] = useState("");
  const [igUrl, setIgUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const [existingUserData, setExistingUserData] = useState(null); // State to hold existing user data
  const [profileId, setProfileId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/Tiktok_Web/login"); // Redirect to login if no user in session
    }
  }, [setUser, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userService.getUserByUid(user.uid);
        const data = response.data;

        const { user: userData, profile } = data;
        setUserId(userData.id);
        setProfileId(userData.profileId);
        setExistingUserData(userData); // Store existing user data

        if (profile) {
          setProfileName(profile.name);
          setProfileImageUrl(profile.profileImageUrl); // Set the existing profile image URL
          setIgUrl(profile.igUrl);
          setTiktokUrl(profile.tiktokUrl);
          setProducts(profile.products || []);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

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
    setProducts([...products, { image: "", title: "", url: "" }]);
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
      formData.append("image", file);
      formData.append("userId", userId);

      try {
        const response = await uploadService.uploadProductImage(formData);
        const newProducts = products.slice();
        newProducts[index].image = response.data.url;
        setProducts(newProducts);
        console.log("Product Image URL:", response.data.url);
      } catch (error) {
        console.error("Error uploading product image:", error);
      }
    }
  };

  const handleUploadProfileImage = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append("image", profileImage);
      formData.append("userId", userId);

      try {
        const response = await uploadService.uploadProfileImage(formData);
        setProfileImageUrl(response.data.url); // Save the URL after uploading
        console.log("Profile Image URL:", response.data.url);
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  };

  const handleSaveUserInfo = async () => {
    try {
      const updatedUser = {
        ...existingUserData,
        name: profileName,
        igUrl,
        tiktokUrl,
      };

      const response = await userService.updateUser(userId, updatedUser);
      console.log("User Info Updated:", response.data.message);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleSaveProducts = async () => {
    try {
      const response = await productService.addProducts(userId, products);
      console.log("Products Updated:", response.data.message);
    } catch (error) {
      console.error("Error updating products:", error);
    }
  };

  const handleSaveProfileInfo = async () => {
    try {
      const updatedProfile = {
        name: profileName,
        profileImageUrl: profileImageUrl, // Use the uploaded image URL
        igUrl,
        tiktokUrl,
        products,
        userId: `users/${userId}`, // Ensure this format
      };

      const response = await userService.updateProfile(profileId, updatedProfile);
      console.log("Profile Info Updated:", response.data.message);
    } catch (error) {
      console.error("Error updating profile info:", error);
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
        <h3>Update User Info</h3>
        <div>
          <label>Profile Name:</label>
          <input
            type="text"
            value={profileName}
            onChange={handleProfileNameChange}
          />
        </div>
        <div>
          <label>IG URL:</label>
          <input type="text" value={igUrl} onChange={handleIgUrlChange} />
        </div>
        <div>
          <label>TikTok URL:</label>
          <input
            type="text"
            value={tiktokUrl}
            onChange={handleTiktokUrlChange}
          />
        </div>
        <button onClick={handleSaveUserInfo}>Save User Info</button>
      </div>

      <div>
        <h3>Update Profile Info</h3>
        <div>
          <label>Profile Image:</label>
          <input type="file" onChange={handleProfileImageChange} />
          <button onClick={handleUploadProfileImage}>Upload Profile Image</button>
        </div>
        <div>
          <label>Profile Name:</label>
          <input
            type="text"
            value={profileName}
            onChange={handleProfileNameChange}
          />
        </div>
        <div>
          <label>IG URL:</label>
          <input type="text" value={igUrl} onChange={handleIgUrlChange} />
        </div>
        <div>
          <label>TikTok URL:</label>
          <input
            type="text"
            value={tiktokUrl}
            onChange={handleTiktokUrlChange}
          />
        </div>
        <button onClick={handleSaveProfileInfo}>Save Profile Info</button>
        <div>
          <h3>Products</h3>
          {products.map((product, index) => (
            <div key={index}>
              <label>Product Image:</label>
              <input
                type="file"
                onChange={(e) => handleProductImageChange(e, index)}
              />
              <label>Product Title:</label>
              <input
                type="text"
                value={product.title}
                onChange={(e) =>
                  handleProductChange(index, "title", e.target.value)
                }
              />
              <label>Product URL:</label>
              <input
                type="text"
                value={product.url}
                onChange={(e) =>
                  handleProductChange(index, "url", e.target.value)
                }
              />
            </div>
          ))}
          <button onClick={handleAddProduct}>Add Product</button>
          <button onClick={handleSaveProducts}>Save Products</button>
        </div>
      </div>

      <Logout setUser={setUser} />
    </div>
  );
};

export default AdminPage;
