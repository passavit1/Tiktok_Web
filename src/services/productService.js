import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const productService = {
  addProducts: (userId, products) => axios.post(`${API_URL}/products`, { userId, products }),
  getProductsByProfileId: (profileId) => axios.get(`${API_URL}/products/${profileId}`)
};

export default productService;
