// src/services/uploadService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const uploadService = {
  uploadProfileImage: async (formData) => {
    const response = await axios.post(`${API_URL}/upload/upload-profile-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  uploadProductImage: async (formData) => {
    const response = await axios.post(`${API_URL}/upload/upload-product-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default uploadService;
