import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const uploadService = {
  uploadProfileImage: (formData) => axios.post(`${API_URL}/upload/upload-profile-image`, formData),
  uploadProductImage: (formData) => axios.post(`${API_URL}/upload/upload-product-image`, formData)
};

export default uploadService;
