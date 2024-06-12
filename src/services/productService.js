// src/services/productService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const productService = {
  addOrUpdateProducts: (payload) => axios.post(`${API_URL}/products/batch`, payload, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  addProducts: (payload) => axios.post(`${API_URL}/products`, payload, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  getAllProducts: () => axios.get(`${API_URL}/products`, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  updateProduct: (id, product) => axios.put(`${API_URL}/products/${id}`, product, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  deleteProduct: (id) => axios.delete(`${API_URL}/products/${id}`, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
};

export default productService;
