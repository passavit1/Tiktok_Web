import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const productService = {
  getProductsByProfileId: (profileId) => axios.get(`${API_URL}/products/profile/${profileId}`),
  uploadProductImage: (formData) => axios.post(`${API_URL}/products/upload-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  addProducts: (profileId, products) => axios.post(`${API_URL}/products`, { profileId, products }),
};

export default productService;
