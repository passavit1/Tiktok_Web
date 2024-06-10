// src/services/productService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const productService = {
  addProducts: (payload) => axios.post(`${API_URL}/products`, payload),
  getProductsByProfileId: (profileId) =>
    axios.get(`${API_URL}/products/profile/${profileId}`),
};

export default productService;
