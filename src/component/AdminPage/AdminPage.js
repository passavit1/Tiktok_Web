import React, { useState, useEffect } from "react";
import Logout from "../Logout/Logout";
import profileService from "../../services/profileService";
import productService from "../../services/productService";
import uploadService from "../../services/uploadService";
import { useNavigate } from "react-router-dom";
import ProductsManager from "./ProductsManager/ProductsManager";
import { useUser } from "../../Context/UserContext"; // Import useUser hook
import mainDataService from "../../services/mainDataService";
import { Card, Upload, Input, Button, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AdminPage = () => {
  const { user, setUser } = useUser(); // Get user from context
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profileName, setProfileName] = useState("");
  const [igUrl, setIgUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [profileId, setProfileId] = useState(process.env.REACT_APP_USER_ID);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      navigate("/open_link_solmoom");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate, setUser]);

  useEffect(() => {
    const fetchProfileWithProducts = async () => {
      if (profileId) {
        try {
          const response = await mainDataService.getProfileWithProducts(
            profileId
          );
          const data = response.data;

          setProfileName(data.profile.name);
          setProfileImageUrl(data.profile.profileImageUrl);
          setIgUrl(data.profile.igUrl);
          setTiktokUrl(data.profile.tiktokUrl);
          setProducts(data.products || []);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileWithProducts();
  }, [profileId]);

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
    setProducts([
      ...products,
      { id: null, image: "", title: "", url: "", category: "" },
    ]);
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
      formData.append("userId", profileId);

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
      formData.append("userId", profileId);

      try {
        const response = await uploadService.uploadProfileImage(formData);
        const newProfileImageUrl = response.data.url;
        setProfileImageUrl(newProfileImageUrl); // Update the profile image URL state
        await handleSaveProfileInfo(newProfileImageUrl); // Save profile info after uploading the image
        console.log("Profile Image URL:", response.data.url);
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  };

  const handleSaveProfileInfo = async (uploadedImageUrl = profileImageUrl) => {
    try {
      const updatedProfile = {
        name: profileName,
        profileImageUrl: uploadedImageUrl,
        igUrl,
        tiktokUrl,
        products,
        userId: `users/${profileId}`,
      };

      const response = await profileService.updateProfile(
        profileId,
        updatedProfile
      );
      console.log("Profile Info Updated:", response.data.message);
    } catch (error) {
      console.error("Error updating profile info:", error);
    }
  };

  const handleSaveProducts = async () => {
    try {
      const payload = {
        profileId,
        products,
      };
      const response = await productService.addOrUpdateProducts(payload);
      console.log("Products Updated:", response.data.message);
    } catch (error) {
      console.error("Error updating products:", error);
    }
  };

  const handleDeleteProduct = async (productId, index) => {
    try {
      await productService.deleteProduct(productId);
      const newProducts = products.filter((_, i) => i !== index);
      setProducts(newProducts);
      console.log("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to the Admin Page</h2>

      <Card title="Update Profile Info" style={{ marginBottom: "20px" , width: "60vw" , margin:"auto" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col span={6} style={{ textAlign: "center" }}>
            {profileImageUrl && (
              <img
                alt="Profile"
                src={profileImageUrl}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  display: "block",
                  margin: "0 auto 10px",
                }}
              />
            )}
            <Upload
              beforeUpload={(file) => {
                handleProfileImageChange({ target: { files: [file] } });
                return false;
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
            </Upload>
          </Col>
          <Col span={18}>
            <Row gutter={[16, 16]} style={{marginBottom:"12px"}}>
              <Col span={8}>
                <label>Name:</label>
              </Col>
              <Col span={16}>
                <Input
                  placeholder="Profile Name"
                  value={profileName}
                  onChange={handleProfileNameChange}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}  style={{marginBottom:"12px"}}>
              <Col span={8}>
                <label>IG URL:</label>
              </Col>
              <Col span={16}>
                <Input
                  placeholder="IG URL"
                  value={igUrl}
                  onChange={handleIgUrlChange}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}  style={{marginBottom:"12px"}}>
              <Col span={8}>
                <label>TikTok URL:</label>
              </Col>
              <Col span={16}>
                <Input
                  placeholder="TikTok URL"
                  value={tiktokUrl}
                  onChange={handleTiktokUrlChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "20px" }}>
          <Button type="primary" onClick={handleUploadProfileImage}>
            Save Profile Info
          </Button>
        </Row>
      </Card>

      <ProductsManager
        products={products}
        handleProductImageChange={handleProductImageChange}
        handleProductChange={handleProductChange}
        handleAddProduct={handleAddProduct}
        handleSaveProducts={handleSaveProducts}
        handleDeleteProduct={handleDeleteProduct}
      />

      <div style={{ marginTop: "20px" }}>
        <Logout />
      </div>
    </div>
  );
};

export default AdminPage;
